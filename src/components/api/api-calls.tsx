export async function GetVehicleInfo(reg: string) {
	const url = "/api/vehicle-info";
	const data = new URLSearchParams();
	data.append("vrm", reg);
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

	return response.json();
}

export async function GetMotInfo(reg: string) {
	const url = "/api/mot-info";
	const data = new URLSearchParams();
	data.append("vrm", reg);
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

	return response.json();
}

export async function GetMileageInfo(reg: string) {
	const url = "/api/mileage-info";
	const data = new URLSearchParams();
	data.append("vrm", reg);
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

	return response.json();
}

export async function GetEbayListings(
	make: string,
	model: string,
	engineSize: number | string,
	year: number | string,
) {
	const url = "/api/vehicles-for-sale";
	const data = new URLSearchParams();
	data.append("make", make);
	data.append("model", model);
	data.append("engineSize", engineSize.toString());
	data.append("year", year.toString());
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

	return response.json();
}
