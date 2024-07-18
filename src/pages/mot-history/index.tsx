import NumberPlateSearch from "@/components/number-plate/numer-plate-search";
import {
	Accordion,
	LiAccordionContent,
	LiAccordionItem,
	LiAccordionTrigger,
} from "@/components/ui/li-accordion";
import { NextSeo } from "next-seo";

export default function Home() {
	return (
		<>
			<NextSeo
				title="MOT Check"
				description="Check your vehicles MOT status and details"
			/>
			<h1 className="text-center md:text-5xl text-3xl font-bold">MOT Check</h1>
			<NumberPlateSearch searchPage="mot-history" />
			<div className="flex flex-col items-center md:items-start md:flex-row md:justify-center md:flex-wrap gap-4 h-full">
				<div className="md:w-[267px] w-[219px]">
					<h2 className="md:text-left text-center md:text-3xl text-xl font-bold">
						Included Data
					</h2>
					<ul className="list-image-[url(/images/circle-check-big-light-mode.svg)] dark:list-image-[url(/images/circle-check-big-dark-mode.svg)] md:text-xl text-base list-outside ml-6">
						<li>MOT Status</li>
						<li>
							<Accordion type="single" collapsible>
								<LiAccordionItem value="item-1">
									<LiAccordionTrigger className="text-left">
										MOT Summary
									</LiAccordionTrigger>
									<LiAccordionContent>
										<ul className="list-image-[url(/images/circle-check-big-light-mode.svg)] dark:list-image-[url(/images/circle-check-big-dark-mode.svg)] md:text-lg text-sm list-outside ml-6 max-w-inherit">
											<li>MOTs Passed</li>
											<li>Passed W/ Advisory</li>
											<li>MOTs Failed</li>
											<li>Pass Rate</li>
											<li>Total Advisories</li>
											<li>Total Items Failed</li>
										</ul>
									</LiAccordionContent>
								</LiAccordionItem>
							</Accordion>
						</li>
						<li>
							<Accordion type="single" collapsible>
								<LiAccordionItem value="item-1">
									<LiAccordionTrigger className="text-left">
										MOT Test History
									</LiAccordionTrigger>
									<LiAccordionContent>
										<ul className="list-image-[url(/images/circle-check-big-light-mode.svg)] dark:list-image-[url(/images/circle-check-big-dark-mode.svg)] md:text-lg text-sm list-outside ml-6 max-w-inherit">
											<li>Test Number</li>
											<li>Mileage</li>
											<li>
												<Accordion type="single" collapsible>
													<LiAccordionItem value="item-1" className="w-[116px] md:w-[142px]">
														<LiAccordionTrigger className="text-left">
															Defects
														</LiAccordionTrigger>
														<LiAccordionContent>
															<ul className="list-image-[url(/images/circle-check-big-light-mode.svg)] dark:list-image-[url(/images/circle-check-big-dark-mode.svg)] md:text-lg text-sm list-outside ml-6 max-w-inherit">
																<li>Advised Items</li>
																<li>Failed Items</li>
															</ul>
														</LiAccordionContent>
													</LiAccordionItem>
												</Accordion>
											</li>
										</ul>
									</LiAccordionContent>
								</LiAccordionItem>
							</Accordion>
						</li>
					</ul>
				</div>
				{/* <Separator orientation="vertical" className="h-10 hidden md:block" />
				<Separator orientation="horizontal" className="md:hidden" />
				<div>
					<h2 className="text-center md:text-3xl text-xl font-bold">FAQs</h2>
				</div> */}
			</div>
		</>
	);
}
