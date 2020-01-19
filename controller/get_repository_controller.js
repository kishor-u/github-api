const request = require('request');

class GetRepositoryController {

  function(req, res) {
    console.log(req.params.repoName)
    var options = {
      url: `https://api.github.com/orgs/${req.params.repoName}/repos`,
      headers: {
        'User-Agent': 'request'
      }
    };
    request(options, function (err, response) {    
      if (err || response.statusCode != 200) {
        console.log('Error:', err);
        return res.sendStatus(response.statusCode);
      }
      else {
        console.log('statusCode:', response.statusCode);
        const data = JSON.parse(response.body);
        data.sort(function (a, b) { return b.stargazers_count - a.stargazers_count });
        const formattedResponse = { results : [] };
        for (let i = 0; i < 3; i++) {
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