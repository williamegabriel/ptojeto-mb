import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SenhasService {
  senhasGeral: number = 0;
  senhasPrior: number = 0;
  senhasExame: number = 0;
  senhasTotal: number = 0;
  inputNovaSenha: string = '';
  senhasArray: {[key: string]:string[]} = {
    'SG':[], 'SP': [] , 'SE':[]
  };
  relatorioDiario: string = '';
  relatorioMensal: string = '';
  relatorioDetalhado: string  = '';
    horaInicioExpediente: number = 7;
  horaFimExpediente: number = 17;

    tempoMedioPrior: number = 15;
    tempoMedioGeral: number = 5;
    tempoMedioExame: number = 1;

    tempoAtendimento: {[key: string]: number} = {
      'SP': this.tempoMedioPrior,
      'SG': this.tempoMedioGeral,
      'SE': this.tempoMedioExame
    };

  senhaChamada = new BehaviorSubject<{ tipo: string , guiche: string } | null>(null);

  somaGeral() { this.senhasGeral++; this.senhasTotal++; }
  somaPrior() { this.senhasPrior++; this.senhasTotal++; }
  somaExame() { this.senhasExame++; this.senhasTotal++; }

  constructor() {}

  gerarRelatorioDiario(): string {
    const relatorioDiario = `
      Quantitativo geral das senhas emitidas: ${this.senhasTotal}
      Quantitativo geral das senhas prioritárias: ${this.senhasPrior}
      Quantitativo geral das senhas de exame: ${this.senhasExame} `;

    console.log(relatorioDiario);

    return relatorioDiario;
  }

  gerarRelatorioMensal(): string {
    const relatorioMensal = `
      Quantitativo geral das senhas emitidas: ${this.senhasTotal}
      Quantitativo geral das senhas prioritárias: ${this.senhasPrior}
      Quantitativo geral das senhas de exame: ${this.senhasExame} `;

    console.log(relatorioMensal);

    return relatorioMensal;
  }
  gerarRelatorioDetalhado(): string {
    const relatorioDetalhado = `
      Quantitativo geral das senhas emitidas: ${this.senhasTotal}
      Quantitativo geral das senhas prioritárias: ${this.senhasPrior}
      Quantitativo geral das senhas de exame: ${this.senhasExame} `;

    console.log(relatorioDetalhado);

    return relatorioDetalhado;
  }

  gerarSenha(tipoSenha: string = ''): { tipo: string, guiche: string } {
    if (tipoSenha === 'SG') {
      this.somaGeral();
      let novaSenha = this.inputNovaSenha =
        new Date().getFullYear().toString().substring(2, 4) +
        new Date().getMonth().toString().padStart(2 , '0') +
        new Date().getDay().toString().padStart(2 , '0') +
        '-' +
        tipoSenha +
        (this.senhasArray['SG'].length + 1).toString().padStart(2 , '0');
      this.senhasArray['SG'].push(novaSenha);
      return { tipo: tipoSenha, guiche: 'Geral' };
    } else if (tipoSenha === 'SP') {
      this.somaPrior();
      let novaSenha = this.inputNovaSenha =
      new Date().getFullYear().toString().substring(2, 4) +
      new Date().getMonth().toString().padStart(2 , '0') +
      new Date().getDay().toString().padStart(2 , '0') +
      '-' +
      tipoSenha +
      (this.senhasArray['SP'].length + 1).toString().padStart(2 , '0');
    this.senhasArray['SP'].push(novaSenha);
      // Lógica para senha prioritária
      return { tipo: tipoSenha, guiche: 'Prioritário' };
    } else if (tipoSenha === 'SE') {
      this.somaExame();
      let novaSenha = this.inputNovaSenha =
      new Date().getFullYear().toString().substring(2, 4) +
      new Date().getMonth().toString().padStart(2 , '0') +
      new Date().getDay().toString().padStart(2 , '0') +
      '-' +
      tipoSenha +
      (this.senhasArray['SE'].length + 1).toString().padStart(2 , '0');
    this.senhasArray['SE'].push(novaSenha);
      // Lógica para senha de exame
      return { tipo: tipoSenha, guiche: 'Exame' };
    }
    return { tipo: '', guiche: '' };
  }

  proximaSenha(): { tipo: string | undefined, guiche: string | undefined} {
    // Lógica para retornar a próxima senha na fila de atendimento
    let proximaSenha  ;
    if (this.senhasArray['SP'].length > 0) {
      proximaSenha = this.senhasArray['SP'].shift();
      return { tipo: 'SP', guiche: 'Prioritário' };
    } else if (this.senhasArray['SG'].length > 0) {
      proximaSenha = this.senhasArray['SG'].shift();
      return { tipo: 'SG', guiche: 'Geral' };
    } else if (this.senhasArray['SE'].length > 0) {
      proximaSenha = this.senhasArray['SE'].shift();
      return { tipo: 'SE', guiche: 'Exame' };
    }
    // Se não houver senhas disponíveis, retornar um valor padrão
    return { tipo: 'N/A', guiche: 'N/A' };
}
}
