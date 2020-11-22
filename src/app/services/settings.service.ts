import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linktheme = document.querySelector('#theme');
  private links;

  constructor() {
    const url = localStorage.getItem('theme') || './assets/css/colors/default-dark.css';
    this.linktheme.setAttribute('href', url);
  }

  changeTheme(theme: string) {
    if (!theme) {
      console.log('no theme');
      return;
    }
    const url = `./assets/css/colors/${theme}.css`;
    this.linktheme.setAttribute('href', url);
    localStorage.setItem('theme', url);
    this.checkedCurrentTheme(this.links);
  }

  checkedCurrentTheme(links: NodeListOf<Element>) {

    this.links = links;
    links.forEach(link => {

      link.classList.remove('working');
      const btnTheme = link.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linktheme.getAttribute('href');

      if (btnThemeUrl === currentTheme) {
        link.classList.add('working');
      }
    });
  }

}
