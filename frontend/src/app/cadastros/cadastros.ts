import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TelemetriaService } from '../core/telemetria.service';

@Component({
  selector: 'app-cadastros',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './cadastros.html'
})
export class CadastrosComponent implements OnInit {
  imovelForm: FormGroup;
  medidorForm: FormGroup;
  imoveis = signal<any[]>([]);

  constructor(private fb: FormBuilder, private telemetriaService: TelemetriaService) {
    this.imovelForm = this.fb.group({
      nome: ['', Validators.required],
      endereco: ['', Validators.required]
    });

    this.medidorForm = this.fb.group({
      identificador: ['', Validators.required],
      tipo: ['AGUA', Validators.required],
      imovelId: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.carregarImoveis();
  }

  carregarImoveis() {
    this.telemetriaService.listarImoveis().subscribe(res => {
      this.imoveis.set(res || []);
    });
  }

  salvarImovel() {
    if (this.imovelForm.valid) {
      this.telemetriaService.criarImovel(this.imovelForm.value).subscribe({
        next: () => {
          alert('Imóvel cadastrado com sucesso!');
          this.imovelForm.reset();
          this.carregarImoveis();
        },
        error: (err) => alert('Erro ao salvar imóvel: ' + err.error.message)
      });
    }
  }

  salvarMedidor() {
    if (this.medidorForm.valid) {
      this.telemetriaService.criarMedidor(this.medidorForm.value).subscribe({
        next: () => {
          alert('Medidor cadastrado com sucesso!');
          this.medidorForm.reset({ tipo: 'AGUA', imovelId: '' });
        },
        error: (err) => alert('Erro ao salvar medidor: ' + err.error.message)
      });
    }
  }
}