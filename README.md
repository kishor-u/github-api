## GitHub StarCount API 

The API written in Node Js will returns top 3 repositories of an organisation in Github by its
stars.

### How to Run

- Clone the repo to your system by `git clone https://github.com/kishorgec/github-starcount-api.git`

- Make sure that you have the latest _Node JS (12+)_ and _NPM_ installed.

- Open terminal and type `npm install && DEBUG=verloop:* npm start`

- Your API server will be listening at port `7000`.

- Try sending the org name in json as body of POST request to fetch the details. `{"org": "github-organization-id"}`

#### Dockerized Setup

Dockerized setup is much classier than manual setup. To achieve this you just have to do this:-

```shell
docker build -t githubstarcountapi:latest -f Dockerfile .
```

That's it. Now just go and deploy the docker image anywhere you want.

```shell
docker run -d -p 7000:7000 githubstarcountapi
```
