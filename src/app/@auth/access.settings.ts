/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

export const authSettings = {
  guest: {
  },
  user: {
    parent: 'guest',
      view: ['devices', 'current-user'],
      edit: ['devices', 'current-user'],
  },
  admin: {
    parent: 'user',
      view: ['devices', 'current-user', 'users'],
      edit: ['devices', 'current-user', 'users'],
  },
};
