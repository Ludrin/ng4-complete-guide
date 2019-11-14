import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
    @ViewChild('f', { static: false }) shoppingEditForm: NgForm;

    subscription: Subscription;
    editMode = false;
    editedItemIndex: number;
    editedItem: Ingredient;

    constructor(private shoppingListService: ShoppingListService) { }

    ngOnInit() {
        this.subscription = this.shoppingListService.startedEditing
            .subscribe(
                (index: number) => {
                    this.editedItemIndex = index;
                    this.editMode = true;
                    this.editedItem = this.shoppingListService.getIngredient(index);

                    this.shoppingEditForm.setValue({
                        name: this.editedItem.name,
                        amount: this.editedItem.amount
                    });
                }
            );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onSubmitIngredient() {
        const ingredient = new Ingredient(this.shoppingEditForm.value.name, this.shoppingEditForm.value.amount);
        if (this.editMode) {
            this.shoppingListService.updateIngredient(this.editedItemIndex, ingredient);
        }
        else {
            this.shoppingListService.addIngredient(ingredient);
        }

        this.onClear();
    }

    onClear() {
        this.shoppingEditForm.reset();
        this.editMode = false;
    }

    onDelete() {
        this.shoppingListService.removeIngredient(this.editedItemIndex);
        this.onClear();
    }

}
