//add eventlistener for form submit
document.getElementById('my-form').addEventListener('submit', saveBookmark);

//save bookmark funtion
function saveBookmark(e){
	//get form values
	var websiteName = document.getElementById('website-name').value;
	var websiteURL = document.getElementById('website-url').value;
    
    if(!validateForm(websiteName, websiteURL)){
    return false;
  }

	var bookmark = {
		name: websiteName,
		url: websiteURL
	}

	/*
		//local storage example
		localStorage.setItem('test', 'Hello World');
		console.log(localStorage.getItem('test'));

	*/

	// Test if bookmarks is null
  if(localStorage.getItem('bookmarks') === null){
    // Init array
    var bookmarks = [];
    // Add to array
    bookmarks.push(bookmark);
    // Set to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Add bookmark to array
    bookmarks.push(bookmark);
    // Re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
    
    // Clear form
    document.getElementById('my-form').reset();
    
     // Re-fetch bookmarks
    fetchBookmarks();
    
	//prevent from form submitting
	e.preventDefault();
}

// Delete bookmark
function deleteBookmark(url){
    
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Loop through the bookmarks
    for(var i =0;i < bookmarks.length;i++){
        if(bookmarks[i].url == url){
            //Remove from array
            bookmarks.splice(i, 1);
        }
    }
    // Re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // Re-fetch bookmarks
    fetchBookmarks();
}

//fetch bookmarks
function fetchBookmarks(){
    // Get bookmarks from localStorage
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    
    //get output id
    var bookmarksResults = document.getElementById('bookmarks-results');
    
    //build output
    bookmarksResults.innerHTML = '';
    for(var i = 0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        bookmarksResults.innerHTML += '<div class="well">'+
                                  '<h3>'+name+
                                  ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
                                  ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                  '</h3>'+
                                  '</div>';
    }
}

// Validate Form
function validateForm(websiteName, websiteUrl){
  if(!websiteName || !websiteUrl){
    alert('Please fill in the form');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!websiteUrl.match(regex)){
    alert('Please use a valid URL');
    return false;
  }

  return true;
}