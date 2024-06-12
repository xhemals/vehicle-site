import { GetMotAuth } from "@/db/db-mot-authentication";

export default async function GetMotData(reg: string) {
	console.log("GetMotData");
	const authToken = await GetMotAuth();
	return fetch(
		`https://history.mot.api.gov.uk/v1/trade/vehicles/registration/${reg}`,
		{
			method: "GET",
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${authToken}`,
				"X-API-Key": process.env.MOT_API_KEY ?? "",
			},
		},
	)
		.then((response) => response.json())
		.catch((error) => {
			throw error;
		});
}
