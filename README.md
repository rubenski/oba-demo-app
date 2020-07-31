# ObaDemoApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.7.

## Development server

Run `ng serve --port 4201 --host demo.oba.com` for local development. Make sure you mapped 
`

## Running on a public Ngrok domain

- Create an ngrok tunnel that tunnels to localhost port 4200 : `ngrok http 4201`
- Update nginx config in `oba-portal` with the ngrok hostname and restart nginx : `sudo systemctl restart nginx`
- Change the application domain in oba-demo: `obademo.application.domain=<ngrok domain>`
- Run oba-demo-app with `ng serve --port 4201 --disable-host-check`

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
