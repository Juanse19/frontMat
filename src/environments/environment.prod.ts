/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */
export const environment = {
  production: true,
  apiUrl: 'http://172.27.45.12:3001/api',
  apiUrlMat: 'http://172.27.45.12:5001/api',
  apiUrlMatSignalR: 'http://172.27.45.12:5001',
  apiUrlNode: 'http://172.27.45.12:1880',
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