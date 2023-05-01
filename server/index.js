const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const { getCompliment, getFortune, getPhotos, createPhoto, deletePhoto, updatePhoto, searchPhoto } = require('./controller')

app.get("/api/compliment", getCompliment);
app.get("/api/fortune", getFortune);
app.get(`/api/photo`, getPhotos);
app.post(`/api/photo`, createPhoto);
app.delete(`/api/photo/:id`, deletePhoto);
app.put(`/api/photo/:id`, updatePhoto);
app.get(`/api/photo/search`, searchPhoto);

app.listen(4000, () => console.log("Server running on 4000"));
