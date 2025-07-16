import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE } from "../api";
import { usePhaseHue } from "./usePhaseHue";

export function usePlaylists(isLoggedIn, view, setView, setLowerColor, setUpperColor) {
	const [playlists, setPlaylists] = useState([]);
	const [showPlaylists, setShowPlaylists] = useState(false);
	const [currentPlaylistName, setCurrentPlaylistName] = useState("");
	const [genres, setGenres] = useState([])

	function fetchPlaylistTracks(playlist) {
		const playlistId = playlist.id
		axios.get(`${API_BASE}/playlist-tracks/${playlistId}`)
			.then((res) => {
				console.log("Playlist tracks data:", res.data);
				if (res.data.genreCounts && res.data.genreCounts.length > 0) {
					// Use the top genre's color
					const topGenre = res.data.genreCounts[0];
					const secondGenre = res.data.genreCounts[1];
					if (topGenre && topGenre.color) {
						// setPickedColor(topGenre.color)
						setLowerColor(topGenre.color)
						setUpperColor(secondGenre.color)
						// const newHue = hexToHue(topGenre.color);
						// setPhaseHue(newHue);
					}
				}
				setCurrentPlaylistName(playlist.name);
				// setTrackColors(res.data.colors);
				setGenres(res.data.genreCounts); // Store sorted genre list
				setView("default")
			})
			.catch((err) => console.error("Error fetching playlist tracks", err));
	};

	useEffect(() => {
		if (!isLoggedIn) return;

		// If logged in, get playlists and show
		axios.get(`${API_BASE}/playlists`)
			.then((res) => {
				setPlaylists(res.data); // assuming res.data is an array of playlists
			})
			.catch((err) => console.error("Error fetching playlists:", err));

	}, [isLoggedIn]); // runs any time dependency (isLoggedIn) changes

	function handleLogin() {
		window.location.href = `${API_BASE}/login`;
	};

	function toggleMenu() {
		if (view != "playlists")
			setView("playlists")
		else
			setView("default")
		// setBlurBackground(true);
	}

	function selectPlaylist(playlist) {
		fetchPlaylistTracks(playlist);
	}

	return {
		handleLogin,
		toggleMenu,
		playlists,
		selectPlaylist,
		currentPlaylistName,
		genres
	};
}