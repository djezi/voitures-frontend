import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  imports: [RouterLink],
  selector: 'app-forbidden',
  templateUrl: './forbidden.html',
})
export class Forbidden {
  constructor(public authService: Auth) {}
}