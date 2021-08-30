import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { ReservationService } from 'src/app/services/reservation.service';
import { AuthService } from 'src/app/services/auth.service';
import * as Mapboxgl from 'mapbox-gl';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [RoomService, ReservationService, AuthService]
})
export class InicioComponent implements OnInit {
  public rooms;
  public fecha_actual;
  public fecha_entrada;
  public token;
  public mapa: Mapboxgl.Map

  constructor(private roomService: RoomService, private reservationService: ReservationService, private _authService: AuthService) { 
    this.token = this._authService.getToken();

    this.fecha_actual = moment().format('YYYY-MM-DD');
    this.fecha_entrada = this.fecha_actual;

  }

  ngOnInit(): void {
   // this.getRooms()
   Mapboxgl.accessToken = 'pk.eyJ1Ijoia21lcm8iLCJhIjoiY2tzcGJwaHFpMDFpYjJwbzVubm1hZDNpaiJ9.n1yl3AJ-jNs76is6FmWfbQ';
   this.mapa = new Mapboxgl.Map({
   container: 'editor', // container ID
   style: 'mapbox://styles/mapbox/streets-v11', // style URL
   center: [-80.639146, -0.9454074], // starting position
   
   zoom: 18.04 // starting zoom
   });
    
   // Add zoom and rotation controls to the map.
   this.mapa.addControl(new Mapboxgl.NavigationControl());
   this.crearMarcador(-80.639146, -0.9454074)
  }

  crearMarcador(lng, lat){
    const marker = new Mapboxgl.Marker({
      draggable: true
    }).setLngLat([lng, lat]).addTo(this.mapa);
  }

  deleteAlert(id){
    Swal.fire({
      title: '¿Seguro que quiere eliminar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {       
        this.deleteRoom(id);
      }
    })
  }

  deleteRoom(id){
    this.roomService.deleteRooms(id).subscribe(
      resp => {
        this.searchRooms();
        this.success('Registro eliminado')
        
      },
      err => {
        this.error()
      }
    )
  }
  reservation(params){
    const {cedula, nombre, correo, telefono, habitacion, fecha_entrada} = params;
    if (cedula !='' && nombre !='' && correo !='' && telefono !='' && habitacion !='' && fecha_entrada) {
      
      // console.log(params);
      this.reservationService.save(params).subscribe(
        resp => {
          this.searchRooms();
          this.success('Reservación correcta')
        }, 
        err => {
          this.error()
        }
        )
      } else {
        this.validacion();
      }

  }

async  getDataReservation(habitacionId){
  const { value: formValues } = await Swal.fire({
    title: 'Ingrese sus datos para la reservación',
    confirmButtonText: 'Reservar',
    html:
      `<div class="container">
      <form class>
      <div class="form-group">
      <input id="cedula" class="form-control" type="text" placeholder="Ingrese su cédula">
      </div>
      <div class="form-group">
      <input id="nombre" class="form-control" type="text" placeholder="Ingrese su nombre">
      </div>
      <div class="form-group">
      <input id="correo" class="form-control" type="email" placeholder="Ingrese su correo">
      </div>
      <div class="form-group">
      <input id="telefono" class="form-control" type="text" placeholder="Ingrese su numero de telefono">
      </div>
      </form> 
      </div>`,
    focusConfirm: false,
    preConfirm: () => {

    return [
      (<HTMLInputElement>document.getElementById('cedula')).value,
       (<HTMLInputElement>document.getElementById('nombre')).value,
       (<HTMLInputElement>document.getElementById('correo')).value,
       (<HTMLInputElement>document.getElementById('telefono')).value,
    ]    
   }
  })
  if (formValues) {
    const params = {cedula: formValues[0], nombre: formValues[1], correo: formValues[2], telefono: formValues[3], habitacion: habitacionId, fecha_entrada: this.fecha_entrada }
    this.reservation(params)
  }
 
  }

 
 

  searchRooms(){
    const params = {fecha_entrada: this.fecha_entrada};
    this.roomService.searchRooms(params).subscribe(
      resp => {
        // console.log(resp);
        this.rooms = resp.data;      

      }
    )

  }

  success(text) {
    Swal.fire({
      icon: 'success',
      title: text,
      showConfirmButton: false,
      timer: 900
    });
  }

  error() {
    Swal.fire({
      icon: 'error',
      title: 'A ocurrido algo inesperado',
      text: 'Port favor intente de nuevo',
      showConfirmButton: true
    });
  }

  validacion() {
    Swal.fire({
      icon: 'error',
      title: 'Aegurese de llenar todos los campos',
      showConfirmButton: true
    });
  }

}
