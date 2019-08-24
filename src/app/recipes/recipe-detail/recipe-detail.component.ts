import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeDetail: Recipe;
  id: number;

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
      this.route.params
      .subscribe(
          (params: Params) => {
              this.id = +params['id'];
              this.recipeDetail = this.recipeService.getRecipe(this.id);
          }
      );
  }

  onToShoppingList() {
    this.recipeService.addRecipeIngredients(this.recipeDetail.ingredients);
  }

  onEditRecipeClick() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

}
