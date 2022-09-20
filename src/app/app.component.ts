import { Component } from '@angular/core';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'colorsApp';

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.sharedService.printSubject.subscribe((color) => {
      window.print();
    });
  }
}
