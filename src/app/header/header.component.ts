import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleRecipes = new EventEmitter<boolean>();
  @Output() toggleShoppingList = new EventEmitter<boolean>();

  showRecipes = false;
  showShoppingList = false;

  constructor() { }

  ngOnInit() {
  }

  onRecipesClick() {
    this.showRecipes = !this.showRecipes;
    this.toggleRecipes.emit(this.showRecipes);
  }

  onShoppingListClick() {
    this.showShoppingList = !this.showShoppingList;
    this.toggleShoppingList.emit(this.showShoppingList);
  }

}
