import { useState } from "react";
import { Button } from "../inputs";

export const RandomSentence = () => {
	const [sentence, setSentence] = useState(
		"this is a random sentence from the DB."
	);

	function getNewSentence() {
		setSentence("new sentence here, who dis?");
	}

	return (
		<div className="grid justify-items-end">
			<span className="w-full font-serif text-lg">{sentence}</span>
			<Button onClick={getNewSentence}>Shuffle</Button>
		</div>
	);
};
