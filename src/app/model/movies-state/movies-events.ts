import { StoreEvent } from "src/app/lib/store/store-event";
import { MoviesState } from "./movies-state";
import { Movie } from "src/app/model/movie";

export class MoviesSuccessEvent extends StoreEvent<MoviesState> {

	constructor(payload: Movie[]) {
		super(payload)
	}

	getNewState(state: MoviesState) {
		return {
			...state,
			container: {
        movies: this.payload,
        isReset: false
			}
		};
	}
}

export class MoviesResetEvent extends StoreEvent<MoviesState> {

	constructor() {
		super()
	}

	getNewState(state: MoviesState) {
		return {
			...state,
			container: {
				isReset: true
			}
		};
	}
}
