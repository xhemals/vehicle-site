import { Card, CardContent } from "@/components/ui/card";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";

import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function UIVehiclesForSale({
	ebayListings,
}: {
	ebayListings: {
		title: string;
		image: string;
		price: string;
		url: string;
	}[];
}) {
	return (
		<>
			<div className="flex md:flex-row flex-col gap-3 items-center justify-center h-fit w-full">
				{ebayListings?.map((listing) => (
					<Card key={listing.url} className="h-full w-60">
						<CardContent className="flex flex-col gap-3 items-center md:pb-3 p-3 pt-3">
							<AspectRatio ratio={16 / 12}>
								<Image
									src={listing.image}
									alt={listing.title}
									width={500}
									height={500}
									className="object-contain h-full"
								/>
							</AspectRatio>
							<Separator />
							<p>
								{listing.title.length > 23 ? (
									<HoverCard>
										<HoverCardTrigger className="cursor-pointer text-card-foreground">{`${listing.title.slice(0, 23).trim()}...`}</HoverCardTrigger>
										<HoverCardContent>{listing.title}</HoverCardContent>
									</HoverCard>
								) : (
									listing.title
								)}
							</p>
							<p>£{Number(listing.price).toLocaleString("en-GB")}</p>
							<a
								href={listing.url}
								target="_blank"
								rel="noreferrer nofollow"
								className="text-primary"
							>
								<Button className="hover:brightness-75 active:brightness-75">
									View on eBay
								</Button>
							</a>
						</CardContent>
					</Card>
				))}
			</div>
		</>
	);
}
