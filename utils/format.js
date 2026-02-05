const WEATHER = {
	"SUNNY": "/static/晴天.png",
	"PARTLY_CLOUDY": "/static/晴多云.png",
	"CLOUDY": "/static/阴.png",
	"LIGHT_RAIN": "/static/小雨.png",
	"HEAVY_RAIN": "/static/大雨.png",
	"STORM_RAIN": "/static/暴雨.png",
	"LIGHT_SNOW": "/static/小雪.png",
	"HEAVY_SNOW": "/static/大雪.png",
	"SLEET": "/static/雨夹雪.png",
	"FOG": "/static/雾.png"
}


export default function format(weather) {
	return WEATHER[weather] || ""
}