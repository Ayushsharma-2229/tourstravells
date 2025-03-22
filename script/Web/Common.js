var getUrl = window.location;
var baseUrl = getUrl.protocol + "//" + getUrl.host + "/";

var CommonURL = baseUrl;

function GetQueryStringParams(Param) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == Param) {
            return sParameterName[1];
        }
    }
}

function BookNow() {
    var CheckIn = $(".t-input-check-in").val();
    var CheckOut = $(".t-input-check-out").val();
    var RoomCount = $("#txtRoomCount").val();
    var AdultCount = $("#txtAdultCount").val();
    var ChildCount = $("#txtChildCount").val();
    var RoomID = $("#hfRoomID").val();
    OneRoomPrice = $("#hfOneRoomPrice").val();
    if (CheckIn == "null") {
        alert("Please select Check In Date !")
    }
    else if (CheckOut == "null") {
        alert("Please select Check Out Date !")
    }
    else {
        window.location.href = CommonURL + 'Cart?Direct=Yes&CheckIn=' + CheckIn + '&CheckOut=' + CheckOut + '&RoomCount=' + RoomCount + '&RoomID=' + RoomID + '&AdultCount=' + AdultCount + '&ChildCount=' + ChildCount + '&OneRoomPrice=' + OneRoomPrice;
    }
}

function Focus(Data) {
    $("#" + Data).focus();
};
