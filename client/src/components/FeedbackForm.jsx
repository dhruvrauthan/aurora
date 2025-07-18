// FeedbackForm.jsx
import React from "react";

export default function FeedbackForm({
  GENRE_OPTIONS,
  selections,
  comments,
  error,
  loading,
  handleColorChange,
  setComments,
  handleSubmit,
  handleCancel,
  view,
}) {
  if (view !== "feedback") return null;

  return (
    <div style={styles.feedbackBox}>
      <h2 style={styles.feedbackTitle}>Help Improve the Colors</h2>

      <form onSubmit={handleSubmit} style={styles.feedbackForm}>
        <div style={styles.genreList}>
          {GENRE_OPTIONS.map((genre) => (
            <div key={genre} style={styles.genreRow}>
              <span style={styles.genreText}>{genre}</span>
              <input
                type="color"
                value={selections[genre]}
                onChange={(e) => handleColorChange(genre, e.target.value)}
                style={styles.colorPicker}
              />
            </div>
          ))}
        </div>

        <label style={styles.label}>
          Comments (optional)
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            rows={3}
            style={styles.textarea}
          />
        </label>

        {error && <p style={styles.error}>{error}</p>}

        <button
          type="submit"
          disabled={loading}
          style={styles.feedbackButton}
        >
          {loading ? "Sending…" : "Submit Feedback"}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          style={styles.cancelButton}
          disabled={loading}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

const styles = {
  feedbackBox: {
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
    zIndex: 2,
  },
  feedbackTitle: {
    margin: "0 0 15px 0",
    textAlign: "center",
    color: "#ffffff",
    fontSize: "22px",
  },
  feedbackForm: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  genreList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxHeight: "300px",
    overflowY: "auto",
    paddingRight: "5px",
  },
  genreRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#2e2e2e",
    borderRadius: "5px",
    padding: "8px 12px",
  },
  genreText: {
    color: "#ffffff",
    fontSize: "16px",
  },
  colorPicker: {
    width: "2rem",
    height: "2rem",
    padding: 0,
    border: "1px solid #3a3a3a",
    borderRadius: 4,
    cursor: "pointer",
  },
  label: {
    color: "#ffffff",
    fontSize: "14px",
    display: "flex",
    flexDirection: "column",
  },
  textarea: {
    marginTop: "5px",
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #3a3a3a",
    backgroundColor: "#1e1e1e",
    color: "#ffffff",
    resize: "vertical",
  },
  error: {
    color: "#ff6666",
    fontSize: "13px",
    textAlign: "center",
  },
  feedbackButton: {
    marginTop: "10px",
    width: "100%",
    padding: "12px",
    backgroundColor: "#1DB954",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  cancelButton: {
    marginTop: "8px",
    width: "100%",
    padding: "10px",
    backgroundColor: "#444444",
    color: "#ccc",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },
};