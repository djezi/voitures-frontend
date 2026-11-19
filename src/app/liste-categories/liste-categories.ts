import { Component, OnInit } from '@angular/core';
import { Categorie } from '../model/categorie.model';
import { Voitureservice } from '../services/voiture';
import { Auth } from '../services/auth';
import { UpdateCategorie } from '../update-categorie/update-categorie';

@Component({
  imports: [UpdateCategorie],
  selector: 'app-liste-categories',
  templateUrl: './liste-categories.html',
})
export class ListeCategories implements OnInit {
  categories!: Categorie[];
  updatedCat: Categorie = { idCat: 0, nomCat: "" };
  ajout: boolean = true;

  constructor(
    private voitureService: Voitureservice,
    public authService: Auth
  ) {}

  ngOnInit(): void {
    this.chargerCategories();
  }

  chargerCategories() {
    this.categories = [...this.voitureService.listeCategorie()];
  }


  categorieUpdated(cat: Categorie) {
    console.log("Cat updated event", cat);
    const toSave: Categorie = { idCat: cat.idCat, nomCat: cat.nomCat.trim() };
    if (!toSave.nomCat) return;

    if (this.ajout) {
      this.voitureService.ajouterCategorie(toSave);
    } else {
      this.voitureService.updateCategorie(toSave);
    }
    this.chargerCategories();
    this.annuler();
  }


  updateCat(cat: Categorie) {
    this.updatedCat = { ...cat };
    this.ajout = false;
  }

  // back to "add" mode with an empty form
  annuler() {
    this.updatedCat = { idCat: 0, nomCat: "" };
    this.ajout = true;
  }
}