import { Injectable, Inject, PLATFORM_ID, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

export interface LoginResponse {
    token?: string;
    access_token?: string;
    usuario?: any;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private apiUrl = 'http://localhost:3000/auth';
    private isBrowser: boolean;

    // Signal reativo para saber se o usuário está logado
    isLoggedIn = signal<boolean>(false);

    constructor(
        private http: HttpClient,
        private router: Router,
        @Inject(PLATFORM_ID) platformId: Object
    ) {
        this.isBrowser = isPlatformBrowser(platformId);
        if (this.isBrowser) {
            this.isLoggedIn.set(!!this.getToken());
        }
    }

    login(credenciais: { email: string; senha: string }): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credenciais).pipe(
            tap((res) => {
                const token = res.token || res.access_token;
                if (this.isBrowser && token) {
                    localStorage.setItem('auth_token', token);
                    this.isLoggedIn.set(true);
                }
            })
        );
    }

    register(dados: { nome: string; email: string; senha: string }): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/register`, dados);
    }

    logout(): void {
        if (this.isBrowser) {
            localStorage.removeItem('auth_token');
            this.isLoggedIn.set(false);
        }
        this.router.navigate(['/login']);
    }

    getToken(): string | null {
        if (!this.isBrowser) return null;
        return localStorage.getItem('auth_token');
    }
}
