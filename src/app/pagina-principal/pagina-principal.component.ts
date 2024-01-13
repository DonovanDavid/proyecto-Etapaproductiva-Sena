import { Component, OnInit } from '@angular/core';
import { DynamicComponentService } from '../dymamic-component.service';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent implements OnInit {
  jefeOperaciones: boolean = true;
  mecanico: boolean = false;
  cliente: boolean = false;

  constructor(public dynamicComponentService: DynamicComponentService) {}

  ngOnInit(): void {
    console.log('PaginaPrincipalComponent: ngOnInit is called.');
  }
}
