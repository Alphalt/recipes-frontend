import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from  '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NotifierModule } from 'angular-notifier';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { CanActivateViaAuthGuard } from './guards/can-activate.guard';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipesFormComponent } from './components/recipes/recipes-form/recipes-form.component';
import { RecipesDetailsComponent } from './components/recipes/recipes-details/recipes-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    RecipesComponent,
    RecipesFormComponent,
    RecipesDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NotifierModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDMefTtXlIPQhndEISd7rl-nwT7sK_avCg'
    })
  ],
  providers: [CanActivateViaAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
