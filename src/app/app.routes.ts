import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "",
        loadComponent: () => import("./features/tasks/tasks").then(m => m.Tasks)
    }
];
