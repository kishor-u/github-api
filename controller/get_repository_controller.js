const request = require('request');

class GetRepositoryController {

  getTopStarRepoCount(req, res) {
    var finalJsonArray = []
    var pageCount = 1, perPageCount = 100;

    console.log("\nOrg param received: ", req.body.org);
    const organisation = req.body.org;
    if (!organisation) {
      return res.status(400).json({error: 'Please specify the org name as JSON in request body'});
    }

    function loop() {
      console.log("Enters Loop: Page size: ", pageCount)
      var options = {
        url: `https://api.github.com/orgs/${organisation}/repos?page=${pageCount}&per_page=${perPageCount}`,
        headers: {
          'User-Agent': 'request'
        }
      };
      request(options, function (err, response) {
        if (err || response.statusCode != 200) {
          console.log('Error :', response.statusCode, err);
          return res.status(404).json({error: 'Organisation not found'})
        }
        else {
          console.log('statusCode:', response.statusCode);
          let tempData = JSON.parse(response.body);
          finalJsonArray = finalJsonArray.concat(tempData);
          if (tempData.length != 100) {
            console.log("Final array length -----> : ", finalJsonArray.length);
            finalJsonArray.sort(function (a, b) { return b.stargazers_count - a.stargazers_count });
            const formattedResponse = { results: [] };
            for (let i = 0; i < 3; i++) {
              if (finalJsonArray.length < (i + 1)) break;  // Handles those organisation having less than 3 repos
              formattedResponse.results.push(
                {
                  name: finalJsonArray[i].name,
                  stars: finalJsonArray[i].stargazers_count
                }
              );
            }
            return res.send(formattedResponse);
          }
          else {
            console.log("Final array length", finalJsonArray.length);
            pageCount++;
            loop();
          }
        }
      });
    };
    console.log("Before entering loop")
    loop();
  }
}
module.exports = new GetRepositoryController();