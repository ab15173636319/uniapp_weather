import App from './App'

import {
	createSSRApp
} from 'vue'

import uviewPlus from '@/uni_modules/uview-plus'

import {
	createPinia
} from 'pinia'

export function createApp() {
	const app = createSSRApp(App)

	const pinia = createPinia()

	app.use(uviewPlus)
	app.use(pinia)
	return {
		app
	}
}