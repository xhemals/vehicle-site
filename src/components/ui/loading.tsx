// Import the CSS Module
import styles from "@/styles/loading-animation.module.css";

export default function Loading() {
	return (
		<div className="flex flex-col gap-2 justify-center items-center flex-grow">
			<div className={styles.container}>
				<div className={styles.electron}></div>
				<div className={styles.electron}></div>
			</div>
			<h2 className="text-center text-xl font-bold">Loading...</h2>
		</div>
	);
}
