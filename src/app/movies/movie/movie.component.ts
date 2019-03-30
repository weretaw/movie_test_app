import { DeleteMovieComponent } from './../delete-movie/delete-movie.component';
import { EditMovieComponent } from './../edit-movie/edit-movie.component';
import { AddMovieComponent } from './../add-movie/add-movie.component';
import { Component, OnInit } from '@angular/core';
import { MovieModel } from '../../model/movie.model';
import { MovieService } from '../../service/movie.service';
import { finalize, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  columns: any[];
  movies: MovieModel[];
  loading: boolean;

  constructor(private movieService: MovieService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.searchMovie('title');
    //this.getMovie();
    this.columns = [
      { field: 'Title', header: 'Title' },
      { field: 'Year', header: 'Year' },
      { field: 'Runtime', header: 'Runtime' },
      { field: 'Genre', header: 'Genre' },
      { field: 'Director', header: 'Director' },
    ];
  }
  searchMovie(title: string) {
    this.movieService.searchMovieByTitle(title.toLowerCase())
      .then(resp => this.movies = resp.Search);
    console.log("search", this.movies);
  }
  openAddMovieDialog(movie:MovieModel): void {
    this.dialog.open(AddMovieComponent, {
      minHeight: "300px",
      minWidth: "300px",
      panelClass: "dialog-custom-style",
      data: {}
    })
  }

  openEditMovieDialog(movieId:string){
    this.dialog.open(EditMovieComponent, {
      minHeight: "300px",
      minWidth: "300px",
      panelClass: "dialog-custom-style",
      data: movieId
    })
  }

  deleteMovieDialog(movieId:any){
    this.dialog.open(DeleteMovieComponent, {
      minHeight: "300px",
      minWidth: "300px",
      panelClass: "dialog-custom-style",
      data: movieId
    })
  }
}
