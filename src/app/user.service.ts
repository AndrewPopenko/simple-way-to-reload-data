import { Injectable } from '@angular/core';
import { merge, Observable, ReplaySubject, scan, Subject, switchMap } from "rxjs";
import { Identity, User, UserMockWebService } from "./user-mock-web-service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private reloadSubj = new Subject<void>();
  private idRplSubj = new ReplaySubject<number>(1);

  userObs$: Observable<User> =
    merge(
      this.idRplSubj,
      this.reloadSubj
    )
      .pipe(
        // @ts-ignore
        this._reload(),
        switchMap((userId: number) => {
          return this.userWebService.getUserById(userId);
        })
      );

  constructor(private userWebService: UserMockWebService) {}

  setId(id: number): void {
    this.idRplSubj.next(id);
  }

  reload(): void {
    this.reloadSubj.next();
  }

  private _reload(selector: Function = Identity) {
    return scan((oldValue, currentValue) => {
      if(!oldValue && !currentValue)
        throw new Error(`Reload can't run before initial load`);

      return selector(currentValue || oldValue);
    });
  }
}

