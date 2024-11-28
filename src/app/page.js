import Button from "@/components/Button";

export default async function Home() {

  const response = await fetch("https://rickandmortyapi.com/api/character/2");

  const data = await response.json();

  return (
    <main className="">
      {data.name}
    </main>
  );
}
