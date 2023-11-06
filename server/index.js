import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import cors from 'cors';
import mysql2 from 'mysql2';

// Create a connection pool to the MySQL database
const db = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: 'stevejobs@3', // Fixed typo here
    database: 'cruddatabase',
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define a route to retrieve data from the database
app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT * FROM movie_review";

    // Execute the SQL query to retrieve data
    db.query(sqlSelect, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving data from the database');
        } else {
            res.send(result); // Send the retrieved data to the frontend
            console.log(result);
        }
    });
});
// Define a route to insert data into the database
// Define a route to handle the insertion of movie reviews into the database
app.post('/api/insert', (req, res) => {
    // Extract the movieName and movieReview from the request body sent by the frontend
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;

    // Define an SQL query to insert data into the 'movie_review' table with placeholders (?, ?)
    const sqlInsert = "INSERT INTO movie_review (movieName, movieReview) VALUES (?, ?)";

    // Execute the SQL query with the extracted data
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        if (err) {
            // If an error occurs during the database query, log the error and send a 500 (Internal Server Error) response
            console.error(err);
            res.status(500).send('Error inserting data into the database');
        } else {
            // If the insertion is successful, log a success message
            console.log('Data inserted successfully');
            // This will execute when the insertion is successful
        }
    });
});

// Define a route to delete data from the database
// Define a route to handle the deletion of a movie review by movieName
app.delete('/api/delete/:movieName', (req, res) => {
    // Extract the movieName from the URL parameter (e.g., /api/delete/Inception)
    const name = req.params.movieName;

    // Define an SQL query to delete data from the 'movie_review' table where movieName matches the provided value
    const sqlDelete = "DELETE FROM movie_review WHERE movieName = ? ";

    // Execute the SQL query with the extracted movieName to delete the corresponding data
    db.query(sqlDelete, name, (err, results) => {
        if (err) {
            // If an error occurs during the database query, log the error
            console.log(err);
        }
        // The data deletion is complete (whether successful or not), but we don't send a response here
    });
});

// Define a route to update data in the database
app.put('/api/update', (req, res) => {
    const name = req.body.movieName;
    const review = req.body.movieReview;

    const sqlUpdate = "UPDATE movie_review SET movieReview = ? WHERE movieName = ?";

    // Execute the SQL query to update data in the database
    db.query(sqlUpdate, [review, name], (err, results) => {
        if (err) console.log(err);
    });
});

// Define the port where the server will listen
const port = 3001;

// Start the server
app.listen(port, () => console.log(`Server Running on http://localhost:${port}`));
