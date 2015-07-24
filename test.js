/* dynamicgrid.js */

function createNode (type, className, id, src, parent, height) {
	var node = document.createElement(type);
	node.setAttribute("class", className) || false;
	if (id !== null) {
		node.id = id || false;			
	}
	if (className !== null) {
		node.setAttribute("class", className) || false;
	}

	node.style.height = height;

	document.getElementById(parent).appendChild(node);
}

function generateContainerList () {
	var array = obj.photoContainerElem.querySelectorAll("img")

	containerList = [];
	for (var x = 0; x < array.length; x++) {
		containerList[x] = [array[x].naturalWidth, array[x].naturalHeight, array[x].src];
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
			rowHeights[x] = (width - margin * groupData[0][x].length) / groupData[1][x];
		}
	}

	return rowHeights;
}

function printImages (containerList, rowHeights, groupData, ratioArr, imgArr) {
	var imgAttr = [];
	obj.photoContainerElem.innerHTML = "";
	for (var x = 0; x < containerList.length; x++) {
		createNode("img", "photo", null, containerList[x][2], obj.photoContainerElem, rowHeights[groupData[2][x]]);

		imgAttr[x] = {
			"height" : rowHeights[groupData[2][x]],
			"width" : ratioArr[x] * rowHeights[groupData[2][x]]
		}
	}

	return imgAttr;
}

function createGrid (obj) {
	var containerList = generateContainerList();
	var ratioArr = getRatios(containerList);
	var groupData = groupImages(ratioArr, obj.maxWidthHeightRatio);
	var rowHeights = findRowHeight(groupData, obj.container.width, obj.container.margin, obj.container.width / obj.minWidthHeightRatio);
	var imgAttr = printImages(containerList, rowHeights, groupData, ratioArr, null);
	obj.photoContainerElem.style.visibility = "visible";
}