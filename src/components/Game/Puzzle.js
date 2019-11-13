import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import games from './games.json';
import './Game.css';
import Endgame from './Endgame';

class Puzzle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            index: this.props.gameId,
            questionIndex: 1,
            // image change
            imageIndex: 1,
            hintCount: 0,
            usedHint: false,
            latitude: null,
            longitude: null,
            // game ends when last question is completed
            gameState: true,
            win: false,
            timeStopper: 0 // used to stop timer

        }
        this.getAnswer = this.getAnswer.bind(this);
        this.getHint = this.getHint.bind(this);
        this.getNumAnswer = this.getNumAnswer.bind(this);
        this.getTextAnswer = this.getTextAnswer.bind(this);
    }
    //this function is to get answer from NUMBER TYPE
    getNumAnswer(e) {
        let currentGameIndex = this.state.index,
            currentQuestionIndex = this.state.questionIndex,
            imgIndex = currentGameIndex + 1,
            answer = games[currentGameIndex].answers[currentQuestionIndex];

        let userAnswer = e.target.value;
        //if the answer is correct
        if (userAnswer == answer) {
            //else moving to the next question
            this.setState({
                questionIndex: currentGameIndex + 1,
                imageIndex: imgIndex,
                usedHint: false
            })
            //if this is the last question then End game
            if (currentQuestionIndex == games[currentGameIndex].total_questions) {
                this.setState({
                    gameState: false,
                    win: true
                }); console.log("End of game");
            }
        }
        //wrong answer => reset the current value of the pound button
        else { e.target.value = ""; }
    }

    getTextAnswer(e) {

    }

    getAnswer() {
        let localIndex = this.state.index;
        let localQuestionIndex = this.state.questionIndex;
        let qIndex = localQuestionIndex + 1;  //INDICATE THE NEXT QUESTION
        let imgIndex = qIndex; // IMAGE INDEX 
        let answer = games[localIndex].answers[localQuestionIndex];
        let answerBox = document.getElementById("answer");
        let userAnswer = answerBox.value.toLowerCase(); //USER ANSWER = VALUE OF ANSWER BOX

        // console.log(answer);

        //correct answer
        if (userAnswer == answer.toLowerCase()) {
            document.getElementById("result").innerText = "Correct";
            answerBox.style.borderColor = "palegreen";
            answerBox.value = "";
            document.getElementById("hint").innerText = "";
            this.setState({
                questionIndex: qIndex,
                imageIndex: imgIndex,
                usedHint: false
            })
            // check if for more questions
            if (localQuestionIndex == games[localIndex].total_questions) {
                this.setState({
                    gameState: false,
                    win: true
                })
                console.log("End of game");
            }
            // console.log(this.state.questionIndex);
        }
        else {//wrong answer
            answerBox.style.borderColor = "salmon";
            document.getElementById("result").innerText = "Wrong";
            answerBox.value = "";
            // console.log(this.state.questionIndex);
        }
        if (qIndex > games[localIndex].total_questions) {
            console.log("Submit button time out not necessary");
        } else {
            document.getElementById("submitBttn").disabled = true;
            // document.getElementById("hintBttn").style.backgroundColor = "gray";
            setTimeout(function () {
                document.getElementById("submitBttn").disabled = false;
            }, 2000)
        }
    }

    getHint() {
        let localIndex = this.state.index;
        let localQuestionIndex = this.state.questionIndex;
        let totalHint = games[localIndex].total_hint;
        let hintCount = this.state.hintCount;
        let hintArea = document.getElementById("hint");
        let usedHint = this.state.usedHint;
        if (hintCount < totalHint && !usedHint) {
            hintCount += 1;
            hintArea.innerText = games[localIndex].hint[localQuestionIndex];
            this.setState({
                hintCount: hintCount,
                usedHint: true
            })
        }
        else if (usedHint) {
            hintArea.innerText = games[localIndex].hint[localQuestionIndex];
        }
        else {
            hintArea.innerText = "Sorry You've Run Out Of Hint! NOW USE YOUR DAMN BRAIN"
        }
        if (localQuestionIndex + 1 > games[localIndex].total_questions) {
            console.log("Hint button timeout not necessary");
        } else {
            document.getElementById("hintBttn").disabled = true;
            // document.getElementById("hintBttn").style.backgroundColor = "gray";
            setTimeout(function () {
                document.getElementById("hintBttn").disabled = false;
            }, 2000)
        }
    }

    // when state changes, check to see if the game has ended
    // stop timer when game is completed
    componentDidUpdate() {
        if (this.state.win && this.state.timeStopper === 0) {
            this.setState({ timeStopper: 1 })
            this.props.gameHandler();
        }
    }

    render() {
        // game states - playing or end game
        if (!this.state.gameState) {
            const winPage = <Endgame outcome={this.state.win} />;
            return (
                <div>
                    {/* display win page when game is completed before timer hits 0 */}
                    {winPage}
                </div>
            )
        }
        return (
            <div className="game">
                <section className="middle">

                    <div className="text-center">
                        <br />
                        <h1 className="gameTitle">
                            {games[this.state.index].Title} Challenge
                        </h1>
                        <br />
                        <p className="text-center quest">
                            {games[this.state.index].Game_Story[this.state.questionIndex].replace("\\n", "\n")}
                        </p>
                        <br /><br />
                        <img className="imgG" src={games[this.state.index].Images[this.state.imageIndex]} />
                        <br /><br /><br />
                        <input id="answer" type="text" className="text-center textbox" />
                        <p id="hint" className="questN" value=""></p>
                        <div>
                            <button id="submitBttn" className="btn-large  btn-success" type="button" onClick={this.getAnswer}>&nbsp; Submit &nbsp;</button>
                            <p id="result" className="questN"></p>

                            <button id="hintBttn" className="btn-large btn-warning " type="button" onClick={this.getHint}>
                                {games[this.state.index].Total_Hint - this.state.hintCount} Hint(s) Left</button>
                        </div>
                    </div>
                </section>
            </div>

        )
    }


}

export default Puzzle;

  // position = async () => {
  //   await navigator.geolocation.getCurrentPosition(
  //     position => this.setState({
  //       latitude: position.coords.latitude,
  //       longitude: position.coords.longitude
  //     }), newState => console.log(newState))

  //   console.log(this.state.latitude, this.state.longitude)
  // }