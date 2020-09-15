import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

class Stats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            numQuestions: 0,
            numAnswered: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            usedHints: 0,
        }
    }

    componentDidMount() {
        const { state } = this.props.location;
        if (state) {
            this.setState({
                score: (state.score / state.numQuestions) * 100,
                numQuestions: state.numQuestions,
                numAnswered: state.numAnswered,
                correctAnswers: state.correctAnswers,
                wrongAnswers: state.wrongAnswers,
                usedHints: state.usedHints,
            })
        }
    }

    render() {
        const { state } = this.props.location;
        let stats;

        if (state !== undefined) {
            stats = (
                <Fragment>
                    <div className="stat-page">
                        <div>
                            <i className="far fa-check-circle"></i>
                        </div>
                        <h1>Quiz has ended</h1>
                        <div className="stats-container">
                            <h2>Your score: {this.state.score.toFixed(0)}</h2>

                            <span>Total number of questions: </span>
                            <span className="stats">{this.state.numQuestions}</span><br></br>

                            <span>Total number of answered questions: </span>
                            <span className="stats">{this.state.numAnswered}</span><br></br>

                            <span>Total number of correct answers: </span>
                            <span className="stats">{this.state.correctAnswers}</span><br></br>

                            <span>Total number of wrong answers: </span>
                            <span className="stats">{this.state.wrongAnswers}</span><br></br>

                            <span>Total number of hints used: </span>
                            <span className="stats">{this.state.usedHints}</span><br></br>
                        </div>
                        <section className="stat-btn-container">
                            <Link className="btn" to="/"> Back to Home</Link>
                            <Link className="btn" to="/takequiz"> Take the quiz again</Link>
                        </section>
                    </div>
                </Fragment>
            )
        } else {
            stats = (
                <section className="stat-page">
                    <div className="no-stats">
                        <h1> No stats available, please take a quiz. </h1>
                        <div className="stat-btn-container">
                            <Link className="btn" to="/"> Back to Home</Link>
                            <Link className="btn" to="/takequiz"> Take the quiz again</Link>
                        </div>
                    </div>
                </section>
            )
        }

        return (
            <Fragment>
                <Helmet><title>Quiz Summary</title></Helmet>
                {stats}
            </Fragment>
        )
    }
}

export default Stats;