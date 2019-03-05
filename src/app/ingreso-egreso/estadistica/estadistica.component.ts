import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {
 ingresos: number;
 egresos: number;
 ingresosCount: number;
 egresosCount: number;
 subscription: Subscription = new Subscription();
  constructor( private store: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('items')
    .subscribe( ingreEgre => {
      this.contarIngresoEgreso( ingreEgre.items);
    }
    );
  }
  contarIngresoEgreso( items: IngresoEgreso[]) {
    this.ingresos = 0;
    this.egresos = 0;
    this.egresosCount = 0;
    this.ingresosCount = 0;
     items.forEach( item => {
       if ( item.tipo === 'ingreso') {
        this.ingresosCount++;
        this.ingresos += item.monto;
      }  else {
          this.egresosCount++;
          this.egresos += item.monto;
        }
      });
  }
}
