import NumberPlate from "@/components/number-plate/number-plate-visualiser";
import ValidateNumberPlate from "@/components/number-plate/number-plate-validate";
import { GetMotInfo } from "@/components/api/api-calls";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import UIMotSummary from "@/components/ui/vehicle-info/ui-mot-summary";
import Loading from "@/components/ui/loading";
import { Separator } from "@/components/ui/separator";
import UIVehicleNotFound from "@/components/ui/not-found/ui-vehicle-not-found";
import UIMotTests from "@/components/ui/mot-history/ui-mot-tests";
import UIMotStatus from "@/components/ui/mot-history/ui-mot-status";
import UIMotNotFound from "@/components/ui/not-found/ui-mot-not-found";

type motDataType = {
	errorMessage: string;
	motStatus: { mot: string; expiryDateShort: string; expiryDateLong: string };
	motInfo: {
		hasHadMot: boolean;
		lastMotTestDateLong: string;
		totalMots: number;
		totalPassedMots: number;
		totalPassedMotsNoAdvisory: number;
		totalPassedMotsWithAdvisory: number;
		totalFailedMots: number;
		totalAdvisories: number;
		totalFails: number;
	};
	vehicleInformation: {
		make: string;
		model: string;
	};
	motTests: Array<motTestDataType>;
};

type motTestDataType = {
	motTestNumber: number;
	completedDate: string;
	odometerValue: number | string;
	odometerUnit: string;
	testResult: string;
	expiryDate: string;
	defects: Array<motDefectDataType>;
};

type motDefectDataType = {
	dangerous: boolean;
	text: string;
	type: string;
};

export async function getServerSideProps({
	params,
}: {
	params: { reg: string };
}) {
	const { reg } = params;
	const formattedReg = reg.replace(" ", "");
	const upperCaseReg = formattedReg.toUpperCase();
	const isValid = (await ValidateNumberPlate(upperCaseReg)) as boolean;
	const validReg = isValid;

	return {
		props: {
			upperCaseReg,
			validReg,
		},
	};
}

export default function MotHistory({
	upperCaseReg,
	validReg,
}: {
	upperCaseReg: string;
	validReg: boolean;
}) {
	const [motData, setMotData] = useState<motDataType>();
	const router = useRouter();

	useEffect(() => {
		if (!validReg) {
			void router.push("/");
		}
		void router.replace(`/mot-history/${upperCaseReg}`, undefined, {
			shallow: true,
		});
		// disable this rule as it does an infinite loop if i add router
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [validReg, upperCaseReg]);

	useEffect(() => {
		function fetchData() {
			GetMotInfo(upperCaseReg)
				.then((data) => setMotData(data as motDataType))
				.catch((error) => {
					console.error("Failed to fetch vehicle info:", error);
				});
		}
		if (validReg) {
			fetchData();
		}
	}, [upperCaseReg, validReg]);

	return (
		<>
			<h1 className="text-center md:text-5xl text-3xl font-bold">MOT History</h1>
			<NumberPlate reg={upperCaseReg} className="self-top" />
			{motData ? (
				motData.errorMessage ? (
					// Need to sort this out to work with MOT data
					<UIVehicleNotFound reg={upperCaseReg} previousPage="mot-history" />
				) : motData.motInfo.hasHadMot ? (
					<>
						<div className="w-full md:w-[520px]">
							<UIMotStatus motStatus={motData.motStatus} />
						</div>
						<h3 className="text-center md:text-3xl text-xl font-bold">Summary</h3>
						<UIMotSummary vehicleData={motData} />
						<Separator className="md:w-3/4" />
						<h3 className="text-center md:text-3xl text-xl font-bold">
							Test History
						</h3>
						<UIMotTests motTests={motData.motTests} />
					</>
				) : (
					<UIMotNotFound />
				)
			) : (
				<Loading />
			)}
		</>
	);
}
