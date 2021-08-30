import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';


@Injectable()
export class ReservationService {
  public url: string;


  constructor(
    private _http: HttpClient) {
    this.url = global.url;
  }

  save(reservation): Observable<any> {

    // convertir el objeto a un json string
    let params = JSON.stringify(reservation);
    // definir las cabeceras
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    // hacer peticion ajax
    return this._http.post(this.url + 'reservations/', params, { headers: headers });

  }

  getReservations(): Observable<any> {

    let headers = new HttpHeaders();
    return this._http.get(this.url + 'reservations/', { headers: headers });

  }

  deleteReservations(id): Observable<any> {

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.delete(this.url + 'reservations/' + id, { headers: headers });


  }

  
}
