<template>
	<up-popup v-model:show="show" @close="closeHandler">
		<view class="popup">
			<!-- <up-input prefix-icon="search" placeholder="搜索城市..."></up-input> -->
			<view class="">
				<scroll-view scroll-y="true" style="height: 90vh">
					<up-collapse>
						<template v-for="c in cities">
							<up-collapse-item :title="c.province" name="Docs guide">
								<up-list>
									<up-list-item v-for="i in c.city">
										<up-button plain @click="selectHandler(i)">{{i}}</up-button>
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
		height: 90vh;
		padding-top: 80rpx;
	}
</style>