import { FormControl } from "@angular/forms";
import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { GenreFilterModel } from "./model/genre-filter-model";
import { MoviesStore } from "../../../model/movies-state/movies-store";
import { BaseFilterComponent } from "../base-filter.component";

@Component({
  selector: "app-genre-filter",
  templateUrl: "./genre-filter.component.html",
  styleUrls: ["./genre-filter.component.scss"]
})
export class GenreFilterComponent extends BaseFilterComponent
  implements OnInit {
  @Input() genres: string[];
  @Output() complete = new EventEmitter<any>();
  @Output() reset = new EventEmitter();

  genresForm = new FormControl();
  model: GenreFilterModel;

  constructor(private moviesStore: MoviesStore) {
    super();
    this.name = "bygenre";
  }

  ngOnInit() {
    this.model = new GenreFilterModel();

    this.moviesStore.observe().subscribe(state => {
      const movies = state.container.movies;
      if (movies.length > 0) {
        this.genres = movies
        .map(movie => movie.genres)
        .reduce((p, k) => {
          const newgenre = p.concat.apply(p, k);
          const seen = {};
          return newgenre.filter(item => {
            return seen.hasOwnProperty(item) ? false : (seen[item] = true);
          }, []);
        });
      }
    });

    this.genresForm.valueChanges.subscribe((genre: any) => {
      if (genre) {
        if (genre.length === 0) {
          this.criteria = "";
          this.reset.emit();
        } else {
          this.criteria = genre;
          this.complete.emit({ name: "bygenre", criteria: genre });
        }
      }
    });
  }

  clear(): void {
    this.criteria = "";
    this.genresForm.reset();
    this.reset.emit();
  }
}
