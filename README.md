## Getting Started with React, Webpack and Bootstrap

### 1. Install Node.js and npm.
```bash
sudo apt update
sudo apt install nodejs
sudo apt install npm
```

### 2. Create a directory and navigate into it.
```bash
mkdir fullstack
cd fullstack
```

### 3. Initialize node project and follow the prompts to provide required information.
```bash
npm init
```

### 4. Install babel and webpack.
```bash
sudo npm install babel babel-cli webpack webpack-cli webpack-dev-server -g
```

### 5. Install react and react-dom.
```bash
npm install react react-dom --save
```

### 6. Install webpack, which ingests raw react components for producing JavaScript code that (almost) every browser can understand.
```bash
npm i webpack --save-dev
npm i webpack-cli --save-dev
```

### 7. Add the webpack command by editing *package.json*.
```json
"scripts": {
    "build": "webpack --mode production"
}
```

### 8. Pull in the babel dependencies.
```bash
npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
```

### 9. Create a new file named *.babelrc* inside the project folder.
```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

### 10. Create a file named *webpack.config.js* and fill it like the following:
```
module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
```

### 11. Create a minimal directory structure.
```bash
mkdir -p src/js/components/app
```

### 12. Create react application.
```bash
touch src/js/components/app/App.jsx
```

### 13. It is good practice to document our react components with prop-types. 
```bash
npm i prop-types --save-dev
```

### 14. Webpacks needs two additional components for processing HTML: html-webpack-plugin and html-loader.
```bash
npm i html-webpack-plugin html-loader --save-dev
```

### 15. Update the webpack configuration.
```
const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};
```

### 16. Edit *./src/index.html* and fill it with following:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" >
    <title>How to set up React, Webpack, and Babel</title>
</head>
<body>
    <div class="container">
        <h1 style="text-align:center;">MM-demo full featured example</h1>
        <div id="content">
        </div>
    </div>
</body>
</html>
```

### 17. Webpack expects the entry point to be *./src/index.js*. Create the file and place an import directive into it for requiring the container component:
```js
import App from "./js/components/app/App.jsx";
```

### 18. Open up empty file *./src/js/components/app/App.jsx* and fill it with following:
```js
import React, { Component } from 'react';
import ReactDOM from "react-dom";
import axios from 'axios';
import {Button, Grid, Row, Col, Form, Container} from "react-bootstrap";
import JSONTree from 'react-json-tree';
import ReactInterval from 'react-interval';

//var $ = require('jquery');
//var querystring = require('querystring');

//require('../css/fullstack.css');


class App extends Component {
  constructor () {
    super()
    this.state = {
      result: ''
    };
    
    this.theme = {
      scheme: 'monokai',
      base00: '#272822',
      base01: '#383830',
      base02: '#49483e',
      base03: '#75715e',
      base04: '#a59f85',
      base05: '#f8f8f2',
      base06: '#f5f4f1',
      base07: '#f9f8f5',
      base08: '#f92672',
      base09: '#fd971f',
      base0A: '#f4bf75',
      base0B: '#a6e22e',
      base0C: '#a1efe4',
      base0D: '#66d9ef',
      base0E: '#ae81ff',
      base0F: '#cc6633'
    };

    //this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleGet () {
    axios.get('http://localhost:8080/result')
      .then(response => this.setState({result: response.data.tree}))
  };

  handleSubmit(e) {
    alert('The value is: ' + this.input.value);
    axios.post('http://localhost:8080/text', {text: this.input.value})
    .then(function (response) {console.log(response);})
    .catch(function (error) {console.log(error);});
    e.preventDefault();
  };

  render () {
    return (
        <Container>
          <Row>
            <Col sm={5}>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Label>Input some text in this text box:</Form.Label>
                  <Form.Control as="textarea" rows="10" ref={(input) => this.input = input} />
                  <Button type="submit">Send data</Button>
                </Form.Group>
             </Form>
            </Col>
            <Col sm={1}></Col>
            <Col sm={6}>
              <p> Result json tree: </p>
              <ReactInterval timeout={1000} enabled={true} callback={() => this.handleGet()} />
              <JSONTree data={this.state.result} theme={this.theme} invertTheme={true}/>
            </Col>
        </Row>
        </Container>
    )
  }
}

export default App;
const wrapper = document.getElementById("content");
wrapper ? ReactDOM.render(<App />, wrapper) : false;
```

### 19. To set up webpack dev server install the package with (not obligatory):
```bash
npm i webpack-dev-server --save-dev
```

### 20. Open up *package.json* and edit the start script:
```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server --open --mode development",
    "build": "webpack --mode production",
    "watch": "webpack --progress -d --config webpack.config.js --watch"
},
```

### 21. Install the rest packages.
```bash
npm install axios -S
npm i react-json-tree
npm install react-bootstrap bootstrap
npm i react-interval
```

### 22. Build the project. Result will be in *./dist* folder.
```bash
npm run build
```

### 23. Run js-server.
```bash
npm start
```

### 24. Command watch will listen for file changes.
```bash
npm run watch
```

### 25. Through the python aiohttp-server statics can be given as follows:
```python
async def application(request):
    return web.FileResponse('./static/dist/index.html')

loop = asyncio.get_event_loop()
app = web.Application()
app.router.add_post('/text', text_handler)
app.router.add_get('/result', get_graph)
app.router.add_get('/app', application)
app.router.add_static('/', path='./static/dist')
loop.run_until_complete(init(loop))
```

## The resulting *package.json* file content:
```json
{
  "name": "fullstack2",
  "version": "1.0.0",
  "description": "Frontend application for python service",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server --open --mode development",
    "build": "webpack --mode production",
    "watch": "webpack --progress -d --config webpack.config.js --watch"
  },
  "author": "Oleksii Sheremet",
  "license": "ISC",
  "dependencies": {
    "axios": "^0.18.0",
    "bootstrap": "^4.3.1",
    "react-bootstrap": "^1.0.0-beta.6",
    "react-interval": "^2.0.2",
    "react-json-tree": "^0.11.2"
  },
  "devDependencies": {
    "@babel/core": "^7.4.3",
    "@babel/preset-env": "^7.4.3",
    "@babel/preset-react": "^7.0.0",
    "babel-loader": "^8.0.5",
    "html-loader": "^0.5.5",
    "html-webpack-plugin": "^3.2.0",
    "prop-types": "^15.7.2",
    "react": "^16.8.6",
    "react-dom": "^16.8.6",
    "webpack": "^4.29.6",
    "webpack-cli": "^3.3.0",
    "webpack-dev-server": "^3.3.1"
  }
}
```

## Useful links:
[Getting Started with React, Webpack and Bootstrap](https://medium.com/@dinyangetoh/getting-started-with-react-webpack-and-bootstrap-27e95ff634ef)

[Tutorial: How to set up React, webpack, and Babel 7 from scratch (2019)](https://www.valentinog.com/blog/react-webpack-babel/)

