import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.css']
})
export class AddUserModalComponent {
  signupForm: FormGroup;
  showConfirmationMessage: boolean = false;
  showErrorMessage: boolean = false;
  errorMessage: string = '';
  isFormSubmitted: boolean = false;

  constructor(private router: Router, private userService: UserService) {
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
      const userData = {
        nome: this.signupForm.get('name')?.value,
        email: this.signupForm.get('email')?.value,
        senha: this.signupForm.get('password')?.value,
        confirmacaoSenha: this.signupForm.get('passwordConfirmation')?.value,
        funcao: this.signupForm.get('role')?.value
      };

      this.userService.cadastroAutenticado(userData)
        .subscribe(
          (response: any) => {
            console.log("Novo usuário autenticado cadastrado com sucesso!");
            this.showConfirmationMessage = true;
            this.showErrorMessage = false;
            this.isFormSubmitted = true;
            setTimeout(() => {       
              window.location.reload();
            }, 1500);
          },
          (error: any) => { // Explicitly type error as any
            console.error("Erro ao cadastrar usuário:", error);
            this.showErrorMessage = true;
            this.showConfirmationMessage = false;
            if (error.status === 400) {
              const errorMessage = error.error.mensagem;
              if (errorMessage.includes("Nome de usuário ou email já existe")) {
                this.errorMessage = "Nome de usuário ou email já existe!";
              } else if (errorMessage.includes("Senha e confirmação de senha não coincidem")) {
                this.errorMessage = "Senha e confirmação de senha não coincidem!";
              } else if (errorMessage.includes("Função inválida")) {
                this.errorMessage = "Função inválida! Deve ser 'ALUNO' ou 'PROFESSOR'.";
              } else {
                this.errorMessage = "Ocorreu um erro durante o cadastro. Por favor, tente novamente mais tarde.";
              }
            } else {
              this.errorMessage = "Ocorreu um erro durante o cadastro. Por favor, tente novamente mais tarde.";
            }
          }
        );
    }
  }

  resetForm() {
    this.signupForm.reset();
    this.signupForm.get('role')?.setValue(''); 
    this.showConfirmationMessage = false; 
    this.showErrorMessage = false;
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
