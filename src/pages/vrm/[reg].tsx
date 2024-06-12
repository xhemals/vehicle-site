import NumberPlate from "@/components/number-plate/number-plate-visualiser";
import ValidateNumberPlate from "@/components/number-plate/number-plate-validate";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import GetMotData from "@/api/get-mot-data";
import GetDvlaInfo from "@/api/get-dvla-info";
import DbCarInfo from "@/db/db-car-info";

export async function getServerSideProps({
	params,
}: {
	params: { reg: string };
}) {
	const { reg } = params;
	const upperCaseReg = reg.toUpperCase();
	const carData = (await DbCarInfo(upperCaseReg)) as object;
	return {
		props: {
			reg,
			carData,
		},
	};
}

export default function VehicleInfo({
	reg,
	carData,
}: {
	reg: string;
	upperCaseReg: string;
	carData: object;
}) {
	const [validReg, setValidReg] = useState(true);
	const router = useRouter();
	// console.log(motData);
	// console.log(dvlaData);
	console.log(carData);

	useEffect(() => {
		const checkNumberPlate = async () => {
			const isValid = (await ValidateNumberPlate(reg)) as {
				validReg: boolean;
				reg: string;
			};
			if (!isValid.validReg) {
				setValidReg(false);
			}
		};

		void checkNumberPlate();
	}, [reg]);

	useEffect(() => {
		if (!validReg) {
			void router.push("/");
		}
	}, [router, validReg]);
	return (
		<div>
			<h1>Vehicle Information</h1>
			<NumberPlate reg={reg} />
		</div>
	);
}
