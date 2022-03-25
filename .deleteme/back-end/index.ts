import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	const allEpisodes =
		await prisma.episode_transcripts_03_23_2022_15_40_26.findMany();
	console.log(allEpisodes);
}

main()
	.catch((e) => {
		throw e;
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
