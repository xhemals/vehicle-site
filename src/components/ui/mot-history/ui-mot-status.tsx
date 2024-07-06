import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function UIMotStatus({
	motStatus,
}: {
	motStatus: {
		mot: string;
		expiryDateShort: string;
		expiryDateLong: string;
	};
}) {
	return (
		<Card
			className={`${motStatus.mot === "Valid" ? "bg-success" : motStatus.mot === "Not valid" ? "bg-major" : "bg-warning"} w-full`}
		>
			<CardHeader className="md:px-6 p-3 pb-0 pt-2">
				<CardTitle className="md:text-xl text-sm">MOT Status</CardTitle>
			</CardHeader>
			<CardContent className="md:pb-3 p-3 pt-0 md:text-2xl text-base flex flex-col items-center">
				<div className="flex flex-col items-center w-fit">
					<span className="font-bold">{motStatus.mot}</span>
					<span className="text-xs md:pt-1">
						{checkIfExpired(motStatus.expiryDateShort) ? "Expired" : "Due"}:{" "}
						{motStatus.expiryDateLong}
					</span>
				</div>
			</CardContent>
		</Card>
	);
}

const checkIfExpired = (dateString: string) => {
	// Split the dateString into parts
	const parts = dateString.split("/");
	// Note: months are 0-based in JavaScript Date, so subtract 1
	// parts[1] - 1 because months are 0-indexed in JavaScript
	const dueDate = new Date(
		parseInt(parts[2] ?? "0"), // Fallback to '0' if parts[2] is undefined
		parseInt(parts[1] ?? "0") - 1, // Fallback to '0' and then subtract 1
		parseInt(parts[0] ?? "0"), // Fallback to '0' if parts[0] is undefined
	);
	const currentDate = new Date();
	dueDate.setHours(0, 0, 0, 0);
	currentDate.setHours(0, 0, 0, 0);

	// Check if the date is expired
	if (dueDate < currentDate) {
		return true;
	} else {
		return false;
	}
};
