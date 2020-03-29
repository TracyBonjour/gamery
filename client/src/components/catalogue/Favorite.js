import React, { Component } from "react";
import { MyContext } from "../MyContext";
import Button from "../Button"
import axios from 'axios'

class Favorite extends Component {
  state = {
    user: this.context.user,
    modalOpened: false,
    colTitle: "",
    confirmationMsg: "",
    favorite: false,
    collections: this.context.collections,
    col_id:""
  };

// open or close modale
  modalToggle = () => {
    this.setState({ modalOpened: !this.state.modalOpened });
  };

  //change star from white to black TODO
  updateFav = () => {
    this.setState({
      favorite: !this.state.favorite
    });
  };

// add game to collection
  handleSubmit = (event) => {
    event.preventDefault();
    const updateCol = axios.create({
      withCredentials: true
    })
    //1. Get game to add game to collection - can be done with props only?
    // updateCol
    //   .get(`https://www.boardgameatlas.com/api/search?ids=${this.props.game_id}&client_id=FWG6FKSO4N `)
    //   .then(response => response.games)
    if (this.state.colTitle){
    updateCol
      .post(  `${process.env.REACT_APP_APIURL || ""}/api/user/collections`, {
        colTitle: this.state.colTitle, games: this.props.game_id} )
      .then(res => res.data)
      .catch(err => { /* not hit since no 401 */ })} else{


      // 2A create game in back (ref needed to add to collection)
      // .then( games =>
      //   update.put(`${process.env.REACT_APP_APIURL || ""}/api/user/collections/${this.state.col_id}`, {
      //     games:games[0]
      //   })
      //   .then(this.componentDidMount)
      //   .catch(err => { /* not hit since no 401 */ })
      // )
      //2B update collection
      //.then( games =>
        updateCol.put(`${process.env.REACT_APP_APIURL || ""}/api/user/collections/${this.state.col_id}`, {
          games:this.props.game_id
        })
        .catch(err => { /* not hit since no 401 */ })}
      //)
      

    //3. Display message
    this.setState({confirmationMsg:"Game added to collection!"});
    //4. Close modal
    setTimeout(() => {
      //this.modalToggle() // close
      this.setState({modalOpened: false,
        colTitle:"",
        confirmationMsg:""})
    }, 2000);
  }

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
          <form className="modal-body dark-text center flex-column" onSubmit={this.handleSubmit}>
            <select name="col_id" id="colList" onChange={this.handleChange}>
            {this.context.collections.map(col => {
              return <option value={col._id}>{col.colTitle}</option>;
            })}
            </select>
            <label htmlFor="colTitle">Or add to new collection:</label>
            <input
              name="colTitle"
              value={this.state.colTitle}
              onChange={this.handleChange}
              className="chp-modal center"
              type="text"
            />
            <Button> Add to collection</Button>
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
