import NumberPlate from "@/components/number-plate/number-plate-visualiser";
import ValidateNumberPlate from "@/components/number-plate/number-plate-validate";
import { GetMileageInfo } from "@/components/api/api-calls";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Loading from "@/components/ui/loading";
import { Separator } from "@/components/ui/separator";
import UIVehicleNotFound from "@/components/ui/not-found/ui-vehicle-not-found";
import UIMileage from "@/components/ui/mileage-history/ui-mileage";
import { MileageChart } from "@/components/ui/charts/mileage-history-bar";
import UIMileageChange from "@/components/ui/mileage-history/ui-mileage-change";
import UIMileageNotFound from "@/components/ui/mot-history/ui-mileage-not-found";

type mileageDataType = {
	errorMessage: string;
	motInfo: {
		hasHadMot: boolean;
		lastMotTestDateLong: string;
		lastMotTestDateShort: string;
	};
	vehicleInformation: {
		colour: string;
	};
	mileage: {
		lastMotMilage: number | string;
		motOdometerUnit: string;
		allPassedMotMiles: Array<passedMotMilesType>;
		mileageIncreasePerYear: Array<mileageIncreasePerYearType>;
	};
};

type passedMotMilesType = {
	date: string;
	odometerValue: number | string;
};

type mileageIncreasePerYearType = {
	date: string;
	odometerValue: number | string;
	mileageDifference: number | string;
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

export default function MileageHistory({
	upperCaseReg,
	validReg,
}: {
	upperCaseReg: string;
	validReg: boolean;
}) {
	const [mileageData, setMileageData] = useState<mileageDataType>();
	const router = useRouter();

	useEffect(() => {
		if (!validReg) {
			void router.push("/");
		}
		void router.replace(`/mileage-history/${upperCaseReg}`, undefined, {
			shallow: true,
		});
		// disable this rule as it does an infinite loop if i add router
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [validReg, upperCaseReg]);

	useEffect(() => {
		function fetchData() {
			GetMileageInfo(upperCaseReg)
				.then((data) => setMileageData(data as mileageDataType))
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
			<h1 className="text-center md:text-5xl text-3xl font-bold">
				Mileage History
			</h1>
			<NumberPlate reg={upperCaseReg} className="self-top" />
			{mileageData ? (
				mileageData.errorMessage ? (
					// Need to sort this out to work with MOT data
					<UIVehicleNotFound reg={upperCaseReg} previousPage="mileage-history" />
				) : mileageData.motInfo.hasHadMot ? (
					<>
						<MileageChart mileageData={mileageData} />
						<Separator className="md:w-3/4" />
						<div className="flex flex-row flex-wrap gap-3 items-top md:pb-3 p-3 pt-3">
							<UIMileage vehicleData={mileageData} />
							<UIMileageChange vehicleData={mileageData} />
						</div>
					</>
				) : (
					<UIMileageNotFound />
				)
			) : (
				<Loading />
			)}
		</>
	);
}
