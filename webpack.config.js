const path = require('path');
const fs = require('fs');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

function generateHtmlPlugins(templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  return templateFiles.map((item) => {
    const parts = item.split('.');
    const fileName = parts[0];
    const extension = parts[1];
    return new HtmlWebpackPlugin({
      filename: `${fileName}.${extension}`,
      template: path.resolve(__dirname, `${templateDir}/${fileName}.${extension}`),
      inject: false,
    });
  });
}

const htmlPlugins = generateHtmlPlugins('./src/html/');

const config = {
  entry: ['./src/js/index.js', './src/scss/index.scss'],
  output: {
    filename: './js/bundle.js',
  },
  devtool: 'source-map',
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        extractComments: true,
      }),
    ],
  },
  devServer: {
    contentBase: './src/html',
    watchContentBase: true,
  },
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        include: path.resolve(__dirname, 'src/scss'),
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              url: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: true,
              plugins: () => [
                // eslint-disable-next-line global-require
                require('cssnano')({
                  preset: [
                    'default',
                    {
                      discardComments: {
                        removeAll: true,
                      },
                    },
                  ],
                }),
              ],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.html$/,
        include: path.resolve(__dirname, 'src/includes'),
        use: ['raw-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.png$/,
        use: [
          'file-loader?name=i/[hash].[ext]',
        ],
      },
      {
        test: /\.svg$/,
        include: path.resolve(__dirname, 'src/svg-sprites'),
        use: [
          'svg-sprite-loader',
        ],
      },
    ],
  },
  resolve: {
    modules: ['node_modules', 'scss'],
  },
  plugins: [
    new SpriteLoaderPlugin({
      plainSprite: true,
    }),
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, 'src/png-sprites'),
        glob: '*.png',
      },
      target: {
        image: path.resolve(__dirname, 'src/images/sprite.png'),
        css: path.resolve(__dirname, 'src/scss/sprite.scss'),
      },
      apiOptions: {
        cssImageRef: '../images/sprite.png',
      },
    }),
    new MiniCssExtractPlugin({
      filename: './css/style.bundle.css',
    }),
    new CopyWebpackPlugin([
      {
        from: './src/fonts',
        to: './fonts',
      },
      {
        from: './src/images',
        to: './images',
      },
    ]),
  ].concat(htmlPlugins),
};

module.exports = (env, argv) => {
  if (argv.mode === 'production') {
    config.plugins.push(new CleanWebpackPlugin());
  }
  return config;
};
