import { Component, OnInit, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
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
  categories = signal<Categorie[]>([]);
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
    this.voitureService.listeCategorie().subscribe(cats => {
      this.categories.set(cats);
      console.log(cats);
    });
  }

  categorieUpdated(cat: Categorie) {
    console.log("Cat updated event", cat);
    const toSave: Categorie = { idCat: cat.idCat, nomCat: cat.nomCat.trim() };
    if (!toSave.nomCat) return;

    const done = () => {
      this.chargerCategories();
      this.annuler();
    };
    const fail = (err: HttpErrorResponse) => {
      console.error("Erreur d'enregistrement de la catégorie", err);
      alert(`L'enregistrement a échoué (code ${err.status}). Ouvrez la console du navigateur (F12) pour les détails.`);
    };

    const requete = this.ajout
      ? this.voitureService.ajouterCategorie(toSave)
      : this.voitureService.updateCategorie(toSave);
    requete.subscribe({ next: done, error: fail });
  }

  updateCat(cat: Categorie) {
    this.updatedCat = { ...cat };
    this.ajout = false;
  }

  annuler() {
    this.updatedCat = { idCat: 0, nomCat: "" };
    this.ajout = true;
  }
}