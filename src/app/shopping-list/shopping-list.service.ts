import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({providedIn : 'root'})
export class ShoppingListService{
    ingredientChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
      ];

    getIngrdients(){
        return this.ingredients.slice();
    }

    getIngredient(index: number){
        return this.ingredients[index];
    }

    addIngredient(ingredient: Ingredient)
    {
        this.ingredients.push(ingredient);
        this.ingredientChanged.next(this.ingredients.slice());
    }
    addIngredients(ingredients: Ingredient[]){
        this.ingredients.push(...ingredients);
    }
    updateIngredient(index: number, newIngrdient: Ingredient){
        this.ingredients[index] = newIngrdient;
        this.ingredientChanged.next(this.ingredients.slice());
    }
    deleteIngredient(index: number){
        this.ingredients = this.ingredients.slice(index, 1);
        this.ingredientChanged.next(this.ingredients.slice());
    }
}