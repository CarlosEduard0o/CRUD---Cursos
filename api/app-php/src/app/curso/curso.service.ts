import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Curso } from './curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  //import { map } from 'rxjs/operators';
  //Serve para listar todos os elementos que estão no meu banco de dados

  //url
  private baseUrl="http://localhost:80/api/php/"

  constructor(private http: HttpClient) { }

  obterCursos(): Observable<Curso[]>{
    return this.http.get<Curso[]>(`${this.baseUrl}/listar.php`);
  }

  cadastrarCurso(curso: Curso): Observable<any> {
    // console.log('Curso Name:', curso.nomeCurso);
    // console.log('Curso Value:', curso.valorCurso);
    return this.http.post(`${this.baseUrl}/cadastrar.php`, curso);
  }

  removeCourseById(idCurso: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/excluir.php?idCurso=${idCurso}`);
  }

  removerCourseByNome(nomeCurso: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/excluir.php?nomeCurso=${nomeCurso}`);
  }

  atualizarCurso(curso: Curso): Observable<any> {
    return this.http.put(`${this.baseUrl}/alterar.php`, curso);
  }
}
