import { MongoClient } from "mongodb";
import GetDvlaInfo from "@/api/get-dvla-info";
import GetMotData from "@/api/get-mot-data";

export default async function DbCarInfo(reg: string) {
	const uri = process.env.MONGODB_URI ?? "";
	const client = new MongoClient(uri);
	const collection = client.db("data").collection("vehicles");
	try {
		await client.connect();
		const document = await collection.findOne({ vrm: reg });

		if (document) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			return { motData: document.motData, dvlaData: document.dvlaData };
		} else {
			// If car not in database, get data and insert it
			const dvlaData = (await GetDvlaInfo(reg)) as object;
			const motData = (await GetMotData(reg)) as object;

			await collection.insertOne({
				vrm: reg,
				motData: motData,
				dvlaData: dvlaData,
				createdAt: new Date(),
			});

			// Ensure the index is created with a TTL of 1 hour
			await collection.createIndex(
				{ createdAt: 1 },
				{ expireAfterSeconds: 3600 },
			);

			return {
				motData: motData,
				dvlaData: dvlaData,
			};
		}
	} catch (error) {
		throw error;
	} finally {
		await client.close();
	}
}
