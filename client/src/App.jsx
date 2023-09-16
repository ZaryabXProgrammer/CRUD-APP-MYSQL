import { useState, useEffect } from 'react'
import './App.css'
import Axios from 'axios'

export default function App() {
  // Define state variables to manage movieName, review, movieReviewList, and newReview
  const [movieName, setmovieName] = useState('')
  const [review, setreview] = useState('')
  const [movieReviewList, setmovieReviewList] = useState([])
  const [newReview, setnewReview] = useState('')

  // Use the useEffect hook to fetch initial data from the backend when the component mounts
  useEffect(() => {
    // Send an HTTP GET request to the backend to retrieve movie reviews
    Axios.get('http://localhost:3001/api/get')
      .then((response) => {
        // Update the movieReviewList state with the received data
        setmovieReviewList(response.data)
      })
  }, [])

  // Function to submit a new movie review
  const submitReview = () => {
    // Send an HTTP POST request to the backend to insert a new movie review
    Axios.post('http://localhost:3001/api/insert', {
      movieName: movieName,
      movieReview: review
    })
      .then(() => {
        // Show an alert to indicate successful submission
        alert('Review submitted successfully')
      })

    // Update the movieReviewList state with the new review
    setmovieReviewList([...movieReviewList, { movieName: movieName, movieReview: review }])
  }

  // Function to delete a movie review
  const deleteReview = (movie) => {
    // Send an HTTP DELETE request to the backend to delete the specified movie review
    Axios.delete(`http://localhost:3001/api/delete/${movie}`)
  }

  // Function to update a movie review
  const updateReview = (movie) => {
    // Send an HTTP PUT request to the backend to update the specified movie review
    Axios.put("http://localhost:3001/api/update", {
      movieName: movie,
      movieReview: newReview
    })

    // Clear the newReview state after updating
    setnewReview("")
  }

  return (
    <div>
      <h1 className='head'>CRUD APPLICATION</h1>

      <div className="form">
        <label >Movie Name: </label>
        <input type="text" name="movieName" onChange={(e) => setmovieName(e.target.value)} />
        <label>Review: </label>
        <input type="text" name="review" onChange={(e) => setreview(e.target.value)} />

        <button className='button' onClick={submitReview}>Submit Review</button>

        {movieReviewList.map((val) => {
          return (
            <div key={val.id} className='card'>
              <h1>{val.movieName}</h1>
              <p> {val.movieReview}</p>

              <div className='action'>
                {/* Delete button */}
                <button onClick={() => { deleteReview(val.movieName) }} className='newbutton'>Delete</button>
                {/* Input for updating the review */}
                <input type="text" id='updateInput' onChange={(e) => setnewReview(e.target.value)} />
                {/* Update button */}
                <button onClick={() => { updateReview(val.movieName) }} className='newbutton'>Update</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
