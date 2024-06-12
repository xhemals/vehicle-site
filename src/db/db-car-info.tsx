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

		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		return { motData: document.motData, dvlaData: document.dvlaData };
	} catch (error) {
		// If car not in database, get data and insert it
		const dvlaData = (await GetDvlaInfo(reg)) as object;
		const motData = (await GetMotData(reg)) as object;

		await collection.insertOne({
			vrm: reg,
			motData: motData,
			dvlaData: dvlaData,
			createdAt: new Date(),
		});
		await collection.dropIndex("createdAt_1");
		await collection.createIndex(
			{ createdAt: 1 },
			{ expireAfterSeconds: 3600 }, // "cache" the data for 1 hour
		);
		return {
			motData: motData,
			dvlaData: dvlaData,
		};
	} finally {
		await client.close();
	}
}
