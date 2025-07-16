import React from "react";
import { FaChartBar, FaBars } from "react-icons/fa";

export default function PlaylistMenu({
	showLogin,
	handleLogin,
	toggleMenu,
	showPlaylists,
	playlists,
	selectPlaylist,
	view
}) {
	return (
		<>
			{!showLogin && (
				<button onClick={toggleMenu} style={styles.hamburgerButton}><FaBars size={20} /></button>
			)}

			{showLogin && (
				<button onClick={handleLogin} style={styles.centerButton}>Get Started</button>
			)}

			{!showLogin && view == "playlists" && (
				<div style={styles.playlistBox}>
				<h2 style={styles.playlistTitle}>Your Playlists</h2>
				<div style={styles.playlistList}>
				  {playlists.length > 0 ? (
					playlists.map((pl) => (
					  <div
						key={pl.id}
						style={styles.playlistItem}
						onClick={() => selectPlaylist(pl)}
					  >
						{pl.name}
					  </div>
					))
				  ) : (
					<p style={styles.noPlaylists}>No playlists available.</p>
				  )}
				</div>
			  </div>
			)}
		</>
	)
}

const styles = {
	centerButton: {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		padding: "15px 30px",
		fontSize: "18px",
		borderRadius: "30px",
		border: "none",
		backgroundColor: "#1DB954", // Spotify green
		color: "#fff",
		cursor: "pointer",
		zIndex: 2,
	},
	hamburgerButton: {
		position: "absolute",
		top: "20px",
		right: "20px",
		backgroundColor: "transparent",
		border: "none",
		cursor: "pointer",
		color: "#FFFFFF", // White icon color
		zIndex: 2,
	},
	playlistBox: {
		position: "absolute",
		top: "10%",
		left: "50%",
		transform: "translateX(-50%)",
		width: "80%",
		maxWidth: "500px",
		maxHeight: "70vh",
		backgroundColor: "#222222", // Dark background for the box
		borderRadius: "10px",
		padding: "20px",
		overflowY: "auto",
		boxShadow: "0 4px 6px rgba(0, 0, 0, 0.5)",
		zIndex: 2,
	},
	playlistTitle: {
		margin: "0 0 10px 0",
		textAlign: "center",
		color: "#ffffff", // White text
		fontSize: "20px",
	},
	playlistList: {
		display: "flex",
		flexDirection: "column",
		gap: "10px",
	},
	playlistItem: {
		padding: "12px",
		backgroundColor: "#2e2e2e", // Slightly lighter dark gray
		borderRadius: "5px",
		cursor: "pointer",
		color: "#ffffff",
		fontSize: "16px",
		// Optionally add a subtle border:
		border: "1px solid #3a3a3a",
	},
	noPlaylists: {
		textAlign: "center",
		color: "#bbbbbb", // Light gray for empty state
	},
}