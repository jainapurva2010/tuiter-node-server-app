import posts from "./tuits.js";
let tuits = posts;

export default (app) => {
    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findTuits);
    app.put('/api/tuits/:tid', updateTuit);
    app.delete('/api/tuits/:tid', deleteTuit);
}

const updateTuit = (req, res) => {
    const tuitIdToUpdate = req.params['tid'];
    const updates = req.body;
    const tuitIndex = tuits.findIndex(
        (t) => t._id === tuitIdToUpdate)
    tuits[tuitIndex] =
        {...tuits[tuitIndex], ...updates};
    res.sendStatus(200);
}

const deleteTuit = (req, res) => {
    const tuitIdToDelete = req.params['tid'];
    tuits = tuits.filter((t) =>
        t._id !== tuitIdToDelete)
    console.log(tuits)
    res.sendStatus(200);
}

const createTuit = (req, res) => {
    const newTuit = req.body;
    newTuit._id = (new Date()).getTime()+'';
    newTuit.likes = 0;
    newTuit.liked = false;
    newTuit.dislikes = 0;
    newTuit.disliked = false;
    newTuit.image = "nasa.png";
    newTuit.handle = "@nasa";
    newTuit.time = "1s";
    tuits.push(newTuit);
    res.json(newTuit);
}

const findTuits = (req, res) =>
    res.json(tuits);