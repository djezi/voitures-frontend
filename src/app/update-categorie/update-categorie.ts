import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Categorie } from '../model/categorie.model';

@Component({
  imports: [FormsModule],
  selector: 'app-update-categorie',
  templateUrl: './update-categorie.html',
})
export class UpdateCategorie implements OnInit {
  @Input()
  categorie!: Categorie;

  @Input()
  ajout!: boolean;

  @Output()
  categorieUpdated = new EventEmitter<Categorie>();

  ngOnInit(): void {
    console.log("ngOnInit du composant UpdateCategorie ", this.categorie);
  }

  saveCategorie() {
    this.categorieUpdated.emit(this.categorie);
  }
}