import { Movie } from 'src/app/model/movie';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  @Input() movies: Movie[];

  constructor() { }

  ngOnInit() {
  }

}
