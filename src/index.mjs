import {toNumber}  from 'lodash/lang'

function arrayChunk(myArray, chunk_size){
  let results = [];
  
  while (myArray.length) {
      results.push(myArray.splice(0, chunk_size));
  }
  
  return results;
}

function arraySum(a) {
  return a.reduce((x,y) => x+y, 0);
}

function arrayRemove (a, element) {
  let index = a.indexOf(element)
  if (index > -1) {
    return a.splice(index, 1)
  }
  return []  
}


function _deepGet(obj, path) {
  return path.split('.').reduce(function (prev, curr) {
    return prev ? prev[curr] : undefined
  }, obj || self)
}



function collMatches(coll, params) {
  const fdata = coll.filter((d) => {
    const _pflds = Object.keys(params)
    let valids= 0;
    let eqs = 0
    for (const idx in _pflds) {
      const fld = _pflds[idx]
      if (d[fld]!=undefined) {
        valids += 1
        if (d[fld] == params[fld]) {
          eqs += 1
        } else {
          if (Array.isArray(params[fld])) {
            if (params[fld].indexOf(d[fld])>=0) {
              eqs += 1
            }
          }
        }
      }
    }
    return (eqs == valids)
  })
  return fdata
}


function collSort(coll, by, order) {
  if (by==undefined) {
    return coll
  }
  const ft = order=='desc' ? -1 : 1
  return coll.slice().sort(function (a, b) {
    /*
    const fa = a[by].toLowerCase(), fb = b[by].toLowerCase()
    if (fa < fb) //sort string ascending
      return -1 * ft
    if (fa > fb)
      return 1 * ft
    return 0 //default return value (no sorting)
    */
   //return (a[by]-b[by])*ft
   let av,bv

   if (typeof by == 'object') {
    
    av = _deepGet(a, by.field)
    bv = _deepGet(b, by.field)
    av= by.map[av] || ''
    bv= by.map[bv] || ''
   } else if (typeof by == 'function') {
    av = by(a) || ''
    bv = by(b) || ''
   } else {
    av = _deepGet(a, by)
    bv = _deepGet(b, by)
   }
   if (typeof av == 'string' && typeof bv == 'string') {
     av= av.toLowerCase()
     bv= bv.toLowerCase()
   }

    if (av < bv) //sort string ascending
      return -1 * ft
    if (av > bv)
      return 1 * ft
    return 0
  })  
}

/*
https://stackoverflow.com/a/10124053

(function(){
  if (typeof Object.defineProperty === 'function'){
    try{Object.defineProperty(Array.prototype,'sortBy',{value:sb}); }catch(e){}
  }
  if (!Array.prototype.sortBy) Array.prototype.sortBy = sb;

  function sb(f){
    for (var i=this.length;i;){
      var o = this[--i];
      this[i] = [].concat(f.call(o,o,i),o);
    }
    this.sort(function(a,b){
      for (var i=0,len=a.length;i<len;++i){
        if (a[i]!=b[i]) return a[i]<b[i]?-1:1;
      }
      return 0;
    });
    for (var i=this.length;i;){
      this[--i]=this[i][this[i].length-1];
    }
    return this;
  }
})();

*/


function collMaxBy(coll, fld) {
  let m= -99999;
  coll.map((c) => {
    if (c[fld]!=undefined)
      m= Math.max(m, c[fld])
  })
  return coll.find((c) => c[fld]==m)
}

function collTotalBy(arr, field) {
  let f = parseFloat(0)
  arr.map((d) => {
    f += toNumber(d[field])
  })
  return f
}

export { arrayChunk, arraySum, arrayRemove, collMatches, collSort, collMaxBy, collTotalBy}