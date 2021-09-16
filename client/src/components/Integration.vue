<template>
	<div class="integration">
		<div class="columns">
			<div class="column">
				<a href="/integrations" @click.prevent="open = !open" class="title is-6">
					<div class="top-panel">
						<div class="head">
							<span class="name">{{ payload.name }}</span>
							<!-- <span class="status">
								<span class="allowed" v-if="payload.connection">Connected</span>
								<span class="disallowed" v-else>Disconnected</span>
							</span> -->
						</div>
						<div class="actions">
							<button class="button is-small is-ghost">
									<i :class="{ 'icon-close': open, 'icon-down': !open }"></i>
							</button>
						</div>
					</div>
				</a>
			</div>
		</div>
		<div class="info-panel" v-if="open">
			<form name="integration" method="post" @submit.prevent>
				<div class="columns is-vcentered">
					<div class="column is-9">
						<p class="has-text-right">Please select a provider to integration</p>
					</div>
					<div class="column">
						<div class="control">
							<div class="select is-fullwidth">
								<v-select v-model="payload.provider" placeholder="Please select an option" label="name" :value="payload.provider" :options="$store.getters.getAuthData.providers"></v-select>
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
								<input v-model="payload.name" name="name" type="text" class="input" placeholder="Please enter name of the integration" />
							</div>
						</div>

						<div v-if="payload.provider">
							<div class="field" v-for="field in payload.provider.credentials" :key="field">
								<label class="label">{{ config.credentials[field].label }}</label>
								<div class="control">
									<input v-model="payload.credentials[field]" :name="field" :type="config.credentials[field].type" class="input" :placeholder="config.credentials[field].label" />
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
									<a href="#" class="button is-text" @click.prevent="events.onRemove(payload)">
										<span>Remove</span>
									</a>
								</div>
							</div>
							<div class="level-right">
								<!-- <div class="level-item">
									<div class="control">
										<a href="#" class="is-link is-dark" @click.prevent="checkIntegration">
											<span>Check connection</span>
										</a>
									</div>
								</div> -->

								<div v-if="payload.creating" class="level-item">
									<div class="control ml-1">
										<button class="button is-dark" @click.prevent="events.onCreate(payload)" type="submit" name="create">Create</button>
									</div>
								</div>
								<div v-else class="level-item">
									<div class="control ml-1">
										<button class="button is-dark"  @click.prevent="events.onUpdate(payload)" type="submit" name="update">Update</button>
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
// Core
import { required, minLength } from 'vuelidate/lib/validators'

// Config
import config from "@/config/integration"

export default {
	name: "integration",
	props: {
		events: Object,
		data: Object
	},
	mounted(){
		this.open = !(this.payload.id && this.payload.name)
	},
	data() {
		return {
			open: true,
			config
		}
	},
	computed: {
		payload() {
			return this.data
		}
	},
	validations: {
		payload: {
			provider: {
				required
			}
		}
	}
}
</script>