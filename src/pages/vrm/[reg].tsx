import NumberPlate from "@/components/number-plate/number-plate-visualiser";
import ValidateNumberPlate from "@/components/number-plate/number-plate-validate";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export async function getServerSideProps({
	params,
}: {
	params: { reg: string };
}) {
	const { reg } = params;

	return {
		props: {
			reg,
		},
	};
}

export default function VehicleInfo({ reg }: { reg: string }) {
	const [validReg, setValidReg] = useState(true);
	const router = useRouter();

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
