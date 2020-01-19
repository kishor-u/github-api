const request = require('request');

class GetRepositoryController {

  function(req, res) {
    console.log("org param received: ",req.body.org);
    const organisation = req.body.org;
    if (!organisation) {
      return res.send('Please sepcify the org name as request body');
    }
    var options = {
      url: `https://api.github.com/orgs/${organisation}/repos`,
      headers: {
        'User-Agent': 'github-starcount-api'
      }
    };
    request(options, function (err, response) {    
      if (err || response.statusCode != 200) {
        console.log('Error :',response.statusCode, err);
        return res.sendStatus(response.statusCode);
      }
      else {
        console.log('statusCode:', response.statusCode);
        const data = JSON.parse(response.body);
        data.sort(function (a, b) { return b.stargazers_count - a.stargazers_count });
        const formattedResponse = { results : [] };
        for (let i = 0; i < 3; i++) {
          if(data.length < i+1) break;  // Handles those organisation having less than 3 repos
          formattedResponse.results.push(
            {
              name: data[i].name,
              stars: data[i].stargazers_count
            }
          );
        }
        return res.send(formattedResponse);
      }
    });
  }
}

module.exports = new GetRepositoryController();