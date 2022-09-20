import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  printSubject = new Subject<string>();
  printObservable = this.printSubject.asObservable();

  constructor() {}

  printPage(color: string) {
    this.printSubject.next(color);
  }
}
