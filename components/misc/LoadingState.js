import React from "react";

module.exports = React.createClass({
    render: function () {

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
            border: "solid 1px #000",
            display: "none"
        }

        if (this.props.loading) {
            style.display = "block";
        }

        return (
            <div style={style}>
                Loading...
            </div>
        )
    }
});
