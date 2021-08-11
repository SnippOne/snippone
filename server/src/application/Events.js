import { EventEmitter } from 'events'

export class Events extends EventEmitter {

	_types = {}

	set types(stack){
		this._types = stack.reduce((collection, i) => {
			collection[i] = i

			return collection
		}, this._types)
	}

	get types(){
		return this._types
	}

	on(type, handler){
		if (!this.types[type]) {
			throw new Error(`Type "${type}" not found to ${this.constructor.name}`)
		}

		this.addListener(type, handler)

		return this
	}
}
