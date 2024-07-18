"use client";

import {
	CartesianGrid,
	Line,
	LineChart,
	XAxis,
	YAxis,
	ResponsiveContainer,
	LabelList,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

type passedMotMilesType = {
	date: string;
	odometerValue: number | string;
};

export function MileageChart({
	mileageData,
}: {
	mileageData: {
		mileage: {
			motOdometerUnit: string;
			allPassedMotMiles: Array<passedMotMilesType>;
		};
	};
}) {
	const chartData = mileageData.mileage.allPassedMotMiles.map((data) => {
		return {
			year: data.date,
			miles: data.odometerValue,
			milesLabel:
				data.odometerValue.toString() + " " + mileageData.mileage.motOdometerUnit,
		};
	});

	const chartConfig = {
		miles: {
			label: mileageData.mileage.motOdometerUnit,
			color: "hsl(var(--chart-1))",
		},
	} satisfies ChartConfig;

	return (
		<Card className="w-full md:w-3/4">
			<CardHeader>
				<CardTitle>Mileage Chart</CardTitle>
			</CardHeader>
			<CardContent>
				<ResponsiveContainer width="100%" height={500}>
					<ChartContainer config={chartConfig}>
						<LineChart
							accessibilityLayer
							data={chartData.reverse()}
							margin={{
								left: 12,
								right: 12,
							}}
						>
							<CartesianGrid vertical={false} />
							<XAxis
								dataKey="year"
								tickLine={true}
								axisLine={true}
								tickMargin={8}
								tickFormatter={(value: string) => value.slice(-4)}
								hide
							/>
							<ChartTooltip
								cursor={false}
								content={<ChartTooltipContent hideLabel />}
							/>
							<YAxis
								domain={["dataMin - 20000", "dataMax + 25000"]}
								tick={false}
								allowDataOverflow
								hide
							/>
							<Line
								dataKey="miles"
								type="linear"
								stroke="var(--primary)"
								strokeWidth={2}
								dot={{
									fill: "var(--primary)",
								}}
								activeDot={{
									r: 6,
								}}
							>
								<LabelList
									fill="var(--foreground)"
									dataKey="milesLabel"
									position="top"
									angle={-90}
									offset={46}
									dominantBaseline="middle"
								/>
								<LabelList
									fill="var(--foreground)"
									dataKey="year"
									position="bottom"
									angle={-90}
									offset={25}
									formatter={(value: string) => value.slice(-4)}
									className="font-bold text-foreground"
									dominantBaseline="ideographic"
								/>
							</Line>
						</LineChart>
					</ChartContainer>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
}
