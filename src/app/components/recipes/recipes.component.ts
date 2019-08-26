import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../services/recipes/recipes.service';
import { NotifierService } from 'angular-notifier';
import { Recipes } from '../../models/recipes.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers:[
    RecipesService
  ]
})
export class RecipesComponent implements OnInit {

  recipes:any;
  lat: number = 4.60;
  lng: number = -74.08;
  recipeDetail: Recipes;
  showRecipeDetails: boolean = false;
  showMap: boolean = true;

  constructor(private recipesService:RecipesService, private notifierService: NotifierService) { }

  ngOnInit() {
    this.getRecipes();
  }

  getRecipes(){
    this.recipesService.getRecipes()
      .subscribe(result =>{
        this.recipes = result;
      }, error =>{
        console.log(error);
        this.notifierService.notify('error', 'Error al consultar las recetas.');
      })
  }

  recipeDetails(recipe: Recipes){
    this.recipeDetail = recipe;
    this.showRecipeDetails = true;
    this.showMap = false;
  }

  showMapAfterShowDetails(event){
    this.showMap = event.showMap;
    this.showRecipeDetails = event.showDetails;
    this.getRecipes();
  }

}
