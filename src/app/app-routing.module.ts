import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ScrollContainerComponent} from './scroll-container/scroll-container.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'scroll', component: ScrollContainerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
