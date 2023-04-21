/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */
export const environment = {
  production: true,
  // apiUrl: 'http://172.27.45.12:3001/api',
  // apiUrlMat: 'http://172.27.45.12:5001/api',
  // apiUrlMatSignalR: 'http://172.27.45.12:5001',
  // apiUrlNode: 'http://172.27.45.12:1880',

  apiUrl: 'http://xpl-matbag-app01:1880/api',
  apiUrlMat: 'http://10.100.22.48:5001/api',
  apiUrlMatSignalR: 'http://10.100.22.48:5001',
  apiUrlNode: 'http://10.100.22.48:1880',
  apiUrlNode1: 'http://xpl-matbag-app01:1880',
  urlWebSocket: 'ws://xpl-matbag-app02:1880/wc/alarms',
  urlDevicesSocket: 'ws://xpl-matbag-app02:1880/ws/deviceinfo',
  urlapixplmatbagapp02 : 'http://xpl-matbag-app02:1880',
  urlWebSocket02: 'ws://xpl-matbag-app01:1880/router',
  // apiUrl: 'http://10.100.22.92:3001/api',
  // apiUrlMat: 'http://10.100.22.92:5001/api',
  // apiUrlMatSignalR: 'http://10.100.22.92:5001',
  // apiUrlNode: 'http://10.100.22.92:1880',

  testUser: {
    token: {},
    email: '',
  },
};
 
// export const environment = {
//   production: true,
//   apiUrl: 'http://10.100.22.100:3001/api',
//   apiUrlMat: 'http://10.100.22.100:5001/api',
//   apiUrlMatSignalR: '10.100.22.100:5001',
//   apiUrlNode: 'http://10.100.22.100:1880',
//   testUser: {
//     token: {},
//     email: '',
//   },
// };