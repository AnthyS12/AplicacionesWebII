import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ReservationService } from 'src/app/services/reservation.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-reservaciones',
  templateUrl: './reservaciones.component.html',
  styleUrls: ['./reservaciones.component.css'],
  providers: [ReservationService]
})

export class ReservacionesComponent implements OnInit {
  public dataSource;
  public index;
  
  displayedColumns: string[] = ['cedula', 'nombre', 'correo', 'telefono', 'habitacion', 'fecha_entrada', 'accion'];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private reservationsService: ReservationService) { 
    this.dataSource = new MatTableDataSource();
  }
  ngOnInit(): void {
    this.getReservations();
  }

  getReservations(){
    this.reservationsService.getReservations().subscribe(
      resp => {
        // cedula, nombre, correo, telefono habatacion, fecha_entrada
       

        this.dataSource.data = resp.data;
        this.dataSource.paginator = this.paginator;
        // console.log(resp);
      }
    )
    
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
        this.deleteReservation(id);
      }
    })
  }
  deleteReservation(id){
    this.reservationsService.deleteReservations(id).subscribe(
      resp => {
          this.success();  
          this.getReservations();
            }
    )

  }
  
  success(){
    Swal.fire({
      icon: 'success',
      title: 'Reservación eliminada',
      showConfirmButton: false,
      timer: 900
    });
   }


}
