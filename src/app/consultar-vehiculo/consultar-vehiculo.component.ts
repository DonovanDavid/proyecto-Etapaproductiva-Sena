import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-consultar-vehiculo',
  templateUrl: './consultar-vehiculo.component.html',
  styleUrls: ['./consultar-vehiculo.component.css']
})
export class ConsultarVehiculoComponent implements OnInit {
  searchTerm: string = '';
  mecanicosFiltrados: any[] = [];

  @Input() userId: any;

  pageSize: number = 7;
  totalPages: number = 0;
  currentPage: number = 1;

  marcaList: any[] = [];
  tipoVehiculoList: any[] = [];

  nombre: string = "";


  placa: string = "";
  tipoVehiculo = "";
  capacidadPasajeros = "";
  descripcion: string = "";
  modelo = "";
  marca = "";
  estado = "";
  idCliente = "";

  vehiculosList: any[] = [];

  mecanicoEditando: any = {};
  mecSelected: { [placa: string]: boolean } = {};
  sedesList: any[] = [];
  clientesList: any[] = [];

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    // Inicializar mecSelected con todas las placas de vehículos
    this.vehiculosList.forEach(vehiculo => {
      this.mecSelected[vehiculo.placa] = false;
    });

    this.getAll();
  }

  //Obtencion de todos los vehiculos
  getAll() {
    if (this.userId["tipoUsuario"] == 3) {
      this.http.get("http://localhost:8085/api/vehiculos/cliente" + "/" + this.userId["id"])
        .subscribe((resultData: any) => {
          this.vehiculosList = resultData.data;
          this.updateTotalPages();
          this.resetSelection();
          this.cdr.detectChanges();

          // Inicializar mecSelected con todas las placas de vehículos
          this.vehiculosList.forEach(vehiculo => {
            this.mecSelected[vehiculo.placa] = false;
          });
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
      //Obtencion de todos los clientes
      this.http.get("http://localhost:8085/api/cliente")
        .subscribe((resultData: any) => {
          this.clientesList = resultData.data;
        });
    } else {

      this.http.get("http://localhost:8085/api/vehiculo")
        .subscribe((resultData: any) => {
          this.vehiculosList = resultData.data;
          this.updateTotalPages();
          this.resetSelection();
          this.cdr.detectChanges();

          // Inicializar mecSelected con todas las placas de vehículos
          this.vehiculosList.forEach(vehiculo => {
            this.mecSelected[vehiculo.placa] = false;
          });
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
      //Obtencion de todos los clientes
      this.http.get("http://localhost:8085/api/cliente")
        .subscribe((resultData: any) => {
          this.clientesList = resultData.data;
        });
    }
  }

  eliminarSeleccionados() {
    const idsToDelete = this.vehiculosSeleccionados;

    console.log(idsToDelete);

    if (idsToDelete.length === 0) {
      alert('Por favor, selecciona al menos un vehiculo para eliminar.');
      return;
    }

    this.http.post("http://localhost:8085/api/vehiculo/delete-multiple", { ids: idsToDelete })
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
    this.placa = this.mecanicoEditando.placa;
    this.tipoVehiculo = this.mecanicoEditando.tipoVehiculo;
    this.capacidadPasajeros = this.mecanicoEditando.capacidadPasajeros;
    this.descripcion = this.mecanicoEditando.descripcion;
    this.modelo = this.mecanicoEditando.modelo;
    this.marca = this.mecanicoEditando.marca;
    this.idCliente = this.mecanicoEditando.idCliente;

    let bodyData =
    {
      "placa": this.placa,
      "tipoVehiculo": this.tipoVehiculo,
      "capacidadPasajeros": this.capacidadPasajeros,
      "descripcion": this.descripcion,
      "modelo": this.modelo,
      "marca": this.marca,
      "estado": this.estado,
      "idCliente": this.idCliente
    }
    console.log(bodyData);
    this.http.put("http://localhost:8085/api/vehiculo/update" + "/" + this.placa, bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Vehiculo Update");
      this.getAll();
    })
    // Restablece la variable de edición después de guardar
    this.mecanicoEditando = null;
  }

  guardarCreacion() {
    let bodyData = {
      "placa": this.placa,
      "tipoVehiculo": this.tipoVehiculo,
      "capacidadPasajeros": this.capacidadPasajeros,
      "descripcion": this.descripcion,
      "modelo": this.modelo,
      "marca": this.marca,
      "estado": this.estado,
      "idCliente": this.userId["id"]
    };
    console.log(bodyData);
    this.http.post("http://localhost:8085/api/vehiculo/add", bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      alert(resultData.message);
      this.getAll();
    })
  }
  obtenerNombreCliente(idCliente: string): string {
    const Cliente = this.clientesList.find(Cliente => Cliente.id === idCliente);
    return Cliente ? Cliente.nombre : 'Nombre no encontrado';
  }
  obtenerNombreTipoVehiculo(idTipoVehiculo: string): string {
    const TipoVehiculo = this.tipoVehiculoList.find(TipoVehiculo => TipoVehiculo.id === idTipoVehiculo);
    return TipoVehiculo ? TipoVehiculo.nombre : 'Nombre no encontrado';
  }
  obtenerNombreMarca(idCliente: string): string {
    const Marca = this.marcaList.find(Marca => Marca.id === idCliente);
    return Marca ? Marca.nombre : 'Nombre no encontrado';
  }

  resetSelection() {
    this.mecSelected = {};
    this.vehiculosList.forEach(vehiculo => {
      this.mecSelected[vehiculo.placa] = false;
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
    const paginatedVehiculos = this.vehiculosList.slice(startIndex, endIndex);
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
    this.totalPages = Math.ceil(this.vehiculosList.length / this.pageSize);
  }
  generatePageArray(totalPages: number): number[] {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
}