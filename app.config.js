import 'dotenv/config';


export default {
	"name": "react-native-blog",
	"slug": "react-native-blog",
	"version": "1.0.0",
	"orientation": "portrait",
	"icon": "./assets/images/icon.png",
	"scheme": "myapp",
	"userInterfaceStyle": "automatic",
	"splash": {
		"image": "./assets/images/splash.png",
		"resizeMode": "contain",
		"backgroundColor": "#ffffff"
	},
	"updates": {
		"fallbackToCacheTimeout": 0
	},
	"assetBundlePatterns": [
		"**/*"
	],
	"ios": {
		"supportsTablet": true
	},
	"android": {
		"adaptiveIcon": {
			"foregroundImage": "./assets/images/adaptive-icon.png",
			"backgroundColor": "#ffffff"
		}
	},
	"web": {
		name: "Travel Blog",
		"favicon": "./assets/images/favicon.png",
		icon: "./assets/images/travel-blog-logo.png"
	},
	extra: {
		AGILITY_GUID: process.env.AGILITY_GUID,
		AGILITY_API_FETCH_KEY: process.env.AGILITY_API_FETCH_KEY,
		AGILITY_API_PREVIEW_KEY: process.env.AGILITY_API_PREVIEW_KEY,
	},
};