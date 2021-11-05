import * as React from 'react';
import { Image, StyleSheet } from 'react-native';

import * as agilityData from "../lib/agilityData"

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useEffect, useState } from 'react';
import PostListing from '../components/PostListing';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

	const [siteInfo, setSiteInfo] = useState<any>({})

	useEffect(() => {

		const loadData = async () => {
			const item = await agilityData.getSiteinfo()
			setSiteInfo(item)
		}

		loadData()

	}, [])


	return (
		<View style={styles.container}>
			<Text style={styles.title}>{siteInfo?.fields?.siteName}</Text>
			<View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
			<View>
				<Image source={{ uri: `${siteInfo?.fields?.logo.url}?w=200`}} style={styles.logo} />
			</View>

		</View>
	);
}



const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	logo: {
		height: 200,
		width: 200
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
});
