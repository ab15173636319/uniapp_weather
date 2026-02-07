<template>
	<up-popup v-model:show="show" @close="closeHandler">
		<view class="popup">
			<view class="title">设置</view>
				<up-alert type = "warning" description = "开发版本..."></up-alert>
			<view class="">
				<up-list>
					<up-list-item>
						<up-cell-group>
							<up-cell :title="`当前版本${version}`" arrow-direction="down">
								<template #icon>
									<up-icon size="32" name="level"></up-icon>
								</template>
							</up-cell>
						</up-cell-group>
					</up-list-item>
				</up-list>
			</view>

		</view>
	</up-popup>
</template>

<script setup lang="js">
	import {
		onBeforeMount,
		ref,
		watch
	} from 'vue';
	import {
		onShow
	} from "@dcloudio/uni-app"

	const props = defineProps(['modelValue'])
	const emit = defineEmits(['update:modelValue', 'selectCity'])
	const show = ref(false)

	const version = ref()

	onShow(() => {
		const systemInfo = uni.getSystemInfoSync();
		version.value = systemInfo.appVersion;

	})

	watch(() => props.modelValue, (newVal) => {
		show.value = newVal
	}, {
		immediate: true
	})

	const closeHandler = () => {
		show.value = false
		emit('update:modelValue', show.value)
	}
</script>

<style scoped lang="scss">
	.popup {
		height: 80vh;
		padding-bottom: 80rpx;
	}

	.title {
		height: 80rpx;
		display: flex;
		align-items: center;
		padding: 0 30rpx;
		font-size: 40rpx;
		font-weight: bold;
	}

	.city {
		margin: 15rpx 20rpx;
		padding: 30rpx 20rpx;
		background-color: rgba(200, 200, 200, 0.3);
		border-radius: 15rpx;
		box-shadow: 1rpx 1rpx 40rpx rgba(200, 200, 200, 0.3);
	}
</style>