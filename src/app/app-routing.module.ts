import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { CanActivateViaAuthGuard } from './guards/can-activate.guard';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipesFormComponent } from './components/recipes/recipes-form/recipes-form.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'log-in',
    pathMatch: 'full'
  },
  {
    path: 'log-in',
    component: LoginComponent
  },
  {
    path: 'sign-up',
    component: SignupComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [CanActivateViaAuthGuard],
    children: [
      {
        path: 'recipes',
        component: RecipesComponent,
        canActivate: [CanActivateViaAuthGuard]
      },
      {
        path: 'create-recipe',
        component: RecipesFormComponent,
        canActivate: [CanActivateViaAuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
