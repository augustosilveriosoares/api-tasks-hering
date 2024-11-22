import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { LoginService } from '../../../auth/login.service';
import { Login } from '../../../auth/login';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MdbFormsModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  usuario!: string;
  senha!: string;
  router = inject(Router);
  loginService = inject(LoginService);
  login: Login = new Login;

  constructor() {

    this.loginService.removerToken();
  }

  sair() {
    this.loginService.removerToken();
    this.router.navigate(["/login"]);
  }

  logar() {
    this.loginService.logar(this.login).subscribe({
      next:token => {
        this.loginService.addToken(token);
        this.router.navigate(["/admin/tasks"]);
      },
      error: error => {

           Swal.fire('Não autorizado, verifique seus dados e tente novamente');

      }
    })
  }

}
