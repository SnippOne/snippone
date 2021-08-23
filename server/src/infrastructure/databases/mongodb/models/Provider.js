// Core
import mongoose from "mongoose"
const Schema = mongoose.Schema

export const Provider = mongoose.model("Provider", new Schema({
	id: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	credentials: [
		{
			type: String,
			enum: ['token', 'username', 'password']
		}
	]
},
{
	timestamps: {
		createdAt: 'created',
		updatedAt: 'modified',
	}
}))