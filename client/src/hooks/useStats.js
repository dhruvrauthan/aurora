import { useState } from "react";

export function useStats(view, setView) {

	function toggleStats() {
		if (view != "stats")
			setView("stats")
		else
			setView("playlist")
	}

	return { toggleStats };
}