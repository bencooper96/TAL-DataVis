import { episode_transcripts_03_23_2022_15_40_26 } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	let selectionObj = { episode: true };
	let searchObj = {};
	let actTextColArray = [];
	for (let act_num = 0; act_num < 9; act_num++) {
		let actChoice: string = `act${act_num}_text`;
		actTextColArray = [...actTextColArray, actChoice];
		selectionObj[actChoice] = true;
		searchObj[actChoice] = { search: req.query.searchWord };
	}

	res.json(await getCount());

	async function getCount() {
		if (typeof req.query.searchWord != "string") {
			return "error: searchWord should be a string";
		}
		const response: episode_transcripts_03_23_2022_15_40_26[] =
			await prisma.$queryRaw`SELECT "public"."episode_transcripts_03_23_2022_15_40_26"."episode", "public"."episode_transcripts_03_23_2022_15_40_26"."act0_text", "public"."episode_transcripts_03_23_2022_15_40_26"."act1_text", "public"."episode_transcripts_03_23_2022_15_40_26"."act2_text", "public"."episode_transcripts_03_23_2022_15_40_26"."act3_text", "public"."episode_transcripts_03_23_2022_15_40_26"."act4_text", "public"."episode_transcripts_03_23_2022_15_40_26"."act5_text", "public"."episode_transcripts_03_23_2022_15_40_26"."act6_text", "public"."episode_transcripts_03_23_2022_15_40_26"."act7_text", "public"."episode_transcripts_03_23_2022_15_40_26"."act8_text" FROM "public"."episode_transcripts_03_23_2022_15_40_26" WHERE to_tsvector(concat_ws(' ', "public"."episode_transcripts_03_23_2022_15_40_26"."act1_text", ' ', "public"."episode_transcripts_03_23_2022_15_40_26"."act2_text", ' ', "public"."episode_transcripts_03_23_2022_15_40_26"."act3_text", ' ', "public"."episode_transcripts_03_23_2022_15_40_26"."act4_text", ' ', "public"."episode_transcripts_03_23_2022_15_40_26"."act5_text", ' ', "public"."episode_transcripts_03_23_2022_15_40_26"."act6_text", ' ', "public"."episode_transcripts_03_23_2022_15_40_26"."act7_text", ' ', "public"."episode_transcripts_03_23_2022_15_40_26"."act8_text", ' ', "public"."episode_transcripts_03_23_2022_15_40_26"."act0_text")) @@ to_tsquery('english', ${req.query.searchWord})`;

		let concattedTranscriptTextObj = response.map((ep) => {
			return { episode: ep.episode, text: reduceTranscriptsToString(ep) };
		});

		let reMatchString: RegExp = new RegExp(req.query.searchWord, "g");
		const data = concattedTranscriptTextObj.map((ep) => {
			return {
				episode: ep.episode,
				count: (ep.text.match(reMatchString) || []).length,
			};
		});
		return data;
	}

	function reduceTranscriptsToString(
		actObj: episode_transcripts_03_23_2022_15_40_26
	) {
		return actTextColArray.reduce(
			(str: string, actTextCol: string) => str + " " + actObj[actTextCol]
		);
	}
}
