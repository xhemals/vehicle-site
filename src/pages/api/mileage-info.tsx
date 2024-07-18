import { type NextApiRequest, type NextApiResponse } from "next";
import DbCarInfo from "@/db/db-car-info";

type dvlaDataType = {
	colour: string;
	errorMessage: string;
};

type motDataType = {
	motTests: Array<motTestDataType>;
	errorMessage: string;
};

type motTestDataType = {
	completedDate: string;
	odometerValue: number | string;
	odometerUnit: string;
	testResult: string;
	expiryDate: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { vrm } = req.body as { vrm: string };
	// Define domain
	const allowedDomain = process.env.ALLOWED_API_URL ?? "";

	// Extract the Referer header
	const referer = req.headers.referer ?? "";

	// Check if the Referer header exists and starts with domain
	if (!referer ?? !referer.startsWith(allowedDomain)) {
		// If not, return a 403 Forbidden status
		return res.status(403).json({ error: "Access denied" });
	}

	const carData = (await DbCarInfo(vrm)) as {
		motData: object;
		dvlaData: object;
	};

	const motData = (carData.motData as motDataType) ?? {};
	const dvlaData = (carData.dvlaData as dvlaDataType) ?? {};

	if (motData.errorMessage && dvlaData.errorMessage) {
		return res.status(200).json({ errorMessage: motData.errorMessage });
	}
	const dataNeeded = {
		motInfo: {
			hasHadMot: motData.motTests ? true : false,
			lastMotTestDateShort: formatDateShort(
				motData.motTests?.[0]?.completedDate ?? "Unknown",
			),
			lastMotTestDateLong: formatDateDMYLong(
				motData.motTests?.[0]?.completedDate ?? "Unknown",
			),
		},
		vehicleInformation: {
			colour: dvlaData.colour ?? "Unknown",
		},
		mileage: {
			lastMotMilage: motData.motTests?.[0]?.odometerValue ?? "Unknown",
			// convert odometer units to standardised units
			motOdometerUnit:
				motData.motTests?.[0]?.odometerUnit.toLowerCase() == "km"
					? "km"
					: motData.motTests?.[0]?.odometerUnit.toLowerCase() == "mi"
						? "miles"
						: "Unknown" ?? "Unknown",
			allPassedMotMiles:
				motData.motTests
					?.filter((test) => test.testResult === "PASSED")
					.map((test) => {
						return {
							date: formatDateShort(test.completedDate),
							odometerValue: Number(test.odometerValue) ?? "Unknown",
						};
					}) ?? "Unknown",
			mileageIncreasePerYear:
				(() => {
					const passedTests =
						motData.motTests
							?.filter((test) => test.testResult === "PASSED")
							.map((test) => ({
								date: formatDateShort(test.completedDate),
								odometerValue: Number(test.odometerValue),
							})) ?? [];

					const adjustedPassedTests = passedTests.map((test, index, array) => {
						// Use optional chaining and provide a fallback value for odometerValue
						const nextTestOdometerValue =
							array[index + 1]?.odometerValue ?? test.odometerValue;
						const mileageDifference = test.odometerValue - nextTestOdometerValue;

						return {
							...test,
							mileageDifference: mileageDifference,
						};
					});

					return adjustedPassedTests;
				})() ?? "Unknown",
		},
	};

	// setTimeout(() => {
	res.status(200).json(dataNeeded);
	// }, 600000); // 600000 milliseconds = 10 minutes
}

const formatDateShort = (dateString: string) => {
	if (dateString === "Unknown") {
		return "Unknown";
	}
	// Create a Date object from the dateString
	const date = new Date(dateString);

	// Extract day, month, and year
	const day = date.getDate().toString().padStart(2, "0");
	const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
	const year = date.getFullYear().toString();

	// Return formatted date in the desired format
	return `${day}/${month}/${year}`;
};

const formatDateMYLong = (dateString: string) => {
	if (dateString === "Unknown") {
		return "Unknown";
	}
	// Create a Date object from the dateString
	const date = new Date(dateString);

	// Extract month, and year
	const month = date.toLocaleString("en-GB", { month: "long" });
	const year = date.getFullYear().toString();

	// Return formatted date in the desired format
	return `${month} ${year}`;
};

const formatDateDMYLong = (dateString: string) => {
	if (dateString === "Unknown") {
		return "Unknown";
	}
	// Create a Date object from the dateString
	const date = new Date(dateString);

	// Extract month, and year
	const day = date.getDate();
	const month = date.toLocaleString("en-GB", { month: "long" });
	const year = date.getFullYear().toString();
	let daySuffix;
	switch (day) {
		case 1:
		case 21:
		case 31:
			daySuffix = "st";
			break;
		case 2:
		case 22:
			daySuffix = "nd";
			break;
		case 3:
		case 23:
			daySuffix = "rd";
			break;
		default:
			daySuffix = "th";
	}

	// Return formatted date in the desired format
	return `${day}${daySuffix} ${month} ${year}`;
};
