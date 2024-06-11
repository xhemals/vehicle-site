import validation from "uk-numberplates";

export default function ValidateNumberPlate(reg: string) {
	return new Promise((resolve) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
		validation.validate(
			reg,
			function (err: Error | null, data: { plate?: string }) {
				if (!err) {
					resolve({
						validReg: true,
						reg: data.plate,
					});
				} else {
					resolve(false);
				}
			},
		);
	});
}
