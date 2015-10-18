import React from 'react';
import Dropzone from 'react-dropzone';
import UploadFilesAction from '../../actions/uploadfiles';
import DeleteFileAction from '../../actions/deletefile';
import CreateMessage from '../../actions/createmessage';
import _ from 'underscore';

class FileUploadComponent extends React.Component {

    constructor(props, context) {
        super(props, context)
    }

    // @TODO: if imagees > props.max = make message

    onDrop(files) {

        // The api expects an array of files
        files = _.isArray(files) ? files : [files];

        var uploadObj = {
            files: files,
            type: this.props.type,
            listing: this.props.listing
        };

        if (!this.props.multiple) {

            // If we're only allowing a single file, we need to remove the
            // previously uploaded file from the fs and db first.
            var oldImage = _.find(this.props.listing.Files, {type: this.props.type});
            if (oldImage) {
                self = this;
                this.context.executeAction(DeleteFileAction,
                    {
                        file: oldImage,
                        listing: this.props.listing,
                        callback: () => {
                            self.context.executeAction(UploadFilesAction, uploadObj);
                        }
                    }
                )
            } else {
                self.context.executeAction(UploadFilesAction, uploadObj);
            }

        } else {

            // Ensure we can't upload more than is set with prop.max
            if (this.props.max) {
                var currentUploadedFiles = _.pluck(this.props.listing.Files, {type: this.props.type});
                if (currentUploadedFiles.length + files.length > this.props.max) {
                    this.context.executeAction(CreateMessage, {text: "Too many dicks on the dancefloor"});
                    return false;
                }
            }

            this.context.executeAction(UploadFilesAction, uploadObj);
        }
    }

    onOpenClick() {
        //this.refs.dropzone.open();
    }

    render() {

        return (
            <div class="file-input">
                <div class="input-group">
                    <Dropzone
                        ref="dropzone"
                        onDrop={this.onDrop.bind(this)}
                        multiple={this.props.multiple}
                        style={{
                                    width: "100%",
                                    height: "60px",
                                    padding: "10px",
                                    borderWidth: 2,
                                    borderColor: '#666',
                                    borderStyle: 'dashed'
                                  }}>
                        <div>Drop files here, or click to upload.</div>
                    </Dropzone>
                </div>
            </div>
        )
    }
}

FileUploadComponent.contextTypes = {
    executeAction: React.PropTypes.func.isRequired,
    getStore: React.PropTypes.func.isRequired
};

module.exports = FileUploadComponent;
