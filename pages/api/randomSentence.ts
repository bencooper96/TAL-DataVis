import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	let transcriptText: string;
	const maxActs = 8;
	let actChoice: string = `act${Math.floor(Math.random() * maxActs)}_text`;
	const maxEpisodes = await prisma[process.env.name_of_table].count();
	let episodeChoice = Math.floor(Math.random() * maxEpisodes + 1);

	// Attempts to get random transcript, if the transcript of the selected act is null, throw an error
	async function getRandomTranscript() {
		let act = await prisma[process.env.name_of_table].findUnique({
			where: { episode: episodeChoice },
			select: {
				episode: true,
				[actChoice]: true,
			},
		});
		if (act[actChoice] == null) {
			throw "null transcript";
		}
		return act;
	}

	// Calling the getRandomTranscript function with a 4x retry
	try {
		transcriptText = await getRandomTranscript();
	} catch (e1) {
		if (e1 == "null transcript") {
			console.log("1st try failed");
			try {
				actChoice = `act${Math.floor(Math.random() * maxActs)}_text`;
				episodeChoice = Math.floor(Math.random() * maxEpisodes + 1);
				transcriptText = await getRandomTranscript();
			} catch (e2) {
				if (e2 == "null transcript") {
					console.log("2nd try failed");
					try {
						actChoice = `act${Math.floor(Math.random() * maxActs)}_text`;
						episodeChoice = Math.floor(Math.random() * maxEpisodes + 1);
						transcriptText = await getRandomTranscript();
					} catch (e3) {
						console.log("3rd try failed");
						try {
							actChoice = `act${Math.floor(Math.random() * maxActs)}_text`;
							episodeChoice = Math.floor(Math.random() * maxEpisodes + 1);
							transcriptText = await getRandomTranscript();
						} catch (e4) {
							console.log("4th try failed");
							console.log("aborting....");

							res.json("something went wrong, please try again");
						}
					}
				}
			}
		}
	}

	if (transcriptText) {
		let text = transcriptText[actChoice];
		var groupDifferentSpeakersRegexExp = `"([^"]*)",`; // This creates groups from the different speakers' text within the transcript
		var matches = text.matchAll(groupDifferentSpeakersRegexExp);
		let sentencesArr = [];
		for (const match of matches) {
			// For each speaker (transcript delineates b/t speakers), split up into sentences
			let sentenceSet: [string] = match[1]
				.split(/([^\.\?\!]+[\. \? \! ])( |$)/gm)
				.filter(function (entry: string) {
					return /\S/.test(entry);
				})
				.map((str: string) => str.trim());

			sentencesArr = [...sentencesArr, ...sentenceSet]; // Add sentences for this speaker into aggregate arr
		}
		const selectedSentence =
			sentencesArr[Math.floor(Math.random() * sentencesArr.length + 1)];

		res.json({
			text: selectedSentence,
		});
	} else {
		res.status(500).json({ err: "sorry, I couldn't find a sentence for you" });
	}
}
