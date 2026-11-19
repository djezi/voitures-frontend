import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';


export const authGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);
  return auth.isloggedIn() ? true : router.createUrlTree(['/forbidden']);
};


export const adminGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);
  return auth.isloggedIn() && auth.isAdmin()
    ? true
    : router.createUrlTree(['/forbidden']);
};