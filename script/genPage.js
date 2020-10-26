const process = require('process');
const path = require('path');
const rootPath = process.cwd();

// 读取页面配置
const pageConfig = require(path.resolve(rootPath, 'config/pageConfig'));
const fs = require('fs');

const pageOutputDir = path.resolve(rootPath, 'src/page');
const jumpOutputDir = path.resolve(rootPath, 'src/util/jumpTo.js');
console.log('输出目录', pageOutputDir);
// console.log(page);
const htmlTemplate = `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
  </body>
</html>`;

function jumpTo(name) {
  let url = `export const `+ name +`Url = host + '`+ name +`/index.html';
export const to`+ name +` = () => {
      window.location.href = `+ name +`Url;
  }
`
  return url;
};


function writefile(filePath, data = '') {
  let sucess = false;
  try {
    fs.accessSync(filePath);
    console.log(`文件 ${filePath}已存在`);
    return ;
  } catch (e) { }
  console.log(`文件 ${filePath}不存在 尝试创建`);


  try {
    fs.writeFileSync(filePath, data);
    sucess = true;
  } catch (e) {}
  return sucess
}

function findOrGenPageDir(page) {
  if (!page.name) {
    console.log('缺少合法配置项 name');
    return ;
  }
  const pageDirPath =  path.resolve(pageOutputDir, page.name);
  // 首先创建路径
  try {
    fs.access
    fs.mkdirSync(pageDirPath);
  } catch (e) {}  
  // html
  const htmlfilePath = path.resolve(pageDirPath, 'index.html');
  writefile(htmlfilePath, htmlTemplate);
  // js
  const jsfilePath = path.resolve(pageDirPath, 'index.js');
  writefile(jsfilePath);
  // util
 
}

for ( let page of pageConfig ) {
  findOrGenPageDir(page);
}

function writeJump() {
  let data = '';
  let urlElement = '';
  for ( let page of pageConfig ) {
    urlElement = jumpTo(page.name);
    data = data + urlElement;
  }
  // console.log(data);
  fs.writeFileSync(jumpOutputDir, data);
}
writeJump();
