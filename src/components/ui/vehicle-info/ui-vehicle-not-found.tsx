import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
	Accordion,
	LiAccordionItem,
	LiAccordionTrigger,
	LiAccordionContent,
} from "@/components/ui/li-accordion";

export default function UIVehicleNotFound({ reg }: { reg: string }) {
	return (
		<div className="flex flex-col items-center gap-1 h-full text-destructive">
			<h2 className="text-center md:text-5xl text-3xl font-bold">
				Vehicle not found
			</h2>
			<p className="text-center md:text-xl text-base">
				The vehicle you are looking for cannot be found. Please check that the
				number plate has been entered correctly and try again.
			</p>
			<Link href={`/?reg=${reg}`} passHref className="py-3">
				<Button className="hover:brightness-75">Try again</Button>
			</Link>
			<h3 className="text-center md:text-2xl text-lg font-bold">
				Why can&apos;t I find this vehicle?
			</h3>
			<p className="text-center md:text-xl text-base">
				There could be a number of reasons why this vehicle cannot be found. Here
				are some common reasons:
			</p>
			<div className="md:w-[896px] w-[319px]">
				<ul className="list-image-[url(/images/circle-x.svg)] md:text-lg text-sm list-outside ml-6">
					<li>
						<Accordion type="single" collapsible>
							<LiAccordionItem value="item-1">
								<LiAccordionTrigger className="md:text-xl text-base font-bold">
									Registration entered incorrectly
								</LiAccordionTrigger>
								<LiAccordionContent className="md:text-lg text-sm pb-2">
									Although there are checks in place to ensure that the number plate
									entered is in the correct format, it is possible that the number plate
									entered is incorrect. This could be due to a typo or the plate not
									being registered to a vehicle.
								</LiAccordionContent>
							</LiAccordionItem>
						</Accordion>
					</li>
					<li>
						<Accordion type="single" collapsible>
							<LiAccordionItem value="item-1">
								<LiAccordionTrigger className="md:text-xl text-base font-bold">
									Newly registered vehicle
								</LiAccordionTrigger>
								<LiAccordionContent className="md:text-lg text-sm pb-2">
									If the vehicle you are looking for is newly registered, it may take
									some time for the vehicle information to be available.
								</LiAccordionContent>
							</LiAccordionItem>
						</Accordion>
					</li>
					<li>
						<Accordion type="single" collapsible>
							<LiAccordionItem value="item-1">
								<LiAccordionTrigger className="md:text-xl text-base font-bold">
									Recently changed plates
								</LiAccordionTrigger>
								<LiAccordionContent className="md:text-lg text-sm  pb-2">
									If you have recently changed the number plate of this vehicle, it may
									take some time for the vehicle information to be available.
								</LiAccordionContent>
							</LiAccordionItem>
						</Accordion>
					</li>
				</ul>
			</div>
		</div>
	);
}
