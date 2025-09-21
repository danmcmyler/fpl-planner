import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import type { Configuration } from "webpack";

export default (_env: unknown, argv: { mode?: string }): Configuration => {
  const isProd = argv.mode === "production";
  const publicDir = path.resolve(__dirname, "public");

  return {
    mode: isProd ? "production" : "development",
    entry: "./src/index.tsx",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.[contenthash].js",
      clean: true,
      publicPath: isProd ? "/fpl-planner/" : "auto"
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"]
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: { loader: "ts-loader", options: { configFile: "tsconfig.webpack.json" } },
          exclude: /node_modules/
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader", "postcss-loader"]
        },
        { test: /\.(png|jpe?g|gif|svg)$/i, type: "asset/resource" }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(publicDir, "index.html"),
        inject: "body"
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: publicDir,
            to: ".",
            filter: (resourcePath) => !resourcePath.endsWith("index.html")
          }
        ]
      })
    ],
    devServer: {
      port: 3000,
      historyApiFallback: true,
      open: true,
      hot: true,
      static: {
        directory: publicDir,
        watch: true
      }
    },
    devtool: isProd ? "source-map" : "eval-cheap-module-source-map"
  };
};
