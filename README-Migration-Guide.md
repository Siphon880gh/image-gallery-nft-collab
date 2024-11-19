# Migration Guide

To make the app user friendly on a mixed VPS / Dedicated Server (mixed as in it can support php, nodejs, AND python) which helps reduce costs, reverse proxy is used to pass a friendly url's request to an internal port.

Database: Adjust the MONGODB_URI at the .env file for authenticating and accessing your Mongo database.

Ports: This CRA needs its own unique port so it won't conflict with your other CRA apps on this same server. This GraphQL also needs its own unique port from other GraphQL apps on this same server. Relatedly, GraphQL also needs its own unique api endpoint url from other GraphQL's on this same server. More on this at the next section.

Base URL - Here's how you replace the baseURL for this app:
- Run grep for `/app/image-gallery-nft-collab/` and replace with your new baseURL. Or you may use sed to match and replace.
- Run grep for `/app/image-gallery-nft-collab` and replace with your new baseURL. Or you may use sed to match and replace.

Envs:
- ./.env
- ./client/.env

Reverse Proxies:
- `/app/image-gallery-nft-collab[/]*` proxy passes to `127.0.0.1:PORT_GRAPHQL` where PORT_GRAPHQL is the unique Express-serving-GraphQL port.
- `/graphql-image-gallery-nft-collab[/]*` proxy passes to `127.0.0.1:PORT_GRAPHQL` where PORT_GRAPHQL is the unique Express-serving-GraphQL port.
- Note that both the app link and the graphql endpoint goes to the same port because you're not splitting the app into a hot reload development preview port AND an express-graphql server port when you're going online.

- Note the reverse proxy is standard for the app asset and api delivery but there are special headers for the graphql api endpoint:

Eg.
```
# Reverse proxy 1/2
  location ~ /app/image-gallery-nft-collab[/]* {
    rewrite ^/app/image-gallery-nft-collab[/]*(.*)$ /$1 break;
    proxy_pass http://127.0.0.1:3003;
    proxy_read_timeout 300s;   # Adjust as needed
    proxy_connect_timeout 300s; # Adjust as needed
    proxy_send_timeout 300s;   # Adjust as needed
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;

    # Enable CORS
    add_header 'Access-Control-Allow-Origin' '*' always;
    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS' always;
    add_header 'Access-Control-Allow-Headers' 'Origin, Content-Type, Accept, Authorization' always;
    
    # Handle OPTIONS (preflight) requests
    if ($request_method = OPTIONS) {
      add_header 'Access-Control-Allow-Origin' '*';
      add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
      add_header 'Access-Control-Allow-Headers' 'Origin, Content-Type, Accept, Authorization';
      add_header 'Access-Control-Max-Age' 1728000;
      return 204;
    }
  }


  # Reverse proxy 2/2
  location ~ /graphql-image-gallery-nft-collab {
    proxy_pass http://127.0.0.1:3003;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
```

Start script at remote server:
- Make sure you built from client/ already
- From the app root folder: `npm run start:prod` which runs only the `server/server.js` which serves `client/build` files

---

CRA React Port, GraphQL Port, Graphql API Endpoint

Say you have a full stack app and the file structure is mostly:
- ./client which uses cra react and its own package.json
- ./server which uses graphql, minimum express endpoints, and its own package.json
- package.json at the root folder

For having multiple react graphql apps running on the same server and/or having reverse proxy, you need to be discretionary with the port numbers so that you don't use a port number that’s being used by another app on your server. And you have to be discretionary with the /graphql api endpoint that the frontend apps actually hit to perform CRUD because of nginx vhost reverse proxy location matching needing to proxy pass to the graphql port for your specific app.

Btw, that graphql port is really the express port because express is requesting/responding to the same graphql api endpoint, but it’s really the payload and the response that are following a strict structure.

<!-- Review of why we reverse proxy: Aka proxy passing. You dont want someone to visit domain.tld:3001. Makes it harder to give a SSL, looks unprofessional, and gives hackers another port to target. You can hide it behind domain.tld/app/app1 or domain.tld/app1/api, for example -->

For graphql, you may need to assign a discretionary PORT at server/server.js. To streamline managing multiple graphql apps, you can assign a PORT_GRAPHQL at the root .env file (outside of server/ folder), then have your `server/server.js` ‘s dotenv process can go up a folder into the root to look into the .env:

server/server.js:
```
require('dotenv').config({ path: '../.env' });

const PORT = process.env.PORT_GRAPHQL || 3003;
```

root .env (outside of server/ and client/):
```
PORT_GRAPHQL: 3003
```

Use an appropriate port number (which doesn't clash with your other express or graphql ports that are running for other apps on the same server). 3003 here is an example.

Your server/server.js will have express listen at this port and have express sets up the graphql api endpoint to send/receive through Express into the GraphQL system:
```
    app.listen(PORT_GRAPHQL, () => {
        console.log(`API server running on port ${PORT_GRAPHQL}!`);
        console.log(`Use GraphQL at http://localhost:${PORT_GRAPHQL}${server.graphqlPath}`);
    });
```


Now you need to be discriminating on the /graphql api endpoint at both the cra frontend AND at the server.js.. make sure they both match though:

server/server.js:
```
// Set a custom GraphQL path for this server
// server.applyMiddleware({ app });
server.applyMiddleware({ app, path: '/graphql-image-gallery-nft-collab' });
```

client/src/App.js - Refer to uri:
```
const client = new ApolloClient({
  request: operation => {
    const token = localStorage.getItem('id_token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
  // uri: '/graphql'
  uri: '/graphql-image-gallery-nft-collab'
});
```

Let's work on the frontend.

Optional steps? Some of the steps, modifying the CRA React port is optional because that port is only for previewing the react app that hot reload when you edit your code. On actual production server, you’re only running server/server.js which serves the built version of the cra react app at /client/build/ which required you have to have npm run build  inside the client folder. In other words, at the production server, you’re actually only running the server/server.js port instead of simultaneously running the cra react development hot reload port as well.
- Optional: At cra client/, it by default assigns 3000 or a higher number for the hot reload preview in the web browser, but you could pre-assign a port at client/.env with PORT=3002, for example. This seems like a very generic convention using PORT as the variable but unfortunately CRA has chosen it. So at client/.env file, you can have a line like PORT=3002.
- Optional: And because the hot reload preview in the web browser is at a different port than the express+graphql port, when the frontend requests to the backend, there will be CORS errors. (FYI: This is NOT a problem in the production server when the express+graphql port deals with api requests as well as serving the frontend pages and its static assets from having ran the built script and accessing the client/build/ files). So at your `client/package.json`, you add `"proxy": "http://localhost:3003"` where the 3003 is replaced with your express+graphql port.


React Router?
When you run on the server, the npm run script needs to only run the server/server.js. when served, that built may have problems if there’s react routes. This is the solution:
```
function App() {
  const basepath = process.env.REACT_APP_REACT_ROUTER_BASEPATH || '/';

  return (
    <Router basename={basepath}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        {/* Other routes */}
      </Switch>
    </Router>
  );
}
```
So then you have to modify client/.env. Make sure to rebuild the client/build 
^ Note the env variable name must be preceded REACT_APP_ . In a Create React App (CRA) project automatically brings in .env variables without the need to manually import dotenv. However, only variables prefixed with REACT_APP_ are included in the React app's build process.

Your frontend will have to fetch and load static assets with the base url in mind. Otherwise you get this type of errors with a blank page when express delivers `client/build`:
```
GET https://wengindustries.com/static/css/2.896c4c41.chunk.css net::ERR_ABORTED 404 (Not Found)
GET https://wengindustries.com/static/css/main.a5a0a511.chunk.css net::ERR_ABORTED 404 (Not Found)
GET https://wengindustries.com/static/js/2.96b47103.chunk.js net::ERR_ABORTED 404 (Not Found)
GET https://wengindustries.com/static/js/main.b8a0cb65.chunk.js net::ERR_ABORTED 404 (Not Found)
```

To have the frontend consider the base url, go into `client/package.json` and replace your base path into `/app/app1` appropriately before re-building the frontend:
```
"homepage": "/app/app1",
```

Your next step is typically to re-build the client so that you have `client/build/` files that the production server serves. But if there is a PWA setup in the client, you have extra steps

If there is a `client/public/manifest.json` and/or `client/public/service-worker.js`, you need to adjust 1. when the opened PWA uses the web browser or stay in the PWA window (scope), 2. what's the starting url when the PWA launches (start_url), and 3. location of the service worker needed for PWA:
- 1. and 2.:
At `client/public/manifest.json` -
```
  "scope": "/app/app1/",
  "start_url": "/app/app1/",
```
- 3. 
At `client/public/index.html` add your base path to the service worker loader, replacing the example `/app/app1` appropriately -
```
window.addEventListener('load', () => {
  navigator.serviceWorker.register('/app/app1/service-worker.js');
});
```
If you worked on the PWA steps, now you can build the client with: `npm run build`


The files needed and modified are:
.env
clients/.env
clients/package.json
clients/src/App.js
server/server.js

And if PWA, also modified:
clients/public/index.html
clients/public/manifest.json

---

If troubleshooting graphql, note you can open two SSH terminal sessions with same credentials. While one is running the server (unless it’s already running in the background), in any case, see if that port and that endpoint can be reached: 
curl http://127.0.0.1:3003/graphql-image-gallery-nft-collab