import {Injectable} from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, tap, take } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class DataStorageService{
    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }
    storeRecipes() {
        const recipes = this.recipeService.getrecipes();
        this.http.put('https://recipelist-3460b-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(
            response => {
                console.log(response);
            }
        );
    }

    fetchRecipes(){
        return this.http.get<Recipe[]>('https://recipelist-3460b-default-rtdb.firebaseio.com/recipes.json',
                ).pipe(
            map(recipes => {
                return recipes.map(recipe => {
                    return {...recipe,
                            ingrdients: recipe.ingredients? recipe.ingredients : []
                    }
                });
            }),
            tap(recipes => {
                this.recipeService.setRecipes(recipes);
            })
        );
    }
}