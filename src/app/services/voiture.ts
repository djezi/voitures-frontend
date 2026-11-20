import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Voiture } from '../model/voiture.model';
import { Categorie } from '../model/categorie.model';

@Injectable({
  providedIn: 'root'
})
export class Voitureservice {
  private apiVoitures = 'http://localhost:8080/api/voitures';
  private apiCategories = 'http://localhost:8080/api/categories';

  constructor(private http: HttpClient) {}

  listVoiture(): Observable<Voiture[]> {
    return this.http.get<Voiture[]>(this.apiVoitures);
  }

  consulterVoiture(id: number): Observable<Voiture> {
    return this.http.get<Voiture>(`${this.apiVoitures}/${id}`);
  }

  ajoutVoiture(voiture: Voiture): Observable<Voiture> {
    return this.http.post<Voiture>(this.apiVoitures, voiture);
  }

  updateVoiture(voiture: Voiture): Observable<Voiture> {
    return this.http.put<Voiture>(`${this.apiVoitures}/${voiture.idVoiture}`, voiture);
  }

  supprimerVoiture(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiVoitures}/${id}`);
  }

  rechercherParCategorie(idCat: number): Observable<Voiture[]> {
    return this.http.get<Voiture[]>(`${this.apiVoitures}/cat/${idCat}`);
  }

  rechercherParNom(nom: string): Observable<Voiture[]> {
    return this.http.get<Voiture[]>(`${this.apiVoitures}/search`, { params: { nom } });
  }

  listeCategorie(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.apiCategories);
  }

  consulterCategorie(id: number): Observable<Categorie> {
    return this.http.get<Categorie>(`${this.apiCategories}/${id}`);
  }

  ajouterCategorie(cat: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(this.apiCategories, cat);
  }

  updateCategorie(cat: Categorie): Observable<Categorie> {
    return this.http.put<Categorie>(`${this.apiCategories}/${cat.idCat}`, cat);
  }
}