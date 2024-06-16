import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/usuario.service';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {

  signupForm: FormGroup;
  showConfirmationMessage: boolean = false;
  showErrorMessage: boolean = false;
  isFormSubmitted: boolean = false; // Adicione a propriedade isFormSubmitted e inicialize como false

  constructor(private router: Router, private userService: UserService) {
    this.signupForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      passwordConfirmation: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
    }, { validators: this.passwordMatchValidator });
  }

  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  cadastrar() {
    if (this.signupForm.valid) {
      const userData = {
        nome: this.signupForm.get('name')?.value,
        email: this.signupForm.get('email')?.value,
        senha: this.signupForm.get('password')?.value,
        confirmacaoSenha: this.signupForm.get('passwordConfirmation')?.value
      };

      this.userService.cadastroNaoAutenticado(userData)
        .subscribe(
          (response: any) => {
            console.log("Novo usuário cadastrado com sucesso!")
            console.log(response);
            this.showConfirmationMessage = true;
            this.isFormSubmitted = true;
            setTimeout(() => {
              this.router.navigate(["/"]);
            }, 1500);
          },
          (error) => {
            console.error("Erro ao cadastrar usuário:", error);
            this.showErrorMessage = true;
            setTimeout(() => {
              this.showErrorMessage = false;
            }, 2000);
          }
        );
    }
  }

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
