const path = require('node:path');

module.exports = {
  entry: './public/using-sse.js',
  output: {
    filename: 'module-sse.js',
    path: path.resolve(__dirname, 'public', 'dist'),
  },
};
