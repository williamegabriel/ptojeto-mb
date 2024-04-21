import { Component, OnInit } from '@angular/core';
import { SenhasService } from '../services/senhas.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  ngOnInit() {
    this.senhasService.senhaChamada.subscribe(senha => {
      this.senhaChamada = senha;
    });
  }
  solicitarSenha() {
    const minhaSenha = this.senhasService.gerarSenha();
    console.log('Sua senha:', minhaSenha);
  }
senhaChamada: any;

  constructor(public senhasService: SenhasService) {}

  calcularTempoMedioAtendimento(tipoSenha: string): number {
    if (tipoSenha === 'SG') {
      return 2 + Math.floor(Math.random() * 7);
    } else if (tipoSenha === 'SP') {
      return 10 + Math.floor(Math.random() * 11);
    } else if (tipoSenha === 'SE') {
      return Math.random() < 0.05 ? 5 : 1;
    }
    return 0;
  }

}
