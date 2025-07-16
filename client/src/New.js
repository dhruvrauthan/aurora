import React, { useState, useEffect, useMemo, useRef } from "react";
import ShaderCanvas from "./components/ShaderCanvas"
import PlaylistMenu from "./components/PlaylistMenu";
import StatsPanel from "./components/StatsPanel";
import { useShaders } from "./hooks/useShaders"
import { usePhaseHue } from "./hooks/usePhaseHue"
import { usePlaylists } from "./hooks/usePlaylists"
import { useStats } from "./hooks/useStats";

export default function New() {
	const isLoggedIn = new URLSearchParams(window.location.search).get("loggedIn") === "true";

	const [view, setView] = useState("default");

	const { vertex, fragment } = useShaders();
	const { lowerPhaseHue, upperPhaseHue, setLowerColor, setUpperColor } = usePhaseHue("#1DB954", "#1DB954");
	const {
		handleLogin,
		toggleMenu,
		playlists,
		selectPlaylist,
		currentPlaylistName,
		genres
	} = usePlaylists(isLoggedIn, view, setView, setLowerColor, setUpperColor);
	const { toggleStats } = useStats(view, setView);

	return (
		<div style={styles.container}>
			<div style={{ ...styles.background }}>
				<ShaderCanvas
					vertex={vertex}
					fragment={fragment}
					lowerPhaseHue={lowerPhaseHue}
					upperPhaseHue={upperPhaseHue}
				// staticScene={staticScene}
				/>
			</div>

			<PlaylistMenu
				showLogin={!isLoggedIn}
				handleLogin={handleLogin}
				toggleMenu={toggleMenu}
				playlists={playlists}
				selectPlaylist={(pl) => {
					selectPlaylist(pl);
				}}
				view={view}
			/>

			<div style={styles.playlistLabel}>
				{currentPlaylistName}
			</div>

			<StatsPanel
				genres={genres}
				view={view}
				toggleStats={toggleStats}
			/>
		</div>
	)
}

const styles = {
	container: {
		position: "relative",
		height: "100vh",
		width: "100vw",
		overflow: "hidden",
	},
	background: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100vw",
		height: "100vh",
		zIndex: -1,
		overflow: "hidden",
	},
	playlistLabel: {
		position: "absolute",
		bottom: "20px",
		left: "20px",
		backgroundColor: "transparent",
		border: "none",
		fontSize: "17px",
		color: "#FFFFFF", // White icon color
		zIndex: 2,
	},
}