from flask import Flask, jsonify, request
import requests
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

Spotify_Api = {
    "Client_id": os.getenv("SPOTIFY_CLIENT_ID"),
    "Client_secret": os.getenv("SPOTIFY_CLIENT_SECRET")
}

auth_url = "https://accounts.spotify.com/api/token"
auth_response = requests.post(auth_url, {
    "grant_type": "client_credentials",
    "client_id": Spotify_Api["Client_id"],
    "client_secret": Spotify_Api["Client_secret"],
})
access_token = auth_response.json()["access_token"]
headers = {"Authorization": f"Bearer {access_token}"}


Lastfm_Api = {
    "API_key": os.getenv("LASTFM_API_KEY"),
    "API_secret": os.getenv("LASTFM_API_SECRET")
}

@app.route('/')
def index():

    return f"epa"
    

@app.route('/get_new_albums', methods=['GET'])
def get_new_albums():
    response = requests.get(
    "https://api.spotify.com/v1/browse/new-releases",
    headers=headers)

    albums_res = response.json()["albums"]["items"]

    albums = []
    for album in albums_res:
        album_data = {
            "name": album["name"],
            "artist": album["artists"][0]["name"],
            "release_date": album["release_date"],
            "image": album["images"][0]["url"],
            "spotify_url": album["external_urls"]["spotify"]
        }
        albums.append(album_data)
    return jsonify({"albums": albums})

@app.route('/get_top_artists', methods=['GET'])
def get_top_artists():
    response = requests.get(f"http://ws.audioscrobbler.com/2.0/?method=chart.getTopArtists&api_key={Lastfm_Api['API_key']}&format=json")
    artistas = []
    artistas_res = response.json()["artists"]["artist"]
    for artista in artistas_res:
        artista_data = {
            "name": artista["name"],
            "listeners": artista["listeners"],
            "image": artista["image"][2]["#text"],
            "url": artista["url"]
        }
        artistas.append(artista_data)
    return artistas

@app.route('/get_top_tracks', methods=['GET'])
def get_top_tracks():
    response = requests.get(f"http://ws.audioscrobbler.com/2.0/?method=chart.getTopTracks&api_key={Lastfm_Api['API_key']}&format=json")
    tracks = []
    tracks_res = response.json()["tracks"]["track"]
    for track in tracks_res:
        track_data = {
            "name": track["name"],
            "artist": track["artist"]["name"],
            "listeners": track["listeners"],
            "image": track["image"][2]["#text"],
            "url": track["url"]
        }
        tracks.append(track_data)
    return tracks

if __name__ == '__main__':
    app.run(debug=True)