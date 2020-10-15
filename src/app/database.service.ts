import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private http: HttpClient) {}
  result: any;
  getActors() {
    return this.http.get('/actors');
  }
  getActor(id: string) {
    let url = '/actors/' + id;
    return this.http.get(url);
  }
  createActor(data) {
    return this.http.post('/actors', data, httpOptions);
  }
  updateActor(id, data) {
    let url = '/actors/' + id;
    return this.http.put(url, data, httpOptions);
  }
  deleteActor(id) {
    let url = '/actors/' + id;
    return this.http.delete(url, httpOptions);
  }

  getMovies() {
    return this.http.get('/movies');
  }
  createMovie(data) {
    return this.http.post('/movies', data, httpOptions);
  }
  addActor(data) {
    return this.http.put('/movies/' + data.movieID + '/' + data.actorID, httpOptions);
  }

  deleteMovie(data) {
    let url = '/movies/' + data;
    return this.http.delete(url, httpOptions);
  }
}
