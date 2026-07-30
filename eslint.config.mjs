import path from 'node:path';

import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import { configs, plugins } from 'eslint-config-airbnb-extended';

const gitignorePath = path.resolve('.', '.gitignore');

const jsConfig = defineConfig([
	// ESLint recommended config
	{
		name: 'js/config',
		...js.configs.recommended,
	},
	// Stylistic plugin
	plugins.stylistic,
	// Import X plugin
	plugins.importX,
	// Airbnb base recommended config
	...configs.base.recommended,
]);

const nodeConfig = defineConfig([
	// Node plugin
	plugins.node,
	// Airbnb Node recommended config
	...configs.node.recommended,
]);

const rules = {
	'@stylistic/indent': ['error', 'tab', { SwitchCase: 1 }],
	'@stylistic/no-tabs': 0,
	'no-param-reassign': [
		'error',
		{
			props: false,
		},
	],
	'@stylistic/max-len': 0,
	'no-underscore-dangle': [
		'error',
		{
			allowAfterThis: true,
		},
	],
	'import-x/no-useless-path-segments': 0,
	'no-bitwise': 0,
	'import-x/extensions': [
		'error',
		'ignorePackages',
		{
			js: 'always',
			mjs: 'always',
			json: 'always',
		},
	],

};

const languageOptions = {
	ecmaVersion: 'latest',
	parserOptions: {
		ecmaVersion: 'latest',
	},
};

const ignores = [
	'docs/**',
];

export default defineConfig([
	{
		ignores,
	},
	// Ignore files and folders listed in .gitignore
	includeIgnoreFile(gitignorePath),
	// JavaScript config
	...jsConfig,
	// Node config
	...nodeConfig,
	{
		languageOptions,
		rules,
	},
]);
