import { ActionReducerMap } from '@ngrx/store';

import * as fromUI from './shared/ui.reducer';

import * as fromAuth from './auth/register/auth.reducer';

import * as fromItems from './ingreso-egreso/ingreso-egreso.reducer';


export interface AppState {
    ui: fromUI.State;
    auth: fromAuth.AuthState;
    items: fromItems.IngresoEgresoState;
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: fromUI.uiReducer,
    auth: fromAuth.AuthReducer,
    items: fromItems.ingresoEgresoReducer
};
