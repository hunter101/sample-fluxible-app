import React from "react";

module.exports = React.createClass({
    render: function () {

        var overlayStyle = {
            position: "fixed",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            backgroundColor: "transparent",
            //backgroundColor: "rgba(100,100,100,.5)",
            display: "none",
            zIndex: 99999999
        };

        var style = {
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            margin: "auto auto",
            height: "50px",
            width: "200px",
            padding: "10px",
            background: "#fff",
            border: "solid 1px #000",
            display: "block",
            zIndex: 99999999
        };

        if (this.props.loading) {
            overlayStyle.display = "block";
        }

        return (
            <div style={overlayStyle} onClick={this.handleCloseMessageBox}>
                <div style={style}>
                    Loading...
                </div>
            </div>
        )
    }
});
