import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Voiture } from '../model/voiture.model';
import { Voitureservice } from '../services/voiture';
import { Categorie } from '../model/categorie.model';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-update-voiture',
  templateUrl: './updatevoiture.html'
})
export class UpdateVoiture implements OnInit {
  currentVoiture = signal<Voiture>(new Voiture());
  categories = signal<Categorie[]>([]);
  updatedCatId!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private voitureService: Voitureservice
  ) {}

  ngOnInit(): void {
    this.voitureService.listeCategorie().subscribe(cats => this.categories.set(cats));

    const id = this.activatedRoute.snapshot.params['id'];
    this.voitureService.consulterVoiture(id).subscribe({
      next: (voiture) => {
        if (voiture.categorie) {
          this.updatedCatId = voiture.categorie.idCat;
        }
        this.currentVoiture.set(voiture);
      },
      error: () => this.router.navigate(['/voitures'])
    });
  }

  onUpdateVoiture() {
    const voiture = this.currentVoiture();
    const cat = this.categories().find(c => c.idCat == this.updatedCatId);
    if (cat) {
      voiture.categorie = cat;
    }
    this.voitureService.updateVoiture(voiture).subscribe({
      next: () => this.router.navigate(['/voitures']),
      error: () => alert("La modification a échoué.")
    });
  }
}