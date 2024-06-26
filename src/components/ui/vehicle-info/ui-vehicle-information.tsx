import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";

export default function UIVehicleInformation({
	vehicleData,
}: {
	vehicleData: {
		vehicleInformation: {
			make: string;
			model: string;
			year: number | string;
			colour: string;
			v5cIssuedLong: string;
			firstRegistered: string;
			markedForExport: boolean | string;
		};
	};
}) {
	return (
		<Card className="md:min-w-[450px] md:max-w-[450px] w-full h-fit">
			<CardHeader className="pb-3 pt-4">
				<CardTitle className="md:text-xl text-base">Vehicle Information</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-3 items-center md:pb-3 p-3 pt-0">
				<Table>
					<TableBody className="text-left md:text-base text-sm">
						<TableRow>
							<TableCell>
								<div className="flex justify-between w-full">
									<span className="text-nowrap">Make:</span>
									<span className="text-right font-extrabold">
										{vehicleData.vehicleInformation.make}
									</span>
								</div>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<div className="flex justify-between w-full">
									<span className="text-nowrap">Model:</span>
									<span className="text-right font-extrabold">
										{vehicleData.vehicleInformation.model}
									</span>
								</div>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<div className="flex justify-between w-full">
									<span className="text-nowrap">Year:</span>
									<span className="text-right font-extrabold">
										{vehicleData.vehicleInformation.year}
									</span>
								</div>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<div className="flex justify-between w-full">
									<span className="text-nowrap">Colour:</span>
									<span className="text-right font-extrabold flex justify-end items-center gap-2">
										<Card
											style={{
												backgroundColor: vehicleData.vehicleInformation.colour,
											}}
											className="w-6 h-6"
										>
											<CardContent></CardContent>
										</Card>
										{vehicleData.vehicleInformation.colour}
									</span>
								</div>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<div className="flex justify-between w-full">
									<span className="text-nowrap">V5C Issued:</span>
									<span className="text-right font-extrabold">
										{vehicleData.vehicleInformation.v5cIssuedLong}
									</span>
								</div>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<div className="flex justify-between w-full">
									<span className="text-nowrap">First Registered:</span>
									<span className="text-right font-extrabold">
										{vehicleData.vehicleInformation.firstRegistered}
									</span>
								</div>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<div className="flex justify-between w-full">
									<span className="text-nowrap">Exported:</span>
									<span className="text-right font-extrabold">
										{vehicleData.vehicleInformation.markedForExport === "Unknown"
											? "Unknown"
											: vehicleData.vehicleInformation.markedForExport === true
												? "Yes"
												: "No"}
									</span>
								</div>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
