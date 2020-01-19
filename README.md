## GitHub StarCount API 

The API written in Node Js will returns top 3 repositories of an organisation in Github by its
stars.

### How to Run

- Clone the repo to your system by `git clone https://github.com/kishorgec/github-starcount-api.git`

- Make sure that you have the latest _Node JS (12+)_ and _NPM_ installed.

- Open terminal and type `npm install && DEBUG=verloop:* npm start`

- Your API server will be listening at port `7000`.

- Try sending the org name in json as body of POST request to fetch the details. `{"org": "github-organization-id"}`