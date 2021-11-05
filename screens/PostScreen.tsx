import * as React from 'react';
import { ScrollView, StyleSheet, SafeAreaView, StatusBar, Image, RefreshControl, ActivityIndicator, Pressable } from 'react-native';
import { WebView } from 'react-native-webview';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { getContentItem } from '../lib/agilityData';
interface Props {
	route: any
}

export default function PostScreen({ route }: Props) {

	const [loading, setLoading] = React.useState(true)
	const [post, setPost] = React.useState<any>(null)

	const getData = async () => {

		if (route.params?.contentID > 0) {
			setLoading(true)
			const item = await getContentItem({ contentID: route.params?.contentID })
			console.log(item)
			setPost(item)
			setLoading(false)
		}
	}

	React.useEffect(() => {

		getData()


	}, [route])

	return (
		<SafeAreaView style={styles.container}>

			<ScrollView style={styles.scrollView}
				refreshControl={<RefreshControl refreshing={loading} onRefresh={getData} />}
			>

				{loading &&
					<View style={{ margin: 10 }}>
						<ActivityIndicator />
					</View>
				}

				{!loading &&

					<View style={{ padding: 20, flex: 1 }}>
						<Text style={styles.title}>{post.fields.title}</Text>
						<Text>{new Date(post.fields.date).toLocaleString()}</Text>
						<View style={{ flex: 1, flexDirection: "row", justifyContent: "center", marginVertical: 10 }}>
							<Image source={{ uri: `${post.fields.image.url}?w=300&h=200` }} style={styles.postImage} />
						</View>
						<Text>{post.fields.content.replace( /(<([^>]+)>)/ig, '')}</Text>

					</View>

				}


			</ScrollView>
		</SafeAreaView>
	)

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
	},
	scrollView: {
		flex: 1,
	},
	post: {
		padding: 10
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 10
	},
	postImage: {
		borderRadius: 10,
		height: 200,
		width: 320
	},

	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
});
