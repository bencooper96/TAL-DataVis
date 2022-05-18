import { RiLoader2Fill } from "react-icons/ri";
import { BiLoaderAlt } from "react-icons/bi";

export const WordUsageLoadingGame = () => {
	return (
		<div className="w-full h-400 grid place-items-center">
			<BiLoaderAlt size={32} className="animate-spin" color="#0A455D" />
		</div>
	);
};
