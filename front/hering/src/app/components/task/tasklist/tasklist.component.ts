import { Component, inject } from '@angular/core';
import { Task } from '../../../models/task';
import { TaskService } from '../../../services/task.service';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../auth/login.service';

@Component({
  selector: 'app-tasklist',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './tasklist.component.html',
  styleUrl: './tasklist.component.scss'
})
export class TasklistComponent {

  taskList: Task[] = [];
  totalItems: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 5;

  taskService = inject(TaskService);

  constructor(private loginService: LoginService) {
    this.findAll();  // Inicializa a carga das tarefas
  }

  // Função para buscar todas as tarefas com paginação
  findAll() {
    this.taskService.findAll(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.taskList = response.content;
        this.totalItems = response.totalElements;
        this.totalPages = response.totalPages;
      },
      error: (erro) => {
        Swal.fire("Ops, temos um erro: " + erro.error);
      }
    });
  }

  delete(task: Task) {
    Swal.fire({
      title: 'Deseja excluir esta task?',
      icon: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'OK',
      showCancelButton: true,
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.taskService.delete(task.id).subscribe({
          next: () => {
            Swal.fire('Task excluído com sucesso!', '', 'success');
            this.findAll();
          },
          error: (erro) => {
            Swal.fire('Erro ao excluir task', '', 'error');
          }
        });
      }
    });
  }

  // Função para navegar para a próxima página
  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.findAll();
    }
  }

  // Função para navegar para a página anterior
  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.findAll();
    }
  }

  // Função para navegar para uma página específica
  goToPage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.findAll();
    }
  }
  getPagination(): number[] {
    const pages = [];
    for (let i = 0; i < this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  trackByFn(index: number, item: Task): string {
    return item.id; // Identifica cada item pelo ID
  }
  canEditOrDelete(): boolean {
    return this.loginService.isAdmin();
  }

  updateCompleted(task: Task) {
    console.log(task.completed);
    this.taskService.updateTaskComplete(task).subscribe({
      next: updatedTask => {
        const Toast = Swal.mixin({
          toast: true,
          position: "bottom",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "Task Atualizada"
        });
        console.log('Task updated:', updatedTask);
      },
      error: err => {
        console.error('Error updating task:', err);
        task.completed = !task.completed; // Reverte em caso de erro
      }
    });
  }
}
