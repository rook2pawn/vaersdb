const get = require("./get");

const genPromise = (pageNum) => {
  return () => get(pageNum);
};

const list = [];
for (var i = 1; i <= 12; i++) {
  list.push(genPromise(i));
}
list.reduce((p, c) => {
  return p.then(() => {
    return c();
  });
}, Promise.resolve(0));
