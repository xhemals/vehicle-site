import NumberPlate from "@/components/number-plate/number-plate-visualiser";
import ValidateNumberPlate from "@/components/number-plate/number-plate-validate";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GetVehicleInfo, GetEbayListings } from "@/components/api/api-calls";
import UITaxMot from "@/components/ui/vehicle-info/ui-tax-mot";
import UIVehicleInformation from "@/components/ui/vehicle-info/ui-vehicle-information";
import UIVehicleSpec from "@/components/ui/vehicle-info/ui-vehicle-spec";
import UIMileage from "@/components/ui/mileage-history/ui-mileage";
import UIVehicleNotFound from "@/components/ui/not-found/ui-vehicle-not-found";
import UIMotSummary from "@/components/ui/mot-history/ui-mot-summary";
import UIVehiclesForSale from "@/components/ui/vehicle-info/ui-similar-vehicles";
import Loading from "@/components/ui/loading";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NextSeo } from "next-seo";

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

type ebayListingsType = {
	results: object;
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
	const [ebayListings, setEbayListings] = useState<ebayListingsType>();
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

	useEffect(() => {
		if (vehicleData?.errorMessage) {
			return;
		}
		if (vehicleData) {
			GetEbayListings(
				vehicleData.vehicleInformation.make,
				vehicleData.vehicleInformation.model,
				vehicleData.vehicleSpec.engineSize,
				vehicleData.vehicleInformation.year,
			)
				.then((data) => setEbayListings(data as ebayListingsType))
				.catch((error) => {
					console.error("Failed to fetch vehicle info:", error);
				});
		}
	}, [vehicleData]);

	return (
		<>
			<NextSeo title={`Vehicle Check - ${upperCaseReg}`} />
			<h1 className="text-center md:text-5xl text-3xl font-bold">Vehicle Check</h1>
			<NumberPlate reg={upperCaseReg} className="self-top" />
			{vehicleData && ebayListings !== null ? (
				// If there is an error message, the car cannot be found so show the error message
				vehicleData.errorMessage ? (
					<UIVehicleNotFound reg={upperCaseReg} previousPage="vehicle-check" />
				) : (
					// If there is no error message, show the vehicle information
					<>
						<UITaxMot vehicleData={vehicleData} />
						<Separator className="md:w-3/4" />
						<h2 className="text-center md:text-3xl text-xl font-bold">
							Basic Checks
						</h2>
						<div className="flex flex-col md:flex-row md:justify-center md:flex-wrap gap-4 w-full">
							<UIVehicleInformation vehicleData={vehicleData} />
							<UIVehicleSpec vehicleData={vehicleData} />
						</div>
						<Separator className="md:w-3/4" />
						<h3 className="text-center md:text-3xl text-xl font-bold">MOT Summary</h3>
						<UIMotSummary vehicleData={vehicleData} />
						<Link href={`/mot-history/${upperCaseReg}`} passHref>
							{vehicleData.motInfo.hasHadMot ? (
								<Button className="hover:brightness-75 active:brightness-75">
									View MOT History
								</Button>
							) : null}
						</Link>
						<Separator className="md:w-3/4" />
						<h3 className="text-center md:text-3xl text-xl font-bold">
							Mileage Summary
						</h3>
						<UIMileage vehicleData={vehicleData} />
						<Link href={`/mileage-history/${upperCaseReg}`} passHref>
							{vehicleData.motInfo.hasHadMot ? (
								<Button className="hover:brightness-75 active:brightness-75">
									View Mileage History
								</Button>
							) : null}
						</Link>
						<Separator className="md:w-3/4" />
						{Array.isArray(ebayListings) && ebayListings.length > 0 ? (
							<>
								<h3 className="text-center md:text-3xl text-xl font-bold">
									Similar Vehicles For Sale
								</h3>
								<UIVehiclesForSale ebayListings={ebayListings} />
							</>
						) : null}
					</>
				)
			) : (
				<Loading />
			)}
		</>
	);
}
