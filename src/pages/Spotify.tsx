// src/pages/Spotify.tsx
import SpotifyReleases from "../components/SpotifyReleases";

const SpotifyPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Nuove uscite da Spotify</h1>
      <SpotifyReleases />
    </div>
  );
};

export default SpotifyPage;
