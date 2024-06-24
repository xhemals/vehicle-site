import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";

export default function UIVehicleSpec({
	vehicleData,
}: {
	vehicleData: {
		vehicleSpec: {
			engineSize: number | string;
			co2Emissions: number | string;
			fuelType: string;
			revenueWeight: number | string;
		};
		taxInfo: { band: string; rate: number | string };
	};
}) {
	return (
		<Card className="md:w-[450px] w-full">
			<CardHeader className="pb-3 pt-4">
				<CardTitle className="md:text-xl text-base">Vehicle Spec</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-3 items-center md:pb-3 p-3 pt-0">
				<Table>
					<TableBody className="text-left md:text-base text-sm">
						<TableRow>
							<TableCell>
								<div className="flex justify-between w-full items-center">
									<span className="text-nowrap">Engine Size:</span>
									<span className="text-right font-extrabold">
										{vehicleData.vehicleSpec.engineSize}
										{vehicleData.vehicleSpec.engineSize === "Unknown" ? "" : " cc"}
									</span>
								</div>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<div className="flex justify-between w-full items-center">
									<span className="text-nowrap">CO₂ Emissions:</span>
									<span className="text-right font-extrabold">
										{vehicleData.vehicleSpec.co2Emissions}{" "}
										{vehicleData.vehicleSpec.co2Emissions === "Unknown" ? "" : " g/km"}
									</span>
								</div>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<div className="flex justify-between w-full items-center">
									<span className="text-nowrap">Tax Band:</span>
									<span className="text-right font-extrabold">
										{vehicleData.taxInfo.band}
									</span>
								</div>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<div className="flex justify-between w-full items-center">
									<span className="text-nowrap">Tax Rate:</span>
									<span className="text-right font-extrabold">
										{vehicleData.taxInfo.rate === "Unknown"
											? "Unknown"
											: `£${vehicleData.taxInfo.rate}/year`}
									</span>
								</div>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<div className="flex justify-between w-full items-center">
									<span className="text-nowrap">Fuel Type:</span>
									<span className="text-right font-extrabold">
										{vehicleData.vehicleSpec.fuelType}
									</span>
								</div>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<div className="flex justify-between w-full items-center">
									<span className="text-nowrap">Revenue Weight:</span>
									<span className="text-right font-extrabold">
										{vehicleData.vehicleSpec.revenueWeight === "Unknown"
											? "Unknown"
											: `${vehicleData.vehicleSpec.revenueWeight} kg`}
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
