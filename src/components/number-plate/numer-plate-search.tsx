import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/router";
import ValidateNumberPlate from "@/components/number-plate/number-plate-validate";

export default function NumberPlateSearch() {
	const [reg, setReg] = useState("");
	const [validReg, setValidReg] = useState(true);
	const router = useRouter();

	async function validateReg(event: { preventDefault: () => void }) {
		event.preventDefault();
		const isValid: { validReg: boolean; reg: string } =
			(await ValidateNumberPlate(reg)) as {
				validReg: boolean;
				reg: string;
			};
		if (isValid.validReg) {
			return router.push(`/vrm/${isValid.reg.replace(/\s+/g, "")}`);
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
				<div
					className={`rounded-lg bg-destructive p-2 text-center text-black shadow-lg ${validReg ? "hidden" : ""}`}
				>
					<p>Enter a valid UK reg</p>
				</div>
				<Button
					className="w-3/6 bg-search hover:brightness-75"
					type="submit"
					disabled={!reg}
				>
					Search
				</Button>
			</div>
		</form>
	);
}
