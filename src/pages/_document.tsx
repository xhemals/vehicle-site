import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/images/apple-touch-icon.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="32x32"
						href="/images/favicon-32x32.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="16x16"
						href="/images/favicon-16x16.png"
					/>
					<link rel="manifest" href="/site.webmanifest" />
					<meta name="theme-color" content="#72818f" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
