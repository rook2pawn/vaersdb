const genPromise = (pageNum) => {
  return () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("resolving!", pageNum);
        resolve();
      }, 100);
    });
};

const list = [];
for (var i = 0; i < 12; i++) {
  list.push(genPromise(i));
}
list.reduce((p, c) => {
  return p.then(() => {
    return c();
  });
}, Promise.resolve(0));
