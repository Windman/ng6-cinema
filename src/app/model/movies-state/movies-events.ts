import { StoreEvent } from "../../lib/store/store-event";
import { MoviesState } from "./movies-state";
import { Movie } from "../movie";

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

	constructor(payload) {
		super(payload)
	}

	getNewState(state: MoviesState) {
		return {
			...state,
			container: {
        movies: this.payload,
				isReset: true
			}
		};
	}
}
