import { NgModule } from '@angular/core';
import { RouterModule, type Routes } from '@angular/router';
import { ProgramsPage } from './pages/programs.page';

const routes: Routes = [
  {
    path: '',
    component: ProgramsPage,
  }, {
    path: "**",
    redirectTo: "home"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramsPageRoutingModule {}
