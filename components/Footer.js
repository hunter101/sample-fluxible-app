var React = require('react');

module.exports = React.createClass({
    render: function () {
        return (
            <footer className="footer">
                <div className="footer-top">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-4">
                                <h2>About Superlist</h2>

                                <p>Superlist is directory template built upon Bootstrap and SASS to bring great experience in creation
                                    of directory.</p>
                            </div>


                            <div className="col-sm-4">
                                <h2>Contact Information</h2>

                                <p>
                                    Your Street 123, Melbourne, Australia<br />
                                    +1-123-456-789, <a href="#">sample@example.com</a>
                                </p>
                            </div>

                            <div className="col-sm-4">
                                <h2>Stay Connected</h2>

                                <ul className="social-links nav nav-pills">
                                    <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                    <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                    <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                                    <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                    <li><a href="#"><i className="fa fa-dribbble"></i></a></li>
                                    <li><a href="#"><i className="fa fa-instagram"></i></a></li>
                                    <li><a href="#"><i className="fa fa-pinterest-p"></i></a></li>
                                </ul>

                            </div>

                        </div>

                    </div>

                </div>


                <div className="footer-bottom">
                    <div className="container">
                        <div className="footer-bottom-left">
                            © 2015 All rights reserved. Created by <a href="#">Aviators</a>.
                        </div>

                        <div className="footer-bottom-right">
                            <ul className="nav nav-pills">
                                <li><a href="index.html">Home</a></li>
                                <li><a href="pricing.html">Pricing</a></li>
                                <li><a href="terms-conditions.html">Terms &amp; Conditions</a></li>
                                <li><a href="contact-1.html">Contact</a></li>
                            </ul>
                        </div>

                    </div>

                </div>
            </footer>
        )
    }
});
