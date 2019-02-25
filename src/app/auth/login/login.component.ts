import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppModule } from 'src/app/app.module';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {
  cargando: Boolean;
  subscription: Subscription;
  constructor( private auhtService: AuthService, private store: Store<AppModule>) { }

  ngOnInit() {
    this.subscription = this.store.select('ui').subscribe( ui => {
      this.cargando = ui.isLoading;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit( valor: any) {
    this.auhtService.login(valor.email, valor.password);
  }

}
