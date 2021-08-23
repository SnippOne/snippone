// Core
import mongoose from "mongoose"
const Schema = mongoose.Schema

// ODM
import { Provider } from './Provider.js'
import { Snippet } from './Snippet.js'

import { unique } from '../plugins/mongoose/unique.js'

const schema = new Schema({
	id: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	credentials: {
		token: String,
		username: String,
		password: String,
	},
	etag: {
		type: String
	},
	provider: {
		type: mongoose.Schema.Types.ObjectId,
		ref: Provider
	},
	snippets: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: Snippet
		}
	]
},
{
	timestamps: {
		createdAt: 'created',
		updatedAt: 'modified',
	}
})

schema.index({ id: 1 }, { unique: true })
schema.index({ credentials: 1 }, { unique: true })

schema.plugin(unique, {
	id: 		'This integration with ID has already existed.',
	credentials:	'This credentials has already been used.'
})

export const Integration = mongoose.model("Integration", schema)

