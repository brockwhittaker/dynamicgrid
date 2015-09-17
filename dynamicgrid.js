Array.prototype.sum = function () {
  return this.reduce(function (a, b) {
    return a + b;
  });
  // this converts floats to strings but for this scenerio it is okay...
}

Array.prototype.flatten = function () {
  return this.join(',').split(/,/g);
}

function grabImages (parent, nodes) {
  var imgList = [];

  nodes.map(function (i, o) {
    imgList[o] = (i.naturalWidth) / (i.naturalHeight);
  });

  return imgList;
}

function binImages (max, list) {
  var buffer = 0, ratio = 0, level = 0, sum;
  var imgList = [[]], indexList = [];

  list.map(function (i, o) {
    ratio += i;
    if (ratio < max && ratio + list[o + 1] > max) {
      imgList[imgList.length - 1].push(list[o]);
      imgList.push([]);
      ratio = 0;
    } else {
      imgList[imgList.length - 1].push(list[o]);
    }
  });

  imgList = imgList.map(function (i, o) {
    sum = i.sum();
    return i.map(function (x, y) {
      indexList.push(imgList[o].length);
      return x /= (sum);
    });
  });

  return [imgList.flatten(), indexList]; // return indexList to figure out the margin needed on each line...
}

function sizeImages (parent, list, indexList, margin, nodes) {
  nodes.map(function (i, o) {
    i.style.width = "calc((" + list[o] * 100 + "%) * (1 - " + parseFloat(margin) / 50 * indexList[o] + "))"; // because there are margins on both sides.
    i.style.height = "auto";
    i.style.margin = "calc(" + margin + " - 2px) " + "calc(" + margin + " - 2px)";
    i.style.display = "inline-block";
  });
}

var imgList;
function gridPhotos (gridObject) {
  var list;
  var nodes = Array.prototype.slice.call(gridObject.parent.querySelectorAll('img')); // convert nodeList to array
  function photoLoad () {
    list = grabImages(gridObject.parent, nodes)
    imgList = binImages(gridObject.maxWidthHeighRatio, list);
    sizeImages(parent, imgList[0], imgList[1], gridObject.photoMargin, nodes);
  } // this waits until the last photo's onload event triggers to start...

  if (gridObject.photoOnLoad == true) {
    nodes[nodes.length - 1].onload = photoLoad;
  } else {
    photoLoad();
  }
}