import agilityConfig from "./agilityConfig"
const agility = require("@agility/content-fetch")

const languageCode = "en-us"

const getApi = ({ isPreview }: { isPreview: boolean }) => {
	const api = agility.getApi({
		guid: agilityConfig.AGILITY_GUID,
		apiKey: isPreview === true ? agilityConfig.AGILITY_API_PREVIEW_KEY : agilityConfig.AGILITY_API_FETCH_KEY,
		isPreview: isPreview === true,
	});

	return api
}


export const getPosts = async (): Promise<any[]> => {
	const api = getApi({ isPreview: false });

	try {

		// get posts...
		let rawPosts = await api.getContentList({
			referenceName: "posts",
			languageCode,
			contentLinkDepth: 2,
			depth: 2,
			take: 50
		});

		const posts: any[] = rawPosts.items.map((post: any) => {
			//category
			const category = post.fields.category?.fields.title || "Uncategorized"

			// date
			const date = new Date(post.fields.date).toLocaleDateString();

			// url
			const url = post.fields.slug;

			// post image src
			let imageSrc = post.fields.image.url;

			// post image alt
			let imageAlt = post.fields.image?.label || null;

			return {
				contentID: post.contentID,
				title: post.fields.title,
				date,
				url,
				category,
				imageSrc,
				imageAlt,
			};
		});

		return posts

	} catch (error) {
		if (console) console.error(error);
		throw new Error("Error getting posts.  Please try again.")
	}
}

export const getSiteinfo = async (): Promise<any> => {
	const api = getApi({ isPreview: false });


	try {
		let header = await api.getContentList({
			referenceName: "siteheader",
			languageCode: languageCode,
			take: 1
		});


		if (header && header.items && header.items.length > 0) {
			return header.items[0];
		}
		throw new Error("No site header found.")

	} catch (error) {
		if (console) console.error(error);
		throw new Error("Error getting site header.  Please try again.")
	}
}


export const getContentItem = async ({ contentID }: { contentID: number }): Promise<any> => {
	const api = getApi({ isPreview: false });

	try {
		let item = await api.getContentItem({
			contentID,
			languageCode: languageCode,
			take: 1
		});
		return item

	} catch (error) {
		if (console) console.error(error);
		throw new Error("Error getting item.  Please try again.")
	}
}