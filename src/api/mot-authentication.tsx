export default async function GetMotAuthentication() {
	console.log("GetMotAuthentication");
	const url = process.env.MOT_API_TOKEN_URL ?? "";
	const data = new URLSearchParams();
	data.append("grant_type", "client_credentials");
	data.append("client_id", process.env.MOT_API_CLIENT_ID ?? "");
	data.append("client_secret", process.env.MOT_API_CLIENT_SECRET ?? "");
	data.append("scope", "https://tapi.dvsa.gov.uk/.default");

	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: data,
	});

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const json = await response.json();
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
	return json.access_token;
}
