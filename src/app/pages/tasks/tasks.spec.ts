import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task';
import { AuthService } from '../../services/auth';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css'
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [];
  newTaskTitle = '';
  newTaskDescription = '';

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.list().subscribe({
      next: (page) => this.tasks = page.content,
      error: (err) => console.error('Erro ao carregar tarefas:', err)
    });
  }

  createTask(): void {
    if (!this.newTaskTitle.trim()) return;

    this.taskService.create({
      title: this.newTaskTitle,
      description: this.newTaskDescription
    }).subscribe({
      next: () => {
        this.newTaskTitle = '';
        this.newTaskDescription = '';
        this.loadTasks();
      },
      error: (err) => console.error('Erro ao criar tarefa:', err)
    });
  }

  deleteTask(id: number): void {
    this.taskService.delete(id).subscribe({
      next: () => this.loadTasks(),
      error: (err) => console.error('Erro ao deletar tarefa:', err)
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}