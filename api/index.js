const fs = require("fs");
const csvParser = require("csv-parser");
const cors = require('cors');

const express = require('express');
const app = express();
const port = 8080;
const records = [];

// TODO: do more security restrict
app.use(cors());

app.get('/search', (req, res) => {
    // TODO: validate input
    const word = req.query.keyword.toLowerCase();
    const results = [];
    for (let row of records) {
        // TODO: improve search 
        if (row['FoodItems'].toLowerCase().includes(word) && row['Status'] == 'APPROVED') {
            results.push(row);
        }
    }
    console.log(results.length);
    res.json(results);
})

function ini() {
    fs.createReadStream("./Mobile_Food_Facility_Permit.csv")
        .pipe(csvParser())
        .on("data", (data) => {
            records.push(data);
        })
        .on("end", () => {
            console.log("csv data loaded");
        });
}
ini();
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})