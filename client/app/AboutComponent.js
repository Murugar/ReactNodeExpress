import React from 'react';
import { render } from 'react-dom'

export default class AboutComponent extends React.Component{

  render(){
    return <div className="container">
    <div className="panel panel-primary">
    <div className="panel-heading">About</div>
    <div className="panel-body">
      <h1 className="text-danger">Greetings from Node Express React</h1>
      </div>
      </div>
    </div>
  }
}
