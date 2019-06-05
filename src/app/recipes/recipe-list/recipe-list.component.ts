import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeItemSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe(
      "Pork 'n veggies",
      'Sliced pork with vegetables',
      'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg'
    ),
    new Recipe(
      'Simple tagliatelle',
      'Tagliatelle with grinded cheese',
      'https://c.pxhere.com/photos/99/04/tagliatelle_pasta_on_a_fork_food_italian_meal_cuisine_italy_traditional-1375412.jpg!d'
    )
  ];

  constructor() { }

  ngOnInit() {
  }

  onRecipeItemSelected(recipeItem: Recipe) {
    this.recipeItemSelected.emit(recipeItem);
  }

}
