import React, { Component } from 'react';
import {MyContext} from './MyContext';
import {Link} from 'react-router-dom';

class Nav extends Component {

  render() {
    return (
        <div className="navbar">

        <div className="picto">
            <Link to="/">
                {/* <img className="home" src="../../images/imagenav/baseline_home_black_48dp.png" width="40" height="40" alt="home" /> */}
                <img className="home" src="/images/imagenav/baseline_home_white_48dp.png" width="45" height="45" alt="home" />
            </Link>
        </div>

        <div className="picto">
            <Link to="/search">
                {/* <img className="search" src="../../images/imagenav/baseline_search_black_48dp.png" width="40" height="40" alt="search" /> */}
                <img className="search" src="/images/imagenav/baseline_search_white_48dp.png" width="45" height="45" alt="search" />
            </Link>
        </div>

        <div className="picto">
            <Link to={`/${this.context.user.username}/collections`}>
                {/* <img className="fav" src="../../images/imagenav/baseline_star_border_black_48dp.png" width="40" height="40" alt="fav" /> */}
                <img className="fav" src="/images/imagenav/baseline_star_white_48dp.png" width="45" height="45" alt="fav" />
            </Link>
        </div>

        <div className="picto">
            <Link to="/profile">
                {/* <img className="profile" src="../../images/imagenav/baseline_account_circle_black_48dp.png" width="40" height="40" alt="profile" /> */}
                <img className="profile" src="/images/imagenav/baseline_account_circle_white_48dp.png" width="45" height="45" alt="profile" />
            </Link>
        </div>

        </div>

    );
  }
}

Nav.contextType = MyContext;

export default Nav;