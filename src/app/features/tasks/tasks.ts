import { Component, computed, signal } from '@angular/core';
import { TaskModel } from '../../core/models/tasks.model';

@Component({
  selector: 'app-tasks',
  imports: [],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {
  protected tasks = signal<Array<TaskModel>>([]);
  protected categories = [
    "Trabalho",
    "Estudo",
    "Organização"
  ]
  


  addTask(task: string, category: string){
    const newTask: TaskModel = {
      titulo : task,
      categoria : category
    } 
    this.tasks().push(newTask);
  }

  removeTask(task: TaskModel){
    this.tasks.update( value => value.filter( item => item !== task) );
  }

  checkTask(task: string){
  }

  checkCategory(category: string): number{
    return this.tasks().filter(item => item.categoria === category).length;
  }
}
