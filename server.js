// server.js
const express = require("express");
const cors = require("cors");
const querystring = require("querystring");
const axios = require("axios");
require("dotenv").config();

const app = express();
const port = 3001;

// Abilita CORS per frontend locale
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Variabili Spotify
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = "http://localhost:3001/callback";

// Scopes richiesti
const scopes = [
  "user-read-private",
  "user-read-email",
  "playlist-read-private",
  "user-library-read",
];

app.get("/login", (req, res) => {
  const authQuery = querystring.stringify({
    response_type: "code",
    client_id,
    scope: scopes.join(" "),
    redirect_uri,
  });

  res.redirect(`https://accounts.spotify.com/authorize?${authQuery}`);
});

app.get("/callback", async (req, res) => {
  const code = req.query.code || null;

  try {
    const tokenRes = await axios.post(
      "https://accounts.spotify.com/api/token",
      querystring.stringify({
        code,
        redirect_uri,
        grant_type: "authorization_code",
      }),
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(client_id + ":" + client_secret).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, refresh_token } = tokenRes.data;

    // Redirige al frontend con il token
    res.redirect(
      `http://localhost:5173/callback#access_token=${access_token}&refresh_token=${refresh_token}`
    );
  } catch (error) {
    console.error("Errore token:", error.response?.data || error.message);
    res.send("Errore nella richiesta del token.");
  }
});

// Facoltativo: endpoint per refresh del token
app.get("/refresh_token", async (req, res) => {
  const refresh_token = req.query.refresh_token;
  try {
    const refreshRes = await axios.post(
      "https://accounts.spotify.com/api/token",
      querystring.stringify({
        grant_type: "refresh_token",
        refresh_token: refresh_token,
      }),
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(client_id + ":" + client_secret).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    res.json(refreshRes.data);
  } catch (err) {
    res.status(500).json({ error: "Refresh token failed" });
  }
});

app.listen(port, () => {
  console.log(`Backend Spotify avviato su http://localhost:${port}`);
});
