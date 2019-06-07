import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showRecipes = false;
  showShoppingList = false;

  onRecipesToggle(recipesState: boolean) {
    this.showRecipes = recipesState;
    this.showShoppingList = false;
  }

  onShoppingListToggle(shoppingListState: boolean) {
    this.showShoppingList = shoppingListState;
    this.showRecipes = false;
  }
}
