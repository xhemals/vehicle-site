import { MongoClient } from "mongodb";
import GetEbayListings from "@/api/get-ebay-listings";

type ebayListingDataType = {
	total: number;
	itemSummaries: Array<{
		title: string;
		image: { imageUrl: string };
		price: { value: string };
		itemWebUrl: string;
	}>;
};

export default async function DbEbayListings(
	make: string,
	model: string,
	engineSize: string,
	year: string,
) {
	const uri = process.env.MONGODB_URI ?? "";
	const client = new MongoClient(uri);
	const collection = client.db("data").collection("vehicle-listings");
	if (make === "UNKNOWN" && model === "UNKNOWN") {
		return null;
	}
	if (year === "UNKNOWN") {
		const year = null;
	}
	let searchTerm = `${make} ${model}`;
	if (searchTerm.includes("UNKNOWN")) {
		searchTerm = searchTerm
			.replace(/UNKNOWN|(\s{2,})/g, (match) => (match === "UNKNOWN" ? "" : " "))
			.trim(); // Remove any instances of "UNKNOWN" or multiple spaces
	}
	try {
		await client.connect();
		const document = await collection.findOne({
			searchTerm: searchTerm,
			year: year,
		});

		if (document) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			return { results: document.results };
		} else {
			// If car not in database, get data and insert it
			const ebayListings = (await GetEbayListings(
				make,
				model,
				engineSize,
				year,
			)) as unknown as ebayListingDataType;
			if (ebayListings.total === 0) {
				console.log("No results found");
				return null;
			}
			const results = ebayListings.itemSummaries.map(
				(item: {
					title: string;
					image: { imageUrl: string };
					price: { value: string };
					itemWebUrl: string;
				}) => ({
					title: item.title,
					image: item.image.imageUrl,
					price: item.price.value,
					url: item.itemWebUrl,
				}),
			);

			await collection.insertOne({
				searchTerm: searchTerm,
				year: year,
				results: results,
				createdAt: new Date(),
			});

			// Ensure the index is created with a TTL of 1 Day
			await collection.createIndex(
				{ createdAt: 1 },
				{ expireAfterSeconds: 86400 },
			);

			return {
				results,
			};
		}
	} catch (error) {
		throw error;
	} finally {
		await client.close();
	}
}
