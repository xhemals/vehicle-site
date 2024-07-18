import { MongoClient } from "mongodb";

export default async function DbGetTaxRates(
	emissions: number | string,
	firstRegistered: string,
) {
	const registeredDate = new Date(firstRegistered);
	// registered after april 2017 gets new tax rates
	if (registeredDate > new Date("2017-05-01")) {
		return { rate: 190, band: "Unknown" };
	}
	if (registeredDate < new Date("2001-03-01")) {
		return { rate: "Unknown", band: "Unknown" };
	}

	// some values are unknown, so return unknown to stop errors
	if (emissions === "Unknown" ?? firstRegistered === "Unknown") {
		return { rate: "Unknown", band: "Unknown" };
	}
	const uri = process.env.MONGODB_URI ?? "";
	const client = new MongoClient(uri);
	const collection = client.db("data").collection("tax-rates-pre-2017");
	try {
		await client.connect();
		const document = await collection.findOne({
			"emissions.lower": { $lte: emissions },
			"emissions.upper": { $gte: emissions },
		});
		if (document) {
			return {
				rate: document.rate as number,
				band: document.band as string,
			};
		} else {
			// if no document found, return unknown
			return { rate: "Unknown", band: "Unknown" };
		}
	} catch (error) {
		throw error;
	} finally {
		await client.close();
	}
}
