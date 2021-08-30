import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend-veicor';


  constructor(private _router: Router){}

  ngOnInit() {

    // if (localStorage.getItem('identity')) {

    //   this._router.navigate(['inicio']);


    // } else {
    //   this._router.navigate(['login']);


    // }

    // console.log("pagina cargarda correctamente");
    // this.fun()

  }






}


