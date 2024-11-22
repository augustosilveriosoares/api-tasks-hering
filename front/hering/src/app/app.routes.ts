import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { TasklistComponent } from './components/task/tasklist/tasklist.component';
import { TaskdetailComponent } from './components/task/taskdetail/taskdetail.component';



export const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: 'full' },
  { path: "login", component: LoginComponent },
  {
    path: "admin", component: PrincipalComponent, children: [
      { path: "tasks", component: TasklistComponent },
      { path: "tasks/new", component: TaskdetailComponent },
      { path: "tasks/edit/:id", component: TaskdetailComponent },
  ] },
];
