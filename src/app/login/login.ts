import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../model/user.model';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';

@Component({
  imports: [FormsModule],
  selector: 'app-login',
  styles: ``,
  templateUrl: './login.html',
})
export class Login implements OnInit {
  user = new User();
  constructor(private authService: Auth, private router: Router) { }
  ngOnInit() {
  }
  onLoggedin() {
    let isValidUser: boolean = this.authService.SignIn(this.user);
    if (isValidUser)
      this.router.navigate(['/']);
    else
      alert('Login ou mot de passe incorrecte!');
  }
}