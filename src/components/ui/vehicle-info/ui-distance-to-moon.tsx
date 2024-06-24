import { ReactSVG } from "react-svg";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Earth, MoonStar } from "lucide-react";

export default function DistanceToMoon({
	distance,
	unit,
	carColour,
}: {
	distance: number;
	unit: string;
	carColour: string;
}) {
	const distanceToMoon = { km: 384400, miles: 238855 }; // Distance to the moon in km and miles
	const progressPercentage =
		unit === "km"
			? (Number(distance) / distanceToMoon.km) * 100
			: (Number(distance) / distanceToMoon.miles) * 100;
	const distanceCarToMoon =
		unit === "km"
			? distanceToMoon.km - Number(distance)
			: distanceToMoon.miles - Number(distance);
	const progressBarWidth = 100;
	const iconPosition = Math.min(
		(progressBarWidth * progressPercentage) / 100,
		100,
	);

	return (
		<div className="flex flex-col items-center w-full">
			<div className="flex items-center gap-2 w-full h-8">
				<Earth />
				<div className="w-full relative">
					<Progress value={progressPercentage} />
					<ReactSVG
						src="/images/moon-car.svg"
						height={44}
						width={44}
						beforeInjection={(svg) => {
							svg.classList.add("animate-rumble");
							svg.setAttribute(
								"style",
								`width: 44px; height: 44px; position: absolute; left: ${iconPosition - 3}%; top: -14px; transform: translateX(-50%); --car-colour: ${carColour}; z-index: 2;`,
							);
						}}
					/>
					<Image
						src="/images/moon-car-flame.gif"
						width={25}
						height={44}
						alt="fire"
						style={{
							position: "absolute",
							left: iconPosition + "%",
							top: "-4.5px",
							transform: "translateX(-195%) rotate(-90deg)",
							zIndex: 1,
						}}
					/>
				</div>
				<MoonStar />
			</div>
			<div className="text-pretty text-center">
				<p>
					{distanceCarToMoon > 0
						? `This vehicle is ${distanceCarToMoon} ${unit} away from the moon`
						: "This vehicle is on the moon!"}
				</p>
				<p>
					{progressPercentage <= 100
						? `It's ${Math.round(progressPercentage)}% of the way there!`
						: `It's driven there ${(unit === "km" ? distance / distanceToMoon.km : distance / distanceToMoon.miles).toFixed(2)} times!`}
				</p>
			</div>
		</div>
	);
}
