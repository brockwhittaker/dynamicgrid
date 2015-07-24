# dynamicgrid.js
A similar dynamic photo grid to Flickr's algorithm present in Photostreams.

This creates a custom-sized grid that displays photographs such that the height of a row is consistent throughout and the width of a row is equal to the specified row length.

Dynamicgrid.js takes an object as input for all specifications and looks like:

```javascript
var gridObject = {
	maxWidthHeightRatio: 6,
	container: {
		width: 0.8 * window.innerWidth,
		margin: 10
	},
	minWidthHeightRatio: 3,
	photoContainerElem: document.getElementById('photo-container')
};
```

The specification `maxWidthHeightRatio` essentially specifies the thinnest the row can be. A value of `6` means that the width of the row cannot exceed 6x the height of the row. Similarly the `minWidthHeightRatio` attribute specifies the minimum value. Note that if your minimum value is too high your row widths may come out uneven due to photos not being able to fit into either the minimum ratio.

In the container attribute there are two arguments: `width` and `margin`. The width specification should be the same as the width of the actual div you plan on placing the photos in. Appropriately you could have the following code:

```javascript
var photoContainerElem = document.getElementById('photo-container');
var gridObject = {
  container: {
    width: 0.8 * photoContainerElem.style.width
  },
  photoContainerElem: photoContainerElem
}
```

Note that all the photographs must already be inside the photo container div for this code to work. It uses `elem.querySelectorAll('img')` to find all available images to process and fit into the grid. Ensure your container is also `text-align: center` and that your images are set to `display: inline-block`.

Finally, to execute the function, run `createGrid(gridObject)`.

If you have any questions, feel free to reach me at [brock@lavancier.com](brock@lavancier.com).
