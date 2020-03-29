import React, { Component } from 'react';
import axios from 'axios';
import GameMedium from '../catalogue/GameMedium';
import {MyContext} from '../MyContext'

class CollectionDetailed extends Component {
    
    state = { 
        collection: [],
        games: []
     };

     

     componentDidMount() {

        axios.create({
            withCredentials: true
          }).get(`${process.env.REACT_APP_APIURL || ""}/api/user/collections/${this.props.collectionId}`)
          .then(response => response.data)
         //.then(data => data.map(col => col.colTitle))
             .then(data => this.setState({collection: data.games}))
        //      .then(this.state.collection.map(game_id => 
        //         axios.get(`https://www.boardgameatlas.com/api/search?ids=${game_id}&client_id=FWG6FKSO4N `)
        //         .then(response => response.data)
        //         .then(data => this.setState({games:[...this.state.games].push(data)}))))
        }

          componentDidUpdate = () => {
              let games2 = [...this.state.games]
            this.state.collection.map(game_id => 
            axios.get(`https://www.boardgameatlas.com/api/search?ids=${game_id}&client_id=FWG6FKSO4N `)
            .then(response => response.data)
            .then(data => games2.push(data))
            .then (this.setState({games:games2}))
            )}
    //     let route;
    //     route = `https://www.boardgameatlas.com/api/search?ids=${this.props.gameId}&client_id=FWG6FKSO4N `

    //     axios.get(route)
    //       .then(response => response.data)
    //       .then(data => this.setState({collection: data.games}));
    //   }
      
    render() { 

        return ( 
            <div>
                <h1>My Collection: <br/>{this.props.colTitle}</h1>

                {/* <div>
                    {this.state.collection.map(game => {
                        
                        axios.get(`https://www.boardgameatlas.com/api/search?ids=${game}&client_id=FWG6FKSO4N `)
                        .then(response => response.games)
                        .then( game => 
                        
                        <GameMedium 
                        title={game.name} 
                       // img={game.images.small} 
                        id={game.id} 
                        description={game.description_preview} 
                        age={ "Age: " +  (game.min_age ? game.min_age + "+" : "Not mentioned")}
                        rating={"Rating: " + (game.average_user_rating ? Math.round(game.average_user_rating*100)/100 +"/5":"No rating yet") } 
                        players={game.min_players && game.max_players ? (game.min_players + " - " + game.max_players + " players") : "No players info"}/>
                     )})}
                </div> */}
            </div>
            

         );
    }
}
CollectionDetailed.contextType = MyContext;
export default CollectionDetailed;