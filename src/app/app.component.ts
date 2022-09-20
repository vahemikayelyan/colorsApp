import { Component, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('printPage', { static: false }) printPage: ElementRef | undefined;
  title = 'colorsApp';

  constructor(
    private sharedService: SharedService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.sharedService.printObservable.subscribe((color) => {
      if (this.printPage) {
        this.renderer.setStyle(
          this.printPage.nativeElement,
          'background',
          color
        );
        window.print();
      }
    });
  }
}
