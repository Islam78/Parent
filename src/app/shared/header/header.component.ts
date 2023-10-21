import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {

  constructor(private auth: AuthenticationService) { }

  /**
   * logout
   * @return void
   */
  logout(): void {
    this.auth.logout();
  }

}
