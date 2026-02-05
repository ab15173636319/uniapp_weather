<template>
	<view class="text">
		<text>{{weather}}</text>
	</view>
</template>

<script setup>
	import {
		computed
	} from 'vue';

	const props = defineProps({
		weather: {
			type: String,
			default: ''
		},
		size: {
			type: Number,
			default: 80
		}
	})


	const fontSize = computed(() => {
		return `${props.size}rpx`
	})
</script>

<style lang="scss">
	.text {
		text-align: center;
		font-size: v-bind(fontSize);
		font-weight: bold;
		color: #fff;
		margin: 20rpx 0;
	}
</style>