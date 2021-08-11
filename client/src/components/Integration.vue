<template>
	<div class="snippet">
		<div class="top">
			<a href="#" class="is-link" @click.prevent="open = !open">Toggle</a>
			<div class="columns">
				<div class="column">
					<h2>{{ payload.name }}</h2>
					<div class="connection">
						<span v-if="payload.connection" class="has-background-success">Connected</span>
						<span v-else class="has-background-light">Disconnected</span>
					</div>
					<div v-if="payload.provider" :class="payload.provider.id">
						{{ payload.provider.name }}
					</div>
				</div>
			</div>
			<div class="divider"></div>
		</div>
		<div class="content" v-if="open">
			<form name="integration" method="post" @submit.prevent>
				<div class="columns is-vcentered">
					<div class="column is-9">
						<p class="has-text-right">Please select a provider to integration</p>
					</div>
					<div class="column">
						<div class="control">
							<div class="select is-fullwidth">
								<v-select v-model="payload.provider" placeholder="Please select an option" label="name" :value="payload.provider" :options="$store.getters.getAuthUser.providers"></v-select>
							</div>
						</div>
						<div class="error has-text-danger" v-if="!$v.payload.provider.required">Field is required</div>
					</div>
				</div>

				<div class="columns">
					<div class="column">
						<div class="field">
							<label class="label">Name Integration</label>
							<div class="control">
								<input v-model="payload.name" name="public" type="text" class="input" placeholder="Please enter name of the integration" />
							</div>
						</div>

						<div v-if="payload.provider">
							<div class="field" v-for="field in payload.provider.credentials" :key="field">
								<label class="label">{{ credentialsList[field].label }}</label>
								<div class="control">
									<input v-model="payload.credentials[field]" name="private" :type="credentialsList[field].type" class="input" placeholder="Please enter private key" />
								</div>
							</div>
						</div>

					</div>
				</div>

				<div class="columns">
					<div class="column">
						<div class="level">
							<div class="level-left">
								<div class="level-item">
									<a href="#" class="button" @click.prevent="removeIntegration">
										<span>Remove</span>
									</a>
								</div>
							</div>
							<div class="level-right">
								<div class="level-item">
									<div class="control">
										<a href="#" class="is-link" @click.prevent="checkIntegration">
											<span>Check connection</span>
										</a>
									</div>
								</div>

								<div v-if="payload.meta && payload.meta.create" class="level-item">
									<div class="control ml-1">
										<button class="button is-success" @click.prevent="saveIntegration" type="submit" name="create">Create</button>
									</div>
								</div>
								<div v-else class="level-item">
									<div class="control ml-1">
										<button class="button is-link"  @click.prevent="updateIntegration" type="submit" name="update">Update</button>
									</div>
								</div>

							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import hash from "crypto-random-string"
import { required, minLength } from 'vuelidate/lib/validators'
import { integration } from "@/config/integration"

export default {
	name: "integration",
	props: {
		source: Object,
	},
	mounted(){
		// this.$nextTick(() => this.$el.scrollIntoView())
	},
	data: () => {
		return {
			open: true,
			credentialsList: integration.credentials,
		}
	},
	computed: {
		payload: {
			get(){
				return this.source
			}
		}
	},
	validations: {
		payload: {
			provider: {
				required
			},
		}
	},
	methods: {
		checkIntegration(){
			this.$store.dispatch("checkIntegration", this.payload)
		},
		removeIntegration(){
			this.$store.dispatch("removeIntegration", this.payload.id)
		},
		saveIntegration(){
			this.$store.dispatch("saveIntegration", {
				...this.payload,
				provider: this.payload.provider.id
			})
		},
		updateIntegration(){
			this.$store.dispatch("updateIntegration", {
				...this.payload,
				provider: this.payload.provider.id
			})
		}
	},
}
</script>