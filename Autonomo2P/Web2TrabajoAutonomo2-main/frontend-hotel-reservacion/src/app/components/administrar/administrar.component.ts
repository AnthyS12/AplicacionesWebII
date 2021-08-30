import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Room } from 'src/app/Models/room';
import { RoomService } from 'src/app/services/room.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-administrar',
  templateUrl: './administrar.component.html',
  styleUrls: ['./administrar.component.css'],
  providers: [RoomService]
})
export class AdministrarComponent implements OnInit {

  public room;
  public img = 'https://skillz4kidzmartialarts.com/wp-content/uploads/2017/04/default-image-620x600.jpg';
  public action = false;
  public id;
  public uploadPercent: Observable<number>;
  public urlImage: Observable<string>;
  public arrayImg: string[] = [];
  public cargaCompleta;
  constructor(private roomService: RoomService,
    private _activateRoute: ActivatedRoute,
    private _router: Router,
    private storage: AngularFireStorage
  ) {

    this.room = new Room(null, null, null, null, null, 'estado', null);

  }

  ngOnInit(): void {
    this._activateRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {

        this.getRoom(id)
        this.action = true;
        this.id = id;
      }

    })

  }

  // falta imagen
  onSubmit(form) {
    if (this.action) {
      this.updateRoom();
    } else {
      this.save(form)
    }
    
  }
  save(form) {
    if (this.arrayImg.length <= 0) {
      this.room.imagen = this.img;
    } else {
      this.room.imagen = this.arrayImg;
    }
    this.roomService.save(this.room).subscribe(
      resp => {
        this.success();
        form.reset();
        this.room.imagen = []
        
      }, err => {
        this.error()
      })
  }

  updateRoom() {
    let arrayImg = [];
    
    const imagenesLocal = localStorage.getItem('imagenes');
    // imagenesNuevas.push(JSON.parse(imagenesLocal));
    // console.log(this.arrayImg);
    JSON.parse(imagenesLocal).forEach(element => {
      this.arrayImg.push(element)
      
    });
    // console.log(this.arrayImg);
    // this.room.imagen = arrayImg;
    // imagenesNuevas.push(this.arrayImg)
    // this.room.imagen = imagenesNuevas;
    this.room.imagen = this.arrayImg;

    this.roomService.updateRooms(this.room, this.id).subscribe(
      resp => {
        // console.log(resp);
        this.success();
      }, err => {
        this.error()
      })
  }
  getRoom(id) {

    this.roomService.getRoomById(id).subscribe(
      resp => {

        this.room = resp.data
        localStorage.setItem('imagenes',JSON.stringify(this.room.imagen));
      }
    )
  }

  // onUpload(e) {
  //   const id = Math.random().toString(36).substring(2);
  //   const file = e.target.files[0];
  //   const filePath = `uploads/profile_${id}`;
  //   const ref = this.storage.ref(filePath);
  //   const task = this.storage.upload(filePath, file);
  //   this.uploadPercent = task.percentageChanges();
  //   // task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
  //   task.snapshotChanges().pipe(
  //   finalize(() => {
  //     ref.getDownloadURL().subscribe(url => {
  //       console.log(url); // <-- do what ever you want with the url..
  //       this.room.imagen = url;
  //       this.imgReady()
  //     });
  //   })
  // ).subscribe();
  // }
  onUpload(e) {
    this.cargaCompleta = true;
    let contador = 1;
    for (const imagen of e.target.files) {

        const id = Math.random().toString(36).substring(2);
        const file = imagen;
        const filePath = `uploads/room_${id}`;
        const ref = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, file);
        this.uploadPercent = task.percentageChanges();
        // task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
        task.snapshotChanges().pipe(
          finalize(() => {
            ref.getDownloadURL().subscribe(url => {
              // console.log(url); // <-- do what ever you want with the url..
              this.arrayImg.push(url);
              if (contador >= e.target.files.length) {
                this.cargaCompleta = false;
                this.imgReady()
                
              }
              contador++;
            });
            // this.imgReady()

          }
          )
        ).subscribe();
     

    }
  }
  eliminar(link, id){
    const data = {link: link}

    // console.log(data);

    this.roomService.deleteImg(data, id).subscribe(
      resp =>{
          // console.log(resp);
        this.getRoom(id);
      }
    )
  }

  success() {
    Swal.fire({
      icon: 'success',
      title: 'Registro completo',
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

  imgReady() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: 'Imagenes listas'
    })
  }

}
