function addTitle(title,pop) {

  var dataTemp={
    title:title,
    pop:pop
  };

  var li=$("#film-template").html();
  var compiled = Handlebars.compile(li);
  var finalHTML= compiled(dataTemp);
  var ulList=$("ul.films");
  ulList.append(finalHTML);
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
        var pop=res.popularity;
        console.log(title,pop);
        addTitle(title,pop);
      }
    },
    error: function (error,state) {

    }
  });
}

function init() {

  ajaxTest("back in the future");
}

$(document).ready(init);
