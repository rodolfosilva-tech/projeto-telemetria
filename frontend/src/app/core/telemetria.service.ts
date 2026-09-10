import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class TelemetriaService {
    private apiUrl = 'http://localhost:3000';
    private isBrowser: boolean;

    constructor(
        private http: HttpClient,
        @Inject(PLATFORM_ID) platformId: Object
    ) {
        // Verifica se o código está rodando no navegador (true) ou no Docker/SSR (false)
        this.isBrowser = isPlatformBrowser(platformId);
    }

    // --- IMÓVEIS ---
    listarImoveis(): Observable<any[]> {
        if (!this.isBrowser) return of([]); // Se for servidor, retorna vazio e evita o erro
        return this.http.get<any[]>(`${this.apiUrl}/imoveis`);
    }

    criarImovel(imovel: { nome: string, endereco: string }): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/imoveis`, imovel);
    }

    // --- MEDIDORES ---
    listarMedidores(imovelId?: string): Observable<any[]> {
        if (!this.isBrowser) return of([]);
        const url = imovelId ? `${this.apiUrl}/medidores?imovelId=${imovelId}` : `${this.apiUrl}/medidores`;
        return this.http.get<any[]>(url);
    }

    criarMedidor(medidor: { identificador: string, tipo: string, imovelId: string }): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/medidores`, medidor);
    }

    // --- LEITURAS ---
    criarLeitura(medidorId: string, leitura: { valor: number, dataHora?: string }): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/medidores/${medidorId}/leituras`, leitura);
    }

    // --- CONSUMO (Gráficos) ---
    consumoPorAno(medidorId: string): Observable<any[]> {
        if (!this.isBrowser) return of([]);
        return this.http.get<any[]>(`${this.apiUrl}/medidores/${medidorId}/consumo?nivel=ano`);
    }

    consumoPorMes(medidorId: string, ano: number): Observable<any[]> {
        if (!this.isBrowser) return of([]);
        return this.http.get<any[]>(`${this.apiUrl}/medidores/${medidorId}/consumo?nivel=mes&ano=${ano}`);
    }

    consumoPorDia(medidorId: string, ano: number, mes: number): Observable<any[]> {
        if (!this.isBrowser) return of([]);
        return this.http.get<any[]>(`${this.apiUrl}/medidores/${medidorId}/consumo?nivel=dia&ano=${ano}&mes=${mes}`);
    }
}

