import React from "react";
import { MdBarChart } from "react-icons/md";

export default function StatsPanel({ genres, toggleStats, view }) {
	return (
		<>
			{view == "stats" && (
				<div style={styles.playlistBox}>
					<h2 style={styles.playlistTitle}>Genres and Colors</h2>
					<div style={styles.playlistList}>
						{genres.length > 0 ? (
							genres.map(({ genre, count, color }) => (
								<div key={genre} style={styles.genreItem}>
									<span style={{ ...styles.swatch, backgroundColor: color }} />
									<span>
										{genre} ({count})
									</span>
								</div>
							))
						) : (
							<p style={styles.noPlaylists}>No genres available.</p>
						)}
					</div>
				</div>
			)}
			<button style={styles.statButton} onClick={() => toggleStats()}>
				<MdBarChart size={24} />
			</button>
		</>
	)
}

const styles = {
	playlistBox: {
		position: "absolute",
		top: "10%",
		left: "50%",
		transform: "translateX(-50%)",
		width: "80%",
		maxWidth: "500px",
		maxHeight: "70vh",
		backgroundColor: "#222222",
		borderRadius: "10px",
		padding: "20px",
		overflowY: "auto",
		boxShadow: "0 4px 6px rgba(0, 0, 0, 0.5)",
		zIndex: 10,
	},
	playlistTitle: {
		margin: "0 0 10px 0",
		textAlign: "center",
		color: "#ffffff",
		fontSize: "20px",
	},
	playlistList: {
		display: "flex",
		flexDirection: "column",
		gap: "10px",
	},
	genreItem: {
		display: "flex",
		alignItems: "center",
		padding: "12px",
		backgroundColor: "#2e2e2e",
		borderRadius: "5px",
		color: "#ffffff",
		fontSize: "16px",
		border: "1px solid #3a3a3a",
	},
	swatch: {
		width: "12px",
		height: "12px",
		borderRadius: "50%",
		marginRight: "8px",
	},
	noPlaylists: {
		textAlign: "center",
		color: "#bbbbbb",
	},
	statButton: {
		position: "absolute",
		bottom: "20px",
		right: "20px",
		backgroundColor: "transparent",
		border: "none",
		color: "#fff",
		cursor: "pointer",
	},
}