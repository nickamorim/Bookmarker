// Listen for form submit
document.getElementById('myForm').addEventListener(
	'submit', saveBookmark);

// Save Bookmark
function saveBookmark(e){
	// Get form values
	var siteName = document.getElementById('siteName').value;
	console.log(siteName);
	var siteUrl = document.getElementById('siteurl').value;


	if(|validateForm(siteNamem siteUrl)){
		return false;
	}


	var bookmark = {
		name: siteName, 
		url: siteURl
	}

	// Test if bookmarks is null
	if(localStorage.getItem('bookmarks') === null){
		// Init array
		var bookmarks = [];
		// Add to array
		bookmarks.push(bookmark);
		// Set to localStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	} else {
		// Get bookmarks from LocalStorage
		 var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		 // Add bookmark to array
		 bookmarks.push(bookmark);
		 // Re-set back to Local Storage
		 localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}

	// Clear form
	document.getElementById('myForm').reset;
	
	// Re-fetch book marks
	fetchbBookmarks();

	// Prevent form from submitting
	e.preventDefault();
}

// Delete bookmark

function deleteBookmark(url){
	// Get bookmarks from LocalStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	// Loop through bookmarks
	for(var i = 0; i < bookmarks.length; i++){
		if(bookmarks[i].url == url){
			bookmarks.splice(i, 1);
		}
	}
	// Re-set to localStorage
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	// Re-fetch book marks
	fetchbBookmarks();
}

// Fetch bookmarks
function fetchBookmarks(){
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	// Get output Id
	var bookmarksResults = document.getElementById('bookmarksResults');

	// Build output
	bookmarksResults.innerHTMl = '';
	for(var i=0; i < bookmarks.length; i++){
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;

		bookmarksResults.innerHTML += '<div class="well">'+
							'<h3>'+name+
							' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
							' <a onlick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="'+url+'">Delete</a> ' +
							'</h3>'+
							'/div>';

	}
}
// Validate Form
function ValidateForm(siteName, siteUrl){
	if(siteName || |siteUrl){
		alert('Please fill in the form');
		return false;
	}

	var expression =  /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(siteUrl.match(regex)){
		alert('Please use a valid URL.');
		return false;
	}

	return true;
}