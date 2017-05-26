import { Component, OnInit } from '@angular/core';
import { ClientesService } from "../../_service/clientes.service";
import { Cliente } from "../../_model/cliente.model";


@Component({
  selector: 'app-listar-cliente',
  templateUrl: './cliente_listar.component.html'
})
export class ClienteListarComponent implements OnInit {

  private clientes: Cliente[] = [];

  constructor(private clienteService: ClientesService) { }

  ngOnInit() {
    this.clienteService.getClientes()
      .subscribe(data => this.clientes = data);
      
  }

  deleteCliente(cliente : Cliente){
    if (confirm("Tem certeza que deseja excluir o cliente: " + cliente.nome + "?")) {
      var index = this.clientes.indexOf(cliente);
      this.clientes.splice(index, 1);

      this.clienteService.deleteCliente(cliente.idCliente)
        .subscribe(null,
          err => {
            alert("Cliente não excluído.");
            // Revert the view back to its original state
            this.clientes.splice(index, 0, cliente);
          });
    }
  }

}
