import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';

@Injectable({ providedIn: 'root' })
export class Auth {
  users: User[] = [
    { username: 'admin',  password: '123', roles: ['ADMIN'] },
    { username: 'yahia',  password: '123', roles: ['USER'] },
    { username: 'nadhem', password: '123', roles: ['USER'] }
  ];

  // signals: the navbar and the pages update by themselves after login/logout
  public loggedUser = signal<string>('');
  public isloggedIn = signal<boolean>(false);
  public roles = signal<string[]>([]);

  constructor(private router: Router) {
    this.loadFromStorage();
  }

  // restore the session after a page refresh
  private loadFromStorage() {
    try {
      const user = localStorage.getItem('loggedUser');
      const roles = localStorage.getItem('roles');
      if (user && roles) {
        this.loggedUser.set(user);
        this.roles.set(JSON.parse(roles));
        this.isloggedIn.set(true);
      }
    } catch {
      this.clearStorage();
    }
  }

  private clearStorage() {
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('roles');
    localStorage.setItem('isloggedIn', 'false');
  }

  SignIn(user: User): boolean {
    const found = this.users.find(
      u => u.username === user.username && u.password === user.password
    );
    if (!found) return false;

    this.loggedUser.set(found.username);
    this.roles.set(found.roles);
    this.isloggedIn.set(true);
    localStorage.setItem('loggedUser', found.username);
    localStorage.setItem('roles', JSON.stringify(found.roles));
    localStorage.setItem('isloggedIn', 'true');
    return true;
  }

  logout() {
    this.isloggedIn.set(false);
    this.loggedUser.set('');
    this.roles.set([]);
    this.clearStorage();
    this.router.navigate(['/login']);
  }

  isAdmin(): boolean {
    return this.roles().includes('ADMIN');
  }
}