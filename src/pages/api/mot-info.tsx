import { type NextApiRequest, type NextApiResponse } from "next";
import DbCarInfo from "@/db/db-car-info";

type dvlaDataType = {
	motStatus: string;
	motExpiryDate: string;
	errorMessage: string;
};

type motDataType = {
	motTestDueDate: string;
	make: string;
	model: string;
	motTests: Array<motTestDataType>;
	errorMessage: string;
};

type motTestDataType = {
	motTestNumber: number;
	completedDate: string;
	odometerValue: number | string;
	odometerUnit: string;
	testResult: string;
	expiryDate: string;
	defects: Array<motDefectDataType>;
};

type motDefectDataType = {
	dangerous: boolean;
	text: string;
	type: string;
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
		motStatus: {
			mot: motData.motTestDueDate ? "Valid" : dvlaData.motStatus ?? "Unknown",
			expiryDateShort: formatDateShort(
				dvlaData.motExpiryDate ?? motData.motTestDueDate ?? "Unknown",
			),
			expiryDateLong: formatDateDMYLong(
				dvlaData.motExpiryDate ?? motData.motTestDueDate ?? "Unknown",
			),
		},
		motInfo: {
			hasHadMot: motData.motTests ? true : false,
			lastMotTestDateShort: formatDateShort(
				motData.motTests?.[0]?.completedDate ?? "Unknown",
			),
			lastMotTestDateLong: formatDateDMYLong(
				motData.motTests?.[0]?.completedDate ?? "Unknown",
			),
			totalMots: motData.motTests?.length ?? "Unknown",
			totalPassedMots:
				motData.motTests?.filter((mot) => mot.testResult === "PASSED").length ??
				"Unknown",
			totalPassedMotsNoAdvisory:
				motData.motTests?.filter(
					(mot) => mot.testResult === "PASSED" && mot.defects.length == 0,
				).length ?? "Unknown",
			totalPassedMotsWithAdvisory:
				motData.motTests?.filter(
					(mot) => mot.testResult === "PASSED" && mot.defects.length > 0,
				).length ?? "Unknown",
			totalFailedMots:
				motData.motTests?.filter((mot) => mot.testResult === "FAILED").length ??
				"Unknown",
			totalAdvisories:
				motData.motTests
					?.filter((mot) => mot.defects.length > 0)
					.map((currentMot) =>
						currentMot.defects.filter(
							(innerCurrentMot) => innerCurrentMot.type !== "FAIL",
						),
					)
					.flat().length ?? "Unknown",
			totalFails:
				motData.motTests
					?.filter((mot) => mot.defects.length > 0)
					.map((currentMot) =>
						currentMot.defects.filter(
							(innerCurrentMot) => innerCurrentMot.type === "FAIL",
						),
					)
					.flat().length ?? "Unknown",
		},
		vehicleInformation: {
			make: motData.make ?? "Unknown",
			model: motData.model ?? "Unknown",
		},
		motTests:
			motData.motTests?.map((test) => {
				return {
					motTestNumber: test.motTestNumber,
					completedDate: formatDateDMYLong(test.completedDate),
					odometerValue: Number(test.odometerValue) ?? "Unknown",
					odometerUnit: test.odometerUnit.toLowerCase() == "km" ? "km" : "miles",
					testResult: test.testResult,
					expiryDate: formatDateShort(test.expiryDate),
					defects: test.defects.map((defect) => {
						return {
							dangerous: defect.dangerous,
							text: defect.text,
							type: defect.type,
						};
					}),
				};
			}) ?? "Unknown",
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
