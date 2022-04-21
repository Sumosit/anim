import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AnimComponent} from "./anim/anim.component";

const routes: Routes = [
  {
    path: '', component: AnimComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
