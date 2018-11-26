export abstract class StoreEvent<T> {
	constructor(public payload?: any) { };

	abstract getNewState(state: T): T;
}
