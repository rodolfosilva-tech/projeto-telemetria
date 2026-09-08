import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TelemetriaService {
    private apiUrl = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    listarImoveis(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/imoveis`);
    }

    consumoPorAno(medidorId: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/medidores/${medidorId}/consumo?nivel=ano`);
    }

    consumoPorMes(medidorId: string, ano: number): Observable<any[]> {
        return this.http.get<any[]>(
            `${this.apiUrl}/medidores/${medidorId}/consumo?nivel=mes&ano=${ano}`,
        );
    }

    consumoPorDia(medidorId: string, ano: number, mes: number): Observable<any[]> {
        return this.http.get<any[]>(
            `${this.apiUrl}/medidores/${medidorId}/consumo?nivel=dia&ano=${ano}&mes=${mes}`,
        );
    }
}

