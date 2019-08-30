import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe(
      "Pork 'n veggies",
      'Sliced pork with vegetables',
      'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
      [
        new Ingredient('Pork slice', 1),
        new Ingredient('Carrot', 3)
      ]
    ),
    new Recipe(
      'Simple tagliatelle',
      'Tagliatelle with grinded cheese',
      'https://c.pxhere.com/photos/99/04/tagliatelle_pasta_on_a_fork_food_italian_meal_cuisine_italy_traditional-1375412.jpg!d',
      [
        new Ingredient('Tagliatele package', 1),
        new Ingredient('Grinded cheese', 1)
      ]
    )
  ];

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
      return this.recipes[index];
  }

  addRecipeIngredients(ingredients: Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }
}
