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
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

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
			{/* desktop nav bar */}
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
			{/* <div className="md:hidden">
				<Sheet>
					<SheetTrigger>
						<Menu />
					</SheetTrigger>
					<SheetContent>
						<SheetHeader>
							<SheetDescription>
								<NavigationMenu className="w-full max-w-full">
									<NavigationMenuList className="flex-col w-full space-x-0 gap-3">
										<NavigationMenuItem>
											<Link href="/mot-history" legacyBehavior passHref>
												<NavigationMenuLink className={navigationMenuTriggerStyle()}>
													MOT History
												</NavigationMenuLink>
											</Link>
										</NavigationMenuItem>
										<NavigationMenuItem>
											<Link href="/mileage-history" legacyBehavior passHref>
												<NavigationMenuLink className={navigationMenuTriggerStyle()}>
													Mileage History
												</NavigationMenuLink>
											</Link>
										</NavigationMenuItem>
										<NavigationMenuItem>
											<ModeToggle />
										</NavigationMenuItem>
									</NavigationMenuList>
								</NavigationMenu>
							</SheetDescription>
						</SheetHeader>
					</SheetContent>
				</Sheet>
			</div> */}
		</header>
	);
}
