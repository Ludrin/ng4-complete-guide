import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html'
})
export class ShoppingListComponent implements OnInit, OnDestroy {
    ingredients: Observable<{ ingredients: Ingredient[] }>;
    private idChangeSub: Subscription;

    constructor(
        private shoppingListService: ShoppingListService,
        private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
    ) { }

    ngOnInit() {
        this.ingredients = this.store.select('shoppingList');
        // this.ingredients = this.shoppingListService.getIngredients();
        // this.idChangeSub = this.shoppingListService.ingredientsChanged
        //     .subscribe(
        //         (ingredients: Ingredient[]) => {
        //             this.ingredients = ingredients;
        //         }
        //     );
    }

    ngOnDestroy() {
        // this.idChangeSub.unsubscribe();
    }

    onEditItem(index: number) {
        this.shoppingListService.startedEditing.next(index);
    }
}
