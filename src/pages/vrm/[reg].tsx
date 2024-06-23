import NumberPlate from "@/components/number-plate/number-plate-visualiser";
import ValidateNumberPlate from "@/components/number-plate/number-plate-validate";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import DbCarInfo from "@/db/db-car-info";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { data } from "autoprefixer";

type dvlaDataType = {
	taxStatus: string;
	motStatus: string;
	taxDueDate: string;
	motExpiryDate: string;
	yearOfManufacture: string;
	colour: string;
	dateOfLastV5CIssued: string;
};

type motDataType = {
	motTestDueDate: string;
	make: string;
	model: string;
};

export async function getServerSideProps({
	params,
}: {
	params: { reg: string };
}) {
	const { reg } = params;
	const formattedReg = reg.replace(" ", "");
	const upperCaseReg = formattedReg.toUpperCase();
	const isValid = (await ValidateNumberPlate(formattedReg)) as {
		validReg: boolean;
		reg: string;
	};
	const validReg = isValid.validReg;
	let carData;
	if (validReg) {
		carData = (await DbCarInfo(upperCaseReg)) as {
			motData: object;
			dvlaData: object;
		};
	} else {
		carData = [];
	}

	return {
		props: {
			formattedReg,
			carData,
			validReg,
		},
	};
}

export default function VehicleInfo({
	formattedReg,
	carData,
	validReg,
}: {
	formattedReg: string;
	carData: { motData: object; dvlaData: object };
	validReg: boolean;
}) {
	const router = useRouter();
	const dataNeeded = useMemo(() => {
		const motData = (carData.motData as motDataType) ?? {};
		const dvlaData = (carData.dvlaData as dvlaDataType) ?? {};
		return {
			taxStatus: dvlaData.taxStatus ?? "Unknown",
			taxDueDate: formatDate(dvlaData.taxDueDate ?? "Unknown"),
			motStatus: motData.motTestDueDate
				? "Valid"
				: dvlaData.motStatus ?? "Unknown",
			motExpiryDate: formatDate(
				dvlaData.motExpiryDate ?? motData.motTestDueDate ?? "Unknown",
			),
			make: motData.make ?? "Unknown",
			model: motData.model ?? "Unknown",
			year: dvlaData.yearOfManufacture ?? "Unknown",
			colour: dvlaData.colour ?? "Unknown",
			v5cIssued: formatDate(dvlaData.dateOfLastV5CIssued ?? "Unknown"),
		};
	}, [carData]);

	useEffect(() => {
		if (!validReg) {
			void router.push("/");
		}
		void router.replace(`/vrm/${formattedReg}`, undefined, {
			shallow: true,
		});
		// disable this rule as it does an infinite loop if i add router
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [validReg, formattedReg]);

	return (
		<div className="flex flex-col gap-4 w-full items-center">
			<NumberPlate reg={formattedReg} />
			<Card className="w-[260px] md:w-[520px]">
				<CardHeader className="pb-3 pt-4">
					<CardTitle className="md:text-3xl">Tax & MOT</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col gap-2 items-center">
					<Card
						className={`${dataNeeded.taxStatus === "Taxed" ? "bg-success" : dataNeeded.taxStatus === "Untaxed" ? "bg-major" : "bg-warning"} w-full`}
					>
						<CardHeader className="md:px-6 p-3 pb-0 pt-2">
							<CardTitle className="md:text-xl text-sm">
								Tax Status
							</CardTitle>
						</CardHeader>
						<CardContent className="md:pb-3 p-3 pt-0 md:text-2xl text-base flex flex-col items-center">
							<div className="flex flex-col items-center w-fit">
								<span className="font-bold">
									{dataNeeded.taxStatus}
								</span>
								<span className="text-xs md:pt-1">
									{checkIfExpired(dataNeeded.taxDueDate)
										? "Expired"
										: "Due"}
									: {dataNeeded.taxDueDate}
								</span>
							</div>
						</CardContent>
					</Card>
					<Card
						className={`${dataNeeded.motStatus === "Valid" ? "bg-success" : dataNeeded.motStatus === "Not valid" ? "bg-major" : "bg-warning"} w-full`}
					>
						<CardHeader className="md:px-6 p-3 pb-0 pt-2">
							<CardTitle className="md:text-xl text-sm">
								MOT Status
							</CardTitle>
						</CardHeader>
						<CardContent className="md:pb-3 p-3 pt-0 md:text-2xl text-base flex flex-col items-center">
							<div className="flex flex-col items-center w-fit">
								<span className="font-bold">
									{dataNeeded.motStatus}
								</span>
								<span className="text-xs md:pt-1">
									{checkIfExpired(dataNeeded.motExpiryDate)
										? "Expired"
										: "Due"}
									: {dataNeeded.motExpiryDate}
								</span>
							</div>
						</CardContent>
					</Card>
				</CardContent>
			</Card>
			<div>
				<Card className="md:w-[450px] w-[260px]">
					<CardHeader className="pb-3 pt-4">
						<CardTitle className="md:text-xl text-base">
							Vehicle Information
						</CardTitle>
					</CardHeader>
					<CardContent className="flex flex-col gap-3 items-center md:pb-3 p-3 pt-0 ">
						<Table>
							<TableBody className="text-left md:text-base text-sm">
								<TableRow>
									<TableCell>
										<div className="flex justify-between w-full items-center">
											<span>Make:</span>
											<span className="text-right font-extrabold">
												{dataNeeded.make}
											</span>
										</div>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>
										<div className="flex justify-between w-full items-center">
											<span>Model:</span>
											<span className="text-right font-extrabold">
												{dataNeeded.model}
											</span>
										</div>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>
										<div className="flex justify-between w-full items-center">
											<span>Year:</span>
											<span className="text-right font-extrabold">
												{dataNeeded.year}
											</span>
										</div>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>
										<div className="flex justify-between w-full items-center">
											<span>Colour:</span>
											<span className="text-right font-extrabold flex justify-end items-center gap-2">
												<Card
													style={{
														backgroundColor:
															dataNeeded.colour,
													}}
													className="w-6 h-6"
												>
													<CardContent></CardContent>
												</Card>
												{dataNeeded.colour}
											</span>
										</div>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>
										<div className="flex justify-between w-full items-center">
											<span>V5C Issued:</span>
											<span className="text-right font-extrabold">
												{dataNeeded.v5cIssued}
											</span>
										</div>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

const formatDate = (dateString: string) => {
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

const checkIfExpired = (dateString: string) => {
	// Split the dateString into parts
	const parts = dateString.split("/");
	// Note: months are 0-based in JavaScript Date, so subtract 1
	// parts[1] - 1 because months are 0-indexed in JavaScript
	const dueDate = new Date(
		parseInt(parts[2] ?? "0"), // Fallback to '0' if parts[2] is undefined
		parseInt(parts[1] ?? "0") - 1, // Fallback to '0' and then subtract 1
		parseInt(parts[0] ?? "0"), // Fallback to '0' if parts[0] is undefined
	);
	const currentDate = new Date();
	dueDate.setHours(0, 0, 0, 0);
	currentDate.setHours(0, 0, 0, 0);

	// Check if the date is expired
	if (dueDate < currentDate) {
		return true;
	} else {
		return false;
	}
};
