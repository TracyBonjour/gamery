import React, { Component } from 'react';
import {MyContext} from './MyContext';
import {Link} from 'react-router-dom';

class Back extends Component {

  render() {
    return (
        <div className="backtoback">
            <Link className="back" to="/">
                <img className="picto" src="/images/imagenav/baseline_home_white_48dp.png" alt="home" />
            </Link>
        </div>

    );
  }
}

Back.contextType = MyContext;

export default Back;