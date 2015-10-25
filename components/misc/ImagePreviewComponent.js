import React from 'react';
import _ from 'underscore';
import DeleteFileAction from '../../actions/deletefile';

class ImagePreviewComponent extends React.Component {

    constructor(props, context) {
        super(props, context)
    }

    handleDeleteFile(file, e) {
        e.preventDefault();
        this.context.executeAction(DeleteFileAction,
            {
                file: file,
                entity: this.props.entity
            });
    }

    render() {
        var images = _.isArray(this.props.images) ? this.props.images : [this.props.images];
        var imageStyle = {
            width: this.props.width,
            height: this.props.height,
            background: "#f7f7f7"
        };

        return (

                <div className="">
                    <div className="file-preview-thumbnails">
                        <div className="file-preview-frame" id="preview-1443774324316-0"
                             data-fileindex="0">
                            {images.length > 0 ?
                                (<div>
                                    <div>{images.map((file) =>
                                        <div key={file.id}
                                             className="file-preview-frame file-preview-initial"
                                             style={{position: "relative", float: "left", paddingRight: "20px", paddingBottom: "20px"}}>
                                            <img className="file-preview-image"
                                                 style={imageStyle}
                                                 src={file.preview  + "?dim=" + this.props.height + "x" + this.props.width} />
                                            <a href="#"><i className="fa fa-trash fa-2x"
                                                           style={{position: "absolute", color: "#FFF", top: 10, right: 30}}
                                                           onClick={this.handleDeleteFile.bind(this, file)}>X</i></a>
                                            </div>)}</div>

                                </div>) : null}

                        </div>
                    </div>
                    <div className="clearfix"></div>
                    <div className="file-preview-status text-center text-success"></div>
                    <div className="kv-fileinput-error file-error-message"
                         style={{display: "none"}}></div>
                </div>
        )
    }
}

ImagePreviewComponent.contextTypes = {
    executeAction: React.PropTypes.func.isRequired,
    getStore: React.PropTypes.func.isRequired
};

ImagePreviewComponent.defaultProps = {
    height: "100",
    width: "100",
    showDefault: false,
    defaultImage: "/assets/img/tmp/agent-2.jpg"
};

module.exports = ImagePreviewComponent;
