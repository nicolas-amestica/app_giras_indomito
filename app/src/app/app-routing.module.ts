import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, type Routes } from '@angular/router';

export const ROOT_ROUTES = {
  home            : 'home',
  services        : 'services',
  contact         : 'contact',
  about           : 'about',
  programs        : 'programs',
  login           : 'login'
};

const routes: Routes = [
  {
    path: ROOT_ROUTES.home,
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  }, {
    path: ROOT_ROUTES.services,
    loadChildren: () => import('./services/services.module').then((m) => m.ServicesPageModule)
  }, {
    path: ROOT_ROUTES.contact,
    loadChildren: () => import('./contact/contact.module').then((m) => m.ContactPageModule)
  }, {
    path: ROOT_ROUTES.programs,
    loadChildren: () => import('./programs/programs.module').then((m) => m.ProgramsPageModule)
  }, {
    path: ROOT_ROUTES.about,
    loadChildren: () => import('./about/about.module').then((m) => m.AboutPageModule)
  }, {
    path: ROOT_ROUTES.login,
    loadComponent: () => import('./login/pages/login.page').then((m) => m.LoginPage)
  }, {
    path      : '**',
    pathMatch : 'full',
    redirectTo: ROOT_ROUTES.home,
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
