import Image from "next/image";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Link from "next/link";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function Header() {
	return (
		<header>
			<Link href="/" passHref>
				<Image
					src="/images/car-service-logo.svg"
					alt="Car Service Logo"
					width={100}
					height={100}
					className="md:w-24 md:h-24 w-14 h-14"
					priority
					placeholder="blur"
					blurDataURL="/images/car-service-logo.svg"
				/>
			</Link>
			<div className="">
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<Link href="/mot-history" legacyBehavior passHref>
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>
									MOT
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<Link href="/mileage-history" legacyBehavior passHref>
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>
									Mileage
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<ModeToggle />
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
			</div>
		</header>
	);
}
