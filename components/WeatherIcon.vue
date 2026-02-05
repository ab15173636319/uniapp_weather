<template>
	<view class="weatherIcon">
		<up-image :show-loading="true" fade duration :lazy-load="true" :src="weatherIcon" mode="widthFix" width="200"
			height="200"></up-image>
	</view>
</template>

<script setup>
	import {
		ref,
		watch,
		computed
	} from "vue";

	const props = defineProps({
		weather: {
			type: String,
			default: ''
		}
	})

	const weatherIcon = computed(() => {
		return `/static/${props.weather}.png`
	})

</script>

<style lang="scss" scoped>
	.weatherIcon {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 150px 0 10px 0;
	}
</style>