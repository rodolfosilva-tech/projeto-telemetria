import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TelemetriaService } from '../core/telemetria.service';

@Component({
  selector: 'app-leituras',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './leituras.html'
})
export class LeiturasComponent implements OnInit {
  leituraForm: FormGroup;
  medidores = signal<any[]>([]);

  constructor(private fb: FormBuilder, private telemetriaService: TelemetriaService) {
    this.leituraForm = this.fb.group({
      medidorId: ['', Validators.required],
      valor: ['', [Validators.required, Validators.min(0)]],
      dataHora: ['']
    });
  }

  ngOnInit() {
    this.carregarMedidores();
  }

  carregarMedidores() {
    this.telemetriaService.listarMedidores().subscribe(res => {
      this.medidores.set(res || []);
    });
  }

  salvarLeitura() {
    if (this.leituraForm.valid) {
      const { medidorId, valor, dataHora } = this.leituraForm.value;
      const payload = dataHora ? { valor, dataHora } : { valor };

      this.telemetriaService.criarLeitura(medidorId, payload).subscribe({
        next: () => {
          alert('Leitura registrada com sucesso!');
          this.leituraForm.reset({ medidorId: '' });
        },
        error: (err) => alert('Erro ao salvar leitura: ' + err.error.message)
      });
    }
  }
}