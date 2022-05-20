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
				<h3 className="font-serif text-lg px-1">
					Enter a word to view its usage of over time:
				</h3>
				<input
					className="h-min w-min px-3 py-2 rounded border border-gray-dark"
					placeholder="Word to search"
					onChange={(event) => handleSearch(event)}
				/>
			</div>
		</div>
	);
};
