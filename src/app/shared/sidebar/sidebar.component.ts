import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(private auhtService: AuthService) { }

  ngOnInit() {
  }
  logout() {
    this.auhtService.logout();
  }

}