const { app } = require("./support/setupExpress");
const { query } = require("./support/db");
const { gameOfThronesEpisodes } = require("./data/gameOfThronesData");



// Removed temporary console logging
// summariseEpisodesToConsole(gameOfThronesEpisodes);

// Configure the server's route handlers

const level100Array = gameOfThronesEpisodes.map((obj) => ({
    name: obj.name,
    season: obj.season,
    episode: obj.number,
    image: obj.image,
    summary: obj.summary,
}));

app.get("/", (req, res) => {
    res.render("pages/index", {
        episodeArray: level100Array,
        movie: "Bring it on",
    });
});

app.get("/db-test", async (req, res) => {
    try {
        const dbResult = await query("select now()");
        const rows = dbResult.rows;
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Sorry, an error occurred on the server.");
    }
});

const PORT_NUMBER = process.env.PORT ?? 3000;

app.listen(PORT_NUMBER, () => {
    console.log(
        `Your express app started listening on ${PORT_NUMBER} at ${new Date()}`
    );
});
