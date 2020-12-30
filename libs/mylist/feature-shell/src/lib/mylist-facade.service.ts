import { Injectable } from '@angular/core';
import { MylistDataAccess } from './interface/mylist-data-access';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MylistFacadeService {
  constructor(private dataAccessService: MylistDataAccess) {}

  loadMylist() {
    return this.dataAccessService
      ?.list()
      .pipe(tap((v) => console.log('mylist facade: ', v)));
  }
}
