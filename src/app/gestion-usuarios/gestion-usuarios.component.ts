import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css']
})
export class GestionUsuariosComponent implements OnInit {
  searchTerm: string = '';
  clientesFiltrados: any[] = [];

  pageSize: number = 7;
  totalPages: number = 0;
  currentPage: number = 1;

  //Inicializacion de atributos del cliente
  clienteId = "";
  nombre: string = "";
  fechaNacimiento: string = "";
  telefono: string = "";
  correo: string = "";
  contrasenia: string = "";
  tipoUsuario = "";
  ciudadResidencia: string = "";
  direccion: string = "";
  idSede = "";

  clientesList: any[] = [];

  clienteEditando: any = {};
  mecSelected: { [placa: string]: boolean } = {};
  sedesList: any[] = [];

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    // Inicializar mecSelected con todas las placas de vehículos
    this.clientesList.forEach(vehiculo => {
      this.mecSelected[vehiculo.id] = false;
    });
    this.getAll();
  }

  //Obtencion de todos los clientes
  getAll() {
    this.http.get("http://localhost:8085/api/cliente")
      .subscribe((resultData: any) => {
        this.clientesList = resultData.data;
        this.updateTotalPages();
        this.cdr.detectChanges();
      });
  //Obtencion de todas las sedes
    this.http.get("http://localhost:8085/api/sede")
      .subscribe((resultData: any) => {
        this.sedesList = resultData.data;
      });
  }


  eliminarSeleccionados() {
    const idsToDelete = this.vehiculosSeleccionados;
  
    console.log(idsToDelete);
  
    if (idsToDelete.length === 0) {
      alert('Por favor, selecciona al menos un vehiculo para eliminar.');
      return;
    }
  
    this.http.post("http://localhost:8085/api/cliente/delete-multiple", { ids: idsToDelete })
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

  resetSelection() {
    this.mecSelected = {};
    this.clientesList.forEach(vehiculo => {
      this.mecSelected[vehiculo.id] = false;
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

  editarcliente(cliente: any) {
    this.clienteEditando = { ...cliente }; // Clona el objeto para evitar modificar directamente la lista
  }

  guardarEdicion() {
    this.clienteId = this.clienteEditando.id;
    this.nombre = this.clienteEditando.nombre;
    this.fechaNacimiento = this.clienteEditando.fechaNacimiento;
    this.telefono = this.clienteEditando.telefono;
    this.correo = this.clienteEditando.correo;
    this.contrasenia = this.clienteEditando.contrasenia;
    this.tipoUsuario = this.clienteEditando.tipoUsuario;
    this.ciudadResidencia = this.clienteEditando.ciudadResidencia;
    this.direccion = this.clienteEditando.direccion;
    this.idSede = this.clienteEditando.idSede;

    let bodyData =
    {
      "nombre": this.nombre,
      "fechaNacimiento": this.fechaNacimiento,
      "telefono": this.telefono,
      "correo": this.correo,
      "contrasenia": this.contrasenia,
      "tipoUsuario": this.tipoUsuario,
      "ciudadResidencia": this.ciudadResidencia,
      "direccion": this.direccion,
      "idSede": this.idSede
    }

    this.http.put("http://localhost:8085/api/cliente/update" + "/" + this.clienteId, bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      alert("cliente Update");
      this.getAll();
    })
    // Restablece la variable de edición después de guardar
    this.clienteEditando = null;
  }

  guardarCreacion() {
    let bodyData =
    {
      "nombre": this.nombre,
      "fechaNacimiento": this.fechaNacimiento,
      "telefono": this.telefono,
      "correo": this.correo,
      "contrasenia": this.contrasenia,
      "tipoUsuario": 2,
      "ciudadResidencia": this.ciudadResidencia,
      "direccion": this.direccion,
      "idSede": this.idSede
    }
    this.http.post("http://localhost:8085/api/cliente/add", bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Usuario Registrado con exito");
      this.getAll();
    })
  }
  obtenerNombreSede(idSede: string): string {
    const sede = this.sedesList.find(sede => sede.id === idSede);
    return sede ? sede.nombre : 'Nombre no encontrado';
  }
  paginateVehiculos() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.clientesList.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateTotalPages(); // Agrega esta línea para actualizar el total de páginas
    }
  }
  updateTotalPages() {
    this.totalPages = Math.ceil(this.clientesList.length / this.pageSize);
  }
  generatePageArray(totalPages: number): number[] {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
}
