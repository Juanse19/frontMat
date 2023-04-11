
export interface RoleAccess {
    roleID?: number;
    roleName?: string;
    access?: Access;
  }
  
export interface Access {
    IdAccess?: number;
    AccestypeName?: string;
    Selected?: boolean;
  }