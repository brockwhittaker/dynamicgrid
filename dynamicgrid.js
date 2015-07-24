/* dynamicgrid.js */

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
	imgAttr = [];
	obj.photoContainerElem.innerHTML = "";
	for (var x = 0; x < containerList.length; x++) {
		obj.photoContainerElem.innerHTML += "<img class='photo' src=" + containerList[x][2] + " style='height:" + rowHeights[groupData[2][x]] + "px;width:" + ratioArr[x] * rowHeights[groupData[2][x]]  +"px'></div>";
		imgAttr[x] = {
			"height" : rowHeights[groupData[2][x]],
			"width" : ratioArr[x] * rowHeights[groupData[2][x]]
		}
	}

	return imgAttr;

}

function createGrid (obj) {
	containerList = generateContainerList();
	ratioArr = getRatios(containerList);
	groupData = groupImages(ratioArr, obj.maxWidthHeightRatio);
	rowHeights = findRowHeight(groupData, obj.container.width, obj.container.margin, obj.container.width / obj.minWidthHeightRatio);
	imgAttr = printImages(containerList, rowHeights, groupData, ratioArr, null);
	obj.photoContainerElem.style.visibility = "visible";
}