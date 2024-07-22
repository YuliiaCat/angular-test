import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PasswordStrengthComponent } from './password-strength/password-strength.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PasswordStrengthComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  newPassword: string = '';

  onPasswordChange(event: Event): void {
    this.newPassword = (event.target as HTMLInputElement).value;
  }
}
