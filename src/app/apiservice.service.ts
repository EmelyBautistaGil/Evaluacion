import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  readonly apiUrl = 'http://localhost:7077/api/'
  constructor(private http: HttpClient) { }


  // Trabajadores
  getTrabajadores(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}Trabajadores/GetAll`)
  }

  getTrabajadoresNumero(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}Trabajadores/GetTrabajadoresNumero`)
  }

  searchTrabajadores(trab: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}Trabajadores/Search/${trab}`)
  }

  searchNumber(trab: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}Trabajadores/SearchNumber/${trab}`)
  }

  addTrabajadores(trab: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'Trabajadores/Post', trab);
  }

  updateTrabajadores(trab: any, id: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<any>(this.apiUrl + 'Trabajadores/Put/' + id, trab, httpOptions);
  }

  deleteTrabajadores(trabId: number): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<number>(this.apiUrl + 'Trabajadores/Delete/' + trabId, httpOptions);
  }


  // Edificios
  getEdificios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}Edificios/GetAll`)
  }

  getEdificioNumero(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}Edificios/GetEdificioNumero`)
  }
  search(trab: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}Edificios/Search/${trab}`)
  }

  searchEdificios(trab: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}Edificios/SearchNumber/${trab}`)
  }

  addEdificios(edi: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'edificios/Post', edi, httpOptions);
  }

  updateEdificios(edi: any, id: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<any>(this.apiUrl + 'edificios/Put/' + id, edi, httpOptions);
  }

  deleteEdificios(ediId: number): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<number>(this.apiUrl + 'edificios/Delete/' + ediId, httpOptions);
  }

  // Asignaciones
  getAsignaciones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}Asignaciones/GetAll`)
  }
  searchFechaInicio(trab: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}Asignaciones/Search/${trab}`)
  }

  searchAsignaciones(trab: any): Observable<any[]> {
    debugger
    return this.http.get<any[]>(`${this.apiUrl}Asignaciones/SearchNumber/${trab}`)
  }

  addAsignaciones(asig: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'Asignaciones/Post', asig, httpOptions);
  }

  updateAsignaciones(asig: any, id: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<any>(this.apiUrl + 'Asignaciones/Put/' + id, asig, httpOptions);
  }

  deleteAsignaciones(asigId: number): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<number>(this.apiUrl + 'Asignaciones/Delete/' + asigId, httpOptions);
  }
}
