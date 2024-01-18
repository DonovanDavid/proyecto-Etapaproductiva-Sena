import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-gestion-mecanicos',
  templateUrl: './gestion-mecanicos.component.html',
  styleUrls: ['./gestion-mecanicos.component.css']
})
export class GestionMecanicosComponent implements OnInit {
  searchTerm: string = '';
  mecanicosFiltrados: any[] = [];

  
  pageSize: number = 7;
  totalPages: number = 0;
  currentPage: number = 1;

  //Inicializacion de atributos del mecanico
  mecanicoId = "";
  nombre: string = "";
  fechaNacimiento: string = "";
  telefono: string = "";
  correo: string = "";
  contrasenia: string = "";
  tipoUsuario = "";
  nivelEstudios: string = "";
  direccion: string = "";
  idSede = "";

  mecanicosList: any[] = [];

  mecanicoEditando: any = {};
  mecSelected: boolean[] = [];
  sedesList: any[] = [];

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.getAll();
  }

  //Obtencion de todos los mecanicos
  getAll() {
    console.log('Antes de obtener los datos');
    this.http.get("http://localhost:8085/api/mecanico")
      .subscribe((resultData: any) => {
        console.log('Después de obtener los datos', resultData.data);
        this.mecanicosList = resultData.data;
        this.updateTotalPages();
        console.log('mecanicosList:', this.mecanicosList);
        this.cdr.detectChanges();
      });
  //Obtencion de todas las sedes
    this.http.get("http://localhost:8085/api/sede")
      .subscribe((resultData: any) => {
        this.sedesList = resultData.data;
      });
  }


  eliminarSeleccionados() {
    // Obtén los IDs de los elementos seleccionados
    const idsToDelete = this.mecanicosList
      .map((mecanico, index) => this.mecSelected[index] ? mecanico.id : null)
      .filter(id => id !== null);

    console.log(idsToDelete);

    if (idsToDelete.length === 0) {
      alert('Por favor, selecciona al menos un mecánico para eliminar.');
      return;
    }

    // Realiza la solicitud para eliminar los mecánicos seleccionados
    this.http.post("http://localhost:8085/api/mecanico/delete-multiple", { ids: idsToDelete })
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
    this.mecanicoId = this.mecanicoEditando.id;
    this.nombre = this.mecanicoEditando.nombre;
    this.fechaNacimiento = this.mecanicoEditando.fechaNacimiento;
    this.telefono = this.mecanicoEditando.telefono;
    this.correo = this.mecanicoEditando.correo;
    this.contrasenia = this.mecanicoEditando.contrasenia;
    this.tipoUsuario = this.mecanicoEditando.tipoUsuario;
    this.nivelEstudios = this.mecanicoEditando.nivelEstudios;
    this.direccion = this.mecanicoEditando.direccion;
    this.idSede = this.mecanicoEditando.idSede;

    let bodyData =
    {
      "nombre": this.nombre,
      "fechaNacimiento": this.fechaNacimiento,
      "telefono": this.telefono,
      "correo": this.correo,
      "contrasenia": this.contrasenia,
      "tipoUsuario": this.tipoUsuario,
      "nivelEstudios": this.nivelEstudios,
      "direccion": this.direccion,
      "idSede": this.idSede
    }

    this.http.put("http://localhost:8085/api/mecanico/update" + "/" + this.mecanicoId, bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Mecanico Update");
      this.getAll();
    })
    // Restablece la variable de edición después de guardar
    this.mecanicoEditando = null;
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
      "nivelEstudios": this.nivelEstudios,
      "direccion": this.direccion,
      "idSede": this.idSede
    }
    this.http.post("http://localhost:8085/api/mecanico/add", bodyData).subscribe((resultData: any) => {
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
    return this.mecanicosList.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateTotalPages(); // Agrega esta línea para actualizar el total de páginas
    }
  }
  updateTotalPages() {
    this.totalPages = Math.ceil(this.mecanicosList.length / this.pageSize);
  }
  generatePageArray(totalPages: number): number[] {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
}