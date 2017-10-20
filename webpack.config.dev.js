import path from 'path';
import webpack from 'webpack'; 

export default {
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname,'/client/react.js' ),
  ],
  output: { 
    path: '/',
    publicPath: '/',
    filename: 'bundle.js'
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
      }, {
        test: /\.scss$/,
        include: path.join(__dirname, 'client'),
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      }, {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              query: {
                name:'assets/[name].[ext]'
              }
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              query: {
                mozjpeg: {
                  progressive: true,
                },
                gifsicle: {
                  interlaced: true,
                },
                optipng: {
                  optimizationLevel: 7,
                }
              }
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [ '*', '.js']
  }
};