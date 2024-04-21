import { Component, OnInit } from '@angular/core';
import { SenhasService } from '../services/senhas.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
senhaChamada: {tipo: string, guiche: string} | null = null;

  constructor( public senhasService: SenhasService ) {}

  ngOnInit() {
    this.senhasService.senhaChamada.subscribe(senha => {
      this.senhaChamada = senha;
    });
  }
  solicitarSenha() {
    const minhaSenha = this.senhasService.gerarSenha();
    console.log('Sua senha:', minhaSenha);
  }
}
