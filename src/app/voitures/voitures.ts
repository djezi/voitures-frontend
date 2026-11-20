import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Voiture } from '../model/voiture.model';
import { Voitureservice } from '../services/voiture';
import { Auth } from '../services/auth';

@Component({
  imports: [CommonModule, FormsModule, RouterLink],
  selector: 'app-voitures',
  styleUrl: './voitures.css',
  templateUrl: './voitures.html',
})
export class Voitures implements OnInit {
  // signals: the page refreshes by itself when the server answers
  voitures = signal<Voiture[]>([]);
  erreur = signal<string>('');

  constructor(
    private voitureservice: Voitureservice,
    public authService: Auth
  ) {}

  ngOnInit(): void {
    this.chargerVoitures();
  }

  chargerVoitures() {
    this.voitureservice.listVoiture().subscribe({
      next: (voitures) => {
        this.voitures.set(voitures);
        this.erreur.set('');
      },
      error: () => this.erreur.set(
        "Impossible de charger les voitures. Vérifiez que le serveur Spring Boot (port 8080) est démarré."
      )
    });
  }

  supprimer(v: Voiture) {
    let conf = confirm("Êtes-vous sûr de vouloir supprimer?");
    if (conf) {
      this.voitureservice.supprimerVoiture(v.idVoiture).subscribe({
        next: () => this.chargerVoitures(),
        error: () => this.erreur.set("La suppression a échoué.")
      });
    }
  }
}