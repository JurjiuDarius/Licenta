import { RouterModule, Routes } from '@angular/router';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: ImageViewerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorImagesRoutingModule {}
