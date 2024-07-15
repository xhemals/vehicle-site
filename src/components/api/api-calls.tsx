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
