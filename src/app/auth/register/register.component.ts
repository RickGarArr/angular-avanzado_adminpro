import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {

  public formSubmitted = false;
  public registerForm: FormGroup;

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      password2: new FormControl('', [Validators.required]),
    }, {
      validators: this.passwordsIguales('password', 'password2')
    });
  }

  passwordsIguales(pass1Name: string, pass2Name: string) {
    return (formGrup: FormGroup) => {
      const pass1Control = formGrup.get(pass1Name);
      const pass2Control = formGrup.get(pass2Name);
      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({noEsIgual: true});
      }
    }
  }

  crearUsuario() {
    this.formSubmitted = true;

    this.registerForm.invalid ? 
      console.log('formulario invalido') : 
      this.usuarioService.crearUsuario(this.registerForm.value).subscribe( resp => {
        console.log(resp);
        this.router.navigateByUrl('/');
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  passwodsDiferentes() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if ((pass1 !== pass2) && this.formSubmitted) {
      return true;
    } {
      return false;
    }
  }

}
