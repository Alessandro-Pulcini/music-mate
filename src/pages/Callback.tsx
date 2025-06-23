import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1));
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");

    if (accessToken) {
      // Salva token in localStorage (puoi anche usare context o state globale)
      localStorage.setItem("spotify_access_token", accessToken);
      localStorage.setItem("spotify_refresh_token", refreshToken || "");

      // Reindirizza alla pagina principale Spotify
      navigate("/spotify");
    } else {
      console.error("Token Spotify non trovato!");
      navigate("/"); // fallback
    }
  }, [navigate]);

  return <p className="p-4">Connessione a Spotify in corso...</p>;
};

export default Callback;
