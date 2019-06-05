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
  }

  onShoppingListToggle(shoppingListState: boolean) {
    this.showShoppingList = shoppingListState;
  }
}
