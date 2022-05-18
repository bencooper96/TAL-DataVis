import type { NextPage } from "next";
import Head from "next/head";
import { Header, Footer, Main } from "../components/page";
import { VisContainer } from "../components/VisualizationContainer";
import CommonWordBubbleCloud from "../components/visualizations/CommonWords";
import RandomSentence from "../components/visualizations/RandomSentence";
import WordUsageOverTime from "../components/visualizations/WordUsageOverTime";

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>This American Life</title>
				<meta
					name="description"
					content="What is really said in This American Life"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Main>
				<Header />
				<div className="container px-2 mx-auto py-8 flex flex-col gap-8">
					<VisContainer label="Random Sentence">
						<RandomSentence />
					</VisContainer>
					{/* <div className="grid grid-cols-2 gap-8">
						<VisContainer label="Most common words">
							<CommonWordBubbleCloud />
						</VisContainer>
					</div> */}
					<VisContainer label="Word usage over time">
						<WordUsageOverTime />
					</VisContainer>
				</div>
			</Main>

			<Footer />
		</>
	);
};

export default Home;
