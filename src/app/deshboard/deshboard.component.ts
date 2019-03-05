import { Component, OnInit } from '@angular/core';
import { IngresoEgresoService } from '../ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-deshboard',
  templateUrl: './deshboard.component.html',
  styles: []
})
export class DeshboardComponent implements OnInit {

  constructor( public ingresoEgresoService: IngresoEgresoService ) { }

  ngOnInit() {
    this.ingresoEgresoService.initIngresoEgresoListener();
  }

}
