import { useEffect, useState } from "react";

export default function Page() {
	const [count, setCount] = useState("");
	const [setup, setSetup] = useState("");
	const [punchline, setPunchline] = useState("");

	useEffect(() => {
		fetch("https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw&type=twopart")
			.then((res) => res.json())
			.then((data) => {
				setSetup(data.setup);
				setPunchline(data.delivery);
			});
	}, [count]);

	return (
		<main style={{ margin: 20 }}>
			<h1>Bryan Amadeus / 2502044264</h1>
			<p>
				Computer Science is a prodi learning the various kinds of computers, their
				interactions with each other and us, and so much more.
			</p>
			{/* useState */}
			<h3>Counter: {count}</h3>
			<button onClick={() => setCount(count + 1)}>Add 1 & resets joke</button>

			{/* useEffect */}
			<h3>Random joke: </h3>
			<p>{setup}</p>
			<p>{punchline}</p>
		</main>
	);
}
