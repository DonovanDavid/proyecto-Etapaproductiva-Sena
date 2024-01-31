import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestion-agenda',
  templateUrl: './gestion-agenda.component.html',
  styleUrls: ['./gestion-agenda.component.css']
})
export class GestionAgendaComponent implements OnInit {
  searchTerm: string = '';
  mecanicosFiltrados: any[] = [];

  @Input() userId: any;

  pageSize: number = 7;
  totalPages: number = 0;
  currentPage: number = 1;

  marcaList: any[] = [];
  tipoVehiculoList: any[] = [];

  nombre: string = "";

  idRevision = "";
  vehiculo: string = "";
  mecanico: string | null = null;
  fecha: string = "";
  hora: string = "";
  estado: string = "";
  observaciones: string = "";

  vehiculosList: any[] = [];
  revisionesList: any[] = [];
  mecanicosList: any[] = [];

  mecanicoEditando: any = {};
  mecSelected: { [placa: string]: boolean } = {};
  sedesList: any[] = [];
  clientesList: any[] = [];

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {

    this.getAll();
  }

  //Obtencion de todos las revisiones
  getAll() {

    if (this.userId["tipoUsuario"] == 1) {
      console.log("jefe")
      this.http.get("http://localhost:8085/api/revision")
        .subscribe((resultData: any) => {
          this.revisionesList = resultData.data;
          console.log(this.revisionesList);
          this.updateTotalPages();
          this.resetSelection();
          this.cdr.detectChanges();

          // Inicializar mecSelected con todas las placas de vehículos
          this.revisionesList.forEach(vehiculo => {
            this.mecSelected[vehiculo.idRevision] = false;
          });
        });
    } else {
      if (this.userId["tipoUsuario"] == 2) {
        console.log("mecanico");
        this.http.get("http://localhost:8085/api/revision/mecanico" + "/" + this.userId["id"])
          .subscribe((resultData: any) => {
            this.revisionesList = resultData.data;
            this.updateTotalPages();
            this.resetSelection();
            this.cdr.detectChanges();
            // Inicializar mecSelected con todas las placas de vehículos
            this.revisionesList.forEach(vehiculo => {
              this.mecSelected[vehiculo.placa] = false;
            });
          });
      } else {
        console.log("cliente")
        this.http.get("http://localhost:8085/api/revision/cliente" + "/" + this.userId["id"])
          .subscribe((resultData: any) => {
            this.revisionesList = resultData.data;
            this.updateTotalPages();
            this.resetSelection();
            this.cdr.detectChanges();
            // Inicializar mecSelected con todas las placas de vehículos
            this.revisionesList.forEach(vehiculo => {
              this.mecSelected[vehiculo.placa] = false;
            });
          });
      }
    }
    //Obtencion de todos los vehiculos
    this.http.get("http://localhost:8085/api/mecanico")
      .subscribe((resultData: any) => {
        this.mecanicosList = resultData.data;
      });
    //Obtencion de todos los clientes
    this.http.get("http://localhost:8085/api/cliente")
      .subscribe((resultData: any) => {
        this.clientesList = resultData.data;
      });
    //Obtencion de todos los vehiculos
    this.http.get("http://localhost:8085/api/vehiculo")
      .subscribe((resultData: any) => {
        this.vehiculosList = resultData.data;
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

  eliminarSeleccionados() {
    const idsToDelete = this.vehiculosSeleccionados;

    console.log(idsToDelete);

    if (idsToDelete.length === 0) {
      alert('Por favor, selecciona al menos un vehiculo para eliminar.');
      return;
    }

    this.http.post("http://localhost:8085/api/revision/delete-multiple", { ids: idsToDelete })
      .subscribe(
        (resultData: any) => {
          console.log(resultData);
          if (resultData.status) {
            alert(resultData.message);
            this.getAll(); // Actualiza la lista después de la eliminación exitosa
          } else {
            alert(resultData.message);
          }
        },
        (error) => {
          console.error('Error en la solicitud:', error);
          alert('Error en la solicitud. Consulta la consola para más detalles.');
        }
      );
  }

  editarMecanico(mecanico: any) {
    this.mecanicoEditando = { ...mecanico }; // Clona el objeto para evitar modificar directamente la lista
  }

  guardarEdicion() {

    console.log(this.mecanicoEditando.tiposVehiculo);
    this.idRevision = this.mecanicoEditando.idRevision;
    this.vehiculo = this.mecanicoEditando.vehiculo;
    this.mecanico = this.mecanicoEditando.mecanico;
    this.fecha = this.mecanicoEditando.fecha;
    this.hora = this.mecanicoEditando.hora;
    this.estado = this.mecanicoEditando.estado;
    this.observaciones = this.mecanicoEditando.observaciones;

    let bodyData =
    {
      "vehiculo": this.vehiculo,
      "mecanico": this.mecanico,
      "fecha": this.fecha,
      "hora": this.hora,
      "estado": this.estado,
      "observaciones": this.observaciones
    }
    console.log(bodyData);
    this.http.put("http://localhost:8085/api/revision/update" + "/" + this.idRevision, bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Revision Update");
      this.getAll();
    })
    // Restablece la variable de edición después de guardar
    this.mecanicoEditando = null;
  }

  guardarCreacion() {
    const mecanicoToSend = this.mecanico ? this.mecanico : null;

    let bodyData = {
      "vehiculo": this.vehiculo,
      "mecanico": this.mecanico,
      "fecha": this.fecha,
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
  obtenerNombreCliente(idCliente: string): string {
    const Cliente = this.clientesList.find(Cliente => Cliente.id === idCliente);
    return Cliente ? Cliente.nombre : 'Nombre no encontrado';
  }
  obtenerNombreVehiculo(idTipoVehiculo: string): string {
    const TipoVehiculo = this.vehiculosList.find(TipoVehiculo => TipoVehiculo.id === idTipoVehiculo);
    return TipoVehiculo ? TipoVehiculo.placa : 'Nombre no encontrado';
  }
  obtenerNombreMecanico(idCliente: string): string {
    const Mecanico = this.mecanicosList.find(Mecanico => Mecanico.id === idCliente);
    return Mecanico ? Mecanico.nombre : 'Sin asignacion';
  }

  resetSelection() {
    this.mecSelected = {};
    this.revisionesList.forEach(vehiculo => {
      this.mecSelected[vehiculo.idRevision] = false;
    });
  }
  vehiculosSeleccionados: string[] = [];

  toggleSelection(placa: string) {
    if (this.vehiculosSeleccionados.includes(placa)) {
      this.vehiculosSeleccionados = this.vehiculosSeleccionados.filter(p => p !== placa);
    } else {
      this.vehiculosSeleccionados.push(placa);
    }
    console.log('Toggle selection:', this.vehiculosSeleccionados);
  }

  paginateVehiculos() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    const paginatedVehiculos = this.revisionesList.slice(startIndex, endIndex);
    this.resetSelection(); // Llama al método para reiniciar la selección
    return paginatedVehiculos;
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateTotalPages(); // Agrega esta línea para actualizar el total de páginas
    }
  }
  updateTotalPages() {
    this.totalPages = Math.ceil(this.revisionesList.length / this.pageSize);
  }
  generatePageArray(totalPages: number): number[] {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
}