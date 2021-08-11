<template>
	<div id="dropdown-auth" class="dropdown is-right" :class="{'is-active': dropdown}">
		<div class="dropdown-trigger">
			<button class="button is-light" :class="{'is-loading': authPreloader}" @click="dropdown = !dropdown" aria-haspopup="true" aria-controls="dropdown-auth">
				<span class="media">
					<span class="media-left" v-if="authStatus">
						<span class="image is-32x32">
							<img class="is-rounded" :src="authUser.photo">
						</span>
					</span>
					<span class="media-content">
						<span v-if="!authStatus">Sign In</span>
						<span class="icon is-small">
							<i class="fas fa-angle-down" aria-hidden="true"></i>
						</span>
					</span>
				</span>
			</button>
		</div>
		<div class="dropdown-menu" role="menu" v-if="!authPreloader">
			<div class="dropdown-content" v-if="authStatus">
				<div class="dropdown-item">
					<span class="has-text-grey is-small">You are authorized by {{authUser.auth}} provider.</span>
				</div>
				<a href="/" @click.prevent="signOut" class="button is-danger is-inverted dropdown-item">Sign Out</a>
			</div>
			<div class="dropdown-content" v-else>
				<div class="dropdown-item">
					<span class="has-text-grey is-small">Please select provider to sign in.</span>
				</div>
				<a href="/api/auth/google" @click="googleAuth" class="button dropdown-item">
					<i class="icon google-icon"></i> Sign in with Google
				</a>
				<hr class="dropdown-divider">
				<a href="/api/auth/github" @click="githubAuth" class="button dropdown-item">
					<i class="icon github-icon"></i> Sign in with Github
				</a>
			</div>
		</div>
	</div>

</template>

<script>
import hash from "crypto-random-string"

export default {
	name: "auth",
	data(){
		return {
			dropdown: false,
			user: null,
		}
	},
	mounted(){
		this.signIn()
		document.addEventListener("click", (event) => {
			if (!event.target.closest("#dropdown-auth")) {
				this.dropdown = false
			}
		})
	},
	computed: {
		authStatus(){
			return this.$store.getters.getAuthStatus
		},
		authPreloader(){
			return this.$store.getters.getAuthPreloader
		},
		authUser(){
			return this.$store.getters.getAuthUser
		}
	},
	methods: {
		signIn(){
			this.$store.dispatch("authActionLogin")
		},
		signOut() {
			this.$store.dispatch("authActionLogout")
		},
		googleAuth(){},
		githubAuth(){},
	},
};
</script>
