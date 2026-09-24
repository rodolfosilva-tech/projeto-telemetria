import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html'
})
export class LoginComponent {
  loginForm: FormGroup;
  isCadastro: boolean = false;
  mensagemErro: string = '';
  mensagemSucesso: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      nome: [''],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  alternarModo() {
    this.isCadastro = !this.isCadastro;
    this.mensagemErro = '';
    this.mensagemSucesso = '';

    const nomeControl = this.loginForm.get('nome');
    if (this.isCadastro) {
      nomeControl?.setValidators([Validators.required]);
    } else {
      nomeControl?.clearValidators();
    }
    nomeControl?.updateValueAndValidity();
  }

  submeter() {
    if (this.loginForm.invalid) {
      return;
    }

    this.mensagemErro = '';
    this.mensagemSucesso = '';

    const { nome, email, senha } = this.loginForm.value;

    if (this.isCadastro) {
      // Criação de nova conta
      this.authService.register({ nome, email, senha }).subscribe({
        next: () => {
          // Loga automaticamente após cadastrar
          this.authService.login({ email, senha }).subscribe({
            next: () => {
              this.router.navigate(['/dashboard']);
            },
            error: () => {
              this.isCadastro = false;
              this.mensagemSucesso = 'Conta criada com sucesso! Faça login para continuar.';
            }
          });
        },
        error: (err) => {
          this.mensagemErro = err.error?.message || 'Erro ao criar conta. Verifique os dados.';
        }
      });
    } else {
      // Login normal
      this.authService.login({ email, senha }).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.mensagemErro = err.error?.message || 'E-mail ou senha inválidos.';
        }
      });
    }
  }
}

