import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { MovieModel } from 'src/app/model/movie.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MovieService } from 'src/app/service/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.scss']
})
export class EditMovieComponent implements OnInit {

  editMovieForm: FormGroup;
  movies: MovieModel;
  genres: any;
  constructor(private fb: FormBuilder,
     private movieService: MovieService,
     public dialogRef: MatDialogRef<EditMovieComponent>,
                @Inject(MAT_DIALOG_DATA) public data: string,
      private router: Router) { }

  ngOnInit() {
    console.log("data",this.data);
    this.createForm();
    this.editmovie();
    this.registerToEvents();
    this.getGenre();
  }

  closeDialog(){
    this.dialogRef.close();
  }
  registerToEvents() {
    //set values
    this.editMovieForm.valueChanges.subscribe(
      values => {
        //  this.editmovie(values);
      }
    )
  }

  getGenre() {
    this.movieService.getMovieGenre().subscribe(
      genre => {
        this.genres = genre;
        console.log("genre", this.genres);
      },
      error => {
        console.log(error);
      }
    );
  }

  editmovie():any{
    this.movieService.getMovieById(this.data)
    .then(resp=>this.movies=resp.Search);
    console.log("movieData",this.movies)
    this.editMovieForm.setValue({
      Title: this.movies.Title,
      Year: this.movies.Year,
      Runtime: this.movies.Runtime,
      Genre: this.movies.Gener,
      Director: this.movies.Director
    })
    console.log("editMovieForm",this.editMovieForm);
    
  }

  createForm() {
    this.editMovieForm = this.fb.group(
      {
        Title: ['', Validators.required],
        Year: ['', Validators.required],
        Runtime: ['', Validators.required],
        Genre: ['', Validators.required],
        Director: ['', Validators.required]
      }
    );
  }

  saveForm() {
    if (this.editMovieForm.valid) {
      console.log("formValue", this.editMovieForm.value);
      this.movies = this.editMovieForm.value;
      console.log("movies", this.movies);
      this.movieService.createMovie(this.movies).subscribe(
        response => {
          let text = "success";
          this.router.navigate(['movie']);
        },
        error => {
          console.log(error);
        }
      )
      console.log("save", this.movies)
    }
  }
}
