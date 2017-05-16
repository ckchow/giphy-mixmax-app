var murmurhash = require('node-murmurhash')

all_diffs = {}


exports.get_hash = function(original, modified) {
  return murmurhash(original + modified, 122);
}
