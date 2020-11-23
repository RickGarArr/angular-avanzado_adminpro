import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SidebarService {

    menu: any[] =[
        {
            titulo: 'Dashboard',
            icono: 'mdi mdi-gauge',
            submenu: [
                { titulo: 'principal', url: '/' },
                { titulo: 'progressBar', url: 'progress' },
                { titulo: 'Graficas', url: 'grafica1' },
                { titulo: 'Promesas', url: 'promesas' },
                { titulo: 'RXJS', url: 'rxjs' }
            ]
        }
    ];

    constructor() {}
}