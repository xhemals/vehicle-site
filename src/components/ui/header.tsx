import Image from "next/image";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Link from "next/link";

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
			<ModeToggle />
		</header>
	);
}
