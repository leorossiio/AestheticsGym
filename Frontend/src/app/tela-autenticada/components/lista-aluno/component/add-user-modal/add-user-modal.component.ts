import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.css']
})
export class AddUserModalComponent {
  signupForm: FormGroup;
  showConfirmationMessage: boolean = false;

  constructor(private router: Router) {
    this.signupForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      passwordConfirmation: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      role: new FormControl('', Validators.required) // Adicionando o FormControl para a função
    }, { validators: this.passwordMatchValidator });
  }

  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log("Novo usuário cadastrado com sucesso!");
      console.log(this.signupForm.value);

      this.showConfirmationMessage = true;

      setTimeout(() => {
        this.router.navigate(["/"]);
      }, 3000);
    }
  }

  resetForm() {
    this.signupForm.reset();
    this.signupForm.get('role')?.setValue(''); 
    this.showConfirmationMessage = false; 
  }

  // Função para validar se os campos de senha e confirmação de senha são iguais
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('passwordConfirmation')?.value;

    if (password !== confirmPassword) {
      if (control.get('passwordConfirmation')) {
        control.get('passwordConfirmation')?.setErrors({ passwordMismatch: true });
      }
      return { passwordMismatch: true };
    } else {
      return null;
    }
  }
}
