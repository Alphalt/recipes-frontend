import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { RecipesService } from '../../../services/recipes/recipes.service';
import { Recipes } from '../../../models/recipes.model';

@Component({
  selector: 'app-recipes-form',
  templateUrl: './recipes-form.component.html',
  styleUrls: ['./recipes-form.component.css'],
  providers:[
    RecipesService
  ]
})
export class RecipesFormComponent implements OnInit {

  createRecipeForm: FormGroup;
  disableAddIngredient: boolean = true;
  arrayOfIngredients: Array<string> = new Array();
  showTableIngredients: boolean = false;

  constructor(private formBuilder: FormBuilder, private recipesService: RecipesService,
    private notifierService: NotifierService, private router: Router) {
    this.createFormRecipe();
  }

  ngOnInit() {
  }

  createFormRecipe() {
    this.createRecipeForm = this.formBuilder.group({
      name: ['', Validators.required],
      ingredients: ['', Validators.required],
      steps: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required]
    });
    this.formControlValueChanged();
  }

  formControlValueChanged() {
    this.createRecipeForm.get('ingredients').valueChanges.subscribe(
      (ingredient: string) => {
        if(ingredient !== ''){
          this.disableAddIngredient = false;
        }else{
          this.disableAddIngredient = true;
        }
      });
  }

  addIngredient(){
    this.arrayOfIngredients.push(this.createRecipeForm.controls['ingredients'].value);
    this.createRecipeForm.controls['ingredients'].setValue('');
    this.showTableIngredients = true;
  }

  deleteIngredient(ingredient: string){
    let index = this.arrayOfIngredients.indexOf(ingredient);
    if(index > -1){
      this.arrayOfIngredients.splice(index, 1);
    }
    this.validateArrayLength();
  }

  validateArrayLength(){
    if(this.arrayOfIngredients.length === 0){
      this.showTableIngredients = false;
    }
  }

  createRecipe(){
    let recipe = new Recipes();
    recipe.ingredients = this.arrayOfIngredients;
    recipe.name = this.createRecipeForm.controls['name'].value;
    recipe.steps = this.createRecipeForm.controls['steps'].value;
    recipe.place = {
      Latitude: this.createRecipeForm.controls['latitude'].value,
      Longitude: this.createRecipeForm.controls['longitude'].value
    }
    this.recipesService.createRecipe(recipe)
      .subscribe(result => {
        this.notifierService.notify('success', 'Se ha creado la receta exitosamente.');
        this.router.navigateByUrl('/home/recipes');
      }, error => {
        this.notifierService.notify('error', 'Error al crear la receta, vuelva a intentarlo.');
        console.log(error);        
      });
  }

}
