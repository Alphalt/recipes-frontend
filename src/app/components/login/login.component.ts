import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';
import { User } from '../../models/user.model';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [
    LoginService
  ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService,
    private notifierService: NotifierService, private router: Router) {
    this.createLoginForm();
  }

  ngOnInit() {
    localStorage.setItem("ISLOGGEDIN", "false");
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    let user = this.formValuesToUser();
    this.loginService.login(user)
      .subscribe(result => {
        localStorage.setItem("ISLOGGEDIN", "true");
        this.notifierService.notify('success', 'Ingreso exitoso.');
        this.router.navigateByUrl('/home');
      }, error => {
        this.notifierService.notify('error', 'Error en el login, vuelva a intentarlo.');
        localStorage.setItem("ISLOGGEDIN", "false");
        console.log(error);
      });
  }

  formValuesToUser(): User {
    var user = new User();
    user.email = this.loginForm.controls["email"].value;
    user.password = this.loginForm.controls["password"].value;
    return user;
  }

}
