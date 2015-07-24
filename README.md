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
	maxWidthHeightRatio: 6,
	container: {
		width: 0.8 * window.innerWidth,
		margin: 10
	},
	minWidthHeightRatio: 3,
	photoContainerElem: document.getElementById('photo-container'),
	containerList: null
};
```

The specification `maxWidthHeightRatio` essentially specifies the thinnest the row can be. A value of `6` means that the width of the row cannot exceed 6 times the height of the row. Similarly the `minWidthHeightRatio` attribute specifies the minimum value. Note that if your minimum value is too high your row widths may come out uneven due to photos not being able to fit into either the minimum ratio.

In the container attribute there are two arguments: `width` and `margin`. Only use the margin attribute if there will be a CSS margin between each of the photos in the grid. The width specification should be the same as the width of the actual div you plan on placing the photos in. If the width isn't specified or is null, the width will default to the width of the element defined in `photoContainerElem`. Therefore the following will work:

```javascript
var photoContainerElem = document.getElementById('photo-container');
var gridObject = {
  container: {
    width: null,
    margin: 10
  },
  photoContainerElem: photoContainerElem
}
```

##Loading

####Static Loading
You can now statically load a `containerList` by putting in a `containerList` argument into the object. The array will then be used to grid the photos rather than generating and calculating the grid on each load.

####AJAX Loading
It is important that all images have loaded inside the DOM before trying to get the stats on them. The easiest way to put off executing the script until then is to use jQuery `.load()`. Here's a short script to do so:

```javascript
$("#photo-container img").on('load', function(){
  createGrid(obj);
});
```

##Execution

####Function Execution
Finally, to execute the function, run `createGrid(gridObject)`.

####Demo
A demo of this is available on my site [here](http://lavancier.com/dynamicgrid/test.html).
An AJAX load demo of this is available as well on my site [here](http://lavancier.com/dynamicgrid/redditload.html).

If you have any questions, feel free to reach me at [brock@lavancier.com](brock@lavancier.com).
