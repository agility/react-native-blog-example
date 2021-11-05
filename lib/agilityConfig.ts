import Constants from 'expo-constants';

export default {
	AGILITY_GUID:  Constants.manifest?.extra?.AGILITY_GUID,
	AGILITY_API_PREVIEW_KEY: Constants.manifest?.extra?.AGILITY_API_PREVIEW_KEY,
	AGILITY_API_FETCH_KEY: Constants.manifest?.extra?.AGILITY_API_FETCH_KEY,
}