
import * as fromIngresoEgreso from './ingreso-egreso.actions';
import { IngresoEgreso } from './ingreso-egreso.model';

export interface IngresoEgresoState {
    items: IngresoEgreso[];
}

const estadoinicial: IngresoEgresoState = {
    items: []
};

export function ingresoEgresoReducer( state = estadoinicial, action: fromIngresoEgreso.acciones): IngresoEgresoState {
    switch ( action.type ) {
     case fromIngresoEgreso.SET_ITEMS:
     return state = {
        items: [
            ...action.items.map( item => {
                return {
                    ...item
                };
            })
        ]
    };
    case fromIngresoEgreso.UNSET_ITEMS:
        return state = {
            items: []
        };
    default:
        return state;
    }
  }
