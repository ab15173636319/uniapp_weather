<template>
	<up-loading-page loading-color="#000000" :loading="loading"></up-loading-page>
	<view v-cloak class="container">
		<view class="content">
			<view class="decor-light decor-light-1"></view>
			<view class="decor-light decor-light-2"></view>
			<view class="decor-light decor-light-3"></view>

			<scroll-view scroll-y="true" class="scroll-y">
				<view>
					<weather-icon v-if="ipInfo.weather" :weather="ipInfo.weather"></weather-icon>
					<weather-text v-if="ipInfo.weather" :weather="ipInfo.weather"></weather-text>

					<view class="local-bar">
						<view class="local" v-if="ipData" @click="show=!show">
							<up-icon size="20" color="#fff" name="map"></up-icon>
							<weather-text :weather="ipData" :size="40"></weather-text>
						</view>
						<up-icon size="20" color="#1e90ff" name="reload" @click="reload"></up-icon>
					</view>

					<view class="">
						<up-row>
							<up-col :span="1"></up-col>
							<up-col :span="4">
								<view class="col-text" hover-class="col-text-hover">
									<text>最高温度</text>
									<text>{{ipInfo.temp_max}}℃</text>
								</view>
							</up-col>
							<up-col :span="2"></up-col>
							<up-col :span="4">
								<view class="col-text" hover-class="col-text-hover">
									<text>最高温度</text>
									<text>{{ipInfo.temp_min}}℃</text>
								</view>
							</up-col>
							<up-col :span="1"></up-col>
						</up-row>
					</view>
					<view class="forecast">
						<up-row>
							<up-col :span="1"></up-col>
							<up-col :span="10">
								<up-row v-for="f in ipInfo.forecast" class="forecast-item">
									<up-col :span="4">
										<view class="">
											{{f.date}}
										</view>
									</up-col>
									<up-col :span="4">
										<view class="">
											{{f.weather_day}}
										</view>
									</up-col>
									<up-col :span="4">
										<view class="">
											{{f.temp_min}}~{{f.temp_max}}℃
										</view>
									</up-col>
								</up-row>
							</up-col>
							<up-col :span="1"></up-col>
						</up-row>
					</view>
					<view class="life" v-if="ipInfo.life_indices">
						<view class="life-item" v-if="ipInfo.life_indices.air_conditioner">
							<view class="name">空调</view>
							<view class="level">{{ipInfo.life_indices.air_conditioner.level}}</view>
							<view class="brief">{{ipInfo.life_indices.air_conditioner.brief}}</view>
							<view class="advice">{{ipInfo.life_indices.air_conditioner.advice}}</view>
						</view>
						<view class="life-item" v-if="ipInfo.life_indices.car_wash">
							<view class="name">洗车</view>
							<view class="level">{{ipInfo.life_indices.car_wash.level}}</view>
							<view class="brief">{{ipInfo.life_indices.car_wash.brief}}</view>
							<view class="advice">{{ipInfo.life_indices.car_wash.advice}}</view>
						</view>
						<view class="life-item" v-if="ipInfo.life_indices.clothing">
							<view class="name">穿着</view>
							<view class="level">{{ipInfo.life_indices.clothing.level}}</view>
							<view class="brief">{{ipInfo.life_indices.clothing.brief}}</view>
							<view class="advice">{{ipInfo.life_indices.clothing.advice}}</view>
						</view>
						<view class="life-item" v-if="ipInfo.life_indices.cold_risk">
							<view class="name">感冒</view>
							<view class="level">{{ipInfo.life_indices.cold_risk.level}}</view>
							<view class="brief">{{ipInfo.life_indices.cold_risk.brief}}</view>
							<view class="advice">{{ipInfo.life_indices.cold_risk.advice}}</view>
						</view>
						<view class="life-item" v-if="ipInfo.life_indices.comfort">
							<view class="name">体感</view>
							<view class="level">{{ipInfo.life_indices.comfort.level}}</view>
							<view class="brief">{{ipInfo.life_indices.comfort.brief}}</view>
							<view class="advice">{{ipInfo.life_indices.comfort.advice}}</view>
						</view>
						<view class="life-item" v-if="ipInfo.life_indices.drying">
							<view class="name">晒床单</view>
							<view class="level">{{ipInfo.life_indices.drying.level}}</view>
							<view class="brief">{{ipInfo.life_indices.drying.brief}}</view>
							<view class="advice">{{ipInfo.life_indices.drying.advice}}</view>
						</view>
						<view class="life-item" v-if="ipInfo.life_indices.exercise">
							<view class="name">锻炼</view>
							<view class="level">{{ipInfo.life_indices.exercise.level}}</view>
							<view class="brief">{{ipInfo.life_indices.exercise.brief}}</view>
							<view class="advice">{{ipInfo.life_indices.exercise.advice}}</view>
						</view>
						<view class="life-item" v-if="ipInfo.life_indices.uv">
							<view class="name">紫外线</view>
							<view class="level">{{ipInfo.life_indices.uv.level}}</view>
							<view class="brief">{{ipInfo.life_indices.uv.brief}}</view>
							<view class="advice">{{ipInfo.life_indices.uv.advice}}</view>
						</view>


					</view>
				</view>
			</scroll-view>

			<local-popup v-model="show" @selectCity="selectCityHandler"></local-popup>

		</view>
	</view>
</template>

<script setup lang="js">
	import WeatherIcon from "/components/WeatherIcon.vue"
	import WeatherText from "/components/WeatherText.vue"
	import LocalPopup from "/components/LocalPopup.vue"
	import {
		onMounted,
		ref,
		watch
	} from 'vue';
	import http from '../../utils/http';

	const baseUrl = 'https://uapis.cn'
	const ipData = ref('北京市')
	const ipInfo = ref({})
	const loading = ref(false)
	const show = ref(false)

	async function getCurrentIp() {
		const res = await http(baseUrl + '/api/v1/network/myip')
		ipData.value = res.region
	}

	async function getWeather() {
		const res = await http(baseUrl + '/api/v1/misc/weather', {
			city: ipData.value,
			extended: true,
			indices: true,
			forecast: true
		})
		ipInfo.value = res
	}

	function selectCityHandler(val) {
		ipData.value = val
	}

	async function reload() {
		loading.value = true
		await getCurrentIp()
		await getWeather()
		loading.value = false
	}

	onMounted(async () => {
		loading.value = true
		await getCurrentIp()
		await getWeather()
		loading.value = false

	})

	watch(() => ipData.value, async (val) => {
		loading.value = true
		await getWeather()
		loading.value = false
	})


	watch(() => show.value, (val) => {})
</script>

<style lang="scss" scoped>
	.container {
		width: 100vw;
		height: 100vh;
		background: rgb(131, 58, 180);
		background: linear-gradient(135deg, rgba(131, 58, 180, 1) 0%, rgba(253, 29, 29, 0.7) 50%, rgba(252, 176, 69, 0.8) 100%);
		position: relative;
		overflow: hidden;
		font-family: 'PingFang SC', 'Helvetica Neue', Arial, sans-serif;

		&::before {
			content: "";
			position: absolute;
			top: -50%;
			left: -50%;
			width: 200%;
			height: 200%;
			background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
			animation: float 20s ease-in-out infinite;
			z-index: 0;
		}

		&::after {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmZmZmMTAiPjwvcmVjdD4KPC9zdmc+');
			opacity: 0.3;
			z-index: 0;
		}

		.content {
			margin: 0 auto;
			max-width: 960px;
		}

		/* 装饰性光斑效果 */
		.decor-light {
			position: absolute;
			border-radius: 50%;
			background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
			filter: blur(40rpx);
			z-index: 0;
		}

		.decor-light-1 {
			top: 10%;
			left: 15%;
			width: 300rpx;
			height: 300rpx;
			animation: pulse 8s ease-in-out infinite;
		}

		.decor-light-2 {
			top: 60%;
			right: 10%;
			width: 400rpx;
			height: 400rpx;
			animation: pulse 10s ease-in-out infinite reverse;
		}

		.decor-light-3 {
			top: 30%;
			right: 20%;
			width: 200rpx;
			height: 200rpx;
			animation: pulse 12s ease-in-out infinite;
		}

		@keyframes pulse {

			0%,
			100% {
				opacity: 0.4;
				transform: scale(1);
			}

			50% {
				opacity: 0.8;
				transform: scale(1.2);
			}
		}

		.scroll-y {
			height: 100vh;
			position: relative;
			z-index: 1;
		}

		.local-bar {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 20rpx;

			.local {
				display: flex;
				justify-content: center;
				gap: 20rpx;
			}
		}


		@keyframes float {

			0%,
			100% {
				transform: translate(0, 0) rotate(0deg);
			}

			25% {
				transform: translate(5%, 5%) rotate(1deg);
			}

			50% {
				transform: translate(0, 10%) rotate(0deg);
			}

			75% {
				transform: translate(-5%, 5%) rotate(-1deg);
			}
		}

		.col-text {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			color: #fff;
			border-radius: 25rpx;
			font-size: 32rpx;
			padding: 30rpx 0;
			position: relative;
			overflow: hidden;
			transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
			backdrop-filter: blur(10rpx);
			background-color: rgba(255, 255, 255, 0.1);
			border: 1px solid rgba(255, 255, 255, 0.2);

			&:before {
				content: "";
				position: absolute;
				top: -50%;
				left: -50%;
				width: 200%;
				height: 200%;
				background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
				transform: rotate(45deg);
				animation: shine 6s ease-in-out infinite;
			}

			text {
				display: block;
				margin: 5rpx 0;
				text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.2);
			}
		}

		.col-text-hover {
			transform: translateY(-8rpx) scale(1.02);
			box-shadow: 0 12rpx 30rpx rgba(0, 0, 0, 0.2);
			background-color: rgba(255, 255, 255, 0.15);
		}

		.forecast {
			color: #fff;
			border-radius: 25rpx;
			font-size: 28rpx;
			position: relative;
			overflow: hidden;
			transition: all 0.4s ease-in-out;
			margin: 40rpx 50rpx;
			padding: 30rpx;
			backdrop-filter: blur(10rpx);
			background-color: rgba(255, 255, 255, 0.1);
			border: 1px solid rgba(255, 255, 255, 0.2);

			.forecast-item {
				padding: 20rpx 0;
				position: relative;
				transition: all 0.3s ease-in-out;
				border-bottom: 1px solid rgba(255, 255, 255, 0.1);

				&:last-child {
					border-bottom: none;
				}

				&:hover {
					transform: translateX(10rpx);
				}

				&:before {
					content: "";
					position: absolute;
					top: 50%;
					left: -100%;
					width: 100%;
					height: 1px;
					background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
					transform: translateY(-50%);
					animation: slide 3s ease-in-out infinite;
				}

				view {
					position: relative;
					z-index: 1;
					text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.2);
				}
			}
		}

		@keyframes shine {

			0%,
			100% {
				opacity: 0;
				transform: rotate(45deg) translate(-50%, -50%);
			}

			50% {
				opacity: 1;
				transform: rotate(45deg) translate(50%, 50%);
			}
		}

		@keyframes slide {
			0% {
				left: -100%;
			}

			100% {
				left: 100%;
			}
		}

		.life {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 24rpx;
			margin: 30rpx 50rpx;

			.life-item {
				position: relative;
				color: #333;
				z-index: 1;
				background-color: rgba(255, 255, 255, 0.95);
				border-radius: 24rpx;
				padding: 24rpx;
				box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.1);
				transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
				backdrop-filter: blur(10rpx);
				border: 1px solid rgba(255, 255, 255, 0.3);

				&:hover {
					transform: translateY(-10rpx) scale(1.02);
					box-shadow: 0 12rpx 30rpx rgba(0, 0, 0, 0.18);
					background-color: rgba(255, 255, 255, 0.98);
				}

				.name {
					font-size: 26rpx;
					font-weight: bold;
					margin-bottom: 12rpx;
					color: #2c3e50;
					text-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.1);
				}

				.level {
					font-size: 22rpx;
					color: #3498db;
					margin-bottom: 6rpx;
					font-weight: 500;
				}

				.brief {
					font-size: 19rpx;
					color: #95a5a6;
					margin-bottom: 12rpx;
				}

				.advice {
					font-size: 17rpx;
					color: #7f8c8d;
					line-height: 1.5;
					background-color: rgba(248, 249, 250, 0.8);
					padding: 12rpx;
					border-radius: 12rpx;
					border-left: 4rpx solid #3498db;
				}

				&::after {
					content: "";
					position: absolute;
					inset: 0;
					filter: blur(60rpx);
					z-index: -1;
					transform: scale(1.2);
					background: radial-gradient(circle, rgba(131, 58, 180, 0.2) 0%, rgba(253, 29, 29, 0.1) 50%, rgba(252, 176, 69, 0.1) 100%);
				}

				&::before {
					content: "";
					position: absolute;
					top: -2rpx;
					left: -2rpx;
					right: -2rpx;
					bottom: -2rpx;
					background: linear-gradient(45deg, #833ab4, #fd1d1d, #fcb045, #833ab4);
					border-radius: 24rpx;
					z-index: -2;
					opacity: 0;
					transition: opacity 0.4s ease-in-out;
					animation: gradient-shift 8s ease-in-out infinite;
					background-size: 400% 400%;
				}

				&:hover::before {
					opacity: 1;
				}
			}
		}

		@keyframes gradient-shift {
			0% {
				background-position: 0% 50%;
			}

			50% {
				background-position: 100% 50%;
			}

			100% {
				background-position: 0% 50%;
			}
		}

	}
</style>