import { type NextApiRequest, type NextApiResponse } from "next";
import DbEbayListings from "@/db/db-ebay-listings";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { make } = req.body as { make: string };
	const { model } = req.body as { model: string };
	const { engineSize } = req.body as { engineSize: string };
	const { year } = req.body as { year: string };

	// Check if the make, model and engine size are all present
	if (!make || !model || !engineSize) {
		return res.status(400).json(null);
	}
	// Define domain
	const allowedDomain = process.env.ALLOWED_API_URL ?? "";

	// Extract the Referer header
	const referer = req.headers.referer ?? "";

	// Check if the Referer header exists and starts with domain
	if (!referer ?? !referer.startsWith(allowedDomain)) {
		// If not, return a 403 Forbidden status
		return res.status(403).json({ error: "Access denied" });
	}

	const ebayListings = (await DbEbayListings(make, model, engineSize, year)) as {
		results: Array<{
			title: string;
			image: { imageUrl: string };
			price: { value: string };
			itemWebUrl: string;
		}>;
	};
	if (ebayListings === null) {
		return res.status(200).json([]);
	}

	res.status(200).json(ebayListings.results);
}
