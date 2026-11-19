import { Routes } from '@angular/router';
import { Voitures } from './voitures/voitures';
import { AddVoiture } from './add-voiture/add-voiture';
import { UpdateVoiture } from './updatevoiture/updatevoiture';
import { RechercheParCategorie } from './recherche-par-categorie/recherche-par-categorie';
import { RechercheParNom } from './recherche-par-nom/recherche-par-nom';
import { Login } from './login/login';
import { Forbidden } from './forbidden/forbidden';
import { adminGuard, authGuard } from './guards/guards';

export const routes: Routes = [
  { path: 'voitures', component: Voitures },
  { path: 'add-voiture', component: AddVoiture, canActivate: [authGuard] },
  { path: 'updateVoiture/:id', component: UpdateVoiture, canActivate: [adminGuard] },
  { path: 'rechercheParCategorie', component: RechercheParCategorie },
  { path: 'rechercheParNom', component: RechercheParNom },
  { path: 'login', component: Login },
  { path: 'forbidden', component: Forbidden },
  { path: '', redirectTo: 'voitures', pathMatch: 'full' },
  { path: '**', redirectTo: 'voitures' }
];