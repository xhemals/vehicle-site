import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import ValidateNumberPlate from "@/components/number-plate/number-plate-validate";

export default function NumberPlateSearch() {
	const router = useRouter();
	const queryReg = router.query.reg as string;
	const [reg, setReg] = useState("");
	const [validReg, setValidReg] = useState(true);

	useMemo(() => {
		if (queryReg) {
			setReg(queryReg);
			setValidReg(true);
		}
	}, [queryReg]);

	async function validateReg(event: { preventDefault: () => void }) {
		event.preventDefault();
		const isValid: { validReg: boolean; reg: string } =
			(await ValidateNumberPlate(reg)) as {
				validReg: boolean;
				reg: string;
			};
		if (isValid.validReg) {
			return router.push(`/vehicle-check/${isValid.reg.replace(/\s+/g, "")}`);
		}
		return setValidReg(false);
	}

	return (
		<form onSubmit={validateReg}>
			<div className="flex flex-col max-w-fit gap-2 items-center">
				<input
					className={`bg-plate font-plate text-[39.5px] text-plate-text md:text-[79px] max-h-[55.5px] max-w-[260px] rounded-lg text-center md:max-h-[111px] md:max-w-[520px] focus:outline-none border-8 ${validReg ? "border-transparent" : "border-destructive"} `}
					id="regInput"
					type="text"
					placeholder="Enter Reg"
					maxLength={8}
					autoComplete="off"
					spellCheck="false"
					value={reg}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setReg(e.target.value);
						setValidReg(true);
					}}
					required
				/>
				<Button
					className={`w-3/6 ${
						validReg
							? "bg-search hover:brightness-75"
							: "bg-destructive text-center text-black"
					}`}
					type="submit"
					disabled={!reg || !validReg}
				>
					{validReg ? "Search" : "Enter a valid UK reg"}
				</Button>
			</div>
		</form>
	);
}
