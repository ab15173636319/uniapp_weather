import {
	defineStore
} from 'pinia'
import {
	ref
} from 'process'

export default
const useWeatherStore = defineStore('weather', () => {
	/**
	 * 定位消息列表
	 */
	const local_list = ref([])
	/**
	 * 选择的定位消息，默认当前定位消息或定位消息列表第一个，诺未开启则是北京
	 */
	const select_local = ref({})


	function addToList(data) {
		
	}



})