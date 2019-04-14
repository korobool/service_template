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
