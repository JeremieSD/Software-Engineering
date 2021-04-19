import Card from 'react-bootstrap/Card';
import React, { Component } from 'react';
class GraphCardSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: this.props.history,
      title: this.props.title,
      pageLink: this.props.pageLink,
      graph: this.props.graph,
      value: this.props.value,
    };
  }

  onClick = () => {
    console.log('HIIII ' + this.props.value);
    this.state.history.push(this.state.pageLink + ':' + this.props.value);
  };

  render() {
    return (
      <Card onClick={this.onClick} tag="a" className="graph-card">
        <Card.Body>
          <Card.Title className="card-title">{this.state.title}</Card.Title>
          {this.state.graph}
        </Card.Body>
      </Card>
    );
  }
}

export default GraphCardSearch;
