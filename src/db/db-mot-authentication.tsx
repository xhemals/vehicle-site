import { MongoClient } from "mongodb";
import GetMotAuthentication from "@/api/mot-authentication";

export async function GetMotAuth() {
	const uri = process.env.MONGODB_URI ?? "";
	const client = new MongoClient(uri);
	const collection = client.db("data").collection("tokens");
	try {
		await client.connect();
		// Look to see if the token is already in the database
		const document = await collection.findOne({ for: "MOT" });
		if (document) {
			return document.token as string;
		} else {
			// If the token is not in the database, get a new token
			const motToken = (await GetMotAuthentication()) as string;

			// Insert the document with a createdAt field
			await collection.insertOne({
				for: "MOT",
				token: motToken,
				createdAt: new Date(),
			});

			// Create an index on the createdAt field and set it to expire
			await collection.createIndex(
				{ createdAt: 1 },
				{ expireAfterSeconds: 1800 }, // 30 minutes. Tokens expire after 35 minutes from the api
			);

			return motToken;
		}
	} catch (error) {
		throw error;
	} finally {
		await client.close();
	}
}
