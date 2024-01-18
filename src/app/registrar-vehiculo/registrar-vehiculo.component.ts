import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-registrar-vehiculo',
  templateUrl: './registrar-vehiculo.component.html',
  styleUrls: ['./registrar-vehiculo.component.css']
})
export class RegistrarVehiculoComponent {
  marcaList: any[] = [];
  tipoVehiculoList: any[] = [];


  placa: string="";
  tipoVehiculo="";
  capacidadPasajeros="";
  descripcion: string="";
  modelo="";
  marca="";
  estado="";
  idCliente="";

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void{
    this.getAll();
  }
  
  getAll() {
  //Obtencion de todos las marcas
    this.http.get("http://localhost:8085/api/marca")
      .subscribe((resultData: any) => {
        this.marcaList = resultData.data;
      });
      
  //Obtencion de todos los tiposVehiculos
    this.http.get("http://localhost:8085/api/tipovehiculo")
    .subscribe((resultData: any) => {
      this.tipoVehiculoList = resultData.data;
    });
  }

  guardarVehiculo(){
 
    let bodyData = {
      "placa": this.placa,
      "tipoVehiculo": this.tipoVehiculo,
      "capacidadPasajeros": this.capacidadPasajeros,
      "descripcion": this.descripcion,
      "modelo": this.modelo,
      "marca": this.marca,
      "estado": this.estado,
      "idCliente": 1
    };
    console.log(bodyData);
    this.http.post("http://localhost:8085/api/vehiculo/add", bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      alert(resultData.message);
      this.getAll();
    })
  }

}
