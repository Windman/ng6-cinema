import { MoviesState } from './movies-state';
import { Injectable } from "@angular/core";
import { StoreService } from '../../lib/store/store-service';

@Injectable()
export class MoviesStore extends StoreService<MoviesState> {
	constructor() {
		super({ container: { movies: [] } });
	}
}
