import { useEffect, useState } from "react";
import ValidateNumberPlate from "@/components/number-plate/number-plate-validate";

export default function NumberPlate({ reg }: { reg: string }) {
	const [formattedReg, setFormattedReg] = useState<string[]>([]);

	useEffect(() => {
		const checkNumberPlate = async () => {
			const isValid: { validReg: boolean; reg: string } =
				(await ValidateNumberPlate(reg)) as {
					validReg: boolean;
					reg: string;
				};
			if (isValid.validReg) {
				setFormattedReg(isValid.reg.split(" "));
			}
		};

		void checkNumberPlate();
	}, [reg]);

	return (
		<div className="flex h-[55.5px] w-[260px] flex-col items-center justify-center rounded-lg bg-plate md:h-[111px] md:w-[520px] select-none">
			<div className="flex gap-[16.5px] md:gap-[33px] font-plate text-[39.5px] text-plate-text md:text-[79px]">
				<span>{formattedReg[0]}</span>
				<span>{formattedReg[1]}</span>
			</div>
		</div>
	);
}
