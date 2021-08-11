<template>
	<div class="content">
		<top-header/>
		<router-view/>
	</div>
</template>

<script>
import TopHeader from "@/components/TopHeader.vue";

export default {
  components: {
    TopHeader
  }
}
</script>
