export const metadata = {
	title: "Assignment App",
	description: "By me! A student with NIM 2502044264",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className="h-full antialiased">
			<body className="min-h-full flex flex-col m-5 sm:mx-30 sm:my-10">{children}</body>
		</html>
	);
}
