import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard';
import { CadastrosComponent } from './cadastros/cadastros';
import { LeiturasComponent } from './leituras/leituras';
import { LoginComponent } from './login/login';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
    { path: 'cadastros', component: CadastrosComponent, canActivate: [authGuard] },
    { path: 'leituras', component: LeiturasComponent, canActivate: [authGuard] },
];
