import eBayApi from "ebay-api";

const eBay = new eBayApi({
	appId: process.env.EBAY_APP_ID ?? "",
	certId: process.env.EBAY_CERT_ID ?? "",
	sandbox: false,
	siteId: eBayApi.SiteId.EBAY_MOTOR,
	marketplaceId: eBayApi.MarketplaceId.EBAY_GB, // Set the marketplace to the United Kingdom
});

export default async function GetEbayListings(
	make: string,
	model: string,
	engineSize: string,
	year: string,
) {
	try {
		const modelYears = year ? getYearsAround(Number(year)) : "";
		const results = (await eBay.buy.browse.search({
			q: make + " " + model, // Search for make, model and engine size. This gives the best results
			category_ids: "9801", // Cars
			limit: "7", // Limit to 7 listings
			aspect_filter: `categoryId:18270,Model:{${model}},Model Year:{${modelYears}},Manufacturer:{${make}}`,
		})) as {
			item: { q: string; category_ids: string; limit: number };
		};
		return results;
	} catch (error) {
		console.log("Error fetching eBay listings:", error);
		return null; // Return null if there is an error
	}
}

function getYearsAround(year: number) {
	const currentYear = new Date().getFullYear(); // Get the current year
	const minYear = year - 2; // Calculate 2 years less
	const maxYear = year + 2; // Calculate 2 years more

	// Make sure we don't go beyond the current year
	const validMinYear = Math.max(minYear, year - 2);
	const validMaxYear = Math.min(maxYear, currentYear);

	// Create an array of valid years
	const years = [];
	for (let y = validMinYear; y <= validMaxYear; y++) {
		years.push(y);
	}

	// Join the years into a string separated by commas
	return years.join("|");
}
