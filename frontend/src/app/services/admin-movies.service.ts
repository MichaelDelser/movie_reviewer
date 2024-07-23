import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AdminMoviesService {
  private apiUrl = environment.apiUrl+'/media'; // Adjust this based on your backend route

  constructor(private http: HttpClient) {}

  getAllMedia(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getMediaById(id: string): Observable<any> {
    console.log('Requesting media with ID:', id); // Log the requested ID
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addMedia(media: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, media);
  }

  deleteMedia(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  blacklistMedia(id: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/blacklist/${id}`, {});
  }

  unblacklistMedia(id: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/unblacklist/${id}`, {});
  }

  getBlacklistedByIds(ids: string[]): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/blacklisted`, { ids });
  }
}
