const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const entries = ["index"];

module.exports = {
  entry: entries.reduce(
    (acc, entry) => {
      return {
        ...acc, [entry]: [
          `./src/${entry}/main.ts`,
          `./src/${entry}/style.scss`
        ]
      };
    }, {}
  ),
  node: false,
  output: {
    libraryTarget: "amd",
    path: path.join(__dirname, "dist"),
    filename: "[name]/main.[chunkhash].js",
    // chunkFilename: 'chunks/[id].js',
    publicPath: ''
  },
  devServer: {
    compress: true,
  },
  externals: [
    /^esri\/.*/,
    /^app\/.*/,
    /^simplify/,
  ],
  module: {
    rules: [
      {
        test: /\.ejs$/,
        loader: 'ejs-loader',
        options: {
          esModule: false,
        }
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true
        },
        exclude: /node_modules/
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          process.env.NODE_ENV !== "production"
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
          },
          // {
          //   loader: "postcss-loader",
          //   options: {
          //     sourceMap: true
          //   },
          // },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            },
            options: {
              implementation: require("sass")
            }
          }
        ],
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: "file-loader",
        options: {
          name: '[path][name].[ext]',
          outputPath: 'static/assets/',
          publicPath: 'static/assets/',
        },
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        '**/*',
        '!.git/**',]
    }),
    ...entries.map(entry => new HtmlWebpackPlugin({
      title: 'Zurich - Milan by Train',
      description: 'An interactive 3D web application visualizing the train route between Zurich and Milan',
      template: `./src/template.js`,
      filename: `${entry}.html`,
      entry,
      NODE_ENV: process.env.NODE_ENV,
      chunks: [entry],
      chunksSortMode: 'none',
      inject: false,
    })),
    new MiniCssExtractPlugin({
      filename: "[name]/style.[chunkhash].css",
      chunkFilename: "[id].css"
    }),
    new CopyWebpackPlugin(
      {
        patterns: [{
          from: './public',
          to: './'
        }]
      })
  ],
  resolve: {
    modules: [
      path.resolve(__dirname, "/src"),
      path.resolve(__dirname, "node_modules/")
    ],
    extensions: [".ts", ".tsx", ".js", ".scss", ".css"]
  }
};
