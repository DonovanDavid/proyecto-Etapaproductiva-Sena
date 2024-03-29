import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-solicitar-servicio',
  templateUrl: './solicitar-servicio.component.html',
  styleUrls: ['./solicitar-servicio.component.css']
})
export class SolicitarServicioComponent implements OnInit {

  @Input() userId: any;
  vehiculosList: any[] = [];
  receivedMessage = "";


  vehiculo: string = "";
  mecanico: string | null = null;
  fecha: string = "";
  hora: string = "";
  estado: string = "";
  observaciones: string = "";

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    console.log("aquiii", this.userId);
    //Obtencion de todos los vehiculos
    if (this.userId["tipoUsuario"] == 3) {
      this.http.get("http://localhost:8085/api/clientevehiculo" + "/" + this.userId["id"])
        .subscribe((resultData: any) => {
          this.vehiculosList = resultData.data;
        });
    } else {
      this.http.get("http://localhost:8085/api/vehiculo")
      .subscribe((resultData: any) => {
        this.vehiculosList = resultData.data;
      });
    }
  }
  obtenerNombrevehiculo(idvehiculo: string): string {
    const vehiculo = this.vehiculosList.find(vehiculo => vehiculo.placa === idvehiculo);
    return vehiculo ? vehiculo.placa : 'Nombre no encontrado';
  }

  receiveMessage(message: any) {
    this.receivedMessage = message;
  }

  guardarRevision() {
    // Asegura que mecanico sea nulo si no se proporciona
    const mecanicoToSend = this.mecanico ? this.mecanico : null;

    let bodyData = {
      "vehiculo": this.vehiculo,
      "mecanico": mecanicoToSend,
      "fecha": this.receivedMessage,
      "hora": this.hora,
      "estado": 1,
      "observaciones": this.observaciones
    };
    console.log(bodyData);
    this.http.post("http://localhost:8085/api/revision/add", bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      alert(resultData.message);
      this.getAll();
    })
  }
}
