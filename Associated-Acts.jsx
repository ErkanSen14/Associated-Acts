Rappers = new Mongo.Collection("rappers")
var texts
if (Meteor.isClient) {
  Meteor.startup(function() {
    //React.render(<App />,document.getElementById('container'))
    var title = 'J.Cole'
    function getWiki(wikiTitle) {
      $(document).ready(function() {

        $.ajax({
          type: "GET",
          url: "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=J._Cole&callback=?",
          contentType: "application/json; charset=utf-8",
          async: false,
          dataType: "json",
          success: function(data, textStatus, jqXHR) {

            var markup = data.parse.text["*"];
            var blurb = $('<div></div>').html(markup);

            // remove links as they will not work
            blurb.find('a').each(function() {
              $(this).replaceWith($(this).html());
            });

            // remove any references
            blurb.find('sup').remove();

            // remove cite error
            blurb.find('.mw-ext-cite-error').remove();
            $('#article').html($(blurb).find('p'));

            eachRecursive(blurb)

            aa=texts
            var index=aa.indexOf('Associated acts')
            var aa2
            for (var value of aa) {
              if (aa.indexOf('Associated acts') > -1) {
                aa2=aa.substring(index).split(/[\r\n]+/g)

              }
            }
            console.log(aa2)
            var aa3 = []
            for (var value of aa2)
              if (value != "Associated acts")
                if (value != "")
                  aa3.push(value)

          console.log(aa3)

          },
          error: function(errorMessage) {}
        });
      })
    }

    function eachRecursive(obj)
    {
      for (var k in obj) {
                if (typeof obj[k] == "object" && obj[k] !== null)
                  eachRecursive(obj[k]);
                else if(typeof obj[k]=="string"&& obj[k].indexOf("Associated acts")>-1)
                {console.log(obj[k])
                  texts=obj[k]
                break;
                }


    }}

getWiki(title)
  })
}

if (Meteor.isServer) {
  Meteor.startup(function() {
    // code to run on server at startup
  });
}
