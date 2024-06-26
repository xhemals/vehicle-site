import NumberPlateSearch from "@/components/number-plate/numer-plate-search";
import { Separator } from "@/components/ui/separator";
import {
	Accordion,
	LiAccordionContent,
	LiAccordionItem,
	LiAccordionTrigger,
} from "@/components/ui/li-accordion";

export default function Home() {
	return (
		<>
			<h1 className="text-center md:text-5xl text-3xl font-bold">
				Free Car Check
			</h1>
			<NumberPlateSearch />
			<div className="flex flex-col items-center md:items-start md:flex-row md:justify-center md:flex-wrap gap-4 h-full">
				<div className="md:w-[267px] w-[219px]">
					<h2 className="md:text-left text-center md:text-3xl text-xl font-bold">
						Included Data
					</h2>
					<ul className="list-image-[url(/images/circle-check-big-light-mode.svg)] dark:list-image-[url(/images/circle-check-big-dark-mode.svg)] md:text-xl text-base list-outside ml-6">
						<li>Tax Status</li>
						<li>MOT Status</li>
						<li>
							<Accordion type="single" collapsible>
								<LiAccordionItem value="item-1">
									<LiAccordionTrigger>Vehicle Information</LiAccordionTrigger>
									<LiAccordionContent>
										<ul className="list-image-[url(/images/circle-check-big-light-mode.svg)] dark:list-image-[url(/images/circle-check-big-dark-mode.svg)] md:text-lg text-sm list-inside">
											<li>Make</li>
											<li>Model</li>
											<li>Year</li>
											<li>Colour</li>
											<li>V5C Issued</li>
											<li>First Registered</li>
											<li>Export Status</li>
										</ul>
									</LiAccordionContent>
								</LiAccordionItem>
							</Accordion>
						</li>
						<li>
							<Accordion type="single" collapsible>
								<LiAccordionItem value="item-1">
									<LiAccordionTrigger>Vehicle Specs</LiAccordionTrigger>
									<LiAccordionContent>
										<ul className="list-image-[url(/images/circle-check-big-light-mode.svg)] dark:list-image-[url(/images/circle-check-big-dark-mode.svg)] md:text-lg text-sm list-outside ml-6">
											<li>Engine Size</li>
											<li>CO₂ Emissions</li>
											<li>Euro Status</li>
											<li>Tax Band</li>
											<li>Tax Rate</li>
											<li>Fuel Type</li>
											<li>Revenue Weight</li>
										</ul>
									</LiAccordionContent>
								</LiAccordionItem>
							</Accordion>
						</li>
						<li>
							<Accordion type="single" collapsible>
								<LiAccordionItem value="item-1">
									<LiAccordionTrigger>MOT Summary</LiAccordionTrigger>
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
									<LiAccordionTrigger>Mileage Summary</LiAccordionTrigger>
									<LiAccordionContent>
										<ul className="list-image-[url(/images/circle-check-big-light-mode.svg)] dark:list-image-[url(/images/circle-check-big-dark-mode.svg)] md:text-lg text-sm list-outside ml-6 max-w-inherit">
											<li>Last known mileage</li>
											<li>Mileage last year</li>
											<li>Average yearly mileage</li>
											<li>Estimated current mileage</li>
											<li>Distance to the moon</li>
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
