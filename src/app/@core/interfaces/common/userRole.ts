import { Observable } from 'rxjs';

export interface UserRole {
  id: number;
  name: string;
  login: string;
  role: string;
}

export abstract class UserRoleData {
  abstract getUserRole(): Observable<UserRole[]>;
}