import path from 'path';

export default {
  devtools: 'eval-source-map',
  entry: path.join(__dirname,'/client/react.js' ),
  output: {
    path: '/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.json(__dirname, 'client'),
        loaders: [ 'babel']
      }
    ]
  },
  resolve: {
    extentions: [ '', '.js' ]
  }
};