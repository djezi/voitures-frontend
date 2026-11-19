import { Injectable } from '@angular/core';
import { Voiture } from '../model/voiture.model';
import { Categorie } from '../model/categorie.model';

@Injectable({
  providedIn: 'root'
})
export class Voitureservice {
  voitures: Voiture[];
  categorie!: Categorie[];

  constructor() {
    let savedCats: Categorie[] = [];
    try {
      savedCats = JSON.parse(localStorage.getItem('categories') || '[]');
    } catch {
      savedCats = [];
    }
    this.categorie = Array.isArray(savedCats) && savedCats.length > 0 ? savedCats : [
      { idCat: 1, nomCat: "v8" },
      { idCat: 2, nomCat: "RS" }
    ];

    let saved: Voiture[] = [];
    try {
      saved = JSON.parse(localStorage.getItem('voitures') || '[]');
    } catch {
      saved = [];
    }

    this.voitures = Array.isArray(saved) && saved.length > 0 ? saved : [
      { idVoiture: 1, nomVoiture: "BMW", prixVoiture: 50000, dateCreation: new Date("2018-07-30"), categorie: { idCat: 1, nomCat: "v8" } },
      { idVoiture: 2, nomVoiture: "AUDI", prixVoiture: 60000, dateCreation: new Date("2019-05-12"), categorie: { idCat: 2, nomCat: "RS" } },
      { idVoiture: 3, nomVoiture: "MERCEDES", prixVoiture: 75000, dateCreation: new Date("2020-01-15"), categorie: { idCat: 1, nomCat: "v8" } },
      { idVoiture: 4, nomVoiture: "RENAULT", prixVoiture: 25000, dateCreation: new Date("2021-10-05"), categorie: { idCat: 2, nomCat: "RS" } }
    ];
  }

  private save() {
    localStorage.setItem('voitures', JSON.stringify(this.voitures));
  }

  private saveCategories() {
    localStorage.setItem('categories', JSON.stringify(this.categorie));
  }

  listVoiture(): Voiture[] {
    return this.voitures;
  }

  ajoutVoiture(voi: Voiture) {
    this.voitures.push(voi);
    this.save();
  }

  supprimerVoiture(v: Voiture) {
    const index = this.voitures.indexOf(v);
    if (index > -1) {
      this.voitures.splice(index, 1);
      this.save();
    }
  }

  consulterVoiture(id: number): Voiture {
    return this.voitures.find(v => v.idVoiture == id)!;
  }

  updateVoiture(voiture: Voiture) {
    const index = this.voitures.findIndex(v => v.idVoiture == voiture.idVoiture);
    if (index > -1) {
      this.voitures[index] = voiture;
      this.save();
    }
  }

  listeCategorie(): Categorie[] {
    return this.categorie;
  }

  consulterCategorie(id: number): Categorie {
    return this.categorie.find(cat => cat.idCat == id)!;
  }

  rechercherParCategorie(idCat: number): Voiture[] {
    return this.voitures.filter(v => v.categorie && v.categorie.idCat == idCat);
  }

  ajouterCategorie(cat: Categorie) {
    const maxId = this.categorie.reduce((m, c) => Math.max(m, c.idCat), 0);
    this.categorie.push({ idCat: maxId + 1, nomCat: cat.nomCat });
    this.saveCategories();
  }


  updateCategorie(cat: Categorie) {
    const index = this.categorie.findIndex(c => c.idCat == cat.idCat);
    if (index > -1) {
      const updated = { idCat: this.categorie[index].idCat, nomCat: cat.nomCat };
      this.categorie[index] = updated;
      this.voitures.forEach(v => {
        if (v.categorie && v.categorie.idCat == updated.idCat) {
          v.categorie = updated;
        }
      });
      this.save();
      this.saveCategories();
    }
  }
}