import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Voiture } from '../model/voiture.model';
import { Categorie } from '../model/categorie.model';
import { Voitureservice } from '../services/voiture';

@Component({
  imports: [FormsModule],
  selector: 'app-add-voiture',
  templateUrl: './add-voiture.html',
})
export class AddVoiture implements OnInit {
  categories!: Categorie[];
  newIdCat!: number;
  newCategorie!: Categorie;
  newVoiture = new Voiture();

  constructor(
    private voitureservice: Voitureservice,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categories = this.voitureservice.listeCategorie();
  }

  addVoiture() {
    if (!this.newVoiture.nomVoiture || !this.newIdCat) {
      alert('Veuillez remplir le nom et choisir une catégorie.');
      return;
    }
    this.newCategorie = this.voitureservice.consulterCategorie(this.newIdCat);
    this.newVoiture.categorie = this.newCategorie;
    // the date input gives a "yyyy-MM-dd" string -> convert to Date
    this.newVoiture.dateCreation = new Date(this.newVoiture.dateCreation);
    this.voitureservice.ajoutVoiture(this.newVoiture);
    this.router.navigate(['/voitures']);
    this.newVoiture = new Voiture();
  }
}