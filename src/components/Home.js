import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <Fragment>
            <Helmet><title>Quiz App- Home</title></Helmet>
            <div id="home">
                <section>
                    <div style={{ textAlign: 'center'}}>
                        <i className="far fa-lightbulb"></i>
                    </div>
                    <h1>
                        Quiz App
                    </h1>
                    <div className="take-button-container">
                        <Link className="take-button" to="/takequiz"> Take Quiz </Link>
                    </div>
                </section>
            </div>
        </Fragment>
    )
}

export default Home;