import { Card, CardHeader, CardTitle, CardContent } from "../card";
import { Table, TableBody, TableRow, TableCell } from "../table";
import DistanceToMoon from "./ui-distance-to-moon";

export default function UIMileage({
	vehicleData,
}: {
	vehicleData: {
		mileage: {
			allPassedMotMiles: Array<number | string>;
			motOdometerUnit: string;
		};
		motInfo: { hasHadMot: boolean; lastMotTestDate: string };
		vehicleInformation: {
			colour: string;
		};
	};
}) {
	return (
		<Card className="md:w-[450px] w-full">
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
									<span className="text-right font-extrabold">
										{vehicleData.motInfo.hasHadMot
											? `${vehicleData.mileage.allPassedMotMiles[0]} 
										${vehicleData.mileage.motOdometerUnit} on ${vehicleData.motInfo.lastMotTestDate}`
											: "Unknown"}
									</span>
								</div>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<div className="flex justify-between w-full items-center">
									<span className="text-nowrap">Mileage last year:</span>
									<span className="text-right font-extrabold">
										{vehicleData.motInfo.hasHadMot
											? `${Number(vehicleData.mileage.allPassedMotMiles[0]) - Number(vehicleData.mileage.allPassedMotMiles[1])}
                                        ${vehicleData.mileage.motOdometerUnit}`
											: "Unknown"}
									</span>
								</div>
							</TableCell>
						</TableRow>
						{vehicleData.motInfo.hasHadMot ? (
							<TableRow>
								<TableCell>
									<div className="flex flex-col gap-3 justify-between w-full items-center">
										<span className="text-nowrap">Distance to the Moon:</span>
										<DistanceToMoon
											distance={Number(vehicleData.mileage.allPassedMotMiles[0])}
											unit={vehicleData.mileage.motOdometerUnit}
											carColour={vehicleData.vehicleInformation.colour}
										/>
									</div>
								</TableCell>
							</TableRow>
						) : null}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
