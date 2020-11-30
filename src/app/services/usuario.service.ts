import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Login, RegisterForm } from '../interfaces/register-form';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
const base_url = environment.base_url;

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    
    constructor (private router: Router,
        private http: HttpClient) {}

    logout() {
        localStorage.removeItem('token');
        this.router.navigateByUrl('/login');
    }

    validarToken(): Observable<boolean> {
        const jwt = localStorage.getItem('token') || '';

        console.log(jwt);
        
        return this.http.get(`${base_url}/login/renew`, {
            headers: {
                'x-token': jwt
            }
        }).pipe(
            tap( (resp: any) => {
                localStorage.setItem('token', resp.jwt);
            }),
            map( resp => true),
            catchError(error => of(false))
        );
    }
    
    crearUsuario( formData: RegisterForm ) {
        return this.http.post(`${base_url}/usuarios/create`, formData).
        pipe(
            tap(
                (resp: any) => { console.log(resp);
                    localStorage.setItem('token', resp.jwt)
            })
        );
    }

    login( formData: Login ) {
        return this.http.post(`${base_url}/login/usuario`, formData).
        pipe(
            tap(
                (resp: any) => { console.log(resp);
                    localStorage.setItem('token', resp.jwt)
            })
        );
    }

    loginGoogle( token: string ) {
        return this.http.post(`${base_url}/login/google`, token).
        pipe(
            tap(
                (resp: any) => { console.log(resp);
                    localStorage.setItem('token', resp.jwt)
            })
        )
    }
}

/*
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmJmM2Q3Zjk5MWY3ZjJkMjBiOGNlZGMiLCJpYXQiOjE2MDYzNjg2MzksImV4cCI6MTYwNjQxMTgzOX0.ZaGUmk8MsVhcv0l3lCi0xRzD3RYnBs4d0RmstVZRzj8
*/