import { EventEmitter, Inject, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService{
    recipeChanged = new Subject<Recipe[]>();
    recipeSelected = new Subject<Recipe>();
    // private recipes: Recipe[]=[
    //     new Recipe("Recipe 1", 
    //                 "This is test recipe 1", 
    //                 "https://img.taste.com.au/mOx3fOxf/w720-h480-cfill-q80/taste/2022/09/garlic-chilli-prawn-pasta-181440-1.jpg",
    //                 [
    //                     new Ingredient('meat', 1),
    //                     new Ingredient('French Fries', 20)
    //                 ]),
    //     new Recipe("Recipe 2", 
    //                 "This is test recipe 2", 
    //                 "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg"
    //                 ,[
    //                     new Ingredient('meat', 1),
    //                     new Ingredient('Buns', 2)
    //                 ])
    //   ];
    private recipes:Recipe[] = [];

    constructor(private slService: ShoppingListService){}

    getrecipes(){
        return this.recipes.slice();
    }  

    getRecipe(id: number){
        return this.recipes[id];
    }

    addIngredientsToShoppingList(ingrdients: Ingredient[]){
        this.slService.addIngredients(ingrdients);
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe)
    {
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
    }
    
    deleteRecipe(index: number){
        this.recipes.splice(index,1);
        this.recipeChanged.next(this.recipes.slice());
    }

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes.slice());
    }
}