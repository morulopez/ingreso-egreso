import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';
import { Subscription } from 'rxjs';
import { SetUserAction } from './register/auth.actions';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubscription: Subscription = new Subscription();
  public  usuario: User;
  constructor( private afAuth: AngularFireAuth, private router: Router, private afDB: AngularFirestore, private store: Store<AppState>) {}

  initAuthListener() {
    this.afAuth.authState.subscribe( (fbUser: firebase.User) => {
      if ( fbUser) {
        this.userSubscription = this.afDB.doc(`${fbUser.uid}/usuario`).valueChanges()
         .subscribe( (usuarioOBJ: any) => {
          const newUser = new User(usuarioOBJ);
          this.usuario = newUser;
         this.store.dispatch( new SetUserAction( newUser));
      });

    } else {
      this.usuario = null;
      this.userSubscription.unsubscribe();

     }
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

    this.store.dispatch(new ActivarLoadingAction());
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
      this.store.dispatch(new DesactivarLoadingAction());
      })
      .catch( error => {
        this.store.dispatch(new DesactivarLoadingAction());
        console.error(error);
        Swal.fire('Error en el login', 'la contraseña es mínimo 6 caracteres o el email existe', 'error');
      });
  }
  login( email: string, password: string) {
    this.store.dispatch(new ActivarLoadingAction());
      this.afAuth.auth.signInWithEmailAndPassword( email, password)
      .then( resp => {
        this.store.dispatch(new DesactivarLoadingAction());
        /*console.log( resp );*/
       this.router.navigate(['/']);
      })
      .catch( error => {
        this.store.dispatch(new DesactivarLoadingAction());
        console.error(error);
        Swal.fire('Error en el login', 'la contraseña o el email no son correctos', 'error');
       });
  }
  logout() {
    this.afAuth.auth.signOut().then( () => {
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
  getUsuario() {
    return {...this.usuario};
  }
}
