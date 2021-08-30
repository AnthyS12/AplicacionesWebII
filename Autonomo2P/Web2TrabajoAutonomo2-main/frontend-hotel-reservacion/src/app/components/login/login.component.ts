import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/Models/auth';
import Swal from 'sweetalert2'
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  public usuario: Auth;
  public identity;
  public token;
  public status: string;


  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) {

    this.usuario = new Auth(null, null);
  }

  ngOnInit(): void {
  }


  onSubmit(form){
    if(this.usuario.correo && this.usuario.clave){


    this._authService.login(this.usuario).subscribe(

      resp => {
        if (resp && resp.data != '') {

          this._authService.login(this.usuario, true).subscribe(
            response => {
              if (response && response.data != 'Credenciales no correctas') {    
                localStorage.setItem('token', response.token);
                 this._router.navigate(['inicio']);
              }else {
                this.error(response.data)

              }

            },
            error => {
              console.log(error);

            })
          }else{
            console.log(resp);
            this.error('usuario no existe')

        }

      },
      err => {
        this.error(err.error.message)
      }




    );
  } else {

    this.validacion();
  }


  }

  success(){
    Swal.fire({
      icon: 'success',
      title: 'Registro completo',
      showConfirmButton: false,
      timer: 900
    });
   }

   error(mensaje){
    Swal.fire({
      icon: 'error',
      title: 'A ocurrido algo inesperado',
      text: mensaje,
      showConfirmButton: true
    });
   }

   validacion(){
    Swal.fire({
      icon: 'info',
      title: 'Validación incorrecta',
      text: 'Ingrese todos los datos',
      showConfirmButton: true
    });
   }

}
