import NumberPlate from "@/components/number-plate/number-plate-visualiser";
import ValidateNumberPlate from "@/components/number-plate/number-plate-validate";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GetVehicleInfo } from "@/components/api/api-calls";
import UITaxMot from "@/components/ui/vehicle-info/ui-tax-mot";
import UIVehicleInformation from "@/components/ui/vehicle-info/ui-vehicle-information";
import UIVehicleSpec from "@/components/ui/vehicle-info/ui-vehicle-spec";
import UIMileage from "@/components/ui/vehicle-info/ui-mileage";
import UIVehicleNotFound from "@/components/ui/vehicle-info/ui-vehicle-not-found";
import Loading from "@/components/ui/loading";

type vehicleInfoType = {
	errorMessage: string;
	taxStatus: {
		taxed: string;
		due: string;
	};
	taxInfo: {
		rate: number | string;
		band: string;
	};
	motStatus: { mot: string; expiryDateShort: string; expiryDateLong: string };
	motInfo: {
		lastMotTestDateShort: string;
		lastMotTestDateLong: string;
		hasHadMot: boolean;
	};
	vehicleInformation: {
		make: string;
		model: string;
		year: number | string;
		colour: string;
		v5cIssuedShort: string;
		v5cIssuedLong: string;
		firstRegistered: string;
		markedForExport: boolean | string;
	};
	vehicleSpec: {
		engineSize: number | string;
		co2Emissions: number | string;
		euroStatus: string;
		fuelType: string;
		revenueWeight: number | string;
	};
	mileage: {
		lastMotMilage: number | string;
		motOdometerUnit: string;
		allPassedMotMiles: Array<allPassedMotMilesType>;
		mileageIncreasePerYear: Array<mileageIncreasePerYearType>;
	};
};

type allPassedMotMilesType = {
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

export default function VehicleInfo({
	upperCaseReg,
	validReg,
}: {
	upperCaseReg: string;
	validReg: boolean;
}) {
	const [vehicleData, setVehicleData] = useState<vehicleInfoType>();
	const router = useRouter();

	// Default values shown

	useEffect(() => {
		if (!validReg) {
			void router.push("/");
		}
		void router.replace(`/vehicle-check/${upperCaseReg}`, undefined, {
			shallow: true,
		});
		// disable this rule as it does an infinite loop if i add router
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [validReg, upperCaseReg]);

	useEffect(() => {
		function fetchData() {
			GetVehicleInfo(upperCaseReg)
				.then((data) => setVehicleData(data as vehicleInfoType))
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
			<NumberPlate reg={upperCaseReg} className="self-top" />
			{vehicleData ? (
				// If there is an error message, the car cannot be found so show the error message
				vehicleData.errorMessage ? (
					<UIVehicleNotFound reg={upperCaseReg} />
				) : (
					// If there is no error message, show the vehicle information
					<>
						<UITaxMot vehicleData={vehicleData} />
						<div className="flex flex-col md:flex-row md:justify-center md:flex-wrap gap-4 w-full">
							<UIVehicleInformation vehicleData={vehicleData} />
							<UIVehicleSpec vehicleData={vehicleData} />
							<UIMileage vehicleData={vehicleData} />
						</div>
					</>
				)
			) : (
				<Loading />
			)}
		</>
	);
}
