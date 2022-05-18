import { debounce } from "lodash";
import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { wordSearchChoice as wordSearchChoiceAtom } from "../../../recoil/atoms";

export const NoWordSelectedPage = () => {
	const [wordToSearch, setWordToSearch] = useRecoilState(wordSearchChoiceAtom);

	const handleSearch = useCallback(
		debounce((event) => {
			setWordToSearch(event.target.value);
		}, 500),
		[]
	);

	return (
		<div className="w-full h-400 grid place-items-center">
			<div className="w-full grid place-items-center">
				<h3 className="text-l text-gray px-1">
					Enter a word you want to know the usage of over time:
				</h3>
				<input
					className="h-min w-min"
					onChange={(event) => handleSearch(event)}
				/>
			</div>
		</div>
	);
};
