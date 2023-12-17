import { Component, ViewEncapsulation } from '@angular/core';
import { LoaderService } from '../service/loader.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.sass'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class SpinnerComponent {
  constructor(public loaderService: LoaderService) {}
}
