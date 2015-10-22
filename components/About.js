import React from 'react';
import NavLink from './misc/NavLink';
import { connectToStores, provideContext } from 'fluxible-addons-react';

class About extends React.Component {
    render() {

        return (
            <div className="container">
                <div className="content">
                    <div className="row">
                        <div className="page-title">
                            <h1>FAQ</h1>
                        </div>

                        <div className="faq">


                            <div className="faq-item">
                                <div className="faq-item-question">
                                    <h2>Nulla blandit eu eros nec ultrices?</h2>
                                </div>

                                <div className="faq-item-answer">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla blandit eu
                                        eros nec ultrices.
                                        Aliquam
                                        gravida dictum odio sed gravida. Nunc posuere imperdiet lectus, et rutrum
                                        arcu bibendum eu.
                                        Praesent
                                        vitae purus vulputate, mattis dolor non, euismod urna. Vivamus porta et urna
                                        ultricies commodo.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="pager">
                            <ul>
                                <li><a href="#">Prev</a></li>
                                <li><a href="#">5</a></li>
                                <li className="active"><a>6</a></li>
                                <li><a href="#">7</a></li>
                                <li><a href="#">Next</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

//About.contextTypes = {
//    executeAction: React.PropTypes.func.isRequired,
//    getStore: React.PropTypes.func.isRequired
//};

export default About;
