import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head></Head>
				<body className="px-10 pt-32">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
