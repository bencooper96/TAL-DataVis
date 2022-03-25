import type { NextPage } from "next";
import Head from "next/head";
import { Header } from "../components/Header";
import { VisContainer } from "../components/VisualizationContainer";
import { RandomSentence } from "../components/visualizations/RandomSentence";

const Home: NextPage = () => {
	return (
		<div>
			<Head>
				<title>This American Life</title>
				<meta
					name="description"
					content="What is really said in This American Life"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="">
				<Header />
				<div className="container px-2 mx-auto py-8 flex flex-col gap-8">
					<VisContainer label="Random Sentence">
						<RandomSentence />
					</VisContainer>
				</div>
			</main>

			<footer></footer>
		</div>
	);
};

export default Home;
