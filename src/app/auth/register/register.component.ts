import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {
  error;
  constructor( public authService: AuthService) { }

  ngOnInit() {
  }

onSubmit( valor: any ) {

  console.log(valor);
  /* AQUI TENEMOS LA FUNCION EN MODO PROMESA PARA MANEJAR LOS DATOS DE ERROR DESDE AQUI
  this.authService.crearUsuario( valor.nombre, valor.email , valor.password).then().catch( err => {
    if ( err.message === 'Password should be at least 6 characters') {
        this.error = 'La contraseña necesita al menos 6 caracteres';
    } else if ( err.message === 'The email address is already in use by another account.') {
      this.error = 'Este email no se puede utilizar ';

    }
    console.log(err);
  });
Aqui abajo la ejecutamos controlando los errores desde el servicio con la libreria SweetAlert2
  */
  this.authService.crearUsuario( valor.nombre, valor.email , valor.password);
}

}
