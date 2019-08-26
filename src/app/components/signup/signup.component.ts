import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { Observable, concat } from 'rxjs';
import { SignupService } from '../../services/signup/signup.service';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [
    SignupService
  ]
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private signupService: SignupService,
    private notifierService: NotifierService, private router: Router) {
    this.createRegisterForm();
  }

  ngOnInit() {
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      names: ['', Validators.required],
      lastNames: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  registerUser() {
    let user = this.formValuesToUser();
    this.signupService.registerUser(user)
      .subscribe(result => {
        this.notifierService.notify('success', 'Registro exitoso.');
        this.router.navigateByUrl('/log-in');
      }, error => {
        this.notifierService.notify('error', 'Error en el registro, vuelva a intentarlo.');
        console.log(error);
      })

  }

  formValuesToUser(): User {
    let user = new User();
    user.email = this.registerForm.controls["email"].value;
    user.emailVerified = true;
    user.password = this.registerForm.controls["password"].value;
    user.realm = this.registerForm.controls["names"].value + ' ' + this.registerForm.controls["lastNames"].value;
    user.username = this.registerForm.controls["username"].value;
    return user;
  }

}
