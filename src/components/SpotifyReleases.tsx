// src/components/SpotifyReleases.tsx
import { useEffect, useState } from "react";
import { getNewReleases } from "../services/spotify";

const SpotifyReleases = () => {
  const [albums, setAlbums] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("spotify_access_token");
    if (!token) return;

    getNewReleases(token)
      .then((data) => {
        setAlbums(data.albums.items);
      })
      .catch((error) => {
        console.error("Errore caricamento dati Spotify", error);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Caricamento...</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {albums.map((album) => (
        <div key={album.id} className="bg-white p-4 rounded shadow">
          <img
            src={album.images[0]?.url}
            alt={album.name}
            className="rounded"
          />
          <h3 className="mt-2 font-semibold">{album.name}</h3>
          <p className="text-sm">
            {album.artists.map((a: { name: string }) => a.name).join(", ")}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SpotifyReleases;
