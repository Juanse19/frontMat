/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // apiUrl: 'http://10.100.22.92:3001/api',
  // apiUrlMat: 'http://10.100.22.92:5001/api',
  // apiUrlMatSignalR: 'http://10.100.22.92:5001',
  // apiUrlNode: 'http://10.100.22.92:1880',

  // apiUrl: 'http://172.27.45.12:3001/api',
  // apiUrlMat: 'http://172.27.45.12:5001/api',
  // apiUrlMatSignalR: 'http://172.27.45.12:5001',
  // apiUrlNode: 'http://172.27.45.12:1880',

  apiUrl: 'http://10.120.18.8:3001/api',
  apiUrlMat: 'http://10.100.22.48:5001/api',
  apiUrlMatSignalR: 'http://10.100.22.48:5001',
  apiUrlNode: 'http://10.100.22.48:1880',
  apiUrlNode1: 'http://10.120.18.8:1880',

  testUser: {
    // tslint:disable
    token: {
      expires_in: 3600000,
      access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiQFVzZXIiLCJyb2xlIjoidXNlciIsIm5iZiI6MTU2NDA2MTQ1NywiZXhwIjoxNTk1NjgzODU3LCJpc3MiOiJpc3N1ZXJfc2FtcGxlIiwiYXVkIjoiYXVkaWVuY2Vfc2FtcGxlIn0.xAAbQIOsw3ZXlIxDFnv5NynZy7OfzrvrJYWsy2NEBbA',
    },
    // tslint:enable
    email: 'user@user.user',
  },
};
