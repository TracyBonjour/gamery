import React, { Component } from 'react';


class Button extends Component {

  render() {
    return (
        <div className="Button">
            <button className="btn" onClick={this.handleSubmit}>login</button>
        </div>

    );
  }
}

export default Button;