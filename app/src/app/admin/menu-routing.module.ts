import { NgModule } from '@angular/core';
import { RouterModule, type Routes } from '@angular/router';
import { MenuPage } from './menu/pages/menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
  }, {
    path: "**",
    redirectTo: "login"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuPageRoutingModule {}
