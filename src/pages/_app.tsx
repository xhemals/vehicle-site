import { GeistSans } from "geist/font/sans";
import { type AppType } from "next/app";
import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";

const MyApp: AppType = ({ Component, pageProps }) => {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<Header />
			<main className={GeistSans.className}>
				<Component {...pageProps} />
			</main>
			<Footer />
		</ThemeProvider>
	);
};

export default MyApp;
