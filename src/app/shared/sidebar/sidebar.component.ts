import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent{

  menuItems: any[];

  constructor(private usuarioService: UsuarioService,
    private sidebarService: SidebarService) {
    this.menuItems = this.sidebarService.menu;
  }

  logout() {
    this.usuarioService.logout();
  }
}