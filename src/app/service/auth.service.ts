import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuthenticated : boolean = false;
 
  // Simulate a login
  login(username: string, password: string): boolean {
    if (username === 'admin@gmail.com' && password === 'admin') {
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }
 
  // Simulate a logout
  logout(): void {
    this.isAuthenticated = false;
  }
 
  // Check if the user is authenticated
  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}
