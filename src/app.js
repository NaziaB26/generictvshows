const { app } = require("./support/setupExpress");
const { query } = require("./support/db");
const { gameOfThronesEpisodes } = require("./data/gameOfThronesData");



app.get("/", (req, res) => {
    res.render("pages/index", {
        episodeArray: gameOfThronesEpisodes  
    });
});

function makeEpisodeCode(episode) {
    const padSeason = String(episode.season).padStart(2, "0");
    const padEpisode = String(episode.number).padStart(2, "0");

    return `S${padSeason}E${padEpisode}`;
}
//make this function accessable in any ejs in our app.
app.locals.makeEpisodeCode=makeEpisodeCode;


const PORT_NUMBER = process.env.PORT ?? 3000;

app.listen(PORT_NUMBER, () => {
    console.log(
        `Your express app started listening on ${PORT_NUMBER} at ${new Date()}`
    );
});
