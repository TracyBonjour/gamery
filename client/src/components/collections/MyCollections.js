import React, { Component } from "react";
import ColTitle from "./ColTitle";
import { Link } from "react-router-dom";
import Button from "../Button";
import axios from 'axios'

class MyCollections extends Component {
  state = {
    user: {},
    modalOpened: false,
    colTitle:"",
    confirmationMsg:""
  };

  componentDidMount = () => {
   this.setState({user:this.props.user})
  }

  modalToggle = () => {
    this.setState({ modalOpened: !this.state.modalOpened });
  
  };

  handleSubmit = (event) => {
    event.preventDefault();
    //1. Create new collection
    axios.post(`${process.env.REACT_APP_APIURL || ""}/api/user/collections`, {
      colTitle: this.state.ColTitle
    })
    .then(function (response) {
      console.log(response)
      this.setState({user:this.props.user})
    })
    .catch(function (error) {
      console.log(error);
    });
    //2. Display message
    this.setState({confirmationMsg:"Collection created!"});
    //3. Close modal
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
        {this.props.user.collections === [] ? (
          <div className="listing">
            {this.props.user.collections.map(col => {
              return <ColTitle colTitle={col.colTitle} />;
            })}
          </div>
        ) : (
          <div>
            <h2>No collections yet, click below to start a new collection</h2>
          </div>
        )}
        <div className="flex">
          <img
            className="icon"
            onClick={this.modalToggle}
            src="/images/icons/plus_icon_white.png"
            alt=""
          />
          <Link to={`/${this.props.user.username}/collections/edit`}>
            <img
              className="icon"
              src="/images/icons/edit_icon_white.png"
              alt=""
            />
          </Link>
        </div>

        {/* modal */}

        <div className={containerClass}>
          <div className="modal-header dark-text">
            <p className="">Create collection</p>
            <hr />
          </div>
          <form className="modal-body dark-text center" onSubmit={this.handleSubmit}>
            <label htmlFor="colTitle">Name your new collection</label>
            <input
              name="colTitle"
              value={this.state.colTitle}
              onChange={this.handleChange}
              className="chp-modal"
              type="text"
            />
            <Button> Confirm new collection</Button>
            {this.state.confirmationMsg}
          </form>
          
        </div>
        <div className={coverClass} onClick={this.modalToggle}></div>
      </div>
    );
  }
}

export default MyCollections;
