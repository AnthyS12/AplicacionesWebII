import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
  providers: [AuthService]
})
export class PagesComponent implements OnInit {
  public token;

  constructor(
    private _router: Router,
    private _authService: AuthService
    ) {

      this.token = this._authService.getToken();
    }

  ngOnInit(): void {
  }


  verCarrito() {


  }

  cerrarSesion(){

    localStorage.removeItem('token');
    this._router.navigate(['login']);


  }

}
