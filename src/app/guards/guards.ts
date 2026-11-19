import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

// must be logged in, otherwise -> /forbidden
export const authGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);
  return auth.isloggedIn() ? true : router.createUrlTree(['/forbidden']);
};

// must be ADMIN, otherwise -> /forbidden
export const adminGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);
  return auth.isloggedIn() && auth.isAdmin()
    ? true
    : router.createUrlTree(['/forbidden']);
};