// Core
import mongoose from 'mongoose'

const Schema = mongoose.Schema

// ODM
import { Integration } from './Integration.js'
import { Provider } from "./Provider.js";

export const User = mongoose.model("User", new Schema({
	id: {
		type: String,
		required: true,
	},
	name: {
		type: String,
	},
	photo: {
		type: String,
	},
	auth: {
		type: String,
		required: true
	},
	integrations: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: Integration
		}
	]
},
{
	timestamps: {
		createdAt: 'created',
		updatedAt: 'modified',
	}
}))


