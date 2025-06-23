import axios from "axios";

const SPOTIFY_TOKEN =
  "BQAgdud6CIwLEzq1dgFKbJpFTR0iadzbX3YtORT-xGh7tjSCDx4hM-rzckhswjQChSHwEcASY1j0ALyCKJgTz1XVT0f0a5r5kwJCLuAsJ8Eg7YJVu4vD0Aq4ytR2sb8FsLJ-5wNfdQcm4TXKz_GMfVHvbzwdZyHYORN8nU_TP4rnuHSvIYuPVOJaPuYuCuc96JDrXUMcsinT__DX85sJkuuyelAsMsXN1mCYJcakbyMUYplJbGZ76h1EaZiUIyfdg-1yHwL0-e6LrbXWqEWqKQogVS4wwOqpi_l8JEwL8Avp7YToxwVmirN3WxUq"; // sostituisci con il tuo token

const api = axios.create({
  baseURL: "https://api.spotify.com/v1",
  headers: {
    Authorization: SPOTIFY_TOKEN,
  },
});

export const getNewReleases = async () => {
  const response = await api.get("/browse/new-releases?limit=10");
  return response.data.albums.items;
};
