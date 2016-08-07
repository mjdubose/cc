module.exports = {
  entry: [
    './src/index.jsx'
  ],
  output: { path: __dirname + '/public', filename: 'bundle.js' },
  module: {
    loaders: [{
      test: /\.jsx*$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
