import { useEffect, useState, useRef, useMemo } from "react";

export default function Page() {
	const [count, setCount] = useState(0);
	const [setup, setSetup] = useState("");
	const [punchline, setPunchline] = useState("");
	const secretCount = useRef(0);

	useEffect(() => {
		fetch("https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw&type=twopart")
			.then((res) => res.json())
			.then((data) => {
				setSetup(data.setup);
				setPunchline(data.delivery);
			});
	}, [count]);

	function handleClick() {
		secretCount.current = secretCount.current + 1;
	}

	const [name, setName] = useState("John");
	const [price, setPrice] = useState(100);

	const totalPrice = useMemo(() => {
		const tax = price / 5;
		return price + tax;
	}, [price]);

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

			{/* useRef */}
			<h3>Secret Counter: {secretCount.current}</h3>
			<button onClick={handleClick}>Add secretly</button>

			{/* useMemo */}
			<h3>
				Name --- total: {name} --- {totalPrice}
			</h3>
			<button onClick={() => setName("Fable")}>Change name</button>
			<button onClick={() => setPrice(price + 100)}>Change price</button>
		</main>
	);
}
