"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import Divider from "./Divider";
import Link from "next/link";

export default function Page() {
	const [count, setCount] = useState(0);
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

	const inputElement = useRef < HTMLInputElement > null;
	const focusInput = () => {
		inputElement.current?.focus();
	};

	const [address, setAddress] = useState("123 Wrong St, Cambridge, Massachusetts, USA");
	const [price, setPrice] = useState(100);

	const totalPrice = useMemo(() => {
		const tax = price / 5;
		console.log("Your price has been calculated!");

		return price + tax;
	}, [price]);

	return (
		<div>
			<h1 className="text-3xl font-bold">Bryan Amadeus' Page</h1>
			<h2 className="text-2xl mb-3">2502044264</h2>
			<Link
				href="/details"
				className="bg-gray-200 hover:bg-gray-100 text-gray-600 text-sm font-semibold py-1 px-2 border border-gray-400 rounded shadow"
			>
				Learn more
			</Link>

			<Divider />
			<h3 className="text-xl font-bold mb-2">useState</h3>
			<p className="mb-1">Counter: {count}</p>
			<button
				onClick={() => setCount(count + 1)}
				className="bg-blue-400 hover:bg-blue-700 text-white py-2 px-4 rounded"
			>
				Add 1 (also resets joke)
			</button>

			<Divider />
			<h3 className="text-xl font-bold mb-2">useEffect</h3>
			<h3>Random joke: </h3>
			<p>{setup}</p>
			<p>{punchline}</p>

			<Divider />
			<h3 className="text-xl font-bold mb-2">useRef</h3>
			<div>
				<input
					type="text"
					ref={inputElement}
					placeholder="Enter your text"
					className="rounded p-1 border border-gray-300"
				/>
				<button onClick={focusInput} className="ml-2 bg-gray-300 p-1 rounded">
					Focus Input
				</button>
			</div>

			<Divider />
			<h3 className="text-xl font-bold mb-2">useMemo</h3>
			<p>Address: {address}</p>
			<p>Total: {totalPrice}</p>
			<button
				onClick={() => setAddress("XYZ Right St, Jakarta Barat, DKI Jakarta, Indonesia")}
				className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded"
			>
				Change Address
			</button>
			<button
				onClick={() => setPrice(price + 100)}
				className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
			>
				Change price
			</button>
		</div>
	);
}
