import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
    @ViewChild('f', { static: false }) shoppingEditForm: NgForm;

    subscription: Subscription;
    editMode = false;
    editedItem: Ingredient;

    constructor(
        private store: Store<fromShoppingList.AppState>
    ) { }

    ngOnInit() {
        this.subscription = this.store.select('shoppingList').subscribe(stateData => {
            if (stateData.editedIngredientIndex > -1) {
                this.editMode = true;
                this.editedItem = stateData.editedIngredient;
                this.shoppingEditForm.setValue({
                    name: this.editedItem.name,
                    amount: this.editedItem.amount
                });
            } else {
                this.editMode = false;
            }
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.store.dispatch(new ShoppingListActions.StopEdit());
    }

    onSubmitIngredient() {
        const ingredient = new Ingredient(this.shoppingEditForm.value.name, this.shoppingEditForm.value.amount);
        if (this.editMode) {
            this.store.dispatch(
                new ShoppingListActions.UpdateIngredient(ingredient)
            );
        }
        else {
            this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient));
        }

        this.onClear();
    }

    onClear() {
        this.shoppingEditForm.reset();
        this.editMode = false;
        this.store.dispatch(new ShoppingListActions.StopEdit());
    }

    onDelete() {
        this.store.dispatch(new ShoppingListActions.DeleteIngredient());
        this.onClear();
    }

}
