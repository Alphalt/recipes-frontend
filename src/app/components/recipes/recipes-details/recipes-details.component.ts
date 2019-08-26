import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Recipes } from '../../../models/recipes.model';
import { RecipesService } from '../../../services/recipes/recipes.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-recipes-details',
  templateUrl: './recipes-details.component.html',
  styleUrls: ['./recipes-details.component.css'],
  providers:[
    RecipesService
  ]
})
export class RecipesDetailsComponent implements OnInit {

  @Input() recipe: Recipes;
  @Output() return = new EventEmitter();

  constructor(private recipeService: RecipesService, private notifierService: NotifierService) { }

  ngOnInit() {
  }

  returnToMap(){
    this.return.emit({showMap: true, showDetails: false});
  }

  deleteRecipe(recipeId: string){
    this.recipeService.deleteRecipes(recipeId)
      .subscribe(result => {
        this.return.emit({showMap: true, showDetails: false});
        this.notifierService.notify('success', 'Se ha eliminado la receta correctamente.');
      }, error => {
        console.log(error);
        this.notifierService.notify('error', 'Error al eliminar la receta.');
      })
  }

}
