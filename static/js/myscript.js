/***************************** Authentication Actions  ******************************/

/*
This code handles the click event on the "SignIN button" element, 
retrieves the entered username and password, 
sends a POST request to the server with the login credentials, 
and handles the response accordingly by either redirecting the user or displaying 
an error message.*/

$("#loginbtn").on("click", function(){
    var user = $("#username").val();
    var password = $("#password").val();
    var nextURL = $("#nextURL").val();

    $("#loader").html('<img src="/static/images/loader.gif">');

    $.post("/login", {username: user, password: password}, function (response) {

      $("#loader").html('');
      var response = JSON.parse(response);

      if (response.success) {
        window.location.href = nextURL;
      }
      else {
         $("#loader").html('<p class="alert alert-danger">Invalid username/password</p>');
      }
    });
});


$("#logoutbtn").on("click", function(){

    $.post("/logout", {action: 'logout'}, function (response) {

      window.location.href = "index.php";

    });
});


/***************************** Gallery Actions  ******************************/
// Add Gallery Action

/*This code handles the click event on the "addGallerybtn" element, 
retrieves the entered gallery name, sends a POST request to the server 
to add the gallery, and handles the response accordingly by either reloading the page 
or logging an error message and reloading the page.*/

$("#addGallerybtn").on("click", function(){
    var galleryName = $("#galleryName").val();

    if(galleryName != "") {
      $("#loader").html('<img src="/static/images/loader.gif">');

      $.when($.post("/galleries/add", {galleryName: galleryName}).done(function(response){
            $("#loader").html('');
            var response = JSON.parse(response);

            if (response.success) {
                location.reload();
            }
            else {
              console.log("Error Adding Gallery");
              location.reload();
            }
        }));
    }
});

// Delete Gallery Action
$(document).on("click", '#deleteGallerybtn', function(){
//$("#deleteGallerybtn").on("click", function(){
    var galleryName = $(this).data("galleryname");

    if(galleryName != "") {
      $("#loader").html('<img src="/static/images/loader.gif">');

      $.when($.post("/galleries/delete", {galleryName: galleryName}).done(function(response){
            $("#loader").html('');
            var response = JSON.parse(response);
            console.log(response);

            if (response.success) {
                location.reload();
            }
            else {
              console.log("Error deleting Gallery");
              location.reload();
            }
        }));
    }
});


// Edit Gallery Action
$(document).on("click", '#editGallerybtn', function(){
    var galleryName = $(this).data("name");
    $("#oldGalleryName").val(galleryName);
});

/*This code handles the click event on the "editGalleryModalBtn" element, 
retrieves the new and current gallery names, sends a POST request to the server 
to rename the gallery, and handles the response accordingly by either reloading 
the page or logging an error message and reloading the page.*/

// Edit Gallery Modal Action
$("#editGalleryModalBtn").on("click", function(){
    var newName = $("#newGalleryName").val();
    var galleryName = $("#oldGalleryName").val();

    if(galleryName != "") {
      $("#loader").html('<img src="/static/images/loader.gif">');

      $.when($.post("/galleries/edit", {galleryName: galleryName, newName: newName}).done(function(response){
            $("#loader").html('');
            var response = JSON.parse(response);

            if (response.success) {
                location.reload();
            }
            else {
              console.log("Error renaming Gallery");
              location.reload();
            }
        }));
    }
});



/***************************** Photos Actions  ******************************/
/*This code handles the click event on the dynamically created "deletePhotobtn" elements,
 retrieves the associated gallery name and photo name from the clicked element, 
 sends a POST request to the server to delete the photo, and handles the 
 response accordingly by either reloading the page or logging an error message and 
 reloading the page.*/

// Delete Photo Action
$(document).on("click", '#deletePhotobtn', function(){
//$("#deletePhotobtn").on("click", function(){
    var galleryName = $(this).data("galleryname");
    var photoName = $(this).data("photoname");

    if(galleryName != "") {

       $.when($.post("/galleries/album/photos/delete", {galleryName: galleryName, photoName: photoName}).done(function (response) {
            var response = JSON.parse(response);

            if (response.success) {
                location.reload();
            }
            else {
              console.log("Error Deleting Photo");
              location.reload();
            }
      }));
    }
});

/*This code handles the click event on the dynamically created "popImage" elements,
 retrieves the image source URL from the clicked element, updates the source of 
 the preview element, and shows the modal to display the previewed image.*/

$(document).on("click", '#popImage', function(){
    var imgSrc = $(this).data("imgsrc");
    $('#imagepreview').attr('src', imgSrc);
    $('#imagemodal').modal('show');
});

// $('#popImage').on('click', function() {
// 			$('.imagepreview').attr('src', $(this).find('img').attr('src'));
// 			$('#imagemodal').modal('show');
// 		});