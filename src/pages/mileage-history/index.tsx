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
				Mileage History
			</h1>
			<NumberPlateSearch searchPage="mileage-history" />
			<div className="flex flex-col items-center md:items-start md:flex-row md:justify-center md:flex-wrap gap-4 h-full">
				<div className="md:w-[267px] w-[219px]">
					<h2 className="md:text-left text-center md:text-3xl text-xl font-bold">
						Included Data
					</h2>
					<ul className="list-image-[url(/images/circle-check-big-light-mode.svg)] dark:list-image-[url(/images/circle-check-big-dark-mode.svg)] md:text-xl text-base list-outside ml-6">
						<li>Mileage Chart</li>
						<li>
							<Accordion type="single" collapsible>
								<LiAccordionItem value="item-1">
									<LiAccordionTrigger className="text-left">
										Mileage Summary
									</LiAccordionTrigger>
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
						<li>Mileage Changes</li>
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
