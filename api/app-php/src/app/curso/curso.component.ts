import { Component, OnInit } from '@angular/core';
import { Curso } from './curso';
import { CursoService } from './curso.service';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-curso',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './curso.component.html',
  styleUrl: './curso.component.css'
})
export class CursoComponent implements OnInit {

  form!: FormGroup;
  cursos: Curso[] = [];
  novoCurso: Curso = { nomeCurso: '', valorCurso: 0 }; // Objeto para armazenar o novo curso a ser cadastrado
  idCursoEditar: number | undefined;

  //Construtor
  constructor(private cursoService: CursoService, private formBuilder: FormBuilder) {
    this.initializeForm();
  }

  //Inicializador
  ngOnInit(): void {
    this.carregarCursos();
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.formBuilder.group({
      nomeCurso: ['', Validators.required],
      valorCurso: [null, [Validators.required, Validators.min(0.01)]]
    });
  }

  cadastro(): void {
    if (this.form && this.form.valid) {
      const novoCurso: Curso = {
        nomeCurso: this.form.get('nomeCurso')?.value,
        valorCurso: this.form.get('valorCurso')?.value
      };

      this.cursoService.cadastrarCurso(novoCurso)
        .subscribe({
          next: (response) => {
            console.log('Curso cadastrado com sucesso!', response);
            this.form.reset();
          },
          error: (e) => console.error('Erro ao cadastrar curso: ', e),
        });
    } else {
      console.error('Formulário inválido. Verifique os dados informados.');
      // Opções adicionais: mostrar mensagem de erro, destacar campos inválidos, etc.
    }
    this.carregarCursos();
  }

  // editarCurso(curso: Curso): void {
  //   this.idCursoEditar = curso.idCurso;
  //   this.form.setValue({
  //     nomeCurso: curso.nomeCurso,
  //     valorCurso: curso.valorCurso
  //   });
  // }

  cancelarEdicao(): void {
    this.idCursoEditar = undefined;
    this.form.reset();
  }

  atualizarCurso(): void {
    if (!this.idCursoEditar) {
      console.error('ID do curso para atualização não encontrado.');
      return;
    }

    if (this.form.valid) {
      const cursoAtualizado: Curso = {
        idCurso: this.idCursoEditar,
        nomeCurso: this.form.get('nomeCurso')?.value,
        valorCurso: this.form.get('valorCurso')?.value
      };

      this.cursoService.atualizarCurso(cursoAtualizado)
        .subscribe(
          (response) => {
            console.log('Curso atualizado com sucesso!', response);
            this.form.reset();
            this.idCursoEditar = undefined;
            this.carregarCursos(); // Atualiza a lista de cursos após atualizar um curso
          },
          (error) => {
            console.error('Erro ao atualizar curso: ', error);
          }
        );
    } else {
      console.error('Formulário inválido. Verifique os dados informados.');
    }
  }

  // selecao(): void{
  //   this.cursoService.obterCursos().
  //   subscribe(
  //     (data) => {
  //     this.cursos = data;
  //     // this.exibirDadosNoConsole();
  //   },
  //   (error) => {
  //     console.error('Erro ao obter cursos: ', error);
  //   }
  //   );
  // }

  // selecao(): void{
  //   this.cursoService.obterCursos().
  //   subscribe(
  //     (data : Curso[]) => {
  //     this.cursos = data;
  //     // this.exibirDadosNoConsole();
  //   },
  //   (error) => {
  //     console.error('Erro ao obter cursos: ', error);
  //   }
  //   );
  // }

  //Selecionar curso específico
  selecionarCurso(curso: Curso){
   this.novoCurso.idCurso = curso.idCurso;
   this.novoCurso.nomeCurso = curso.nomeCurso;
   this.novoCurso.valorCurso = curso.valorCurso;
  }


  // https://rxjs.dev/deprecations/subscribe-arguments
  carregarCursos(): void {
    this.cursoService.obterCursos().
      subscribe(
        {
          next: (data: Curso[]) => this.cursos = data,
          error: (e) => console.error(e),
          complete: () => console.info('complete')
        }
      );
  }

  //Alterar
  alterar() {
  }

  //Remover
  removerCursoPorId(idCurso: number): void {
    if (confirm('Tem certeza que deseja remover este curso?')) {
      this.cursoService.removeCourseById(idCurso)
        .subscribe(
          {
            next: () => {
              alert('Curso removido com sucesso!');
              this.carregarCursos(); // Atualiza a lista de cursos após a remoção
            },
            error: (e) => {
              console.error('Erro ao remover curso: ', e);
              alert('Erro ao remover curso. Verifique o console para mais detalhes.');
            }
          }
        );
    }
    this.carregarCursos();
  }

  removerCursoPorNome(nomeCurso: string): void {
    if (confirm(`Tem certeza que deseja remover o curso "${nomeCurso}"?`)) {
      this.cursoService.removerCourseByNome(nomeCurso)
        .subscribe(
          {
            next: () => {
              alert('Curso removido com sucesso!');
              this.carregarCursos(); // Atualiza a lista de cursos após a remoção
            },
            error: (e) => {
              console.error('Erro ao remover curso: ', e);
              alert('Erro ao remover curso. Verifique o console para mais detalhes.');
            }
          }
        );
    }
    this.carregarCursos();
  }

  onSubmit(formRemover: NgForm): void {
    if (formRemover.valid) {
      const idCurso = formRemover.value.idCurso;
      const nomeCurso = formRemover.value.nomeCurso;

      if (idCurso) {
        this.removerCursoPorId(idCurso);
      } else if (nomeCurso) {
        this.removerCursoPorNome(nomeCurso);
      } else {
        alert('Preencha pelo menos um dos campos (ID do Curso ou Nome do Curso) para remover o curso.');
      }

      formRemover.resetForm(); // Limpa o formulário após a submissão
    } else {
      alert('Por favor, preencha o formulário corretamente.');
    }
  }

  exibirDadosNoConsole(): void {
    this.cursos.forEach(curso => {
      console.log(`Nome do Curso: ${curso.nomeCurso}, Valor do Curso: ${curso.valorCurso}`);
    });
  }

  resetForm(): void {
    this.form.reset();
  }

  validateFields() {
    return this.form.controls['name'].valid
      && this.form.controls['price'].valid;
  }
}
