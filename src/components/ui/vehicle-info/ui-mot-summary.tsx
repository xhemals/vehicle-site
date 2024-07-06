import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import UIMotNotFound from "@/components/ui/not-found/ui-mot-not-found";

export default function UIMotSummary({
	vehicleData,
}: {
	vehicleData: {
		motInfo: {
			hasHadMot: boolean;
			lastMotTestDateLong: string;
			totalMots: number;
			totalPassedMots: number;
			totalPassedMotsNoAdvisory: number;
			totalPassedMotsWithAdvisory: number;
			totalFailedMots: number;
			totalAdvisories: number;
			totalFails: number;
		};
	};
}) {
	const passRate = Math.round(
		(vehicleData.motInfo.totalPassedMots / vehicleData.motInfo.totalMots) * 100,
	);

	return (
		<>
			{vehicleData.motInfo.hasHadMot ? (
				<div className="flex flex-col md:flex-row md:justify-center md:flex-wrap gap-4 w-full">
					<Card className="md:min-w-[300px] md:max-w-[300px] w-full h-fit">
						<CardContent className="flex flex-col gap-3 items-center md:pb-3 p-3 pt-3">
							<Table>
								<TableBody className="text-left md:text-base text-sm">
									<TableRow>
										<TableCell className="bg-success rounded-t-lg">
											<div className="flex justify-between w-full">
												<span className="text-nowrap">MOTs Passed:</span>
												<span className="text-right font-extrabold">
													{vehicleData.motInfo.totalPassedMotsNoAdvisory}
												</span>
											</div>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className="bg-warning">
											<div className="flex justify-between w-full">
												<span className="text-nowrap">Passed W/ Advisory:</span>
												<span className="text-right font-extrabold">
													{vehicleData.motInfo.totalPassedMotsWithAdvisory}
												</span>
											</div>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className="bg-major rounded-b-lg">
											<div className="flex justify-between w-full">
												<span className="text-nowrap">MOTs Failed:</span>
												<span className="text-right font-extrabold">
													{vehicleData.motInfo.totalFailedMots}
												</span>
											</div>
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</CardContent>
					</Card>
					<Card className="md:min-w-[300px] md:max-w-[300px] w-full h-fit">
						<CardContent className="flex flex-col gap-3 items-center md:pb-3 p-3 pt-3">
							<Table>
								<TableBody className="text-left md:text-base text-sm">
									<TableRow>
										<TableCell>
											<div className="flex justify-between w-full">
												<span className="text-nowrap">Pass Rate:</span>
												<span className="text-right font-extrabold">{passRate}%</span>
											</div>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className="bg-warning">
											<div className="flex justify-between w-full">
												<span className="text-nowrap">Total Advisories:</span>
												<span className="text-right font-extrabold">
													{vehicleData.motInfo.totalAdvisories}
												</span>
											</div>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className="bg-major rounded-b-lg">
											<div className="flex justify-between w-full">
												<span className="text-nowrap">Total Items Failed:</span>
												<span className="text-right font-extrabold">
													{vehicleData.motInfo.totalFails}
												</span>
											</div>
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</div>
			) : (
				<UIMotNotFound />
			)}
		</>
	);
}
