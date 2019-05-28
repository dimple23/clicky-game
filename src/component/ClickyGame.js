// import 
import React, { Component } from 'react';
import friendData from '../friends.json';
import "./App.css";

class ClickyGame extends Component {
  state = {
    friendData,
    currentScore: 0,
    highestScore: 0,
    feedback: "Click an image to begin!"
  };

  handleClick = cardId => {
    
    let isCorrect = false;
    const friendData = [...this.state.friendData];

    
    friendData.forEach(card => {
      if (card.id === cardId) {
        if (!card.clicked) {
          isCorrect = true;
          card.clicked = true;
        }
      }
    });

    
    isCorrect ? this.cardCorrect(friendData) : this.cardIncorrect(friendData);
  };

 cardCorrect = friendData => {
    
    const shuffledCards = friendData.sort(() => 0.5 - Math.random());
    const currentScore = this.state.currentScore + 1;
     let highestScoreScore = this.state.highestScoreScore;

    if (currentScore > highestScoreScore) {
      highestScoreScore = currentScore;
    }

    this.setState({
      friendData: shuffledCards,
      currentScore: currentScore,
      feedback: "Congrats! You Have Guessed All Of The Images Correctly!",

      highestScoreScore: highestScoreScore
    });
  };

  cardIncorrect = friendData => {
    const shuffledCards = friendData.sort(() => 0.5 - Math.random());



    shuffledCards.forEach(card => (card.clicked = false));

    this.setState({
      friendData: shuffledCards,
      feedback: "Game Over! You Guessed The Same Image Twice!",

      currentScore: 0,
    });
  };

  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-dark bg-warning d-flex justify-space-between nav" >
          <span className="navbar-brand mb-0 nav">Clicky Game</span>
          <span className="scoreInfo nav ">
          {this.state.feedback}  || 
            Current Score: {this.state.currentScore} || Highest Score: {this.state.highestScore} || 
          </span>
        </nav>
        <div className=" text-light text-center">
          <h1>Welcome to the clicky game!</h1>
          <p>Click on a card to get started. Don't click on the same card twice.</p>
        </div>
        <div className="container-fluid">
          <div className="row align-items-center justify-content-between">

            {this.state.friendData.map(card => {
              return (
                <div className="col-12 col-sm-4 col-md-4" key={card.id}>
                  <img
                    src={card.image}
                    alt={card.name}
                    className="img-fluid img-thumbnail rounded-circle  img"
                    onClick={() => this.handleClick(card.id)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ClickyGame;