import React, { Component } from "react";
import { MyContext } from '../MyContext'

class Favorite extends Component {
  state = {
    user: this.context.user ,
    modalOpened: false,
    colTitle: "",
    confirmationMsg: "",
    favorite: false
  };

//   componentDidMount = () => {
//     this.setState({ user: this.context.user });
//   };

  updateFav = () => {
    this.setState({
      favorite: !this.state.favorite
    });
  };

  render() {
    return (
      <img
        className="favicon"
        src={
          this.state.favorite
            ? "/images/imagenav/baseline_star_black_48dp.png"
            : "/images/imagenav/baseline_star_border_black_48dp.png"
        }
        alt=""
        onClick={this.updateFav}
      />
    );
  }
}

Favorite.contextType = MyContext;

export default Favorite;
