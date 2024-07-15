import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import DistanceToMoon from "@/components/ui/mileage-history/ui-distance-to-moon";

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
		<>
			{vehicleData.motInfo.hasHadMot ? (
				<Card className="md:w-[450px] w-full h-fit">
					<CardContent className="flex flex-col gap-3 items-center md:pb-3 p-3 pt-3">
						<Table>
							<TableBody className="text-left md:text-base text-sm">
								<TableRow>
									<TableCell>
										<div className="flex justify-between w-full">
											<span className="text-nowrap h-full">Last known mileage:</span>
											<span className="flex flex-col gap-1 text-right font-extrabold">
												{vehicleData.mileage.allPassedMotMiles?.[0] ? (
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
										<div className="flex justify-between w-full">
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
										<div className="flex justify-between w-full">
											<span className="text-nowrap">Average Yearly Mileage:</span>
											<span className="text-right font-extrabold">
												{`${averageYearlyMileage} ${vehicleData.mileage.motOdometerUnit}/year`}
											</span>
										</div>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>
										<div className="flex justify-between w-full">
											<span className="text-nowrap">Estimated Current Mileage:</span>
											<span className="text-right font-extrabold">
												{`${estimatedMileage(weeksSinceLastMot(vehicleData.motInfo.lastMotTestDateShort), averageYearlyMileage, currentMileage)} ${vehicleData.mileage.motOdometerUnit}`}
											</span>
										</div>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>
										<div className="flex flex-col gap-1.5 justify-between w-full items-center">
											<span className="text-nowrap">Distance To The Moon:</span>
											{vehicleData.motInfo.hasHadMot ? (
												<DistanceToMoon
													distance={
														Number(vehicleData.mileage.allPassedMotMiles[0]?.odometerValue) ??
														0
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
			) : (
				<div className="flex flex-col items-center gap-1 h-full text-destructive">
					<p className="text-center md:text-xl text-base font-bold">
						This vehicle has no recorded mileage.
					</p>
					<p className="text-center md:text-xl text-base md:w-3/4 w-full">
						This site uses recorded MOT data to calculate the mileage of the vehicle.
						If there is no recorded MOT data, the site will not be able to calculate
						the mileage of the vehicle.
					</p>
				</div>
			)}
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
