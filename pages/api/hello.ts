import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const episodes = await prisma[process.env.name_of_table].count();
	res.json(episodes);
}
