import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestMapComponent } from './test-map/test-map.component';

const routes: Routes = [
  { path: 'test-map', component: TestMapComponent },
  { path: '', redirectTo: 'test-map', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }