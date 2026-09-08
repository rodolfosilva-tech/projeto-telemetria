import { Component, Input, OnInit } from '@angular/core';
import { BarChartModule } from '@swimlane/ngx-charts';
import { TelemetriaService } from '../core/telemetria.service';

@Component({
  imports: [BarChartModule],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  @Input() medidorId!: string;

  dadosAno: any[] = [];
  dadosMes: any[] = [];
  dadosDia: any[] = [];
  anoSelecionado?: number;
  mesSelecionado?: number;

  constructor(
    private telemetriaService: TelemetriaService
  ) { }

  ngOnInit(): void {
    this.telemetriaService.consumoPorAno(this.medidorId)
      .subscribe((dados) => (this.dadosAno = dados));

  }

  aoClicarAno(evento: any): void {
    this.anoSelecionado = Number(evento.name);
    this.mesSelecionado = undefined;
    this.dadosMes = [];
    this.dadosDia = [];
    this.telemetriaService.consumoPorMes(this.medidorId, this.anoSelecionado!).subscribe((dados) => (this.dadosMes = dados));
  }


  aoClicarMes(evento: any): void {
    this.mesSelecionado = Number(evento.name);
    this.dadosDia = [];
    this.telemetriaService.consumoPorDia(this.medidorId, this.anoSelecionado!, this.mesSelecionado).subscribe((dados) => (this.dadosDia = dados));

  }
}
