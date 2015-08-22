/* dynamicgrid.js */

function createNode (type, className, id, src, parent, height, width) {
	var node = document.createElement(type);
	node.setAttribute("class", className) || false;
	if (id !== null) {
		node.id = id || false;
	}
	if (className !== null) {
		node.setAttribute("class", className) || false;
	}

	node.style.height = height + "px";
	node.style.width = width + "px";
	node.setAttribute("src", src);

	parent.appendChild(node);
}

function generateContainerList (obj) {
	var array = obj.photoContainerElem.querySelectorAll("img");

	containerList = [];
	for (var x = 0; x < array.length; x++) {
		containerList[x] = [array[x].naturalWidth, array[x].naturalHeight, array[x].src, array[x].className];
	}

	return containerList;
}

function getRatios (arr) {
	var ratioArr = [];
	for (var x = 0; x < arr.length; x++) {
		ratio = arr[x][0] / arr[x][1];
		ratioArr[x] = ratio;
	}

	return ratioArr;
}

function groupImages (ratioArr, wHRatio) {
	var groups = [[]];
	var linearCata = [];
	var endRatio = [];
	var buffer = 0, y = 0;

	for (var x = 0; x < ratioArr.length; x++) {
		if (buffer + ratioArr[x] < wHRatio) {
			groups[y].push(x);
			buffer += ratioArr[x];
		} else {
			buffer = 0;
			y++;
			groups[y] = [];

			groups[y].push(x);
			buffer += ratioArr[x];
		}
		endRatio[y] = buffer;
		linearCata[x] = y;
	}

	return [groups, endRatio, linearCata];
}

function findRowHeight (groupData, width, margin, maxHeight) {
	var rowHeights = [];
	for (var x = 0; x < groupData[1].length; x++) {
		if ((width - margin) / groupData[1][x] > maxHeight) {
			rowHeights[x] = maxHeight;
		} else {
			rowHeights[x] = (width - margin * groupData[0][x].length * 2) / groupData[1][x];
		}
	}

	return rowHeights;
}

function printImages (containerList, rowHeights, groupData, ratioArr, obj) {
	var imgAttr = [];
	var imgList = obj.photoContainerElem.querySelectorAll('img');
	for (var x = 0; x < imgList.length; x++) {

		imgList[x].style.height = rowHeights[groupData[2][x]] / obj.container.width * 100 + "%";
		imgList[x].style.width = rowHeights[groupData[2][x]] * ratioArr[x] / obj.container.width * 100 + "%";

		imgAttr[x] = {
			"height" : rowHeights[groupData[2][x]],
			"width" : ratioArr[x] * rowHeights[groupData[2][x]]
		}
	}

	return imgAttr;
}

function createGrid (obj) {
	if (obj.containerList !== null && typeof obj.containerList !== "undefined") {
		var containerList = obj.containerList;
	} else {
		var containerList = generateContainerList(obj);
	}

	if (obj.container.width !== null && typeof obj.container.width !== "undefined") {
		var width = obj.container.width;
	} else {
		var width = obj.photoContainerElem.offsetWidth;
	}

	if (obj.container.margin !== null && typeof obj.container.margin !== "undefined") {
		var margin = obj.container.margin;
	} else {
		var margin = 0;
	}

	var ratioArr = getRatios(containerList);
	var groupData = groupImages(ratioArr, obj.maxWidthHeightRatio);
	var rowHeights = findRowHeight(groupData, width, margin, width / obj.minWidthHeightRatio);
	var imgAttr = printImages(containerList, rowHeights, groupData, ratioArr, obj);
	obj.photoContainerElem.style.visibility = "visible";
}
