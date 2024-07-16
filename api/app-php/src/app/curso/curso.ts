export interface Curso{
    //idCurso está com ? porque ele não é obrigatório.
    //Ao construor um Curso não tem como passar o idCurso 
    //no construtor, pois ele é autoincrement. O banco
    //já faz o autoincrement
    nomeCurso:string,
    valorCurso:number | null,
    idCurso?:number
}