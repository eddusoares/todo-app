import { Component, computed, effect, signal } from '@angular/core';
import { TaskModel } from '../../core/models/tasks.model';

@Component({
  selector: 'app-tasks',
  imports: [],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {
  protected tasks = signal<TaskModel[]>(
    JSON.parse(localStorage.getItem('tasks') || '[]')
  );

  protected groupedTasks = computed(()=>
    this.categories.map(category => ({
      name: category,
      tasks: this.tasks().filter( task => task.categoria === category)
    }))
  )
  protected categories = [
    "Trabalho",
    "Estudo",
    "Organização"
  ]

  constructor() {
    effect(() => {
      localStorage.setItem('tasks', JSON.stringify(this.tasks()));
    })
  }
  


  addTask(task: string, category: string){
    const count = this.tasks().length + 1;
    const newTask: TaskModel = {
      id: count,
      titulo : task,
      categoria : category,
      completed: false
    } 
    this.tasks.update( value => [...value, newTask]);
  }

  removeTask(task: TaskModel){
    this.tasks.update( value => value.filter( item => item !== task) );
  }

  checkTask(task: TaskModel){
    this.tasks.update(value =>
    value.map(t => t === task ? { ...t, completed: !t.completed } : t)
  );
  }

}
