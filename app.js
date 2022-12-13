// Add DOM selectors to target specific tags
const inp = document.querySelector("input");
const myMovieList = document.querySelector("ul");
const filterInput = document.getElementById("filter");

// Movie Database
let myMovies = {};
let movieNames = {};

const updateMovieList = () => {
  const myList = `
    ${Object.keys(myMovies)
      .map((movie) => {
        return `<li>${movie}</li>`;
      })
      .join("")}
    `;
  myMovieList.innerHTML = myList;
};

const updateMovieTable = () => {
  const myTable = `
  <h5 class="card-title">Movie History</h5>
  <table>
    <thead>
        <tr>
            <th>Title</th>
            <th>Watched</th>
        </tr>
    </thead>
  
    <tbody>
        ${Object.keys(myMovies)
          .map((movie) => {
            return `<tr><td>${movie}</td><td>${myMovies[movie]}</td></tr>`;
          })
          .join("")}
    </tbody>
  </table>
  `;

  document.getElementById("movieHistoryCard").innerHTML = myTable;
};

// Example of a simple function that clears the input after a user types something in
const clearInput = () => {
  inp.value = "";
};

const clearMovies = () => {
  // To delete all children of the <ul></ul> (meaning all <li>'s)..we can wipe out the <ul>'s innerHTML
  myMovieList.innerHTML = "";
  document.getElementById(
    "movieHistoryCard"
  ).innerHTML = `<h5 class="card-title">Movie History</h5>`;
  myMovies = movieNames = {};
  localStorage.clear();
};

const filterMovie = (value) => {
  const filteredArr = Object.keys(myMovies).filter((movie) => {
    return movie.toLowerCase().includes(value.toLowerCase()) ? movie : null;
  });

  const movieListInAString = filteredArr
    .map((movie) => {
      return `<li>${movie}</li>`;
    })
    .join("");
  myMovieList.innerHTML = movieListInAString;
};

// This function is executed when the user clicks [ADD MOVIE] button.
const addMovie = () => {
  // Step 1: Get value of input
  const userTypedText = inp.value;
  if (!userTypedText) {
    alert("Please enter a value");
  } else {
    const userTypedTextInLowerCase = userTypedText.toLowerCase();
    const existingMovie = movieNames[userTypedTextInLowerCase];

    //  Check database if the movie exists
    if (!existingMovie) {
      movieNames[userTypedTextInLowerCase] = userTypedText;
      myMovies[userTypedText] = 1;
      myMovieList.innerHTML += `<li>${userTypedText}</li>`;
      updateMovieTable();

      // Storing data in localStorage
      localStorage.setItem("database", JSON.stringify(myMovies));
    } else {
      myMovies[existingMovie] += 1;
      updateMovieTable();

      // Storing data in localStorage
      localStorage.setItem("database", JSON.stringify(myMovies));
    }

    filterMovie(filterInput.value);
    // Step 6: Call the clearInput function to clear the input field
    clearInput();
  }
};

// Get the local storage database
const database = JSON.parse(localStorage.getItem("database"));

// This if block will run when the user refreshes the page
if (database != null) {
  myMovies = database;
  for (const movie of Object.keys(myMovies)) {
    movieNames[movie.toLowerCase()] = movie;
  }
  updateMovieList();
  updateMovieTable();
}

// Adds movie when the user presses the 'Enter' key
inp.addEventListener("keyup", (event) => {
  event.key === "Enter" ? addMovie() : null;
});

// Filters the movie list based on what the user inputs
filterInput.addEventListener("keyup", (event) =>
  filterMovie(filterInput.value)
);
