import { NgModule } from '@angular/core';
import { RouterModule, type Routes } from '@angular/router';
import { HomePage } from './pages/home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  }, {
    path: "**",
    redirectTo: "home"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
