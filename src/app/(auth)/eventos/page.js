"use client";

import { queryClient } from "@/providers/ReactQueryProvider";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function EventosPage() {

	const [enable, setEnable] = useState(true);
	const [count, setCount] = useState(1);

	const pathname = usePathname(); // Pegar pagina ativa

	console.log("Pathname ", pathname)

	const { isPending, error, data } = useQuery({
		queryKey: ["getEventos", count], // Array de dependências
		queryFn: async () => {
			const response = await fetchApi("http://localhost:3003/eventos", "GET");

			if (response.isError) {
				throw response;
			} else {
				return response.data;
			}
		},
		refetchOnWindowFocus: false,
		enabled: enable
	});

	console.log(data)
	console.log("Carregando...", isPending)
	console.log(error)

	const fetchApi = async (url, token, method) => {
		try {
			const response = await fetch(url, {
				method: method,
				headers: {
					"Content-type": "application/json",
				}
			});

			const data = await response.json();

			return {
				data: data,
				isError: false,
				error: null
			}
		} catch (error) {
			return {
				data: [],
				isError: true,
				error: [{ message: error?.message || "Erro inesperado" }]
			}
		}
	}

	return (
		<div className="flex flex-col gap-4">

			<h1 className="text-2xl">Eventos</h1>

			<span>Página de eventos</span>

			<div>
				{isPending && (
					<span>Carregando...</span>
				)}
				<table>
					<thead>
						<tr>
							<th>Evento</th>
							<th>Descrição</th>
						</tr>
					</thead>
					<tbody>
						{data?.map((evento) => (
							<tr key={evento.id}>
								<td>{evento.nome}</td>
								<td>{evento.descricao}</td>
							</tr>
						))}
					</tbody>
				</table>

				<div className="flex gap-4">
					<button className="bg-gray-100 p-2 text-black" onClick={() => setCount(count + 1)}>Refazer fetch</button>
					<button className="bg-gray-100 p-2 text-black" onClick={() => queryClient.invalidateQueries({ queryKey: ["getEventos"] })}>Refazer fetch com queryClient</button>
				</div>
			</div>
		</div>
	)
}