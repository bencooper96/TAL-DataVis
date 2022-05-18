import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from "recharts";
import { wordCountData as wordCountDataAtom } from "../../../recoil/atoms";
import { useRecoilState } from "recoil";

export const WordUsageLineChart = () => {
	const [wordCountData, setWordCountData] = useRecoilState(wordCountDataAtom);
	return (
		<ResponsiveContainer width="100%" height={400}>
			<LineChart
				data={wordCountData}
				margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
			>
				<CartesianGrid stroke="#ccc" />
				<XAxis dataKey="episode" type="number" />
				<YAxis dataKey="count" allowDecimals={false} />
				<Line type="monotone" dataKey="count" stroke="#8884d8" dot={false} />
			</LineChart>
		</ResponsiveContainer>
	);
};
