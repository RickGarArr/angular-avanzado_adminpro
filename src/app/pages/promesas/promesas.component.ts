import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
    this.getUsuarios().then( usuarios => console.log(usuarios))
    //   const promesa = new Promise((resolve, reject) => {
    //     if (false) {
    //       resolve('hola mundo');
    //     } else {
    //       reject('Algo Salió Mal');
    //     }
    //   });
  
    //   promesa.then( resp => console.log(resp))
    //   .catch( err => console.log(err));
    //   console.log('fin del init');
  }

  getUsuarios() {
    return new Promise((resolve, reject) => {
      fetch('https://reqres.in/api/users?page=1')
        .then((resp) => resp.json())
        .then(body => resolve(body.data))
    });
  }

}
