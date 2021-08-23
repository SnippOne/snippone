module.exports = {
    "env": {
        "node": true,
        "es6": true
	},
	"parser": "@babel/eslint-parser",
    "extends": [
		"eslint:recommended",
		"plugin:security/recommended"
	],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
		"sourceType": "module",
    },
	"plugins": [
		"security",
		"classPrivateProperties",
		"classPrivateMethods",
	]
};