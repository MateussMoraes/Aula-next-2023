export default function Button({ children, estilo }) {
	return (
		<>
		<button className={`bg-green-200 p-4 text-black ${estilo}`}>
			
		</button>
			{children}
		</>
	)
}