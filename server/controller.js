let photos = [
    { 
        id: 1,
        imageURL: `https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-674010.jpg&fm=jpg`,
        rating: 20,
        caption: `Inspiration`
    },
    {
        id: 2,
        imageURL: `https://media.istockphoto.com/id/615398376/photo/new-york-city-nyc-usa.jpg?s=612x612&w=0&k=20&c=rlrsrt4jbORPDSOW5df06Ik_X_5iQo1rYQd53xSs4nw=`,
        rating: 50,
        caption: `NYC`
    },
    {
        id: 3,
        imageURL: `https://images.unsplash.com/photo-1611003228941-98852ba62227?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFieSUyMGRvZ3xlbnwwfHwwfHw%3D&w=1000&q=80`,
        rating: 59,
        caption: `Look at this dog!`
    },
    {
        id: 4,
        imageURL: `https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bmV3JTIwaG91c2V8ZW58MHx8MHx8&w=1000&q=80`,
        rating: 5009,
        caption: `Dream House`
    },
    {
        id: 5,
        imageURL: `https://images.pexels.com/photos/1974521/pexels-photo-1974521.jpeg?cs=srgb&dl=pexels-julia-kuzenkov-1974521.jpg&fm=jpg`,
        rating: 1259,
        caption: `Beach`
    },
    {
        id: 6,
        imageURL: `https://images.ctfassets.net/sfnkq8lmu5d7/3U2wUkNigR7wN03jEvRV8C/0cf8e8eea6d3aca173d67fa7f65a331d/The-Wildest_Editorial_How_to_Find_a_Reliable_Dog_Walker_Hero.jpg`,
        rating: 19,
        caption: `Cute dogs`
    },
    {
        id: 7,
        imageURL: `https://media.timeout.com/images/105825634/image.jpg`,
        rating: 119,
        caption: `Malibu beach`
    },
    {
        id: 8,
        imageURL: `https://patch.com/img/cdn20/users/23958638/20210630/031931/styles/patch_image/public/patch-editorial-california-beach-sand-ca-avants-2___30151910675.jpg`,
        rating: 11,
        caption: `Must visit beach`
    },
    {
        id: 9,
        imageURL: `https://images.squarespace-cdn.com/content/v1/5eac2a44711d8729adefd155/1598756747022-5R4X82H47TSNMYA7EHMP/41-IMG_1962-HDR.jpg?format=1500w`,
        rating: 111,
        caption: `Olive Woods House NY`
    },
    {
        id: 10,
        imageURL: `https://cdn.contexttravel.com/image/upload/w_1500,q_60/v1571947279/blog/36%20Hours%20in%20NYC/NewYorkStreets.jpg`,
        rating: 1,
        caption: `NYC`
    }
];
let globalId = 11;

module.exports = {

    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },
    getFortune: (req, res) => {
        const fortunes = ["Everywhere you choose to go, friendly faces will greet you.", "A beautiful, smart, and loving person will be coming into your life.", "Don’t just think, act!", "You are almost there.", "Your success will astonish everyone.", "Good news will be brought to you by mail.", "Believe it can be done."];
      
        let randomIndex = Math.floor(Math.random() * fortunes.length);
        let randomCompliment = fortunes[randomIndex];
      
        res.status(200).send(randomCompliment);
    },
    getPhotos: (req, res) => res.status(200).send(photos),
    createPhoto: (req, res) => {
        let { img, rating, caption } = req.body;
        let newPhoto = {
            id: globalId,
            imageURL: img,
            rating,
            caption
        }
        photos.push(newPhoto);
        res.status(200).send(photos);
        globalId++;
    },
    deletePhoto: (req, res) => {
        let index = photos.findIndex(el => el.id === +req.params.id);
        photos.splice(index, 1);
        res.status(200).send(photos);
    },
    updatePhoto: (req, res) => {
        let id = +req.params.id;
        let { type } = req.body
        let index = photos.findIndex(elem => elem.id === id)

        if (photos[index].rating === 0 && type === 'minus') {
            res.status(400).send('cannot go below 0')
        } else if (type === 'plus') {
            photos[index].rating++
            res.status(200).send(photos)
        } else if (type === 'minus') {
            photos[index].rating--
            res.status(200).send(photos)
        } else {
            res.sendStatus(400)
        }
    },
    searchPhoto: (req, res) => {
        let tempCaption = req.query.caption;
        if (tempCaption) {
            const filteredPhotos = photos.filter((photo) =>
              photo.caption.toLowerCase().includes(tempCaption.toLowerCase())
            );
            res.status(200).send(filteredPhotos)
        } else {
            res.status(200).send([]);
        }
    }
}