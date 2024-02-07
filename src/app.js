const { app } = require("./support/setupExpress");
const { query } = require("./support/db");
const { gameOfThronesEpisodes } = require("./data/gameOfThronesData"); // get all data from GOT database



app.get("/", (req, res) => {
    res.render("pages/index", { 
    });
});

app.get("/fullepisodes", (req, res) => { //cannot have spaces between nav names
    res.render("pages/fullEpisodes", {
        episodeArray: gameOfThronesEpisodes  
    });
});

function findEpisodeById(id, array) {
    for (let element of array) {
        if (id === element.id) {
            return element;
        }
    }
}

app.get("/singleEpisode/:episodeid", (req, res) => { //cannot have spaces between nav names
    const episodeid = req.params.episodeid
    // Fetch episode details based on episodeId from your data source
     
         const selectedEpisode = findEpisodeById(episodeid, gameOfThronesEpisodes);
         res.render("pages/singleEpisode", {
             episode: selectedEpisode,
         });
     });


function makeEpisodeCode(episode) {
    const padSeason = String(episode.season).padStart(2, "0");
    const padEpisode = String(episode.number).padStart(2, "0");

    return `S${padSeason}E${padEpisode}`;
}
//make this function accessable in any ejs in our app.
app.locals.makeEpisodeCode=makeEpisodeCode;



// level 150- clicking onto individual episodes








const PORT_NUMBER = process.env.PORT ?? 3000;

app.listen(PORT_NUMBER, () => {
    console.log(
        `Your express app started listening on ${PORT_NUMBER} at ${new Date()}`
    );
});
