import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor( private afAuth: AngularFireAuth, private router: Router, private afDB: AngularFirestore) {}

  initAuthListener() {
    this.afAuth.authState.subscribe( (fbUser: firebase.User) => {
      console.log(fbUser);
    });
  }

  /*  Aqui tenemos esta funcion transformada en promesa para manejar los errores desde el componente

  crearUsuario( nombre: string, email: string, password: string): Promise<any> {
    return new Promise((res, rej) => {
      this.afAuth.auth.createUserWithEmailAndPassword( email, password)
      .then( resp => {
        console.log(resp);
        res(
          this.router.navigate(['/'])
        );
      })
      .catch( error => {
        rej(
          error
        );
      });
    });
  }*/

  /* Aqui tenemos una funcion normal para manejar los errores con la libreria sweetalert2*/
  crearUsuario( nombre: string, email: string, password: string) {
      this.afAuth.auth.createUserWithEmailAndPassword( email, password)
      .then( resp => {
        const user: User = {
          uid: resp.user.uid,
          nombre: nombre,
          email: resp.user.email,
        };
        this.afDB.doc(`${user.uid}/usuario`)
       .set( user )
       .then(() => {
       this.router.navigate(['/']);
      });
      })
      .catch( error => {
        console.error(error);
        Swal.fire('Error en el login', 'la contraseña es mínimo 6 caracteres o el email existe', 'error');
      });
  }
  login( email: string, password: string) {
      this.afAuth.auth.signInWithEmailAndPassword( email, password)
      .then( resp => {
        /*console.log( resp );*/
       this.router.navigate(['/']);
      })
      .catch( error => {
        console.error(error);
        Swal.fire('Error en el login', 'la contraseña o el email no son correctos', 'error');
       });
  }
  logout() {
    this.afAuth.auth.signOut().then( resp => {
      /*console.log('promesa resuelta');*/
      this.router.navigate(['/login']);
    }).catch( err => {
      console.error(err);
    });
  }
  isAuth() {
    return this.afAuth.authState.pipe(

      map(fbUser => {

      if ( fbUser === null) {
        this.router.navigate(['/login']);
       }
       return fbUser != null;
      }

   ));
  }
}
