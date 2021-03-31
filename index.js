'use strict';

function getA() {
  return new Promise((resolve) => {
    setTimeout(() => { resolve(11); }, 1000);
  });
}

function getB() {
  return new Promise((resolve) => {
    setTimeout(() => { resolve(13); }, 1000);
  });
}

function getC() {
  return new Promise((resolve) => {
    setTimeout(() => { resolve(17); }, 1000);
  });
}

// TODO ここに getA, getB, getC で得られる結果をかけあわせた結果 2431 を標準出力するコードを記述する
// ただし Promise チェイン(then関数の結果に対するthen関数の呼び出し)を一度は用いて実装をすること
getA()     //getA().then(~(a*bのPromiseオブジェクト)).then()
  .then(a => {
    return getB().then(b => {
      return a * b;
    });
  })
  .then(result => {
    getC().then(c => {
      console.log(result * c);
    });
  });




//別1
// Promise.all([getA(), getB(), getC()]).then(results => {
//   console.log(results[0] * results[1] * results[2]);
// });
// こちらの実装では、getA, getB, getC の Promise すべてが同時に開始されるため、上の実装例とは違い約 1 秒で終了します。




//別2
  // getA().then(async a => {
  //   const b = await getB();
  //   const c = await getC();
  //   console.log(a * b * c);
  // });
  // この実装は、無名関数を async 関数とし、 await がついている式の Promise を順番に待ちます。getA, getB, getC が順番に実行されるため、終了まで 3 秒かかります。