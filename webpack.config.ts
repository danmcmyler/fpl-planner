import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import type { Configuration } from "webpack";

const config: Configuration = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.[contenthash].js",
    clean: true,
    publicPath: "/fpl-planner/"
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            configFile: "tsconfig.webpack.json"
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      inject: "body"
    })
  ],
  devServer: {
    port: 3000,
    historyApiFallback: true,
    open: true,
    hot: true
  }
};

export default config;
