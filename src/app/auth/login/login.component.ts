import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  constructor( private auhtService: AuthService) { }

  ngOnInit() {
  }

  onSubmit( valor: any) {
    this.auhtService.login(valor.email, valor.password);
  }

}
