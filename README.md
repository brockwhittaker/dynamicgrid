# dynamicgrid.js

####Description
This is meant to provide a similar aesthetic to Flickr's photostream. Rows of photographs are equal in height and photos are kept proportional to their original constraints.

##Implementing dynamicgrid.js

####Before Implementation
All the photographs must already be inside the photo container div for this code to work if you are dynamically loading `containerList`. It uses `elem.querySelectorAll('img')` to find all available images to process and fit into the grid.
Ensure the following before using:
1. The container is set to `text-align: center`.
2. Your images are set to `display: inline-block`.
3. The container is set to `visibility: hidden`, as the container shouldn't be seen until the photos have loaded (due to height/width changes).

####Implementation
Dynamicgrid.js takes an object as input for all specifications and looks like:

```javascript
var gridObject = {
	"parent": node,
	"maxWidthHeightRatio": 4,
	"photoMargin": "0.4%",
	"photoOnLoad": false
};
```

The specification `maxWidthHeightRatio` essentially specifies the thinnest the row can be. A value of `6` means that the width of the row cannot exceed 6 times the height of the row. Note that if your minimum value is too high your row widths may come out uneven due to photos not being able to fit into either the minimum ratio.

The `parent` specification allows you to specify the node container that the images will be in. This process is non-destructive. That means that images are resized dynamically but all their properties, classes, IDs, meta tags, and external tags are kept.

The `photoMargin` attribute shows the margin between photographs. It can be specified in any CSS unit (eg. px, %, vw, vh, em, etc.).

```javascript
var photoGrids = Array.prototype.slice.call(document.getElementsByClassName('photo-grid'));

var gridObject = {
	"parent": null,
	"maxWidthHeightRatio": 4,
	"photoMargin": "0.4%",
	"photoOnLoad": false
};

photoGrids.map(function (i) {
	gridObject.parent = i;
	gridPhotos(gridObject);
});
```

##AJAX Loading
To AJAX load these grids dynamically, set the display to none by default and then run the function `onload`.

```javascript
$("#photo-container img").on('load', function(){
	gridPhotos(gridObject);
});
```

##Execution

####Function Execution
Finally, to execute the function, run `createGrid(gridObject)`.

####Demo
A demo of this is available on my site [here](http://lavancier.com/dynamicgrid/test.html).

If you have any questions, feel free to reach me at [brock@lavancier.com](brock@lavancier.com).
