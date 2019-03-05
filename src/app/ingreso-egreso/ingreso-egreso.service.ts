import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { IngresoEgreso } from './ingreso-egreso.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, map } from 'rxjs/operators';
import { SetItemsAction } from './ingreso-egreso.actions';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor( private afDB: AngularFirestore, public authService: AuthService, private store: Store<AppState>) { }

  initIngresoEgresoListener() {
    this.store.select('auth')
    .pipe(
      filter( auth => auth.user != null)
    )
   .subscribe( auth => {
    console.log( auth.user.uid);
    this.ingresoEgresoItems( auth.user.uid);
   });
  }
  crearIngresoEgreso( ingresoEgreso: IngresoEgreso) {
    const user = this.authService.getUsuario();
   return this.afDB.doc(`${user.uid}/ingresos-egresos`)
   .collection('items').add({...ingresoEgreso});
  }

  private ingresoEgresoItems( uid: string ) {
    this.afDB.collection(`${uid}/ingresos-egresos/items`).snapshotChanges()
    .pipe(
      map(
        docData => {
          return docData.map(doc => {
            return {
              ...doc.payload.doc.data(),
              uid: doc.payload.doc.id
            };
          });
        }
      )
    )
    .subscribe( (docData: any[]) => {
      this.store.dispatch( new SetItemsAction( docData ));
    });
  }

  borrarIngresoEgreso( uid: string) {
    const user = this.authService.getUsuario();
    return this.afDB.doc(`${user.uid}/ingresos-egresos/items/${uid}`)
    .delete();
  }
}
