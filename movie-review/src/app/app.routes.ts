import { Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LoginComponent } from "./components/login/login.component";
import { AuthGuard } from "./auth.guard"; // Import the guard

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];
