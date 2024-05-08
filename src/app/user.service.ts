import { Injectable } from '@angular/core';
import { map, merge, Observable, ReplaySubject, scan, Subject, switchMap } from "rxjs";
import { Identity, User, UserMockWebService } from "./user-mock-web-service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private reloadSubj = new Subject<void>();
  private idRplSubj = new ReplaySubject<number>(1);

  userObs$: Observable<User> =
    this.combineReload(
      this.idRplSubj,
      this.reloadSubj
    )
      .pipe(
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

  private combineReload<T>(
    value$: Observable<T>,
    reload$: Observable<void>,
    selector: Function = Identity
  ): Observable<T> {
    return merge(value$, reload$).pipe(
      this._reload(selector),
      map((value: any) => value as T)
    );
  }
}

