"use client";

import { useEffect, useState } from "react";

export default function EventosPage() {

	const [data, setData] = useState();

	const [loading, setLoading] = useState(false);

	const [count, setCount] = useState(1);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);

			const response = await fetch(`https://rickandmortyapi.com/api/character/${count}`);

			const data = await response.json();

			setData(data);

			setLoading(false);
		}

		fetchData();
	}, [count]);

	console.log(data);

	return (
		<>
		<div className="flex p-6 items-center gap-4">
			
			{!loading && (
				<span>{data?.name}</span>
			)}

			{loading && (
				<span>Carregando....</span>
			)}

			<button onClick={() => setCount(count + 1)} className="mt-2 bg-green-200 text-black p-2">Mudar</button>
		</div>
		</>
	)
}