import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {DevComponent} from './dev/dev.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'dev', component: DevComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
