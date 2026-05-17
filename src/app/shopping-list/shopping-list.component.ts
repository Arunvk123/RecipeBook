import { Component } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs-compat';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
  ingredients: Ingredient[] = [];
  private IngChanged: Subscription;
  constructor(private shoppingListService: ShoppingListService){}

  ngOnInit(){
    this.ingredients = this.shoppingListService.getIngrdients();
    this.IngChanged = this.shoppingListService.ingredientChanged
        .subscribe(
          (ingredients: Ingredient[]) => {
            this.ingredients = ingredients;
          }
        )
  }

  onEditItem(index: number){
    this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy(): void{
    this.IngChanged.unsubscribe();
  }
}
