import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { Recipes } from '../../models/recipes.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  apiUrl: string = environment.apiUrl;
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true'
    });
  }

  getRecipes(): Observable<any>{
    return this.http.get(this.apiUrl + "recipes", {headers: this.headers});
  }

  deleteRecipes(recipeId: string): Observable<any>{
    return this.http.delete(this.apiUrl + "recipes/" + recipeId, {headers: this.headers});
  }

  createRecipe(recipe: Recipes): Observable<any>{
    return this.http.post(this.apiUrl + 'recipes', JSON.stringify(recipe), {headers: this.headers});
  }
}
