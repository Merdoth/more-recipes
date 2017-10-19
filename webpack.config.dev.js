import path from 'path';
import webpack from 'webpack'; 

export default {
  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname,'/client/react.js' ),
  ],
  output: { 
    path: '/',
    publicPath: '/'
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'client'),
        loaders: [ 'react-hot-loader/webpack', 'babel-loader']
      }
    ]
  },
  resolve: {
    extensions: [ '*', '.js' ]
  }
};