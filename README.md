# Quoted

## About

Quoted lets you create, edit, search and export quotes.

![Quoted](assets/img/screenshot.png)


## Setup

- Quoted uses [Okta](https://www.okta.com/) for authentication. You will need to create an Okta (dev) account and application to use Quoted. The backend will use JWT tokens to authenticate users using their Okta email address. You need to configure credentials accordingly in `src/app/config/config.ts.example` and remove the `.example` suffix.
- Configure the environment variables in `src/environments/environment.ts.example` accordingly and remove the `.example` suffix.
- Quoted requires a Spring Boot backend. The backend and its documentation are available [here](https://github.com/nicoluca/quoted-2).


# Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

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
