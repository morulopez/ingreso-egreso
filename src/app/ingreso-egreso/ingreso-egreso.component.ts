import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';
@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  forma: FormGroup;
  tipo = 'ingreso';
  loadingSubs: Subscription = new Subscription();
  cargando: boolean;
  constructor( private ingresoEgresoService: IngresoEgresoService, private store: Store<AppState>) { }

  ngOnInit() {
    this.forma = new FormGroup({
      'description' : new FormControl('', Validators.required),
       'monto': new FormControl(0, Validators.min(0))
    });
    this.loadingSubs = this.store.select('ui').subscribe( ui => this.cargando = ui.isLoading);

  }

ngOnDestroy() {
  this.loadingSubs.unsubscribe();
 }
  crearingresoEgreso() {
    this.store.dispatch( new ActivarLoadingAction());
    const ingresoEgreso = new IngresoEgreso({ ...this.forma.value, tipo: this.tipo});
    this.ingresoEgresoService.crearIngresoEgreso( ingresoEgreso)
    .then( () => {
      this.store.dispatch( new DesactivarLoadingAction());
      Swal.fire('Creado', ingresoEgreso.description, 'success');
      this.forma.reset({
        monto: 0
      });
    });
  }

}
