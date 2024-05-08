import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, switchMap } from "rxjs";
import { User, UserMockWebService } from "./user-mock-web-service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private idRplSubj = new ReplaySubject<number>(1);

  userObs$: Observable<User> = this.idRplSubj
    .pipe(
      switchMap((userId: number) => {
        return this.userWebService.getUserById(userId);
      })
    );

  constructor(private userWebService: UserMockWebService) {}

  setId(id: number): void {
    this.idRplSubj.next(id);
  }
}

