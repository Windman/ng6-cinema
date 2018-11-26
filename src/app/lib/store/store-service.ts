import { Injectable } from "@angular/core";
import { StoreEvent } from './store-event';
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Observable } from "rxjs/internal/Observable";
import { distinctUntilChanged } from "rxjs/operators";

@Injectable()
export class StoreService<T> {
	private store: BehaviorSubject<T>;
	private store$: Observable<T>;

	constructor(init: T) {
		this.store = new BehaviorSubject<T>(init);
		this.store$ = this.store.asObservable().pipe(distinctUntilChanged());
	}

  getState(): T {
    return this.store.getValue();
  }

	observe(): Observable<T> {
		return this.store$;
	}

	dispatch(event: StoreEvent<T>): void {
		const value: T = this.store.getValue();
		const state: T = event.getNewState(value);
		this.store.next(state);
	}
}
