import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
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
        private shoppingListService: ShoppingListService,
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
        // this.subscription = this.shoppingListService.startedEditing
        //     .subscribe(
        //         (index: number) => {
        //             this.editedItemIndex = index;
        //             this.editMode = true;
        //             this.editedItem = this.shoppingListService.getIngredient(index);

        //             this.shoppingEditForm.setValue({
        //                 name: this.editedItem.name,
        //                 amount: this.editedItem.amount
        //             });
        //         }
        //     );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.store.dispatch(new ShoppingListActions.StopEdit());
    }

    onSubmitIngredient() {
        const ingredient = new Ingredient(this.shoppingEditForm.value.name, this.shoppingEditForm.value.amount);
        if (this.editMode) {
            // this.shoppingListService.updateIngredient(this.editedItemIndex, ingredient);
            this.store.dispatch(
                new ShoppingListActions.UpdateIngredient(ingredient)
            );
        }
        else {
            // this.shoppingListService.addIngredient(ingredient);
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
        // this.shoppingListService.removeIngredient(this.editedItemIndex);
        this.store.dispatch(new ShoppingListActions.DeleteIngredient());
        this.onClear();
    }

}
