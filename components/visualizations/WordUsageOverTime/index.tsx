import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
	wordCountData as wordCountDataAtom,
	wordSearchChoice as wordSearchChoiceAtom,
} from "../../../recoil/atoms";
import { apiPrefixedRoute } from "../../../lib/utils";
import { WordUsageLineChart } from "./WordCountLineChart";
import { WordUsageLoadingGame } from "./WordCountLoadingGame";
import debounce from "lodash/debounce";
import { NoWordSelectedPage } from "./NoWordSelected";

type WordCountResponseDataPoint = {
	episode: number;
	count: number;
};

const WordUsageOverTime = () => {
	const [wordToSearch, setWordToSearch] = useRecoilState(wordSearchChoiceAtom);
	const [wordCountData, setWordCountData] = useRecoilState(wordCountDataAtom);
	const [isLoading, setLoading] = useState<boolean>(false);

	const getWordCount = async () => {
		setLoading(true);
		const url = apiPrefixedRoute(`wordCount/${wordToSearch}`);

		if (wordToSearch) {
			try {
				const resp = await fetch(url);
				const body: WordCountResponseDataPoint[] = await resp.json();
				setWordCountData(body.sort((a, b) => a.episode - b.episode));
				setLoading(false);
			} catch (err) {
				setLoading(false);
				console.error(err);
			}
		}
	};

	useEffect(() => {
		getWordCount();
	}, [wordToSearch]);

	const handleSearch = useCallback(
		debounce((event) => {
			setWordToSearch(event.target.value);
		}, 500),
		[]
	);

	return (
		<div className="h-200">
			{wordToSearch ? (
				isLoading ? (
					<WordUsageLoadingGame />
				) : (
					<>
						<input
							defaultValue={wordToSearch}
							onChange={(event) => handleSearch(event)}
						/>
						<WordUsageLineChart />
					</>
				)
			) : (
				<NoWordSelectedPage />
			)}
		</div>
	);
};

export default WordUsageOverTime;
