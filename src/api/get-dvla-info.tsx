export default async function GetDvlaInfo(reg: string) {
	const url = process.env.DVLA_API_URL ?? "";
	const apiKey = process.env.DVLA_API_KEY ?? "";

	const response = await fetch(url, {
		method: "POST",
		headers: {
			"x-api-key": apiKey,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			registrationNumber: reg,
		}),
	});

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	return response.json();
}
