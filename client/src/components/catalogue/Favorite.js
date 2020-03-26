import React, { Component } from "react";
import { MyContext } from "../MyContext";
import Button from "../Button"

class Favorite extends Component {
  state = {
    user: this.context.user,
    modalOpened: false,
    colTitle: "",
    confirmationMsg: "",
    favorite: false
  };

  //   componentDidMount = () => {
  //     this.setState({ user: this.context.user });
  //   };

  modalToggle = () => {
    this.setState({ modalOpened: !this.state.modalOpened });
  };

  updateFav = () => {
    this.setState({
      favorite: !this.state.favorite
    });
  };

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  } 

  render() {
    const coverClass = this.state.modalOpened
      ? "modal-cover modal-cover-active"
      : "modal-cover";
    const containerClass = this.state.modalOpened
      ? "modal-container modal-container-active"
      : "modal-container";
    return (
      <div>
      <img
        className="favicon"
        src={
          this.state.favorite
            ? "/images/imagenav/baseline_star_black_48dp.png"
            : "/images/imagenav/baseline_star_border_black_48dp.png"
        }
        alt=""
        onClick={this.modalToggle}
      />
              {/* modal */}

              <div className={containerClass}>
          <div className="modal-header dark-text">
            <p className="">Add to collection</p>
            <hr />
          </div>
          <form className="modal-body dark-text center" onSubmit={this.handleSubmit}>
            <select name="colList" id="">
              {this.context.user.collections === [] ? (
            this.context.user.collections.map(col => {
              return <option>{col}</option>;
            })
        ) : (
          <div>
            <h2>No collections yet, click below to start a new collection</h2>
          </div>
        )}
            </select>
            <label htmlFor="colTitle">Name your new collection</label>
            <input
              name="colTitle"
              value={this.state.colTitle}
              onChange={this.handleChange}
              className="chp-modal"
              type="text"
            />
            <Button> Confirm new collection</Button>
            {/* <button className="btn" onClick={this.handleSubmit}>Confirm new collection</button> */}
            {this.state.confirmationMsg}
          </form>
          
        </div>
        <div className={coverClass} onClick={this.modalToggle}></div>
      </div>
    );
  }
}

Favorite.contextType = MyContext;

export default Favorite;
