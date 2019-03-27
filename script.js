// ---- APPEND PER IL FILM ----

function addMovieTitle(title,origTitle,origLanguage,voto) {

  var dataTemp={
    movieTitle:"titolo: " + title,
    movieOrigTitle: "titolo originale: " + origTitle,
    movieOrigLanguage: "lingua originale: " + origLanguage,
    movieVoto: "voto: " + Math.ceil(voto),
    class: "thisFilm",
    stars: getStars(voto)
  };

  var divTemp=$("#film-template").html();
  var compiled = Handlebars.compile(divTemp);
  var finalHTML= compiled(dataTemp);
  var list=$("div.films");
  list.append(finalHTML);
}

// ---- APPEND PER LA SERIE ----

function addSerieTitle(title,origTitle,origLanguage,voto) {

  var dataTemp={
    movieTitle:"titolo: " + title,
    movieOrigTitle: "titolo originale: " + origTitle,
    movieOrigLanguage: "lingua originale: " + origLanguage,
    movieVoto: "voto: " + voto,
    class:"thisSerie",
    stars: getStars(voto)
  };

  var divTemp=$("#film-template").html();
  var compiled = Handlebars.compile(divTemp);
  var finalHTML= compiled(dataTemp);
  var list=$("div.serie");
  list.append(finalHTML);
}

// ---- GET STARS ----

function getStars(voto) {

  var votoArr=Math.ceil(voto/2);

  str=' ';
  for (var i = 0; i < votoArr; i++) {
    if (i<=votoArr) {
      str+='<i class="fas fa-star"></i>';
    }else {
      str+='<i class="far fa-star"></i>';
    }
  }
}

// ---- CLEAR DELLA LISTA ----

function clear(type) {
  //Se passato movie è il clear per i film
  if (type=="movie") {
    var titles=$(".thisFilm");
    titles.remove();

  }
  //Se passato tv è il clear per le serie tv
  if (type=="tv") {
    var titles=$(".thisSerie");
    titles.remove()
  }
  var input=$("#src-box");
  input.val(" ");
}

// ---- CHIAMATA AJAX DEL FILM ----

function ajaxGetMovie(val) {

  var outData={
    api_key:"f6402ddfa5cd392f8bd02d7520eaec3b",
    language:"it-IT",
    query: val
  };

  $.ajax({
    url:"https://api.themoviedb.org/3/search/movie",
    method:"GET",
    data: outData,
    success: function (data) {
      clear("movie");
      var ress=data.results;
      for (var i = 0; i < ress.length; i++) {

        var res=ress[i];
        var title=res.title;
        var origTitle=res.original_title;
        var origLanguage=res.original_language;
        var voto=res.vote_average;

        addMovieTitle(title,origTitle,origLanguage,voto);
      }
    },
    error: function (error,state) {

    }
  });
}

// ---- CHIAMATA AJAX DELLA SERIE TV ----

function ajaxGetTvSeries(val) {

  var outData={
    api_key:"f6402ddfa5cd392f8bd02d7520eaec3b",
    language:"it-IT",
    query: val
  };

  $.ajax({
    url:"https://api.themoviedb.org/3/search/tv",
    method:"GET",
    data: outData,
    success: function (data) {
      clear("tv");
      var ress=data.results;
      for (var i = 0; i < ress.length; i++) {

        var res=ress[i];
        var title=res.name;
        var origTitle=res.original_name;
        var origLanguage=res.original_language;
        var voto=res.vote_average;

        addSerieTitle(title,origTitle,origLanguage,voto);
      }
    },
    error: function (error,state) {

    }
  });
}

// SEARCH
function search() {
  var input=$("#src-box");
  var val=input.val();
  ajaxGetTvSeries(val);
  ajaxGetMovie(val);
}

// ---- CLICK INVIO ----

function keyAction(event) {
  if (event.which==13) {
    search();
  }
}

// ---- GET STARS ----

function functionName() {
  for (var i = 0; i < 5; i++) {

  }
}





function init() {

  var srcBtn=$("#src-btn");
  srcBtn.click(search);

  var inputSearch=$("#src-box");
  inputSearch.keyup(keyAction);
}

$(document).ready(init);
