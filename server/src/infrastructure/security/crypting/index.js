// Core
// import config from 'config'

import crypto from 'crypto'

const CRYPTING_DELIMITER = '.'
const CRYPTING_ALGORITHM = 'aes256'

export class Crypting {
	constructor(key){
		this.key = key
	}

	createSecretKey(){
		return crypto.createHash('sha256').update(this.key).digest('hex').slice(32)
	}

	encrypt(text) {
		const iv = crypto.randomBytes(16)

		const cipher = crypto.createCipheriv(CRYPTING_ALGORITHM, this.createSecretKey(), iv)
		const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()])

		return [encrypted.toString('hex'), iv.toString('hex')].join(CRYPTING_DELIMITER)
	}

	decrypt(hash) {
		const [content, iv] = hash.split(CRYPTING_DELIMITER)
		const decipher = crypto.createDecipheriv(CRYPTING_ALGORITHM, this.createSecretKey(), Buffer.from(iv, 'hex'))

		const decrypted = Buffer.concat([decipher.update(Buffer.from(content, 'hex')), decipher.final()])

		return decrypted.toString('utf8')
	}
}