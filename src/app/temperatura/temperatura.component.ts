import { Component, OnInit } from '@angular/core';
import { TemperaturaService } from './../services/temperatura.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-temperatura',
  templateUrl: './temperatura.component.html',
  styleUrls: ['./temperatura.component.css']
})
export class TemperaturaComponent implements OnInit {
  public valorTemperaturaCidade: any;
  public temperaturaForm: any;
  public cidade: any;

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
      console.log(response); 
      this.valorTemperaturaCidade = response;
    })
  }

}
