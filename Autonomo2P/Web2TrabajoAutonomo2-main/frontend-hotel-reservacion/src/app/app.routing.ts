// imports necesarios
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministrarComponent } from './components/administrar/administrar.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { ReservacionesComponent } from './components/reservaciones/reservaciones.component';





// importar componentes
import { PagesComponent } from './pages/pages.component';






// definir las rutas
const appRoutes: Routes = [
  // { path: '', component: InicioComponent },
  {
    path: '',
    component: PagesComponent,
    children:
      [

        {path: '', component: InicioComponent},
        { path: 'inicio', component: InicioComponent },
        
        { path: 'reservaciones', component: ReservacionesComponent},

        { path: 'habitacion', component: AdministrarComponent },
        { path: 'habitacion/:id', component: AdministrarComponent },




      ]
  },

  { path: 'login', component: LoginComponent },

  { path: '**', component: InicioComponent },

];

// exportar configuracion
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);




