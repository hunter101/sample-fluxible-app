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
                listing: this.props.listing
            });
    }

    render() {

        var images = _.isArray(this.props.images) ? this.props.images : [this.props.images];

        return (
            <div className="file-preview">
                <div className="">
                    <div className="file-preview-thumbnails">
                        <div className="file-preview-frame" id="preview-1443774324316-0"
                             data-fileindex="0">
                            {images.length > 0 ? <div>
                                <h2></h2>

                                <div>{images.map((file) =>
                                    <div key={file.id}
                                        className="file-preview-frame file-preview-initial"
                                        style={{position: "relative", float: "left", paddingRight: "20px", paddingBottom: "20px"}}>
                                        <img className="file-preview-image"
                                             style={{width: "100px", height: "100px", background: "#f7f7f7"}}
                                             src={file.preview  + "?dim=100x100"}/>
                                        <a href="#"><i className="fa fa-trash fa-2x"
                                           style={{position: "absolute", color: "#FFF", top: 10, right: 30}}
                                           onClick={this.handleDeleteFile.bind(this, file)}>X</i></a>
                                    </div>)}</div>

                            </div> : null}

                        </div>
                    </div>
                    <div className="clearfix"></div>
                    <div className="file-preview-status text-center text-success"></div>
                    <div className="kv-fileinput-error file-error-message"
                         style={{display: "none"}}></div>
                </div>
            </div>
        )
    }
}

ImagePreviewComponent.contextTypes = {
    executeAction: React.PropTypes.func.isRequired,
    getStore: React.PropTypes.func.isRequired
};

module.exports = ImagePreviewComponent;
