import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, StatusBar, Image, RefreshControl, ActivityIndicator, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

import * as agilityData from "../lib/agilityData"
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

const wait = (timeout: any) => {
	return new Promise(resolve => setTimeout(resolve, timeout));
};

interface Props {
	refreshState: number
}

export default function PostListing({ refreshState }: Props) {
	const [posts, setPosts] = useState<any[]>([])
	const [refreshing, setRefreshing] = React.useState(false);

	const navigation = useNavigation()

	const loadData = async () => {
		setRefreshing(true)
		const lst = await agilityData.getPosts()
		setPosts(lst)
		setRefreshing(false)
	}

	const onRefresh = React.useCallback(() => {
		loadData()
	}, []);


	useEffect(() => {

		loadData()

	}, [refreshState])



	return (


		<ScrollView style={styles.scrollView}
			refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
		>

			{refreshing &&
				<View style={{ margin: 10 }}>
					<ActivityIndicator />
				</View>
			}

			{posts?.map((post: any) =>
				<Pressable
					key={post.contentID}
					onPress={() => navigation.navigate('Post', { contentID: post.contentID })}
					style={({ pressed }) => ([styles.post, {
						opacity: pressed ? 0.5 : 1
					}
					])}>

					<Image source={{ uri: `${post.imageSrc}?w=100&h=100` }} style={styles.postImage} />
					<View style={{ flex: 1, margin: 10, backgroundColor: "transparent" }}>
						<Text style={styles.title}>{post.title}</Text>
						<Text>{post.date}</Text>
					</View>

				</Pressable>

			)}


		</ScrollView>

	)

}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
	},
	scrollView: {

	},
	post: {
		display: "flex",
		flexDirection: "row",
		margin: 10,
		marginBottom: 0,
		padding: 10,
		borderRadius: 10,
		backgroundColor: "#ebebeb"
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	postImage: {
		borderRadius: 10,
		height: 100,
		width: 100
	},

	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
});