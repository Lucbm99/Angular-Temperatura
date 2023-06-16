import { Component, OnInit } from '@angular/core';
import { TemperaturaService } from './../services/temperatura.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-temperatura',
  templateUrl: './temperatura.component.html',
  styleUrls: ['./temperatura.component.css']
})
export class TemperaturaComponent implements OnInit {
  public valorTemperaturaCidadeCelsius: any;
  public valorTemperaturaCidadeKelvin: any;
  public valorTemperaturaCidadeFahrenheit: any;
  public valorUmidadeCidade: any;
  public temperaturaForm: any;
  public cidade: any;
  public formularioSubmetido: boolean = false;

  constructor(
    private _temperaturaService: TemperaturaService,
    private _formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.temperaturaForm = this._formBuilder.group({
      cidade: ['', [Validators.required]],
    });
  }

  pesquisarTemperaturaDaCidadeFornecida() {
    this._temperaturaService.pesquisarTemperaturaDeUmaCidade(this.temperaturaForm.value.cidade).subscribe((response) => {
      const data = [ response ];
      this.formularioSubmetido = true;

      const dadosExtraidosAPI = data.map(item => {
        const temperaturaCelsius = item.current.temp_c;
        const temperaturaFahrenheit = item.current.temp_f;
        const temperaturaKelvin = temperaturaCelsius + 273.15;
        const umidade = item.current.humidity;
        
        this.valorTemperaturaCidadeCelsius = temperaturaCelsius;
        this.valorTemperaturaCidadeKelvin = temperaturaKelvin;
        this.valorTemperaturaCidadeFahrenheit = temperaturaFahrenheit;
        this.valorUmidadeCidade = umidade;
  
        console.log("°C: ", this.valorTemperaturaCidadeCelsius);
        console.log("°F: ", this.valorTemperaturaCidadeFahrenheit);
        console.log("Kelvin: ", this.valorTemperaturaCidadeKelvin);
        console.log("Umidade: ", this.valorUmidadeCidade);
      });
    })
  }

  limparDadosDaPesquisaDeTemperatura() {
    this.formularioSubmetido = false;
  }
}
