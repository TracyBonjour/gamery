import React, { Component } from 'react';


class Button extends Component {

  render() {
    return (
        <div className="button">
            <button className="btn" onClick={this.handleSubmit}>{this.props.children}</button>
        </div>

    );
  }
}

export default Button;