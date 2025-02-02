import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public auth2: any;

  constructor( 
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private router: Router ) {
      this.loginForm = this.formBuilder.group({
        email: new FormControl(localStorage.getItem('email') || '', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        recordar: new FormControl(false, [Validators.required])
      });
    }
  ngOnInit(): void {
    this.renderButton();
  }

  login() {  
    this.usuarioService.login(this.loginForm.value).subscribe( resp => {
      if (this.loginForm.get('recordar').value) {
        localStorage.setItem('email', this.loginForm.get('email').value);
      } else {
        localStorage.removeItem('email');
      }
      this.router.navigateByUrl('/');
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error');
    });

  }



  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });
    this.startApp();
  }

  startApp() {
    gapi.load('auth2',() => {
      this.auth2 = gapi.auth2.init({
        client_id: '489497265262-9d2t45fdldg9nei8td3jf4nqevb14qgu.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
      });
      this.attachSignin(document.getElementById('my-signin2'));
    });
  }; 

  attachSignin(element){
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        const id_token = googleUser.getAuthResponse().id_token;
        this.usuarioService.loginGoogle(id_token).subscribe();

        // TODO: mover al dashboard
        
      }, function (error) {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

}
