import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard';
import { CadastrosComponent } from './cadastros/cadastros';
import { LeiturasComponent } from './leituras/leituras';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'cadastros', component: CadastrosComponent },
    { path: 'leituras', component: LeiturasComponent }
];