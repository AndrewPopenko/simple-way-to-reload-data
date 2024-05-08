import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";

function Identity<T>(value: T): T {
  return value;
}

export interface User {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserMockWebService {

  constructor() { }

  readonly users: User[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Liza' },
    { id: 3, name: 'Suzy' }
  ];

  getUserById(id: number): Observable<User> {
    const user = this.users.find((user: User) => {
      return user.id === id;
    });

    return of(user) as Observable<User>;
  }
}
