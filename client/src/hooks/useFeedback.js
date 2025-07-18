// useFeedback.js
import { useState } from "react";
import axios from "axios";
import { API_BASE } from "../api";

// Full list of genres
const GENRE_OPTIONS = [
  "Pop",
  "Rock",
  "Hip-Hop/Rap",
  "R&B/Soul",
  "Electronic/Dance",
  "Jazz",
  "Classical",
  "Country",
  "Blues",
  "Reggae",
  "Metal",
  "Folk/Americana",
  "Latin",
  "World Music",
  "Punk",
];

export function useFeedback(setView) {
  // Track chosen color per genre; default is white
  const [selections, setSelections] = useState(() =>
    GENRE_OPTIONS.reduce((acc, genre) => {
      acc[genre] = "#FFFFFF";
      return acc;
    }, {})
  );
  const [comments, setComments] = useState("");
  const [error, setError]       = useState(null);
  const [loading, setLoading]   = useState(false);

  // Always-enabled color change
  const handleColorChange = (genre, newColor) => {
    setSelections((prev) => ({
      ...prev,
      [genre]: newColor
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Include only genres where user picked a non-white color
      const picks = Object.entries(selections)
        .filter(([, color]) => color.toUpperCase() !== "#FFFFFF")
        .map(([genre, color]) => ({ genre, color }));

      await axios.post(
        `${process.env.REACT_APP_API_BASE || "http://localhost:8888"}/feedback`,
        { picks, comments },
        { headers: { "Content-Type": "application/json" } }
      );

      setView("default");
    } catch (err) {
      setError("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setView("default");
  };

  return {
    GENRE_OPTIONS,
    selections,
    comments,
    error,
    loading,
    handleColorChange,
    setComments,
    handleSubmit,
    handleCancel,
  };
}
