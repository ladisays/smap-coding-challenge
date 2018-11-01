<template>
	<div class="spinner">
		<i class="fa fa-spinner fa-spin"></i>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				small: false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.spinner {
		display: flex;
		justify-content: center;
		width: 100%;
	}
</style>