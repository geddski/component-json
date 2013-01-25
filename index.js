/**
 * Module dependencies
 */
var path = require("path");

/**
 * Expose plugin
 */
module.exports = function(options) {

  return function(builder) {
    builder.hook('before scripts', function(pkg){

      var files = pkg.conf.json;
      if (!files) return;

      var jsonFiles = [];

      files.forEach(function(file){
        var ext = path.extname(file);
        if (ext != ".json") return;

        jsonFiles.push(file);

        var json = require(pkg.path(file));

        var js = "module.exports = JSON.parse('"+JSON.stringify(json)+"');";

        pkg.addFile('scripts', file, js);
      });

      jsonFiles.forEach(function(file) {
        pkg.removeFile("json", file);
      });
    });
  };
};
