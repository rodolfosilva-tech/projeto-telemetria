import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelemetriaService } from '../core/telemetria.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './dashboard.html'
})
export class DashboardComponent implements OnInit {
  imoveis = signal<any[]>([]);
  medidores = signal<any[]>([]);
  medidorSelecionado = signal<any>(null);
  dadosGrafico = signal<any[]>([]);
  nivelAtual = signal<string>('ANO');
  xAxisLabel = signal<string>('Ano');
  carregandoGrafico = signal<boolean>(false);

  // Configurações do ngx-charts
  view: [number, number] = [600, 300];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  showYAxisLabel = true;
  yAxisLabel = 'Consumo';

  anoSelecionado: number | null = null;
  mesSelecionado: number | null = null;

  constructor(private telemetriaService: TelemetriaService) { }

  ngOnInit(): void {
    this.carregarImoveis();
  }

  carregarImoveis(): void {
    this.telemetriaService.listarImoveis().subscribe({
      next: (res) => {
        console.log('Imóveis atribuídos com sucesso:', res);
        this.imoveis.set(res || []);
      },
      error: (err) => console.error('Erro ao buscar imóveis:', err)
    });
  }

  selecionarMedidor(medidor: any): void {
    this.medidorSelecionado.set(medidor);
    this.anoSelecionado = null;
    this.mesSelecionado = null;
    this.carregarGraficoAno();
  }

  carregarGraficoAno(): void {
    this.nivelAtual.set('ANO');
    this.xAxisLabel.set('Ano');
    this.anoSelecionado = null;
    this.mesSelecionado = null;

    const medidor = this.medidorSelecionado();
    if (!medidor) return;

    this.carregandoGrafico.set(true);
    this.telemetriaService.consumoPorAno(medidor.id).subscribe({
      next: (res) => {
        const formatados = (res || []).map(item => ({
          name: String(item.ano || item.name || 'Sem data'),
          value: Number(item.consumo || item.valor || item.value || 0)
        }));
        this.dadosGrafico.set([...formatados]);
        this.carregandoGrafico.set(false);
      },
      error: (err) => {
        console.error('Erro ao carregar consumo por ano:', err);
        this.carregandoGrafico.set(false);
      }
    });
  }

  carregarGraficoMes(ano: number): void {
    this.nivelAtual.set(`MÊS (${ano})`);
    this.xAxisLabel.set('Mês');
    this.anoSelecionado = ano;

    const medidor = this.medidorSelecionado();
    if (!medidor) return;

    this.carregandoGrafico.set(true);
    this.telemetriaService.consumoPorMes(medidor.id, ano).subscribe({
      next: (res) => {
        const nomesMeses = ['', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        const formatados = (res || []).map(item => ({
          name: nomesMeses[Number(item.name)] || `Mês ${item.name}`,
          mesNumero: Number(item.name),
          value: Number(item.consumo || item.valor || item.value || 0)
        }));
        this.dadosGrafico.set([...formatados]);
        this.carregandoGrafico.set(false);
      },
      error: (err) => {
        console.error('Erro ao carregar consumo por mês:', err);
        this.carregandoGrafico.set(false);
      }
    });
  }

  carregarGraficoDia(ano: number, mes: number): void {
    const nomesMeses = ['', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const nomeMes = nomesMeses[mes] || mes;
    this.nivelAtual.set(`DIA (${nomeMes}/${ano})`);
    this.xAxisLabel.set('Dia');
    this.mesSelecionado = mes;

    const medidor = this.medidorSelecionado();
    if (!medidor) return;

    this.carregandoGrafico.set(true);
    this.telemetriaService.consumoPorDia(medidor.id, ano, mes).subscribe({
      next: (res) => {
        const formatados = (res || []).map(item => ({
          name: `D${item.name}`,
          value: Number(item.consumo || item.valor || item.value || 0)
        }));
        this.dadosGrafico.set([...formatados]);
        this.carregandoGrafico.set(false);
      },
      error: (err) => {
        console.error('Erro ao carregar consumo por dia:', err);
        this.carregandoGrafico.set(false);
      }
    });
  }

  onSelect(event: any): void {
    const rawName = typeof event === 'object' && event !== null ? (event.name ?? event.label) : event;
    const nameStr = String(rawName || '').trim();
    const nivel = this.nivelAtual();

    if (nivel === 'ANO') {
      const ano = parseInt(nameStr, 10);
      if (!isNaN(ano)) {
        this.carregarGraficoMes(ano);
      }
    } else if (nivel.startsWith('MÊS')) {
      const item = this.dadosGrafico().find(d => d.name === nameStr);
      const mes = item?.mesNumero || parseInt(nameStr, 10);
      if (this.anoSelecionado && !isNaN(mes)) {
        this.carregarGraficoDia(this.anoSelecionado, mes);
      }
    }
  }

  voltarGrafico(): void {
    const nivel = this.nivelAtual();
    if (nivel.startsWith('DIA')) {
      if (this.anoSelecionado) {
        this.carregarGraficoMes(this.anoSelecionado);
      } else {
        this.carregarGraficoAno();
      }
    } else if (nivel.startsWith('MÊS')) {
      this.carregarGraficoAno();
    }
  }
}