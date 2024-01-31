import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input } from '@angular/core';

@Component({
  selector: 'app-registrar-vehiculo',
  templateUrl: './registrar-vehiculo.component.html',
  styleUrls: ['./registrar-vehiculo.component.css']
})
export class RegistrarVehiculoComponent {
  marcaList: any[] = [];
  clienteList: any[] = [];
  tipoVehiculoList: any[] = [];
  @Input() userId: any;

  placa: string = "";
  tipoVehiculo = "";
  capacidadPasajeros = "";
  descripcion: string = "";
  modelo = "";
  marca = "";
  estado = "";
  idCliente = "";

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {

    this.http.get("http://localhost:8085/api/cliente")
      .subscribe((resultData: any) => {
        this.clienteList = resultData.data;
      });
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

  guardarRelacion() {
    if (this.userId["tipoUsuario"] == 3) {
      let bodyData = {
        "idCliente": this.idCliente,
        "placaVehiculo": this.placa
      }
      this.http.post("http://localhost:8085/api/clientevehiculo/add", bodyData).subscribe((resultData: any) => {
        console.log(resultData);
        alert(resultData.message);
        this.getAll();/*  */
      })
    }else{
      let bodyData = {
        "idCliente": this.idCliente,
        "placaVehiculo": this.placa
      }
      this.http.post("http://localhost:8085/api/clientevehiculo/add", bodyData).subscribe((resultData: any) => {
        console.log(resultData);
        alert(resultData.message);
        this.getAll();/*  */
      })
    }
  }

  guardarVehiculo() {
    let bodyData = {
      "placa": this.placa,
      "tipoVehiculo": this.tipoVehiculo,
      "capacidadPasajeros": this.capacidadPasajeros,
      "descripcion": this.descripcion,
      "modelo": this.modelo,
      "marca": this.marca,
      "estado": this.estado,
      "idCliente": this.idCliente
    };
    console.log(bodyData);
    this.http.post("http://localhost:8085/api/vehiculo/add", bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      alert(resultData.message);
      this.guardarRelacion();
      this.getAll();
    })
  }

}
