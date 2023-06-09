import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TemperaturaService {

  private baseURL: string = 'https://api.weatherapi.com/v1/current.json';
  private apiKey: string = 'e0c00e31de4b4f6896d03822233105'

  constructor(
    private _httpClient: HttpClient
  ) {}

  public pesquisarTemperaturaDeUmaCidade(cidade: string): Observable<any> {

    return this._httpClient.get(`${this.baseURL+'?key='+this.apiKey+'&q='+cidade+'&aqi=no&lang=pt'}`).pipe(
      tap((data: any) => {
        data
    }),
    catchError((error: HttpErrorResponse) => {
      console.log('error', error);
      if(error.status === 400) {
        alert("Cidade não encontrada. Verifique e tente novamente.")
      }
      return EMPTY; 
    }),
  )}
}
