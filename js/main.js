// $(document).ready(() => {
//   $('#searchForm').on('submit', (e) => {
//     let searchText = $('#searchText').val();
//     getMovies(searchText);
//     e.preventDefault();
//   });
// });

// function getMovies(searchText){
//   axios.get('http://www.omdbapi.com?s='+searchText)
//     .then((response) => {
//       console.log(response);
//        let movies = response.data.Search;
//       // let movies = response.data.results;
//       let output = '';
//       $.each(movies, (index, movie) => {
//         output += `
//           <div class="col-md-3">
//             <div class="well text-center">
//               <img src="${movie.Poster}">
//               <h5>${movie.Title}</h5>
//               <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
//             </div>
//           </div>
//         `;
//       });

//       $('#movies').html(output);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

// function movieSelected(id){
//   sessionStorage.setItem('movieId', id);
//   window.location = 'movie.html';
//   return false;
// }

// function getMovie(){
//   let movieId = sessionStorage.getItem('movieId');

//   axios.get('http://www.omdbapi.com?i='+movieId+'&apikey=thewdb')
//     .then((response) => {
//       console.log(response);
//       let movie = response.data;

//       let output =`
//         <div class="row">
//           <div class="col-md-4">
//             <img src="${movie.Poster}" class="thumbnail">
//           </div>
//           <div class="col-md-8">
//             <h2>${movie.Title}</h2>
//             <ul class="list-group">
//               <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
//               <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
//               <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
//               <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
//               <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
//               <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
//               <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
//             </ul>
//           </div>
//         </div>
//         <div class="row">
//           <div class="well">
//             <h3>Plot</h3>
//             ${movie.Plot}
//             <hr>
//             <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
//             <a href="index.html" class="btn btn-default">Go Back To Search</a>
//           </div>
//         </div>
//       `;

//       $('#movie').html(output);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }



$(document).ready(() => {
  $('#headerDisplay').hide();
  $('#searchForm').on('submit', (e) => {
      let searchText = $('#searchText').val();
      getMovies(searchText);
      e.preventDefault();

  });
});

function getMovies(searchText){
  //Get and show data for all movies using omdbapi.com for a search query
  let apiKey = 'thewdb';
  let x = `http://www.omdbapi.com?s=${searchText}&apikey=${apiKey}`;
  axios.get(`http://www.omdbapi.com?s=${searchText}&apikey=${apiKey}`)
      .then((response) => {
          if (response.data.Response == "False"){
              $('#headerDisplay').hide();
              let output = `<h3>No Movies/TV Shows found!</h3>`
              $('#movies').html(output);
          } else {
          $('#headerDisplay').show();
          let movies = response.data.Search;
          let output=``;
          $.each(movies, (index, movie) => {
              let image;
              if (movie.Poster !== "N/A") 
                  image = movie.Poster;
              else 
                  image = "https://thumb.ibb.co/kJgmxz/default_IMG.png";
              output += `
                  <div class="col-md-3">
                      <div class="movieBox text-center">                            
                          <a onclick="movieSelected('${movie.imdbID}')" href="#"><img src="${image}"> </a>
                          <h5 class="movieTitle">${movie.Title}</h5>
                      </div>
                  </div>
              `;
          });
      
          //transforms the output to html
          $('#movies').html(output);
      }

      })
      .catch((err) => {
          console.log(err);
      });
}

function movieSelected(id){
  //Sets location to the movie page and stores the id in the session
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getMovie(){    
  //Get and show data for an individual movie using omdbapi.com
  let movieId = sessionStorage.getItem('movieId');
  let apiKey = 'thewdb';
  axios.get(`http://www.omdbapi.com?i=${movieId}&apikey=${apiKey}`)
  .then((response) => {
      let movie = response.data;
      let output = `
          <div class="row">
              <div class="col-md-4">
                  <img src="${movie.Poster}" class="thumbnail">
              </div>
              <div class="col-md-8">
                  <h2>${movie.Title}</h2>
                  <ul class="list-group">
                      <li class="list-group-item"> Genre: ${movie.Genre} </li>
                      <li class="list-group-item"> Released: ${movie.Released} </li>
                      <li class="list-group-item"> Rated: ${movie.Rated} </li>
                      <li class="list-group-item"> Imdb Rating: ${movie.imdbRating} </li>
                      <li class="list-group-item"> Director: ${movie.Director} </li>
                      <li class="list-group-item"> Writer: ${movie.Writer} </li>
                      <li class="list-group-item"> Actors: ${movie.Actors} </li>
                  </ul>
              </div>
          </div>
          <div class="jumbotron">
              <div class="movieDiv">
                  <h3> Plot </h3>
                  ${movie.Plot}
                  <hr>
                  <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View on IMDB</a>
                  <a href="index.html" class="btn btn-secondary"> Home </a>
              </div>
          </div>
      `;

      $('#movie').html(output);

  })
  .catch((err) => {
      console.log(err);
  });



}




