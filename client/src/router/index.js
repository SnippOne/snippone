// Core
import Vue from "vue"
import Router from "vue-router"

// Pages
import Home from "@/pages/Home.vue"
import SnippetsList from "@/pages/SnippetsList.vue"

Vue.use(Router)

export default new Router({
	mode: "history",
	base: "/",
	routes: [
		{
			path: "/",
			name: "home-page",
			meta: {
				layout: "home-layout"
			},
			components: {
				default: Home,
				snippets: SnippetsList
			}
		},
		{
			path: "/snippets/:id",
			name: "snippet-page",
			component: () => import("@/pages/Snippet.vue")
		},
		{
			path: "/files/:name/raw",
			name: "raw-page",
			component: () => import("@/pages/raw/File.vue"),
			meta: {
				layout: "raw-layout"
			}
		},
		{
			path: "/integrations",
			name: "integrations-page",
			component: () => import("@/pages/IntegrationsList.vue"),
			// beforeEnter: (to, from, next) => {
			// 	if (store.getters.getAuthStatus) {
			// 		next()
			// 	} else {
			// 		next({
			// 			name: "home"
			// 		})
			// 	}
			// }
		},
		{
			path: "*",
			name: "error-page",
			component: () => import("@/pages/Error.vue")
		},
	]
})

