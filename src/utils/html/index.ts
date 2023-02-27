//去掉html标签
export function removeHtmlTab(tab) {
  return tab.replace(/<[^<>]+?>/g, ''); //删除所有HTML标签
}

//普通字符转换成转义符
export function html2Escape(sHtml) {
  return sHtml.replace(/[<>&"]/g, function (c) {
    return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c];
  });
}

//转义符换成普通字符
export function escape2Html(str) {
  const arrEntities = { lt: '<', gt: '>', nbsp: ' ', amp: '&', quot: '"' };
  return str.replace(/&(lt|gt|nbsp|amp|quot);/gi, function (_, t) {
    return arrEntities[t];
  });
}

//&nbsp;转成空格
export function nbsp2Space(str) {
  const arrEntities = { nbsp: ' ' };
  return str.replace(/&(nbsp);/gi, function (_, t) {
    return arrEntities[t];
  });
}

//回车转为br标签
export function return2Br(str) {
  return str.replace(/\r?\n/g, '<br />');
}

//去除开头结尾换行,并将连续3次以上换行转换成2次换行
export function trimBr(str) {
  str = str.replace(/((\s|&nbsp;)*\r?\n){3,}/g, '\r\n\r\n'); //限制最多2次换行
  str = str.replace(/^((\s|&nbsp;)*\r?\n)+/g, ''); //清除开头换行
  str = str.replace(/((\s|&nbsp;)*\r?\n)+$/g, ''); //清除结尾换行
  return str;
}

//将多个连续空格合并成一个空格
export function mergeSpace(str) {
  str = str.replace(/(\s|&nbsp;)+/g, ' ');
  return str;
}
