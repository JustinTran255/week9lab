import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css'],
})
export class ActorComponent implements OnInit {

  actorsDB: any[] = [];
  moviesDB: any[] = [];
  movieTitle: string = '';
  movieYear: number = 0;
  deleteYear: number = 0;
  section = 1;
  fullName: string = '';
  bYear: number = 0;
  actorId: string = '';
  mID: string = '';
  aID: string = '';

  constructor(private dbService: DatabaseService) {

  }
  // Get all Actors
  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }
  // Create a new Actor, POST request
  onSaveActor() {
    const obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.createActor(obj).subscribe(result => {
      this.onGetActors();
    });
  }
  // Update an Actor
  onSelectUpdate(item) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }
  onUpdateActor() {
    const obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.updateActor(this.actorId, obj).subscribe(result => {
      this.onGetActors();
    });
  }
  // Delete Actor
  onDeleteActor(item) {
    this.dbService.deleteActor(item._id).subscribe(result => {
      this.onGetActors();
    });
  }
  // This lifecycle callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
    this.onGetActors();
    this.onGetMovies();
  }
  changeSection(sectionId) {
    this.section = sectionId;
    this.resetValues();
  }
  resetValues() {
    this.fullName = '';
    this.bYear = 0;
    this.actorId = '';
    this.movieTitle = '';
    this.movieYear = 0;
  }

  // Get all Movies
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }
  // Create a new Movie, POST request
  onSaveMovie() {
    const obj = { title: this.movieTitle, year: this.movieYear };
    this.dbService.createMovie(obj).subscribe(result => {
      this.onGetMovies();
    });
  }
  onDeleteMovie(id) {
    let i = 0;
    while (i < this.moviesDB.length)  {
      if (this.moviesDB[i].year > this.movieYear) {
        this.moviesDB.splice(i, 1);
      } else {
        i++;
      }
    }
  }

  onAddActor() {
    const obj = {movieID: this.mID, actorID: this.aID};
    this.dbService.addActor(obj).subscribe(result => {
      this.onGetMovies();
    });
  }
}
