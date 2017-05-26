import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Produto } from '../../_model/produto.model';
import { ProdutosService } from '../../_service/produtos.service';
import { BasicValidators } from '../../shared/basic-validators';

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto_form.component.html',
  styleUrls: ['./produto_form.component.css']
})
export class ProdutoFormComponent implements OnInit {

  form: FormGroup;
  title: string;
  produto: Produto = new Produto();

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private produtosService: ProdutosService
  ) {
    this.form = formBuilder.group({
      nome: [],
      precoProduto: [],
      qntEstoque: [],
      tipoProduto: []
    });
  }

  ngOnInit() {
    var id = this.route.params.subscribe(params => {
      var id = params['id'];

      this.title = id ? 'Editar Produto' : 'Novo Produto';

      if (!id)
        return;

      this.produtosService.getProduto(id)
        .subscribe(
          produto => this.produto = produto,
          response => {
            if (response.status == 404) {
              this.router.navigate(['NotFound']);
            }
          });
    });
  }

  save() {
    var result,
        userValue = this.form.value;

        console.log(userValue);
    if (userValue.id){
      result = this.produtosService.updateProduto(userValue);
    } else {
      result = this.produtosService.addProduto(userValue);
    }

    result.subscribe(data => this.router.navigate(['produtos']));
  }
}
