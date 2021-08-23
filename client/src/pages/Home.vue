<template>
	<section class="home-page">
		<div class="main">
			<div class="container">
				<div class="columns">
					<div class="column is-6 is-offset-1">
						<div class="has-text-right">
							<h1 class="title">Keep the code<br/> snippets in one place</h1>
							<a  v-scroll-to="'#create-snippet'" class="button is-link is-medium">
								<strong>Add Snippet</strong>
							</a>
						</div>
					</div>
				</div>
				<div class="has-text-centered">
					Integrate with <strong>Bitbucket Snippets</strong>, <strong>GitHub Gist</strong>, <strong>GitLab Snippets</strong>
				</div>
			</div>
		</div>
		<div class="container">
			<snippet/>
		</div>
	</section>
</template>

<script>
import Snippet from "@/components/Snippet.vue"

export default {
	name: "home",
	components: {
		Snippet
	}
}
</script>
