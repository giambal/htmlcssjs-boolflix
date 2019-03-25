function addTitle(title,origTitle,origLanguage,voto) {

  var dataTemp={
    title:"titolo: " + title,
    origTitle: "titolo originale: " + origTitle,
    origLanguage: "lingua originale: " + origLanguage,
    voto: "voto: " + voto
  };

  var divTemp=$("#film-template").html();
  var compiled = Handlebars.compile(divTemp);
  var finalHTML= compiled(dataTemp);
  var filmList=$("div.films");
  filmList.append(finalHTML);
}

function ajaxTest(title) {

  var outData={
    api_key:"f6402ddfa5cd392f8bd02d7520eaec3b",
    language:"it-IT",
    query: title
  };

  $.ajax({
    url:"https://api.themoviedb.org/3/search/movie",
    method:"GET",
    data: outData,
    success: function (data) {

      var ress=data.results;
      for (var i = 0; i < ress.length; i++) {

        var res=ress[i];
        var title=res.title;
        var origTitle=res.original_title;
        var origLanguage=res.original_language;
        var voto=res.vote_average;

        addTitle(title,origTitle,origLanguage,voto);
      }
    },
    error: function (error,state) {

    }
  });
}

function init() {

  ajaxTest("il cavaliere oscuro");
}

$(document).ready(init);
