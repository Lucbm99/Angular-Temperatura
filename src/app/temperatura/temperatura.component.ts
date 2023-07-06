import { Component, OnInit } from '@angular/core';
import { TemperaturaService } from './../services/temperatura.service';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-temperatura',
  templateUrl: './temperatura.component.html',
  styleUrls: ['./temperatura.component.css'],
})
export class TemperaturaComponent implements OnInit {
  public localizacao: string = '';
  public regiao: string = '';
  public pais: string = '';
  public valorTemperaturaCidadeCelsius: any;
  public valorTemperaturaCidadeKelvin: any;
  public valorTemperaturaCidadeFahrenheit: any;
  public valorUmidadeCidade: any;
  public textoCondicao: string = '';
  public imagemTempo: string = '';

  public temperaturaForm: any;
  public cidade: string = '';
  public formularioSubmetido: boolean = false;

  constructor(
    private _temperaturaService: TemperaturaService,
    private _formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.temperaturaForm = this._formBuilder.group({
      cidade: ['', Validators.required],
    });
  }

  pesquisarTemperaturaDaCidadeFornecida() {

    const cidadeValue = this.temperaturaForm.controls['cidade'].value;
    console.log('Entered value:', cidadeValue);
  
    if (!cidadeValue) {
      alert("Campo em branco. Verifique e tente novamente.");
      return;
    }
    
    this._temperaturaService.pesquisarTemperaturaDeUmaCidade(cidadeValue).subscribe((response) => {
        const data = [ response ];
        this.formularioSubmetido = true;

        const dadosExtraidosAPI = data.map(item => {
          const localizacao = item.location.name;
          const regiao = item.location.region;
          const pais = item.location.country;
          const temperaturaCelsius = item.current.temp_c;
          const temperaturaFahrenheit = item.current.temp_f;
          const temperaturaKelvin = temperaturaCelsius + 273.15;
          const umidade = item.current.humidity;
          const condicaoTemperatura = item.current.condition.text;
          const imagemTemperatura = item.current.condition.icon;

          this.localizacao = localizacao;
          this.regiao = regiao;
          this.pais = pais;
          this.valorTemperaturaCidadeCelsius = temperaturaCelsius;
          this.valorTemperaturaCidadeKelvin = temperaturaKelvin;
          this.valorTemperaturaCidadeFahrenheit = temperaturaFahrenheit;
          this.valorUmidadeCidade = umidade;
          this.textoCondicao = condicaoTemperatura;
          this.imagemTempo = imagemTemperatura;
        });
    })
  }

  limparDadosDaPesquisaDeTemperatura() {
    this.temperaturaForm.reset();
    this.formularioSubmetido = false;
  }
}
