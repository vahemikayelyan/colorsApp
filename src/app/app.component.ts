import {
  Component,
  ElementRef,
  ViewChild,
  Renderer2,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  @ViewChild('printPage', { static: false }) printPage: ElementRef | undefined;
  printSubscription: Subscription | undefined;

  constructor(
    private sharedService: SharedService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.printSubscription = this.sharedService.printObservable.subscribe(
      (color) => {
        if (this.printPage) {
          this.renderer.setStyle(
            this.printPage.nativeElement,
            'background',
            color
          );
          window.print();
        }
      }
    );
  }

  ngOnDestroy() {
    this.printSubscription?.unsubscribe();
  }
}
