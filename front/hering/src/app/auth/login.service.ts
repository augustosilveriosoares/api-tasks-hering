import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Login } from './login';
import { User } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  http = inject(HttpClient);
  API = "http://localhost:8080/login";

  constructor() { }

  logar(login: Login): Observable<string> {
    return this.http.post<string>(this.API, login, {responseType: 'text' as 'json'});
  }

  addToken(token: string) {
    localStorage.setItem('token', token);
  }

  removerToken() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

jwtDecode() {
  const token = this.getToken();
  if (token) {
    const payload = jwtDecode<any>(token);
    return {
      role: payload.role,
      ...payload
    };
  }
  return null;
}

hasRole(role: string): boolean {
  const decoded = this.jwtDecode();
  return decoded?.role === role; // Verifica se o role do token corresponde
}

isAdmin(): boolean {
  return this.hasRole('ROLE_ADMIN');
}

hasPermission(role: string) {
    let user = this.jwtDecode() as User;
    if (user.role == role)
      return true;
    else
      return false;
  }


}
