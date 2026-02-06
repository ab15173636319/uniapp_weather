<template>
	<up-popup v-model:show="show" @close="closeHandler">
		<view class="popup">
			<view class="title">选择城市</view>
			<!-- <up-input prefix-icon="search" placeholder="搜索城市..."></up-input> -->
			<view class="">
				<scroll-view scroll-y="true" style="height: 80vh">
					<up-collapse>
						<template v-for="c in cities">
							<up-collapse-item :title="c.province" name="Docs guide">
								<up-list>
									<up-list-item v-for="i in c.city">
										<view class="city" @click="selectHandler(i)">{{i}}</view>
									</up-list-item>
								</up-list>
							</up-collapse-item>
						</template>
					</up-collapse>
				</scroll-view>
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
		filterCities
	} from '../utils/cities';

	const props = defineProps(['modelValue'])
	const emit = defineEmits(['update:modelValue', 'selectCity'])
	const cities = ref([])
	const show = ref(false)

	onBeforeMount(async () => {
		cities.value = await filterCities()
	})

	watch(() => props.modelValue, (newVal) => {
		show.value = newVal
	}, {
		immediate: true
	})

	const closeHandler = () => {
		show.value = false
		emit('update:modelValue', show)
	}

	const selectHandler = (city) => {
		show.value = false
		emit('update:modelValue', show)
		emit('selectCity', city)
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