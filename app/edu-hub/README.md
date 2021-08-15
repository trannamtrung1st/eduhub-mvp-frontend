# EduHub

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

<br/>

# Documentation

## Instructions
Steps to create a new page component (common case):
1. Execute: `ng generate component {{ComponentFullName}} --module={{module-full-name.ts}}`
2. Define a **ComponentState** class
3. Make the class `extends BaseComponent<ComponentState> implements OnInit, OnDestroy`
4. Override the property `protected transferStateKeyName: string = {{ComponentClass}}.name;`
5. Call `super()` in constructor and `super.ngOnInit()` on `ngOnInit`
6. Common `ngOnInit` code:
```typescript
  ngOnInit(): void {
    super.ngOnInit();

    if (this.shouldLoad) {
      // Load your data
      // - Call API
      // - Set states

      this.isPlatformServer && this.setTransferredState(new ComponentState(
          // Pass your states here
      )));
    } else {
      this.patchTransferredState(this);
    }

    // Others
  }
```