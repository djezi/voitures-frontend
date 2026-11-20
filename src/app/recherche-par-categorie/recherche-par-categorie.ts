import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Voiture } from '../model/voiture.model';
import { Categorie } from '../model/categorie.model';
import { Voitureservice } from '../services/voiture';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-recherche-par-categorie',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './recherche-par-categorie.html'
})
export class RechercheParCategorie implements OnInit {

  // null = no search done yet
  voitures = signal<Voiture[] | null>(null);
  categories = signal<Categorie[]>([]);
  idCategorie!: number;

  constructor(
    private voitureService: Voitureservice,
    public authService: Auth
  ) { }

  ngOnInit(): void {
    this.voitureService.listeCategorie().subscribe(cats => this.categories.set(cats));
  }

  onChange() {
    this.voitureService.rechercherParCategorie(this.idCategorie)
      .subscribe(voitures => this.voitures.set(voitures));
  }

  supprimerVoiture(v: Voiture) {
    let conf = confirm("Etes-vous sûr de vouloir supprimer cette voiture ?");
    if (conf) {
      this.voitureService.supprimerVoiture(v.idVoiture).subscribe(() => this.onChange());
    }
  }
}