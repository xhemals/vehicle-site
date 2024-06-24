import { type NextApiRequest, type NextApiResponse } from "next";
import DbGetTaxRates from "@/db/db-get-tax-rates";
import DbCarInfo from "@/db/db-car-info";

type dvlaDataType = {
	taxStatus: string;
	motStatus: string;
	taxDueDate: string;
	motExpiryDate: string;
	yearOfManufacture: string;
	colour: string;
	dateOfLastV5CIssued: string;
	co2Emissions: number | string;
	monthOfFirstRegistration: string;
	fuelType: string;
	revenueWeight: string;
	engineCapacity: number | string;
};

type motDataType = {
	motTestDueDate: string;
	make: string;
	model: string;
	motTests: Array<motTestDataType>;
};

type motTestDataType = {
	completedDate: string;
	odometerValue: number | string;
	odometerUnit: string;
	testResult: string;
};

type taxInfoType = {
	rate: number | string;
	band: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { vrm } = req.body as { vrm: string };
	// Define domain
	const allowedDomain = "http://localhost:3000";

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
	const taxInfo = (await DbGetTaxRates(
		dvlaData.co2Emissions ?? "Unknown",
		formatDateMonthYear(dvlaData.monthOfFirstRegistration ?? "Unknown"),
	)) as taxInfoType;

	const dataNeeded = {
		taxStatus: {
			taxed: dvlaData.taxStatus ?? "Unknown",
			due: formatDateShort(dvlaData.taxDueDate ?? "Unknown"),
		},
		taxInfo: {
			rate: taxInfo.rate ?? "Unknown",
			band: taxInfo.band ?? "Unknown",
		},
		motStatus: {
			mot: motData.motTestDueDate ? "Valid" : dvlaData.motStatus ?? "Unknown",
			expiryDate: formatDateShort(
				dvlaData.motExpiryDate ?? motData.motTestDueDate ?? "Unknown",
			),
		},
		motInfo: {
			hasHadMot: motData.motTests ? true : false,
			lastMotTestDate: formatDateShort(
				motData.motTests?.[0]?.completedDate ?? "Unknown",
			),
			totalMots: motData.motTests?.length ?? "Unknown",
		},
		vehicleInformation: {
			make: motData.make ?? "Unknown",
			model: motData.model ?? "Unknown",
			year: dvlaData.yearOfManufacture ?? "Unknown",
			colour: dvlaData.colour ?? "Unknown",
			v5cIssued: formatDateShort(dvlaData.dateOfLastV5CIssued ?? "Unknown"),
			firstRegistered: formatDateMonthYear(
				dvlaData.monthOfFirstRegistration ?? "Unknown",
			),
		},
		vehicleSpec: {
			engineSize: dvlaData.engineCapacity ?? "Unknown",
			co2Emissions: dvlaData.co2Emissions ?? "Unknown",
			fuelType: dvlaData.fuelType ?? "Unknown",
			revenueWeight: dvlaData.revenueWeight ?? "Unknown",
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
					.map((test) => Number(test.odometerValue) ?? "Unknown") ?? "Unknown",
			allMotMiles:
				motData.motTests?.map((test) => Number(test.odometerValue) ?? "Unknown") ??
				"Unknown",
		},
	};

	res.status(200).json(dataNeeded);
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

const formatDateMonthYear = (dateString: string) => {
	if (dateString === "Unknown") {
		return "Unknown";
	}
	// Create a Date object from the dateString
	const date = new Date(dateString);

	// Extract month, and year
	const month = date.toLocaleString("default", { month: "long" });
	const year = date.getFullYear().toString();

	// Return formatted date in the desired format
	return `${month} ${year}`;
};
