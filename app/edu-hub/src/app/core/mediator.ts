import { Injectable, Injector } from "@angular/core";

import * as BlogQueryHandlers from "./blog/queries/blog-query.handlers";
import * as BlogQueries from "./blog/queries/blog.queries";
import * as VideoQueryHandlers from "./video/queries/video-query.handlers";
import * as VideoQueries from "./video/queries/video.queries";
import * as SubjectQueries from "./subject/queries/subject.queries";
import * as SubjectQueryHandlers from "./subject/queries/subject-query.handlers";
import * as IdentityQueries from "./identity/queries/identity.queries";
import * as IdentityCommands from "./identity/commands/identity.commands";
import * as IdentityQueryHandlers from "./identity/queries/identity-query.handlers";
import * as IdentityCommandHandlers from "./identity/commands/identity-command.handlers";

import { CoreModule } from "./core.module";

@Injectable({
    providedIn: CoreModule
})
export class Mediator {
    constructor(private _injector: Injector) { }

    public readonly handlers = {
        [BlogQueries.Filter.type]: (request: BlogQueries.Filter) => this._injector.get(BlogQueryHandlers.Filter).handle(request),
        [BlogQueries.GetRandom.type]: (request: BlogQueries.GetRandom) => this._injector.get(BlogQueryHandlers.GetRandom).handle(request),
        [BlogQueries.GetRecommended.type]: (request: BlogQueries.GetRecommended) => this._injector.get(BlogQueryHandlers.GetRecommended).handle(request),

        [VideoQueries.Filter.type]: (request: VideoQueries.Filter) => this._injector.get(VideoQueryHandlers.Filter).handle(request),
        [VideoQueries.GetRandomList.type]: (request: VideoQueries.GetRandomList) => this._injector.get(VideoQueryHandlers.GetRandomList).handle(request),
        [VideoQueries.GetRecommended.type]: (request: VideoQueries.GetRecommended) => this._injector.get(VideoQueryHandlers.GetRecommended).handle(request),
        [VideoQueries.GetDetail.type]: (request: VideoQueries.GetDetail) => this._injector.get(VideoQueryHandlers.GetDetail).handle(request),

        [SubjectQueries.GetAll.type]: (request: SubjectQueries.GetAll) => this._injector.get(SubjectQueryHandlers.GetAll).handle(request),

        [IdentityCommands.Login.type]: (request: IdentityCommands.Login) => this._injector.get(IdentityCommandHandlers.Login).handle(request),
        [IdentityCommands.Logout.type]: (request: IdentityCommands.Logout) => this._injector.get(IdentityCommandHandlers.Logout).handle(request),
        [IdentityQueries.LoadCurrentUser.type]: (request: IdentityQueries.LoadCurrentUser) => this._injector.get(IdentityQueryHandlers.LoadCurrentUser).handle(request),
    };
}