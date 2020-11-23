import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  public titulo = '';
  public tituloSubs$: Subscription;

  constructor( private router: Router ) {
    this.tituloSubs$ = this.getParams()
    .subscribe(({titulo}) => {
      this.titulo = titulo;
      document.title = `AdminPro - ${this.titulo}`
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.tituloSubs$.unsubscribe();
  }

  getParams() {
    return this.router.events
    .pipe(
      filter( event => event instanceof ActivationEnd ),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null),
      map( (event: ActivationEnd) => event.snapshot.data),
    )
  }

}
