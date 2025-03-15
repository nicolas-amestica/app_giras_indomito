import { NgModule } from '@angular/core';
import { RouterModule, type Routes } from '@angular/router';
import { ServicesPage } from './pages/services.page';

const routes: Routes = [
  {
    path: '',
    component: ServicesPage,
  }, {
    path: "**",
    redirectTo: "services"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesPageRoutingModule {}
