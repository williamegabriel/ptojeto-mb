import { Component } from '@angular/core';
import { SenhasService } from '../services/senhas.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  relatorioDiario: string = '';
  relatorioMensal: string = '';
  relatorioDetalhado: string = '';

  constructor(private senhasService: SenhasService) {
    this.gerarRelatorios();
  }

  gerarRelatorios() {
    this.relatorioDiario = this.senhasService.gerarRelatorioDiario();
    this.relatorioMensal = this.senhasService.gerarRelatorioMensal();
    this.relatorioDetalhado = this.senhasService.gerarRelatorioDetalhado();
  }
}
