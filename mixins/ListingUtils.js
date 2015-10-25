import _ from 'underscore';

var listingUtilsMixin = {
  coverImagePreview: function (listingFiles) {
      var file = _.find(listingFiles, {type: 'coverImage'});
      return file ? file.preview : "/assets/img/tmp/agent-2.jpg";
  },

  userProfilePreview: function (user, params) {
      var h = params.h|| 100;
      var w = params.w || 100;
      // if the user has uploaded a file, use this
      var file = _.find(user.Files, {type: 'profileImage'});
      if (file) {
          return file.preview + "?dim=" + h + "x" + w;
      }

      // else if the user signed up through facebook, use that
      if (user.facebookId) {
          return "http://graph.facebook.com/" + user.facebookId + "/picture?height=" + h + "&width=" + w;
      }

      // else return a default placeholder
      return "/assets/img/tmp/agent-2.jpg" + "?dim=" + h + "x" + w;
  }
};

export default listingUtilsMixin;
