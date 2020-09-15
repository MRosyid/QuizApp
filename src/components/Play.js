import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import questions from '../questions.json';

class Play extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions,
            currQuestion: {},
            nextQuestion: {},
            previousQuestion: {},
            answer: '',
            numQuestions: 0,
            numAnswered: 0,
            currQuestionIndex: 0,
            score: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            nextBtnDis: false,
            prevBtnDis: true,
            hints: 5,
            prevRandomNum: [],
            time: {},
        }
        this.interval = null;
    }

    componentDidMount() {
        const { questions, currQuestion, nextQuestion, previousQuestion } = this.state;
        this.displayQuestions(questions, currQuestion, nextQuestion, previousQuestion);
        this.startTimer();
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    displayQuestions = (questions = this.state.questions, currQuestion, nextQuestion, previousQuestion) => {
        let { currQuestionIndex } = this.state;
        // Display questions from the questions.json file
        if (this.state.questions && this.state.questions.length) {
            questions = this.state.questions;
            currQuestion = questions[currQuestionIndex];
            nextQuestion = questions[currQuestionIndex + 1];
            previousQuestion = questions[currQuestionIndex - 1];
            const answer = currQuestion.answer;

            this.setState({
                currQuestion,
                nextQuestion,
                previousQuestion,
                numQuestions: questions.length,
                answer,
                prevRandomNum: [],
            }, () => {
                this.showOptions();
                this.disableBtn();
            })
        }
    }

    correct = () => {
        // Updating score and move to next question
        this.setState(prevState => ({
            score: prevState.score + 1,
            currQuestionIndex: prevState.currQuestionIndex + 1,
            correctAnswers: prevState.correctAnswers + 1,
            numAnswered: prevState.numAnswered + 1,
        }), () => {
            if (this.state.nextQuestion === undefined){
                this.endGame();
            } else {
                this.displayQuestions(this.state.questions, this.state.currQuestion, this.state.nextQuestion, this.state.previousQuestion)
            }
        })
    }

    wrong = () => {
        // Updating score and move to next question
        this.setState(prevState => ({
            currQuestionIndex: prevState.currQuestionIndex + 1,
            wrongAnswers: prevState.wrongAnswers + 1,
            numAnswered: prevState.numAnswered + 1,
        }), () => {
            if (this.state.nextQuestion === undefined){
                this.endGame();
            } else {
                this.displayQuestions(this.state.questions, this.state.currQuestion, this.state.nextQuestion, this.state.previousQuestion)
            }
        })
    }

    checkAnswer = (e) => {
        if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
            this.correct();
        }
        else {
            this.wrong();
        }
    }

    nextClick = (e) => {
        if (this.state.nextQuestion !== undefined) {
            this.setState(prevState => ({
                currQuestionIndex: prevState.currQuestionIndex + 1,
            }), () => {
                this.displayQuestions(this.state.state, this.state.currQuestion, this.state.nextQuestion, this.state.previousQuestion);
            })
        }
    }

    disableBtn = () => {
        // Disable previous button if there is no previous questions
        if (this.state.previousQuestion === undefined){
            this.setState({
                prevBtnDis: true
            })
        } else {
            this.setState({
                prevBtnDis: false
            })
        }

        // Disable next button if there is no next questions
        if (this.state.nextQuestion === undefined){
            this.setState({
                nextBtnDis: true
            })
        } else {
            this.setState({
                nextBtnDis: false
            })
        }
    }    

    previousClick = (e) => {
        if (this.state.previousQuestion !== undefined) {
            this.setState(prevState => ({
                currQuestionIndex: prevState.currQuestionIndex - 1,
            }), () => {
                this.displayQuestions(this.state.state, this.state.currQuestion, this.state.nextQuestion, this.state.previousQuestion);
            })
        }
    }

    quitClick = (e) => {
        if (window.confirm('Are you sure that you want to quit?')) {
            this.props.history.push('/');
        }
    }

    hintClick = () => {
        if (this.state.hints > 0) {
            const options = Array.from(document.querySelectorAll('.option'));
            let indexAnswer;

            // Search for the answer
            options.forEach((option, index) => {
                if (option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
                    indexAnswer = index;
                }
            })

            // Delete random options which are not the answer 
            while (true) {
                const randomNum = Math.round(Math.random() * 3);

                if (randomNum !== indexAnswer && !this.state.prevRandomNum.includes(randomNum)) {
                    options.forEach((option, index) => {
                        if (index === randomNum) {
                            option.style.visibility = 'hidden';
                            this.setState((prevState) => ({
                                hints: prevState.hints - 1,
                                prevRandomNum: prevState.prevRandomNum.concat(randomNum)
                            }))
                        }
                    })
                    break;
                }
                if (this.state.prevRandomNum.length >= 3) break;
            }
        }
    }

    showOptions = () => {
        const options = Array.from(document.querySelectorAll('.option'));

        options.forEach(option => {
            option.style.visibility = 'visible';
        })
    }

    startTimer = () => {
        // Set countdown time
        const countDownTime = Date.now() + 300000;
        this.interval = setInterval(() => {
            const now = new Date();
            const distance = countDownTime - now;

            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Alert user is the time is up
            if (distance < 0){
                clearInterval(this.interval);
                this.setState({
                    time: {
                        minutes: 0,
                        seconds: 0,
                    }
                }, () => {
                    this.endGame();
                })
            }
            else{
                this.setState({
                    time: {
                        minutes,
                        seconds,
                    }
                })
            }
        }, 1000)
    }

    endGame = () => {
        alert('Congratulations, you finished the quiz!');
        
        // Obtain all the stats
        const {state} = this;
        const playerStats = {
            score: state.score,
            numQuestions: state.numQuestions,
            numAnswered: state.numAnswered,
            correctAnswers: state.correctAnswers,
            wrongAnswers: state.wrongAnswers,
            usedHints: 5 - state.hints,
        }
        this.props.history.push('/stats', playerStats);
    }

    render() {
        const { currQuestion, currQuestionIndex, numQuestions, hints, time } = this.state;

        return (
            <Fragment>
                <Helmet><title>Quiz Page</title></Helmet>
                <div className="questions">
                    <div className="hints-container">
                        <span>{hints} <i onClick={this.hintClick} className="fas fa-exclamation"></i></span>
                    </div>
                    <div>
                        <p className="num-and-timer">
                            <span>{currQuestionIndex + 1} of {numQuestions}</span>
                            <span>{time.minutes}:{time.seconds} <i className="far fa-clock"></i></span>
                        </p>
                    </div>
                    <h3>{currQuestion.question}</h3>
                    <div className="options-container">
                        <p onClick={this.checkAnswer} className="option">{currQuestion.optionA}</p>
                        <p onClick={this.checkAnswer} className="option">{currQuestion.optionB}</p>
                    </div>
                    <div className="options-container">
                        <p onClick={this.checkAnswer} className="option">{currQuestion.optionC}</p>
                        <p onClick={this.checkAnswer} className="option">{currQuestion.optionD}</p>
                    </div>
                    <div className="button-container">
                        <button
                        className={"" + {"disable": this.state.prevBtnDis}} 
                        onClick={this.previousClick}>
                            Previous
                        </button>
                        <button
                        className={"" + {"disable": this.state.nextBtnDis}} 
                         onClick={this.nextClick}>
                             Next
                        </button>
                        <button className="button" onClick={this.quitClick}>Quit</button>
                    </div>
                </div>
            </Fragment >
        )
    }
}

export default Play;