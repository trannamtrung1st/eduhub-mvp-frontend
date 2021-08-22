import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

import { AuthModule } from '../auth.module';

import { Store } from '@ngxs/store';

import { PolicyInjector } from '../policies/policy-injector';

import { A_ROUTING } from '@app/constants';

import { AuthContext } from '../models/auth-context.model';
import { RoutingData } from '@presentation/cross/routing/models/routing-data.model';

import { CurrentUserState } from '@core/identity/states/current-user.state';

@Injectable({
  providedIn: AuthModule
})
export class RoutingAuthService implements CanActivate {

  constructor(@Inject(PLATFORM_ID) private _platformId: object,
    private _store: Store,
    private _router: Router) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const isBrowser = isPlatformBrowser(this._platformId);

    if (isBrowser) {
      const user = this._store.selectSnapshot(CurrentUserState.currentUser);
      const authContext = new AuthContext(!!user, user);
      const routeData = route.data as RoutingData | undefined;
      const policies = routeData?.policies;

      if (policies) {
        for (let policyType of policies) {
          const policy = PolicyInjector.get(policyType);
          if (!policy) throw new Error(`Policy '${policies}' not found`);
          await policy.authorizeAsync(authContext);
        }

        const authResult = authContext.authResult;

        if (authResult.isSuccess) return true;
        if (authResult.unauthorized)
          return this._router.parseUrl(routeData?.loginPath || A_ROUTING.notFound);
        if (authResult.accessDenied)
          return this._router.parseUrl(routeData?.accessDeniedPath || A_ROUTING.notFound);
      }
    }

    return true;
  }
}
