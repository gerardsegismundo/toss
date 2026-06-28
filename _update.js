const fs = require('fs');
const path = require('path');
const root = 'c:/Users/gerar/Documents/projects/toss';

// 1. Update .gitignore
const gitignore = `.DS_Store
node_modules
/dist
notes

# local env files
.env
.env.local
.env.*.local

# Uploads
server/uploads/

# Log files
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw*
`;
fs.writeFileSync(path.join(root, '.gitignore'), gitignore);

// 2. Update root package.json
const rootPkg = {
  name: 'toss',
  version: '2.0.0',
  description: 'Chatbot single page Node application - Test Organization Support System',
  main: 'server/index.js',
  scripts: {
    start: 'node server/index.js',
    server: 'nodemon server/index.js',
    client: 'npm run serve --prefix client',
    dev: 'concurrently -n "server,client" -c "yellow,cyan" "npm run server" "npm run client"',
    'install-all': 'npm install && cd client && npm install'
  },
  author: '',
  license: 'ISC',
  dependencies: {
    axios: '^1.7.2',
    cors: '^2.8.5',
    dotenv: '^16.4.5',
    express: '^4.19.2',
    'express-async-errors': '^3.1.1',
    helmet: '^7.1.0',
    'ibm-watson': '^9.2.0',
    joi: '^17.13.3',
    lodash: '^4.17.21',
    mongoose: '^8.4.4',
    multer: '^1.4.5-lts.1',
    winston: '^3.13.0',
    wordpos: '^1.2.0',
    xlsx: '^0.18.5'
  },
  devDependencies: {
    concurrently: '^8.2.2',
    nodemon: '^3.1.4'
  }
};
fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify(rootPkg, null, 2) + '\n');

// 3. Update client package.json
const clientPkg = {
  name: 'client',
  version: '0.1.0',
  private: true,
  scripts: {
    serve: 'vue-cli-service serve',
    build: 'vue-cli-service build'
  },
  dependencies: {
    'animate.css': '^3.7.0',
    axios: '^1.7.2',
    'bootstrap-vue': '^2.23.1',
    'v-click-outside': '^2.0.2',
    'velocity-animate': '^1.5.2',
    vue: '^2.7.16',
    'vue-axios': '^3.5.2',
    'vue-bootstrap-datetimepicker': '^5.0.1',
    'vue-loading-spinner': '^1.0.11',
    'vue-notification': '^1.3.20',
    'vue-router': '^3.6.5',
    'vue2-animate': '^2.1.0',
    vuex: '^3.6.2'
  },
  devDependencies: {
    '@vue/cli-plugin-babel': '^3.12.1',
    '@vue/cli-service': '^3.12.1',
    'vue-template-compiler': '^2.7.16'
  },
  browserslist: ['> 1%', 'last 2 versions', 'not ie <= 8']
};
fs.writeFileSync(path.join(root, 'client', 'package.json'), JSON.stringify(clientPkg, null, 2) + '\n');

console.log('Part 1 done - config files updated');
