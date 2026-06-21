import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { TasksComponent } from './pages/tasks/tasks';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'tasks', component: TasksComponent, canActivate: [authGuard] }
];
