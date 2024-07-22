import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PasswordStrength } from '../types/password-strength';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password-strength',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.scss']
})
export class PasswordStrengthComponent implements OnChanges {
  @Input() password: string = '';

  strengthClass: string[] = ['is-light', 'is-light', 'is-light'];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['password']) {
      this.updateStrength(changes['password'].currentValue);
    }
  }

  updateStrength(password: string): void {
    if (!password) {
      this.strengthClass = ['is-light', 'is-light', 'is-light'];
    } else if (password.length < 8) {
      this.strengthClass = ['is-danger', 'is-danger', 'is-danger'];
    } else {
      const strength: PasswordStrength = this.calculateStrength(password);
      this.strengthClass = this.getStrengthClasses(strength);
    }
  }

  calculateStrength(password: string): PasswordStrength {
    const hasLetters = /[A-Za-z]/.test(password);
    const hasDigits = /\d/.test(password);
    const hasSymbols = /[^A-Za-z0-9]/.test(password);

    const strengthKey = `${hasLetters}-${hasDigits}-${hasSymbols}`;

    switch (strengthKey) {
      case 'true-true-true':
        return 'strong';
      case 'true-true-false':
      case 'true-false-true':
      case 'false-true-true':
        return 'medium';
      default:
        return 'easy';
    }
  }

  getStrengthClasses(strength: PasswordStrength): string[] {
    switch (strength) {
      case 'strong':
        return ['is-success', 'is-success', 'is-success'];
      case 'medium':
        return ['is-warning', 'is-warning', 'is-light'];
      case 'easy':
      default:
        return ['is-danger', 'is-light', 'is-light'];
    }
  }

}
