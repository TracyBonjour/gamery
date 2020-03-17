import React, { Component } from 'react';

import {Link} from 'react-router-dom';

class Nav extends Component {

  render() {
    return (
        <div className="navbar">

            <Link to="/">
                {/* <img className="home" src="../../imagenav/baseline_home_black_48dp.png" width="40" height="40" alt="home" /> */}
                <img className="home" src="../../imagenav/baseline_home_white_48dp.png" width="40" height="40" alt="home" />
            </Link>

            <Link to="/">
                {/* <img className="search" src="../../imagenav/baseline_search_black_48dp.png" width="40" height="40" alt="search" /> */}
                <img className="search" src="../../imagenav/baseline_search_white_48dp.png" width="40" height="40" alt="search" />
            </Link>

            <Link to="/">
                {/* <img className="fav" src="../../imagenav/baseline_star_border_black_48dp.png" width="40" height="40" alt="fav" /> */}
                <img className="fav" src="../../imagenav/baseline_star_white_48dp.png" width="40" height="40" alt="fav" />
            </Link>

            <Link to="/profile">
                {/* <img className="profile" src="../../imagenav/baseline_account_circle_black_48dp.png" width="40" height="40" alt="profile" /> */}
                <img className="profile" src="../../imagenav/baseline_account_circle_white_48dp.png" width="40" height="40" alt="profile" />
            </Link>

        </div>

    );
  }
}

export default Nav;