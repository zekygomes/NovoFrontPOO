import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Produto } from '../_model/produto.model';

@Injectable()
export class ProdutosService {

  private url: string = "/api/produto";
  private produto = new Produto;

  constructor(private http: Http) { }

  getProdutos(){
    return this.http.get(this.url+"/pegar-todos")
      .map(res => res.json());
  }

  getRefeicoes(){
    return this.http.get(this.url+"/pegar-refeicoes")
      .map(res => res.json());
  }

  getSobremesas(){
    return this.http.get(this.url+"/pegar-sobremesas")
      .map(res => res.json());
  }

  getBebidas(){
    return this.http.get(this.url+"/pegar-bebidas")
      .map(res => res.json());
  }

  getProduto(id){
    return this.http.get(this.getProdutoUrl(id))
      .map(res => res.json());
  }

  addProduto(produto){
    return this.http.put(this.url + "/salvar", JSON.stringify(produto))
      .map(res => res.json());
  }

  updateProduto(produto){
    return this.http.put(this.getProdutoUrl(produto.id), JSON.stringify(produto))
      .map(res => res.json());
  }

  deleteProduto(id){
    return this.http.delete(this.getProdutoUrl(id))
      .map(res => res.json());
  }

  private getProdutoUrl(id){
    return this.url + "/pegar-por-id?id=" + id;
  }
}