import { useEffect, useState } from "react";
import { Button } from "../inputs";
import { useRecoilState } from "recoil";
import { randomSentence as randomSentenceAtom } from "../../recoil/atoms";
import { withRouter } from "next/router";
import { apiPrefixedRoute } from "../../lib/utils";

const RandomSentence = ({ router }) => {
	const [randomSentence, setRandomSentence] =
		useRecoilState(randomSentenceAtom);
	const [isLoading, setLoading] = useState<boolean>(false);

	const getRandomSentence = async () => {
		setLoading(true);

		const url = apiPrefixedRoute("randomSentence");

		try {
			const resp = await fetch(url);
			const body = await resp.json();
			setRandomSentence(body.text);
			setLoading(false);
		} catch (err) {
			setRandomSentence("Something went wrong. Please shuffle again");
			setLoading(false);
		}
	};

	useEffect(() => {
		getRandomSentence();
	}, []);

	function getNewSentence() {
		getRandomSentence();
	}

	return (
		<div className="grid justify-items-end gap-4">
			<span className="w-full font-serif text-lg">{randomSentence}</span>
			<Button onClick={getNewSentence} disabled={isLoading}>
				Shuffle
			</Button>
		</div>
	);
};

export default withRouter(RandomSentence);
