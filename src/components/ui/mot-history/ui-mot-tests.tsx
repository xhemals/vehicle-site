import {
	MotAccordion,
	MotAccordionContent,
	MotAccordionItem,
	MotAccordionTrigger,
} from "@/components/ui/mot-accordian";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";

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

export default function UIMotTests({
	motTests,
}: {
	motTests: Array<motTestDataType>;
}) {
	return (
		<div className="flex flex-col gap-3 items-center md:pb-3 pt-0 md:w-[900px] w-full">
			{motTests.map((test, index) => (
				<MotAccordion key={index} type="single" collapsible className="w-full">
					<MotAccordionItem value={`item-${index}`}>
						{test.testResult === "PASSED" && test.defects.length == 0 ? (
							<MotAccordionTrigger className="bg-success">
								<div className="flex justify-between w-full pr-2">
									<span>{test.completedDate}</span>
									<span className="text-right">{test.testResult}</span>
								</div>
							</MotAccordionTrigger>
						) : test.testResult === "PASSED" && test.defects.length > 0 ? (
							<MotAccordionTrigger className="bg-warning">
								<div className="flex justify-between w-full pr-2">
									<span>{test.completedDate}</span>
									<span className="text-right">{test.testResult}</span>
								</div>
							</MotAccordionTrigger>
						) : (
							<MotAccordionTrigger className="bg-major">
								<div className="flex justify-between w-full pr-2">
									<span>{test.completedDate}</span>
									<span className="text-right">{test.testResult}</span>
								</div>
							</MotAccordionTrigger>
						)}
						<MotAccordionContent>
							<Card className="rounded-t-none">
								<CardContent className="flex flex-col gap-3 items-center md:pb-3 p-3 pt-3">
									<Table>
										<TableBody className="text-left md:text-base text-sm">
											<TableRow>
												<TableCell>
													<div className="flex justify-between w-full">
														<span className="text-nowrap">Test Number</span>
														<span className="text-right font-extrabold">
															{test.motTestNumber}
														</span>
													</div>
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													<div className="flex justify-between w-full">
														<span className="text-nowrap">Mileage</span>
														<span className="text-right font-extrabold">
															{test.odometerValue} {test.odometerUnit}
														</span>
													</div>
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell className="border-b">
													<div className="flex justify-between w-full">
														<span className="text-nowrap">Defects</span>
														<span className="text-right font-extrabold">
															{test.defects.length}
														</span>
													</div>
												</TableCell>
											</TableRow>
										</TableBody>
									</Table>
									{test.defects.length > 0 ? (
										<>
											{test.defects.filter((defect) => defect.type === "FAIL").length >
											0 ? (
												<Card className="bg-major w-full">
													<CardHeader className="pb-3 pt-4">
														<CardTitle className="md:text-2xl text-lg">
															Failed Items
														</CardTitle>
													</CardHeader>
													<CardContent className="md:pb-3">
														<ul className="list-image-[url(/images/circle-x.svg)] md:text-lg text-sm list-outside ml-6 text-left">
															{test.defects
																.filter((defect) => defect.type === "FAIL")
																.map((fail, index) => (
																	<li key={index}>
																		<div className="">
																			{fail.text}{" "}
																			{fail.dangerous ? (
																				<span className="bg-destructive w-fit px-1 rounded-lg text-white text-xs align-middle">
																					Dangerous
																				</span>
																			) : (
																				""
																			)}
																		</div>
																	</li>
																))}
														</ul>
													</CardContent>
												</Card>
											) : null}
											{test.defects.filter((defect) => defect.type !== "FAIL").length >
											0 ? (
												<Card className="bg-warning w-full">
													<CardHeader className="pb-3 pt-4">
														<CardTitle className="md:text-2xl text-lg">
															Advised Items
														</CardTitle>
													</CardHeader>
													<CardContent className="md:pb-3">
														<ul className="list-image-[url(/images/circle-alert.svg)] md:text-lg text-sm list-outside ml-6 text-left">
															{test.defects
																.filter((defect) => defect.type !== "FAIL")
																.map((fail, index) => (
																	<li key={index}>{fail.text}</li>
																))}
														</ul>
													</CardContent>
												</Card>
											) : null}
										</>
									) : null}
								</CardContent>
							</Card>
						</MotAccordionContent>
					</MotAccordionItem>
				</MotAccordion>
			))}
		</div>
	);
}
