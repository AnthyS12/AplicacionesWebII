import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';


@Injectable()
export class RoomService {
  public url: string;


  constructor(
    private _http: HttpClient) {
    this.url = global.url;
  }

  save(room): Observable<any> {

    // convertir el objeto a un json string
    let params = JSON.stringify(room);
    // definir las cabeceras
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    // hacer peticion ajax
    return this._http.post(this.url + 'rooms', params, { headers: headers });

  }

  getRooms(): Observable<any> {

    let headers = new HttpHeaders();
    return this._http.get(this.url + 'rooms/', { headers: headers });

  }

  getRoomById(id): Observable<any> {

    let headers = new HttpHeaders();
    return this._http.get(this.url + 'rooms/'+id, { headers: headers });

  }


  searchRooms(room): Observable<any> {
      // convertir el objeto a un json string
      let params = JSON.stringify(room);
      // definir las cabeceras
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
      // hacer peticion ajax
      return this._http.post(this.url + 'rooms-fechas/', params, { headers: headers });
  
    }

    updateRooms(room, id): Observable<any> {

      let params = JSON.stringify(room);
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this._http.put(this.url + 'rooms/' + id, params, { headers: headers });
  
  
  }


  deleteRooms(id): Observable<any> {

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.delete(this.url + 'rooms/' + id, { headers: headers });


  }

  deleteImg(link, id): Observable<any> {
    // convertir el objeto a un json string
    let params = JSON.stringify(link);
    // definir las cabeceras
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    // hacer peticion ajax
    return this._http.post(this.url + 'rooms/eliminar-img/'+id, params, { headers: headers });

  }


  

}
