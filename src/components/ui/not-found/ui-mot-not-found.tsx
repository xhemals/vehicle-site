import {
	Accordion,
	LiAccordionItem,
	LiAccordionTrigger,
	LiAccordionContent,
} from "@/components/ui/li-accordion";

export default function UIMotNotFound() {
	return (
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
	);
}
