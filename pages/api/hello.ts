import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const posts = await prisma[
		"episode_transcripts_03_23_2022_15_40_26"
	].findMany({});
	res.json(posts);
}
