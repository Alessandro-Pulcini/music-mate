// src/services/spotify.ts
import axios from "axios";

const API_BASE_URL = "https://api.spotify.com/v1";

export const getNewReleases = async (token: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/browse/new-releases`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Errore nella chiamata Spotify:", error);
    throw error;
  }
};
