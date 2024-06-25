import { Card, CardHeader, CardTitle, CardContent } from "../card";
import { Table, TableBody, TableRow, TableCell } from "../table";
import DistanceToMoon from "./ui-distance-to-moon";

type passedMotMilesType = {
	date: string;
	odometerValue: number | string;
};

export default function UIMileage({
	vehicleData,
}: {
	vehicleData: {
		mileage: {
			allPassedMotMiles: Array<passedMotMilesType>;
			motOdometerUnit: string;
		};
		motInfo: {
			hasHadMot: boolean;
			lastMotTestDateLong: string;
			lastMotTestDateShort: string;
		};
		vehicleInformation: {
			colour: string;
		};
	};
}) {
	const averageYearlyMileage = Math.round(
		Number(vehicleData.mileage.allPassedMotMiles[0]?.odometerValue) /
			(vehicleData.mileage.allPassedMotMiles.length + 2), // Add 2 to record the extra years where a car doesn't have an MOT
	);

	const currentMileage =
		Number(vehicleData.mileage.allPassedMotMiles[0]?.odometerValue) ?? "Unknown";

	return (
		<Card className="md:min-w-[450px] md:max-w-[450px] w-full h-fit">
			<CardHeader className="pb-3 pt-4">
				<CardTitle className="md:text-xl text-base">Mileage</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-3 items-center md:pb-3 p-3 pt-0">
				<Table>
					<TableBody className="text-left md:text-base text-sm">
						<TableRow>
							<TableCell>
								<div className="flex justify-between w-full items-center">
									<span className="text-nowrap">Last known mileage:</span>
									<span className="flex flex-col gap-1 text-right font-extrabold">
										{vehicleData.motInfo.hasHadMot &&
										vehicleData.mileage.allPassedMotMiles?.[0] ? (
											<>
												<span>
													{currentMileage} {vehicleData.mileage.motOdometerUnit} on
												</span>{" "}
												<span>{vehicleData.motInfo.lastMotTestDateLong}</span>
											</>
										) : (
											"Unknown"
										)}
									</span>
								</div>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<div className="flex justify-between w-full items-center">
									<span className="text-nowrap">Mileage Last Year:</span>
									<span className="text-right font-extrabold">
										{vehicleData.motInfo.hasHadMot &&
										vehicleData.mileage.allPassedMotMiles?.[0]
											? `${Number(vehicleData.mileage.allPassedMotMiles[0].odometerValue) - Number(vehicleData.mileage.allPassedMotMiles[1]?.odometerValue)}
                                        ${vehicleData.mileage.motOdometerUnit}`
											: "Unknown"}
									</span>
								</div>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<div className="flex justify-between w-full items-center">
									<span className="text-nowrap">Average Yearly Mileage:</span>
									<span className="text-right font-extrabold">
										{vehicleData.motInfo.hasHadMot
											? `${averageYearlyMileage} ${vehicleData.mileage.motOdometerUnit}/year`
											: "Unknown"}
									</span>
								</div>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<div className="flex justify-between w-full items-center">
									<span className="text-nowrap">Estimated Current Mileage:</span>
									<span className="text-right font-extrabold">
										{vehicleData.motInfo.hasHadMot
											? `${estimatedMileage(weeksSinceLastMot(vehicleData.motInfo.lastMotTestDateShort), averageYearlyMileage, currentMileage)} ${vehicleData.mileage.motOdometerUnit}`
											: "Unknown"}
									</span>
								</div>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<div className="flex flex-col gap-3 justify-between w-full items-center">
									<span className="text-nowrap">Distance To The Moon:</span>
									{vehicleData.motInfo.hasHadMot ? (
										<DistanceToMoon
											distance={
												Number(vehicleData.mileage.allPassedMotMiles[0]?.odometerValue) ?? 0
											}
											unit={vehicleData.mileage.motOdometerUnit ?? "mi"}
											carColour={vehicleData.vehicleInformation.colour ?? "#BABD1A"}
										/>
									) : (
										<DistanceToMoon
											distance={0}
											unit={"mi"}
											carColour={vehicleData.vehicleInformation.colour ?? "#BABD1A"}
										/>
									)}
								</div>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</CardContent>
		</Card>
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
