const searchForm = document.querySelector('form');
const movieContainer = document.querySelector('.movie-container');
const inputBox = document.querySelector('.inputBox');

const getMovieInfo = async (movie) =>{
    try {
        const myAPIKey = "2d6a80ce";
        const url =`http://www.omdbapi.com/?apikey=${myAPIKey}&t=${movie}`;

        const response = await fetch(url);

        if (!response.ok){
            throw new Error("Unable to fetch movie data.");
        }
        const data = await response.json();

        // Check if API response indicates "Movie not found"
        if (data.Response === "False") {
            throw new Error("No Movie Found!!!");
        }
        showMovieData(data);
    }
    catch (error){
        showErrorData(error.message);
    }
}

const showMovieData = (data) => {
    movieContainer.innerHTML="";
    movieContainer.classList.remove('noBackground');

    const{Title,imdbRating,Genre,Released,Runtime,Actors,Plot,Poster} = data;
    
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-info');
    movieElement.innerHTML = `<h2>${Title}</h2>
                              <p><strong>Rating:&#11088;</strong>${imdbRating}</p>`;

    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add('movie-genre');

    Genre.split(",").forEach(element =>{
        const p = document.createElement('p');
        p.innerText = element;
        movieGenreElement.appendChild(p)
    });         
    movieElement.appendChild(movieGenreElement);

    movieElement.innerHTML +=`<p><strong>Released Date:</strong>${Released}</p>
                              <p><strong>Duration:</strong>${Runtime}</p>
                              <p><strong>Cast:</strong>${Actors}</p>
                              <p><strong>Plot:</strong>${Plot}</p>`;
    
    
    const moviePosterElement = document.createElement('div');
    moviePosterElement.classList.add('movie-poster');
    moviePosterElement.innerHTML =`<img src = "${Poster}"/>`;
    
    movieContainer.appendChild(moviePosterElement);
    movieContainer.appendChild(movieElement);                          

}

const showErrorData = (message) =>{
    movieContainer.innerHTML =`<h2>${message}</h2>`;
        movieContainer.classList.add('noBackground');
    };  

const handleFormSubmission = (e) =>{
    e.preventDefault();
    const movieName = inputBox.value.trim();
    if(movieName !==''){
         // Show fetching message before making API request
        showErrorData("Fetching Movie Information....."); 
        getMovieInfo(movieName);
    }
    else{
        showErrorData("Enter movie name to get movie information");
    }
}

searchForm.addEventListener('submit', handleFormSubmission);
 



