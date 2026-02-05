export default function http(url, data = {}, method = 'GET') {
	return new Promise((resolve, reject) => {
		method = method.toLocaleUpperCase()
		try {
			if (method === 'GET' && !data) {
				url = url + '?'
				for (var key in data) {
					url += `${key}=${data[key]}`
				}
				data = {}
			}
			uni.request({
				url: url,
				data: data,
				method: method,
				success(res) {
					resolve(res.data)
				},
				fail(err) {
					reject(err)
				}

			})
		} catch (error) {
			console.error(`请求【${url}】时发生错误`, error);
		}
	})
}