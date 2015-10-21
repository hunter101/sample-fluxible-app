var fs = require('fs');
import models from '../models';

module.exports = {
    name: 'file',
    delete: function (req, resource, params, config, callback) {

        // We need to get the filename first from the db before
        // we delete the reference to the image
        var fileId = params.file.id;
        models.File.findById(fileId)
            .then(function (file) {
                if (!file) {
                    return callback('error, no db record found with this id', null);
                }

                models.File.destroy({
                    where: {
                        id: fileId
                    }
                })
                    .then(() => {

                        fs.unlink('assets/uploads/' + file.filename, function (err) {
                            if (err) {
                                var error = new Error(err);
                                return callback(error, null);
                            }

                            // Once the file is successfully removed,
                            // remove the db reference
                            return callback(null, true);

                        })
                    });
            });
    }
};
