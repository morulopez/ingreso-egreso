import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {
  itenms: IngresoEgreso[];
  subscription: Subscription = new Subscription();
  constructor( private store: Store<AppState>, private ingresoEgresoService: IngresoEgresoService ) { }

  ngOnInit() {
    this.subscription = this.store.select('items').subscribe( item => {
    console.log(item.items);
    this.itenms = item.items;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  borrarItem(item: IngresoEgreso) {
    this.ingresoEgresoService.borrarIngresoEgreso( item.uid).then(() => Swal.fire('Eliminado', item.description, 'success') );
  }
}
