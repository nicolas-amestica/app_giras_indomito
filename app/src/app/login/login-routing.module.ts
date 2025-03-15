import { NgModule } from '@angular/core';
import { RouterModule, type Routes } from '@angular/router';
import { LoginPage } from './pages/login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
  }, {
    path: "**",
    redirectTo: "home"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginPageRoutingModule {}
