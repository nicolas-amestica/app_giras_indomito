import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { LoginService } from 'src/app/login/services/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(LoginService);
  const token = authService.getTokenFromStorage();

  if (!token) {
    const router = inject(Router);
    router.navigate(['/login']);
  }

  return true;
};
