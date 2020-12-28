#Markup bundler

##Requirements
Node.js
##
##Getting Started $ git clone https://github.com/Remi208/markup-bundler
Install dependencies, and check if it works:

step 1
Go to the project folder

step 2
npm install - this command installs a package, and any packages that it depends on. (npm)

step 3
npm start  - this command starts markup bundler
##
##Application Structure
├── src
│   ├── fonts
│   ├── images
│   ├── includes
│   │   └── js.html
│   ├── js
│   │   ├── index.js
│   │   ├── markup-menu.js
│   │   └── svg-loader.js
│   ├── png-sprites
│   ├── scss
│   │   ├── index.scss
│   │   ├── mixins.scss
│   │   ├── normalize.scss
│   │   ├── reset.scss
│   │   ├── sprite.scss
│   │   └── variables.scss
│   ├── svg-sprites
│   └── index.html
├── .babelrc          
├── .eslintrc        
├── .flowconfig         
├── .gitignore          
├── LICENSE.md          
├── package.json         
├── package-lock.json        
├── README.md  
└── webpack.config.js