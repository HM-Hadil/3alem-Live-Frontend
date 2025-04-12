import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LoginUser } from '../auth/models/LoginUser';
import { AuthResponse } from '../auth/models/AuthResponse';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private tokenKey = '3alem_live_token';
  private refreshTokenKey = '3alem_live_refresh_token';
  private userKey = '3alem_live_user';

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser$: Observable<any>;

  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(this.getUserFromStorage());
    this.currentUser$ = this.currentUserSubject.asObservable();

    // Auto-login si un token valide existe
    this.autoLogin();
  }

  login(loginData: LoginUser): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, loginData)
      .pipe(
        tap(response => this.handleAuthentication(response, loginData.rememberMe)),
        catchError(this.handleError)
      );
  }

  logout(): void {
    // Effacer le token et les informations utilisateur
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.userKey);

    // Effacer les cookies si utilisés
    this.clearAuthCookies();

    // Mettre à jour l'observable
    this.currentUserSubject.next(null);

    // Effacer le timer d'expiration
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }

    // Rediriger vers la page de login
    this.router.navigate(['/login']);
  }

  autoLogin(): void {
    const userData = this.getUserFromStorage();

    if (!userData) {
      return;
    }

    const token = this.getToken();
    if (token && !this.isTokenExpired(token)) {
      this.currentUserSubject.next(userData);

      // Configurer le timer d'expiration si nécessaire
      const expirationDate = this.getTokenExpirationDate(token);
      if (expirationDate) {
        const expiresIn = expirationDate.getTime() - new Date().getTime();
        this.autoLogout(expiresIn);
      }
    } else {
      this.refreshToken();
    }
  }

  autoLogout(expirationDuration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.refreshToken();
    }, expirationDuration);
  }

  refreshToken(): void {
    const refreshToken = localStorage.getItem(this.refreshTokenKey);

    if (!refreshToken) {
      this.logout();
      return;
    }

    this.http.post<AuthResponse>(`${this.apiUrl}/auth/refresh-token`, { refreshToken })
      .pipe(
        tap(response => this.handleAuthentication(response, true)),
        catchError(() => {
          this.logout();
          return throwError(() => new Error('Erreur de rafraîchissement du token'));
        })
      ).subscribe();
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  getToken(): string | null {
    // Essayer de récupérer depuis localStorage
    let token = localStorage.getItem(this.tokenKey);

    // Si pas trouvé, essayer les cookies
    if (!token) {
      token = this.getCookie(this.tokenKey);
    }

    return token;
  }

  private handleAuthentication(response: AuthResponse, rememberMe?: boolean): void {
    const { token, refreshToken, expiresIn, user } = response;

    // Stocker le token et les informations utilisateur
    if (rememberMe) {
      // Stocker dans localStorage pour une session persistante
      localStorage.setItem(this.tokenKey, token);
      if (refreshToken) {
        localStorage.setItem(this.refreshTokenKey, refreshToken);
      }
      localStorage.setItem(this.userKey, JSON.stringify(user));
    } else {
      // Stocker dans les cookies pour une session temporaire
      this.setCookie(this.tokenKey, token, expiresIn ? expiresIn : 86400); // 1 jour par défaut
      if (refreshToken) {
        this.setCookie(this.refreshTokenKey, refreshToken, 604800); // 7 jours
      }
      // Aussi dans localStorage pour un accès facile
      localStorage.setItem(this.userKey, JSON.stringify(user));
    }

    // Mettre à jour l'observable
    this.currentUserSubject.next(user);

    // Configurer le timer d'expiration
    if (expiresIn) {
      this.autoLogout(expiresIn * 1000); // convertir en millisecondes
    }
  }

  private getUserFromStorage(): any {
    const userStr = localStorage.getItem(this.userKey);
    if (!userStr || userStr === 'undefined') {
      return null;
    }

    try {
      return JSON.parse(userStr);
    } catch (e) {
      console.error('Erreur de parsing JSON du user:', e);
      return null;
    }
  }


  private isTokenExpired(token: string): boolean {
    const expiry = this.getTokenExpirationDate(token);
    return expiry ? expiry <= new Date() : true;
  }

  private getTokenExpirationDate(token: string): Date | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp) {
        return new Date(payload.exp * 1000); // convertir en millisecondes
      }
    } catch (e) {
      console.error('Erreur lors du décodage du token JWT', e);
    }
    return null;
  }

  private setCookie(name: string, value: string, expireDays: number): void {
    const d = new Date();
    d.setTime(d.getTime() + (expireDays * 24 * 60 * 60 * 1000));
    const expires = `expires=${d.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/;SameSite=Strict;Secure`;
  }

  private getCookie(name: string): string | null {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  }

  private clearAuthCookies(): void {
    document.cookie = `${this.tokenKey}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Strict;Secure`;
    document.cookie = `${this.refreshTokenKey}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Strict;Secure`;
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur s\'est produite.';

    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Erreur: ${error.error.message}`;
    } else if (error.status) {
      // Erreur côté serveur
      switch (error.status) {
        case 401:
          errorMessage = 'Identifiants incorrects. Veuillez réessayer.';
          break;
        case 403:
          errorMessage = 'Accès non autorisé.';
          break;
        case 404:
          errorMessage = 'Service non trouvé.';
          break;
        case 500:
          errorMessage = 'Erreur serveur. Veuillez réessayer plus tard.';
          break;
        default:
          errorMessage = `Erreur ${error.status}: ${error.error.message || error.statusText}`;
      }
    }

    return throwError(() => new Error(errorMessage));
  }
}
