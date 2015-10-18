import React from "react";
import createMessage from '../../actions/createmessage';

var messageComponent = React.createClass({

    handleCloseMessageBox: function (e) {
        e.preventDefault();
        this.context.executeAction(createMessage, {show: false});
    },

    render: function () {

        var overlayStyle = {
            position: "fixed",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(100,100,100,.5)",
            display: "block",
            zIndex: 99999999
        };

        var boxStyle = {
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            margin: "auto auto",
            height: "200px",
            width: "400px",
            padding: "20px",
            background: "#fff",
            border: "solid 1px #000",
            zIndex: 99999999
        };

        var closeMessageBoxStyle = {
            position: "absolute",
            top: 10,
            right: 10,
            height: 20,
            width: 20
        };

        return (
            <div style={overlayStyle} onClick={this.handleCloseMessageBox}>
                <div style={boxStyle}>
                    <a style={closeMessageBoxStyle} href="#" onClick={this.handleCloseMessageBox}>X</a>
                    {this.props.message}
                </div>
            </div>
        )
    }
});

messageComponent.contextTypes = {
    executeAction: React.PropTypes.func.isRequired,
    getStore: React.PropTypes.func.isRequired
};

module.exports = messageComponent;
