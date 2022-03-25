import { useEffect, useState } from "react";
import { Button } from "../inputs";
import { useRecoilState, useRecoilValue } from "recoil";
import { randomSentence as randomSentenceAtom } from "../../recoil/atoms";

export const RandomSentence = () => {
	const [randomSentence, setRandomSentence] =
		useRecoilState(randomSentenceAtom);
	const getRandomSentence = async () => {
		const url = `http://localhost:3000/api/randomSentence`;
		const resp = await fetch(url);
		const body = await resp.json();
		setRandomSentence(body.text);
	};

	useEffect(() => {
		getRandomSentence();
	}, []);

	function getNewSentence() {
		getRandomSentence();
	}

	return (
		<div className="grid justify-items-end">
			<span className="w-full font-serif text-lg">{randomSentence}</span>
			<Button onClick={getNewSentence}>Shuffle</Button>
		</div>
	);
};
