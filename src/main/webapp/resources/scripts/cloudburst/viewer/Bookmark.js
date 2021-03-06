

var map;
var _project='';
Cloudburst.Bookmark = function(_map, _searchdiv) {
   // alert(projectName); 
    map = _map;    
    this.map = map;
    searchdiv = _searchdiv;
    _project=project;
    
	//removeChildElement("sidebar","layerSwitcherContent");
    $("#tabs-Tool").empty();
	
	//$("#layerSwitcherContent").hide();
        $.ajax({
        		
            url: STUDIO_URL + "bookmark/project/"+project + "?" + token,
            success: function (bookmarks) {           
                
            	jQuery.get('resources/templates/viewer/bookmark.html', function(template) {
            		
            		//$("#"+searchdiv).append(template);
            		//Add tad
            		addTab($.i18n('viewer-bookmarks'),template);
            		
            		$("#bookmark-help").tipTip({defaultPosition:"right"});
            		
            		$("#addbk").hide();
            		
            		$("#bookmarkstar").click(function(){
            			$("#addbk").toggle();            			
            		});
					
					$("#bk-save").click(function(){
						createBookmark();
            		});
					
            		jQuery("#bokkmarkBody").empty();

            		jQuery("#bookmarkTemplate").tmpl(null,

            		{
            			bookmarkList : bookmarks
            		}

            		).appendTo("#bokkmarkBody");
            		
            		translateBookmarks();
            	  });

            }

        });
  

};

function translateBookmarks(){
	$('.bk-s').html($.i18n('gen-save'));
	$('.zoomlink-s').html($.i18n('viewer-zoom'));
	$('.removebklink-s').html($.i18n('gen-remove'));
}

var zoomBookmark = function(bookmarkName) {


    if (bookmarkName) {
        $.ajax({
            url: STUDIO_URL + "bookmark/" + bookmarkName + "?" + token,
            success: function (data) {                
                  map.getView().fit([data.minx, data.miny, data.maxx, data.maxy]);
            }
        });
    }

};


var createBookmark = function() {

    var currentExtent = map.getView().calculateExtent(map.getSize())

    if ($("#name").val() == '') {        
        jAlert($.i18n("err-bookmark-name-mepty"), $.i18n("viewer-bookmark"));
		return;
    }
    
    
    $("#description").val($("#name").val());
    $("#minx").val(currentExtent[0]);
    $("#miny").val(currentExtent[1]);
    $("#maxx").val(currentExtent[2]);
    $("#maxy").val(currentExtent[3]);
	$("#bkProjectName").val(_project);
  

    $.ajax({
        type: "POST",
        url: STUDIO_URL + "bookmark/create" + "?" + token,
        data: $("#BookmarkForm").serialize(),
        success: function () {
              
            //$("#Bookmark").append($("<option></option>").attr("value", $("#name").val()).text($("#name").val()));                                    
            
			$("#name").val('');
			var bookmark = new Cloudburst.Bookmark(map,"sidebar");

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var err = eval("(" + XMLHttpRequest.responseText + ")");
            alert(err.Message)
        }
    });
};


var removeBookmark = function(bookmarkid,bookmarkName) {
   
    //var bookmarkName = $("#Bookmark").val();         
    if (bookmarkName) {

        jConfirm($.i18n("viewer-confirm-delete-bookmark", bookmarkName), $.i18n("gen-confirm-delete"), function (r) {

            if (r) {
                $.ajax({
                    url: STUDIO_URL + "bookmark/delete/" + bookmarkid + "?" + token,
                    success: function () {
                       // $("#"+bookmarkName).remove();
                    	
                    	var bookmark = new Cloudburst.Bookmark(map,"sidebar");
                        
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert($.i18n("err-error"), $.i18n("viewer-bookmark"));
                    }
                });
           }

        });

    }

    else {
        
        
    
    }
};

var removeAll = function() {

   // jConfirm('Are You Sure You Want To Delete all Bookmarks', 'Delete Confirmation', function (r) {

     //   if (r) {
            $.ajax({
                url: STUDIO_URL + "bookmark/delete/project/" + project+"/" + "?" + token,
                success: function () {
                    $("#Bookmark").empty(); 
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert($.i18n("err-error"), $.i18n("viewer-bookmark"));
                }
            });
    //   }

  //  });


};

Cloudburst.Bookmark.prototype.toggle = function() {
	if ($('#bookmarkdiv').dialog('isOpen')) {
		//$('#printdiv').dialog('close');
	} else {
		$('#bookmarkdiv').dialog('open');
	}
};