import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { Task } from '../../../models/task';
import { TaskService } from '../../../services/task.service';
import Swal from 'sweetalert2';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';


@Component({
  selector: 'app-taskdetail',
  standalone: true,
  imports: [RouterModule, FormsModule, MdbFormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './taskdetail.component.html',
  styleUrl: './taskdetail.component.scss'
})
export class TaskdetailComponent {

  task: Task = new Task;
  taskService = inject(TaskService);
  router = inject(ActivatedRoute);
  routerRedirect = inject(Router);
  submitted = false;
  taskForm!: FormGroup;

  ngOnInit() {
    let id = this.router.snapshot.params["id"];
    console.log(id);

    this.task.date = this.formatDate(new Date());
    if (id != null && id.trim() !== '') {
      this.findById(id);
      console.log("buscando task");
    }
    this.createForm(this.task);
  }

  constructor() {
  }

  createForm(task: Task) {
    this.taskForm = new FormGroup(
      {
        id: new FormControl(task.id),
        title: new FormControl(task.title, [Validators.required]),
        description: new FormControl(task.description, [Validators.required]),
        date: new FormControl(task.date),
        completed: new FormControl(task.completed)
      }
    )
  }

  findById(id: string) {
    this.taskService.findById(id).subscribe({
      next: data => {
        this.task = data;
        this.taskForm.patchValue(this.task);
      },
      error: erro => {
        alert("Erro ao carregar o Task.");
      }
    });
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  save() {
    if (this.taskForm.valid) {
      // Obtém os valores do formulário
      this.task = this.taskForm.value;

      // Verifica se é uma atualização ou criação
      if (this.task.id != null && this.task.id.trim() !== '') {
        // Atualizar tarefa existente
        this.taskService.update(this.task.id, this.task).subscribe({
          next: () => {
            this.showToast('success', 'Task Atualizada com sucesso!');
            this.routerRedirect.navigate(["/admin/tasks"]);
          },
          error: (erro) => {
            console.error('Erro ao atualizar a tarefa', erro);
            alert("Erro ao atualizar a tarefa.");
          }
        });
      } else {
        // Criar nova tarefa
        this.taskService.save(this.task).subscribe({
          next: () => {
            this.showToast('success', 'Task criada com sucesso!');
            this.routerRedirect.navigate(["/admin/tasks"]);
          },
          error: (erro) => {
            console.error('Erro ao salvar a tarefa', erro);
            this.showToast('error', ' Problema ao criar Task, fale com o suporte!');
          }
        });
      }
    } else {

      this.showToast('error', 'Por favor, preencha todos os campos obrigatórios.');

    }
  }

  // Método para exibir notificações
  private showToast(icon: 'success' | 'error', message: string) {
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
      icon: icon,
      title: message
    });
  }


}
