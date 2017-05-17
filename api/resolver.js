var jsdiff = require('diff');
var diff2html = require('diff2html').Diff2Html;
var juice = require('juice');
var fs = require('fs');

var d2hcss = '';

fs.readFile('public/diff2html/diff2html.min.css', 'utf8', function(err, data) {
  d2hcss = data;
});

module.exports = function(req, res) {
  var data = JSON.parse(req.body.params);
  if (!data) {
    res.status(400 /* Bad params */ ).send('Invalid params');
    return;
  }

  var modified_length = data.modified.split(/\r?\n/).length;

  var patch = jsdiff.createPatch('', data.original, data.modified, '', '', {
    context: modified_length
  })

  var htmldiff = diff2html.getPrettyHtml(patch, {
    outputFormat: 'side-by-side',
    matching: 'words'
  })

  var html = juice.inlineContent(htmldiff, d2hcss);

  res.json({
    body: html
    // Add raw:true if you're returning content that you want the user to be able to edit
  });
};
