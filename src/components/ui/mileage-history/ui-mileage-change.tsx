import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableRow,
	TableCell,
	TableHeader,
	TableHead,
} from "@/components/ui/table";

type mileageIncreasePerYearType = {
	date: string;
	odometerValue: number | string;
	mileageDifference: number | string;
};

export default function UIMileage({
	vehicleData,
}: {
	vehicleData: {
		mileage: {
			mileageIncreasePerYear: Array<mileageIncreasePerYearType>;
			motOdometerUnit: string;
		};
	};
}) {
	return (
		<>
			<Card className="md:w-[450px] w-full h-fit">
				<CardHeader>
					<CardTitle>Mileage Changes</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col gap-3 items-center md:pb-3 p-3 pt-3">
					<Table>
						<TableHeader className="text-left md:text-base text-sm font-bold">
							<TableRow>
								<TableHead>Date</TableHead>
								<TableHead>Mileage</TableHead>
								<TableHead>Change</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody className="text-left md:text-base text-sm">
							{vehicleData.mileage.mileageIncreasePerYear.map((data, index) => (
								<TableRow key={index}>
									<TableCell>{data.date}</TableCell>
									<TableCell>
										{data.odometerValue} {vehicleData.mileage.motOdometerUnit}
									</TableCell>
									<TableCell>{data.mileageDifference}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</>
	);
}

const weeksSinceLastMot = (lastMotTestDate: string) => {
	// Split the date string and rearrange it to fit the MM/DD/YYYY format
	const [day, month, year] = lastMotTestDate.split("/");
	const formattedDate = `${month}/${day}/${year}`;

	const currentDate = new Date();
	const motDate = new Date(formattedDate);

	// Calculate the difference in milliseconds
	const millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
	const weeks = Math.floor(
		(currentDate.getTime() - motDate.getTime()) / millisecondsPerWeek,
	);

	return weeks;
};

const estimatedMileage = (
	weeksSinceLastMot: number,
	averageYearlyMileage: number,
	currentMileage: number,
) => {
	const milesPerWeek = averageYearlyMileage / 52;
	return Math.round(weeksSinceLastMot * milesPerWeek + currentMileage);
};
