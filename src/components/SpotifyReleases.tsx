import { useEffect, useState } from "react";
import { getNewReleases } from "../services/spotify";

interface Album {
  id: string;
  name: string;
  images: { url: string }[];
  artists: { name: string }[];
}

export default function SpotifyReleases() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNewReleases()
      .then(setAlbums)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
      {albums.map((album) => (
        <div
          key={album.id}
          className="bg-white shadow-md rounded p-2 text-center"
        >
          <img
            src={album.images[0].url}
            alt={album.name}
            className="rounded mb-2"
          />
          <h3 className="text-sm font-semibold">{album.name}</h3>
          <p className="text-xs text-gray-600">
            {album.artists.map((a) => a.name).join(", ")}
          </p>
        </div>
      ))}
    </div>
  );
}
