import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  printSubject = new Subject<string>();
  printObservable = this.printSubject.asObservable();

  constructor(private httpClient: HttpClient) {}

  printPage(color: string) {
    this.printSubject.next(color);
  }

  getExcelSheet() {
    return this.httpClient.get('assets/colors.xlsx', { responseType: 'blob' });
  }
}
