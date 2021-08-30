import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from '../Models/auth';
import { global } from './global';
import { delay } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthService {
    public user$: Observable<any>;

    public url: string;
    public identidad;
    public token;

    constructor(
        private _http: HttpClient) {
        this.url = global.url;



    }


    login(usuario, gettoken = null): Observable<any> {
        // comprobar si llega el gettoken
        if (gettoken != null) {
            usuario.gettoken = gettoken;
        }
        let params = JSON.stringify(usuario);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'auth', params, { headers: headers });

    }
   
    getIdentity() {
        let identidad = JSON.parse(localStorage.getItem('identity'));

        if (identidad && identidad != null && identidad != undefined && identidad != "undefined") {
            this.identidad = identidad;

        } else {
            this.identidad = null;
        }
        return this.identidad;

    }
    getToken() {
        let token = localStorage.getItem('token');

        if (token && token != null && token != undefined && token != "undefined") {
            this.token = token;

        } else {
            this.token = null;
        }
        return this.token;


    }


    }
