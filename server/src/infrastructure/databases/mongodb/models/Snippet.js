// Core
import mongoose from 'mongoose'
// import mongooseUnique from 'mongoose-beautiful-unique-validation'

import { unique } from '../plugins/mongoose/unique.js'

const Schema = mongoose.Schema

const schema = new Schema({
	id: {
		type: String
	},
	title: {
		type: String
	},
	status: {
		type: Boolean
	},
	url: {
		type: String
	},
	files: {
		type: Array
	}
},
{
	timestamps: {
		createdAt: 'created',
		updatedAt: 'modified',
	}
})

schema.index({ id: 1 }, { unique: true })

schema.plugin(unique, {
	id: 'A snippet has already existed.'
})

export const Snippet = mongoose.model("Snippet", schema)