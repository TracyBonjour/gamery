import React, { Component } from 'react';
import axios from 'axios';
import GameMedium from '../catalogue/GameMedium';
import {MyContext} from '../MyContext'
import Header from '../Header'

class CollectionDetailed extends Component {
    
    state = { 
        collection: "",
        games: []
     };

     

     componentDidMount() {

        axios.create({
            withCredentials: true
          }).get(`${process.env.REACT_APP_APIURL || ""}/api/user/collections/${this.props.collectionId}`)
          .then(response => response.data)
         //.then(data => data.map(col => col.colTitle))
             .then(data => 
                this.setState({collection: data.games.toString()}, function(){
                    axios.get(`https://www.boardgameatlas.com/api/search?ids=${this.state.collection}&client_id=FWG6FKSO4N `)
                    .then(response => response.data)
                    .then(data => this.setState({games:data.games}))
                    
                }))
        //         .then(
        //   axios.get(`https://www.boardgameatlas.com/api/search?ids=${this.state.collection}&client_id=FWG6FKSO4N `)
        //     .then(response => response.data)
        //     .then(data => this.setState({games:data.games}))
        //          ) 
                }
            
        //  componentDidUpdate = () => { 
        // //   let col_api=this.state.collection.toString();
        // //  // console.log(col_api)
        //  axios.get(`https://www.boardgameatlas.com/api/search?ids=${this.state.collection}&client_id=FWG6FKSO4N `)
        //     .then(response => response.data)
        //     .then(data => this.setState({games:data.games}))
        //     }
    //     let route;
    //     route = `https://www.boardgameatlas.com/api/search?ids=${this.props.gameId}&client_id=FWG6FKSO4N `

    //     axios.get(route)
    //       .then(response => response.data)
    //       .then(data => this.setState({collection: data.games}));
    //   }
      
    render() { 

        return ( 
            <div>
                <Header history={this.props.history}>My Collection: <br/>{this.props.colTitle}</Header>

                <div className="align-games-container">
                    {this.state.games.map(game => 
                        <GameMedium
                        fav={false}
                        title={game.name} 
                        img={game.images.small} 
                        id={game.id} 
                        description={game.description_preview} 
                        age={ "Age: " +  (game.min_age ? game.min_age + "+" : "Not mentioned")}
                        rating={"Rating: " + (game.average_user_rating ? Math.round(game.average_user_rating*100)/100 +"/5":"No rating yet") } 
                        players={game.min_players && game.max_players ? (game.min_players + " - " + game.max_players + " players") : "No players info"}/>
                     )}
                </div>
            </div>
            

         );
    }
}
CollectionDetailed.contextType = MyContext;
export default CollectionDetailed;