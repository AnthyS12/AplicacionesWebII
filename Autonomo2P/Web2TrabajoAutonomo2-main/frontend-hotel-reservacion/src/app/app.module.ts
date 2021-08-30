import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing, appRoutingProviders  } from './app.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { PagesComponent } from './pages/pages.component';
import { AdministrarComponent } from './components/administrar/administrar.component';
import { LoginComponent } from './components/login/login.component';
import { ReservacionesComponent } from './components/reservaciones/reservaciones.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const firebaseConfig = {
  apiKey: "AIzaSyBPqlvqCUmx_2TWTeiEwwNgynhIx2n7Vbk",
  authDomain: "hotel-reservaciones.firebaseapp.com",
  projectId: "hotel-reservaciones",
  storageBucket: "hotel-reservaciones.appspot.com",
  messagingSenderId: "13431231191",
  appId: "1:13431231191:web:85b9906aa95f7b23aa5692"
};



@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    PagesComponent,
    AdministrarComponent,
    LoginComponent,
    ReservacionesComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireStorageModule,

  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
