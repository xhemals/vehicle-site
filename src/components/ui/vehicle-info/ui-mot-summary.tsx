import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import {
	Accordion,
	LiAccordionItem,
	LiAccordionTrigger,
	LiAccordionContent,
} from "@/components/ui/li-accordion";

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
				<div className="flex flex-col items-center gap-1 h-full text-destructive">
					<p className="text-center md:text-xl text-base font-bold">
						This vehicle has not recorded MOTs.
					</p>
					<p className="text-center md:text-xl text-base">
						There could be a number of reasons for this. Here are some common reasons:
					</p>
					<ul className="list-image-[url(/images/circle-x.svg)] md:w-[637px] w-[319px] md:text-lg text-sm list-outside ml-6">
						<li>
							<Accordion type="single" collapsible>
								<LiAccordionItem value="item-1">
									<LiAccordionTrigger className="md:text-xl text-base font-bold">
										Newly registered vehicle
									</LiAccordionTrigger>
									<LiAccordionContent className="md:text-lg text-sm pb-2">
										If this vehicle is less than 3 years old, under current legislation, a
										new car doesn&apos;t need to have an MOT test until it is 3 years old.
									</LiAccordionContent>
								</LiAccordionItem>
							</Accordion>
						</li>
						<li>
							<Accordion type="single" collapsible>
								<LiAccordionItem value="item-1">
									<LiAccordionTrigger className="md:text-xl text-base font-bold">
										Vehicle is exempt
									</LiAccordionTrigger>
									<LiAccordionContent className="md:text-lg text-sm  pb-2">
										Vehicles that are exempt from MOT tests include:
										<ul className="list-image-[url(/images/circle-x.svg)] md:text-lg text-sm list-outside ml-6">
											<li>
												Goods vehicles powered by electricity and registered before 1 March
												2015
											</li>
											<li>tractors</li>
											<li>
												some{" "}
												<a
													href="https://www.gov.uk/historic-vehicles"
													target="_blank"
													rel="noreferrer nofollow"
													className="text-destructive"
												>
													historic (&apos;classic&apos;) vehicles
												</a>
											</li>
										</ul>
									</LiAccordionContent>
								</LiAccordionItem>
							</Accordion>
						</li>
						<li>
							<Accordion type="single" collapsible>
								<LiAccordionItem value="item-1">
									<LiAccordionTrigger className="md:text-xl text-base font-bold">
										Lorries, buses and trailers
									</LiAccordionTrigger>
									<LiAccordionContent className="md:text-lg text-sm  pb-2">
										You must get an{" "}
										<a
											href="https://www.gov.uk/annual-test-for-lorries-buses-and-trailers"
											target="_blank"
											rel="noreferrer nofollow"
											className="text-destructive"
										>
											annual test for lorries, buses and trailers instead
										</a>{" "}
										of an MOT. It&apos;s sometimes called the &apos;annual vehicle
										test&apos;.
									</LiAccordionContent>
								</LiAccordionItem>
							</Accordion>
						</li>
					</ul>
				</div>
			)}
		</>
	);
}
