Rappers = new Mongo.Collection("rappers")
var page='Tupac'
var language='en'
var rappers=null
var texts
if (Meteor.isClient) {
  Meteor.startup(function() {
    //React.render(<App />,document.getElementById('container'))
    var title = 'J.Cole'
    function getWiki(wikiTitle) {
      $(document).ready(function() {

        $.ajax({
          type: "GET",
          url: "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=Outkast&callback=?",
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

            aa = texts
            var index = aa.indexOf('Associated acts')
            var aa2
            for (var value of aa) {
              if (aa.indexOf('Associated acts') > -1) {
                aa2 = aa.substring(index).split('\n')

              }
            }
            var aa3 = []
            for (var x = 0; x < aa2.length; x++)
              if (aa2[x] != "Associated acts")
                if (aa2[x] != "") {
                  aa3.push(aa2[x])
                  if (aa2[x + 1] == "")
                    break
                }
              console.log(aa3)
              return yolo()
          },
          error: function(errorMessage) {}
        });
      })
    }
    function eachRecursive(obj) {
      for (var k in obj) {
        if (typeof obj[k] == "string" && obj[k].indexOf("Associated acts") > -1) {
          texts = obj[k]
          break;}
        else if (typeof obj[k] == "object" && obj[k] !== null)
          eachRecursive(obj[k]);

        }

      }


    getWiki(title)
    function yolo(){
    Meteor.call("getWikiStuff",function(){

        console.log(rappers)
    })

}

  })
}

if (Meteor.isServer) {
  Meteor.startup(function() {
    Meteor.methods({
      getWikiStuff: function(){
        var infobox=Meteor.npmRequire('wiki-infobox')



        infobox(page,language,function(err,data){
          if (err){return}
          rappers=data.associated_acts
          return rappers

      })}


    });



  });
}
