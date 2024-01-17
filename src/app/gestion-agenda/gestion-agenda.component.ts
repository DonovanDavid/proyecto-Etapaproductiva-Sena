import { Component } from '@angular/core';

@Component({
  selector: 'app-gestion-agenda',
  templateUrl: './gestion-agenda.component.html',
  styleUrls: ['./gestion-agenda.component.css']
})
export class GestionAgendaComponent {

  mecSelected: boolean[] = [];
  mecanicoEditando: any = null;
  
  mecanicos = [
    { id: 1, nombre: 'John Doe', especialidad: 'Mecánica General', experiencia: '10 años' },
    { id: 2, nombre: 'Jane Smith', especialidad: 'Frenos', experiencia: '8 años' },
    // Agrega más mecánicos según sea necesario
  ];

  eliminarSeleccionados() {
    // Elimina los elementos seleccionados
    this.mecanicos = this.mecanicos.filter((_, i) => !this.mecSelected[i]);
    // Limpia la lista de elementos seleccionados
    this.mecSelected = [];
  }

  editarMecanico(mecanico: any) {
    this.mecanicoEditando = { ...mecanico }; // Clona el objeto para no modificar directamente la lista
  }

  guardarEdicion() {
    // Implementa la lógica para guardar la edición (por ejemplo, una llamada a una API)
    // ...

    // Restablece la variable de edición después de guardar
    this.mecanicoEditando = null;
  }
}
