import { AuthenticationService } from './services/auth/authentication.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Islam-Assessment';
  constructor(private auth: AuthenticationService) {
  }

  /**
   * isUserLoggedIn
   * @returns boolean
   */
  isUserLoggedIn(): boolean {
    return !!this.auth.getToken() && this.auth.getToken() != "null";
  }

}
