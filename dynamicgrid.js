"use strict";

Array.prototype.sum = function () {
  return this.reduce(function (a, b) {
    return a + b;
  });
  // this converts floats to strings but for this scenerio it is okay...
}

Array.prototype.flatten = function () {
  return this.join(',').split(/,/g);
}

function displayNone (parent) {
  var nodes = Array.prototype.slice.call(parent.querySelectorAll('img')); // convert nodeList to array
  nodes.map(function (i, o) {
    i.style.display = "none";
  });
}

function grabImages (parent) {
  var imgList = [];
  var nodes = Array.prototype.slice.call(parent.querySelectorAll('img')); // convert nodeList to array

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
  })

  return [imgList.flatten(), indexList]; // return indexList to figure out the margin needed on each line...
}

function sizeImages (parent, list, indexList, margin) {
  var nodes = Array.prototype.slice.call(parent.querySelectorAll('img')); // convert nodeList to array
  nodes.map(function (i, o) {
    i.style.width = "calc((" + list[o] * 100 + "%) * (1 - " + parseFloat(margin) / 50 * indexList[o] + "))"; // because there are margins on both sides.
    i.style.margin = "calc(" + margin + " - 2.5px) " + margin;
    //i.style.margin = "calc(" + margin + " - 2.5px) " + margin;
    i.style.display = "inline-block";
  });
}

var imgList;
function gridPhotos (parent, max, margin) {
  var list;
  var nodes = Array.prototype.slice.call(parent.querySelectorAll('img')); // convert nodeList to array
  nodes[nodes.length - 1].onload = function () {
    list = grabImages(parent)
    imgList = binImages(max, list);
    sizeImages(parent, imgList[0], imgList[1], margin);
  } // this waits until the last photo's onload event triggers to start...
}