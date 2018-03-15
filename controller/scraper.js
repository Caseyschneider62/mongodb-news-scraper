// require cheerio 
var cheerio = require('cheerio');

// get html
var request = require('request');


// Use Article model
var Article = require('../models/Article');

// define the site we want to scrape
var website = 'https://www.wired.com/most-recent';

function scrapedWeb(callback) 
{
  request(website, function(error, response, html)
    
  {
    if (error) console.log("Error Scraping", error);
  
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(html);

    //Target articles by tag
    $("li.archive-item-component").each(function(i, element) 
    {
      console.log("here");

      // Add the text and href of every link, and save them as properties of the result object
      var title = $(this).children("div.archive-item-component__info").children("a").children("h2").text();
      var link = $(this).children("div.archive-item-component__info").children("a").attr('href');
      var updatedLink = "https://www.wired.com" + link
      var imageUrl = $(this).children("a.archive-item-component__link").children("div.archive-item-component__img").children("div.aspect-ratio-component").children("div.aspect-ratio-component__inner-wrapper").children("div.image-group-component").children("img").attr("src");
      // var link = 'http://www.wired.com/latest-news' + $(this).children('header').children('h2').children('a').attr('href');
      // var summary = $(this).children('div').text().trim() + "";
      // var link = $(this).attr("href.archive-item-component__link");
      //result.picture = $(this).children("img").attr("src");
       console.log(title);
       console.log(link);
       console.log(updatedLink);
       console.log(imageUrl);
      var scrapeArticle = new Article(
      {
        title: title,
        link: updatedLink,
        imageUrl: imageUrl
      });

      // Save Article
      scrapeArticle.save(function(error) 
      {
        if (error) {
          console.log(error);
        }
        //if (error) console.log("Unable to save article", error); //removes duplicate error msg
      });
    });

    callback();
  });
      
}

// export the scraps
exports.scrapedWeb = scrapedWeb;