export interface Imagem{
  id: string;
  filename: string;
  url: string;

}

export interface Contact {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  data_nascimento: string;
  imagemContato: Imagem;
}
