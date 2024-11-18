# Migration Guide

To make the app user friendly on a mixed VPS / Dedicated Server (mixed as in it can support php, nodejs, AND python) which helps reduce costs, reverse proxy is used to pass a friendly url's request to an internal port.

Database: Adjust the MONGODB_URI at the .env file for authenticating and accessing your Mongo database.

Ports: This CRA needs its own unique port so it won't conflict with your other CRA apps on this same server. This GraphQL also needs its own unique port from other GraphQL apps on this same server. Relatedly, GraphQL also needs its own unique api endpoint url from other GraphQL's on this same server. More on this at the next section.

Base URL - Here's how you replace the baseURL for this app:
- Run grep for `/app/image-gallery-nft-collab/` and replace with your new baseURL. Or you may use sed to match and replace.
- Run grep for `/app/image-gallery-nft-collab` and replace with your new baseURL. Or you may use sed to match and replace.

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
- From the app root folder: `npm run start:prod` which serves only the `server/server.js` which serves `client/build` files

---

CRA React Port, GraphQL Port, Graphql API Endpoint

For having multiple react graphql apps running on the same server and/or having reverse proxy, you need to be discretionary with the port numbers so that you dont use another port number that’s been used by another app on your server. And you have to be discretionary with the /graphql endpoint that frontend apps actually hit to perform CRUD via express-graphql because of nginx vhost reverse proxy location matching, so you dont have multiple apps using the same /graphql  endpoint.

Btw, that graphql port is really the express port because express is requesting/responding to the same graphql endpoint, but it’s really the payload and the response that are following a strict structure.

Review of why we reverse proxy: Aka proxy passing. You dont want someone to visit domain.tld:3001. Makes it harder to give a SSL, looks unprofessional, and gives hackers another port to target. You can hide it behind domain.tld/app/app1 or domain.tld/app1/api, for example

Say the file structure for the most part is:
- ./client which uses cra react and its own package.json
- ./server which uses graphql, minimum express endpoints, and its own package.json
- package.json at the root folder

If you have multiple react apps and graphql apps, you have to manage the react development port and graphql port AND graphql url (assign a custom endpoint other than the default /graphql )

Optional steps? Some of the steps, particularly modifying the cra react port are optional because that port is only for previewing the react app that hot reload when you edit your code. On actual production server, you’re only running server/server.js which serves the built version of the cra react app at /client/build/ which required you have to have npm run build  inside the client folder. In other words, at the production server, you’re actually only running the server/server.js port instead of simultaneously running the cra react development hot reload port as well.

Optional: at cra client/, it by default assigns 3000 or a higher number, but you should pre-assign a port at client/.env with PORT=3002, for example. This seems like a very generic convention using PORT as the variable but unfortunately CRA has chosen it. The .env file must be at the same level where the package.json for cra is at and the variable must be PORT, so that file could be at client/.env with the line PORT=3002, for example.

For graphql, you may need to assign a discretionary PORT at server/server.js. To streamline managing multiple graphql apps, you can assign a PORT_GRAPHQL  at the root .env  file (outside of server/ folder) while your server/server.js ‘s dotenv process can go up a folder into the root to look into the .env:

server/server.js:
```
require('dotenv').config({ path: '../.env' });

const PORT = process.env.PORT_GRAPHQL || 3003;
```

root .env (outside of server/ and client/):
```
PORT_GRAPHQL: 3003
```

Optional: And your cra frontend needs to proxy into that GraphQL server port, otherwise the browser will block by CORS. CRA reads package.json for proxy, so your client/package.json  could have "proxy": "http://localhost:3003". This is an optional step because in production server, you’re actually only running the server/server.js port instead of simultaneously running the cra react development hot reload port previewing as well, and the website files from `client/build` are being delivered from the same server port so no need for proxying.

You need to be discriminating on the /graphql api endpoint at both the cra frontend AND at the server.js.. make sure they both match though:

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

The files needed and modified are:
.env X
clients/.env
clients/package.json
clients/src/App.js X
server/server.js X

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

If troubleshooting graphql, note you can open two SSH terminal sessions with same credentials. While one is running the server (unless it’s already running in the background), in any case, see if that port and that endpoint can be reached: 
curl http://127.0.0.1:3003/graphql-image-gallery-nft-collab