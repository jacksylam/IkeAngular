// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
  apiKey: "AIzaSyAazVAts4FlCQd1bPgT5g7jv9FYMzcOKyw",
    authDomain: "ikeangular.firebaseapp.com",
    databaseURL: "https://ikeangular.firebaseio.com",
    projectId: "ikeangular",
    storageBucket: "ikeangular.appspot.com",
    messagingSenderId: "818927542186"
  }
};
