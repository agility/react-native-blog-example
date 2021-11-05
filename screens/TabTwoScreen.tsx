import { FontAwesome } from '@expo/vector-icons';
import * as React from 'react';
import { Pressable, StyleSheet, SafeAreaView } from 'react-native';

import PostListing from '../components/PostListing';
import { Text, View } from '../components/Themed';

export default function TabTwoScreen() {
	const [refreshState, setRefreshState] = React.useState(0)
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<View style={{ flex: 1 }}>
					<Text style={{fontSize: 20, fontWeight: "500"}}>Posts</Text>
				</View>

				<View style={{width: 30}}>
					<Pressable
						onPress={() => setRefreshState(Date.now())}
						style={({ pressed }) => ({
							opacity: pressed ? 0.5 : 1,
						})}>
						<FontAwesome
							name="refresh"
							size={25}
							style={{ marginRight: 15 }}
						/>
					</Pressable>
				</View>
			</View>
			<View style={styles.container}>
				<PostListing {...{refreshState}} />
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		padding: 20,
		borderBottomColor: "#ccc",
		borderBottomWidth: 1
	},
	headerTitle: {
		flex: 1
	},
	container: {
		flex: 1,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
});
