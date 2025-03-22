var CheckIn = "", CheckOut = "", RoomCount = "", AdultCount = "", ChildCount = "";
$(document).ready(function () {
    $('.t-datepicker').tDatePicker({
        dateCheckIn: $("#hfCheckInDate").val(),
        dateCheckOut: $("#hfCheckOutDate").val(),
    });
    CheckIn = GetQueryStringParams("CheckIn");
    CheckOut = GetQueryStringParams("CheckOut");
    RoomCount = GetQueryStringParams("RoomCount");
    AdultCount = GetQueryStringParams("AdultCount");
    ChildCount = GetQueryStringParams("ChildCount");
    RoomID = GetQueryStringParams("RoomID");
    if (CheckIn != null && CheckIn != undefined && RoomID != null && RoomID != undefined && CheckOut != null && CheckOut != undefined && RoomCount != null && RoomCount != undefined && AdultCount != null && AdultCount != undefined && ChildCount != null && ChildCount != undefined) {
        $('.t-datepicker').tDatePicker({
            dateCheckIn: CheckIn,
            dateCheckOut: CheckOut,
        });
        ShowCartdata();
    }
    else if (CheckIn != null && CheckIn != undefined && CheckOut != null && CheckOut != undefined && RoomCount != null && RoomCount != undefined && AdultCount != null && AdultCount != undefined && ChildCount != null && ChildCount != undefined) {
        //ShowCartdata();
        $('.t-datepicker').tDatePicker({
            dateCheckIn: CheckIn,
            dateCheckOut: CheckOut,
        });
        $("#hfRoomCount").val(RoomCount);
        $("#hfAdultCount").val(AdultCount);
        $("#hfChildCount").val(ChildCount);
        ShowCartdataOnFilter(RoomCount);
    }
})

function ShowCartdataOnFilter(RoomCount) {
    if (RoomCount == undefined) {
        RoomCount = $("#hfRoomCount").val();
    }
    var CheckIn = $(".t-input-check-in").val();
    var CheckOut = $(".t-input-check-out").val();
    var RoomCount = RoomCount;
    var AdultCount = $("#hfAdultCount").val();
    var ChildCount = $("#hfChildCount").val();
    try {
        if ($(".t-input-check-in").val() == "null") {
            alert("Please select Check In Date !")
        }
        else if ($(".t-input-check-out").val() == "null") {
            alert("Please select Check Out Date !")
        }
        else {

            $.post(CommonURL + "GrandNirvana/ShowCartdata",
                {
                    CheckIn: CheckIn,
                    CheckOut: CheckOut,
                    RoomCount: RoomCount,
                    AdultCount: AdultCount,
                    ChildCount: ChildCount,
                    RoomID: "0"
                }, function (data) {
                    if (data.Grid != "") {
                        $("#hfCartRoomGrid").html(data.Grid);
                    } else {
                        $("#hfCartRoomGrid").html("");
                    }
                    $('.t-datepicker').tDatePicker({
                        dateCheckIn: CheckIn,
                        dateCheckOut: CheckOut,
                    });
                    $("#hfRoomCount").val(RoomCount);
                    $("#hfAdultCount").val(AdultCount);
                    $("#hfChildCount").val(ChildCount)
                }).fail(function (xhr, err) {
                    var responseTitle = $(xhr.responseText).filter('title').get(0);
                    alert($(responseTitle).text());
                })
        }
    } catch (e) {
        alert(e);
    }
}

function ShowCartdata() {
    try {
        $.post(CommonURL + "GrandNirvana/ShowCartdata",
            {
                CheckIn: CheckIn,
                CheckOut: CheckOut,
                RoomCount: RoomCount,
                AdultCount: AdultCount,
                ChildCount: ChildCount,
                RoomID: RoomID
            }, function (data) {
                if (data.Grid != "") {
                    $("#hfCartRoomGrid").html(data.Grid);
                } else {
                    $("#hfCartRoomGrid").html("");
                }
                $('.t-datepicker').tDatePicker({
                    dateCheckIn: CheckIn,
                    dateCheckOut: CheckOut,
                });
            }).fail(function (xhr, err) {
                var responseTitle = $(xhr.responseText).filter('title').get(0);
                alert($(responseTitle).text());
            })
    } catch (e) {
        alert(e);
    }
}

function ShowAllRoomDetails() {
    try {
        $.post(CommonURL + "GrandNirvana/ShowAllRoomDetails",
            {}, function (data) {
                if (data.Grid != "") {
                    $("#hfCartRoomGrid").html(data.Grid);
                } else {
                    $("#hfCartRoomGrid").html("");
                }
            }).fail(function (xhr, err) {
                var responseTitle = $(xhr.responseText).filter('title').get(0);
                alert($(responseTitle).text());
            })
    } catch (e) {
        alert(e);
    }
}

function IncreaseClindCount() {
    $("#txtChildCount").text(parseInt($("#hfChildCount").val()) + 1 + " Child");
}

function DecreaseClindCount() {
    if ($("#hfChildCount").val() != "0") {
        $("#txtChildCount").text(parseInt($("#hfChildCount").val()) - 1 + " Child");
    }
}

function IncreaseAdultCount() {
    var RoomCount = parseInt($("#hfRoomCount").val());
    if ((parseInt(RoomCount * 3)-1) < parseInt($("#hfAdultCount").val())) {
        $("#txtIncrementAdult").attr("disabled", true);
    }
    else {
        $("#txtAdultCount").text(parseInt($("#hfAdultCount").val()) + 1 + " Adults");
    }
    //ShowCartdataOnFilter(parseInt($("#hfRoomCount").val())+1);
}

function DecreaseAdultCount() {
    var RoomCount = parseInt($("#hfRoomCount").val());
    if (parseInt(RoomCount * 3) == parseInt($("#hfAdultCount").val() - 1)) {
        $("#txtIncrementAdult").attr("disabled", true);
        if ($("#hfAdultCount").val() > "1") {
            $("#txtAdultCount").text(parseInt($("#hfAdultCount").val()) - 1 + " Adults");
        }
    }
    else {
        $("#txtIncrementAdult").removeAttr('disabled');
        if ($("#hfAdultCount").val() > "1") {
            $("#txtAdultCount").text(parseInt($("#hfAdultCount").val()) - 1 + " Adults");
        }
    }
    //ShowCartdataOnFilter(parseInt($("#hfRoomCount").val()) - 1);
}

function IncreaseRoomCount() {
    var RoomCount = parseInt($("#hfRoomCount").val());
    if (parseInt(RoomCount * 3) == parseInt($("#hfAdultCount").val() - 1)) {
        $("#txtIncrementAdult").attr("disabled", true);
    } else {
        $("#txtIncrementAdult").removeAttr('disabled');
    }
    ShowCartdataOnFilter(parseInt($("#hfRoomCount").val()) + 1);
}

function DecreaseRoomCount() {
    var RoomCount = parseInt($("#hfRoomCount").val());
    if (parseInt(RoomCount * 3) == parseInt($("#hfAdultCount").val() - 1)) {
        $("#txtIncrementAdult").attr("disabled", true);
    }
    else if ((parseInt((RoomCount - 1) * 3) < parseInt($("#hfAdultCount").val())) && RoomCount>1) {
        if ($("#hfAdultCount").val() > "1") {
            $("#hfAdultCount").val(parseInt((RoomCount - 1) * 3));
            $("#txtAdultCount").text(parseInt($("#hfAdultCount").val()) - 1 + " Adults");
        }
    }
    else {
        $("#txtIncrementAdult").removeAttr('disabled');
    }
    ShowCartdataOnFilter(parseInt($("#hfRoomCount").val()) - 1);
}

function InceaseRoomPrice() {
    var RoomRent = parseFloat($("#hfOneRoomPrice").val()) * (parseFloat($("#hfRoomcount").val()) + 1)
    $("#hfSubTotal").text(RoomRent * parseFloat($("#hfDaysCounr").val()))
    $("#hfTotalWithTax").text(parseFloat(RoomRent * parseFloat($("#hfDaysCounr").val())))
}

function DecreaseRoomPrice() {
    if ($("#hfRoomcount").val() > "1") {
        var RoomRent = parseFloat($("#hfOneRoomPrice").val()) * (parseFloat($("#hfRoomcount").val()) - 1)
        $("#hfSubTotal").text(RoomRent * parseFloat($("#hfDaysCounr").val()))
        $("#hfTotalWithTax").text(parseFloat(RoomRent * parseFloat($("#hfDaysCounr").val())))
    }
}

function BookNowRoom(RateInventoryId) {
    if ($(".t-input-check-in").val() == "null") {
        alert("Please select Check In Date !")
    }
    else if ($(".t-input-check-out").val() == "null") {
        alert("Please select Check Out Date !")
    }
    else {
        try {
            $.post(CommonURL + "GrandNirvana/BookNowRoomCharges",
                {
                    CheckIn: $(".t-input-check-in").val(),
                    CheckOut: $(".t-input-check-out").val(),
                    RoomCount: $("#hfRoomCount").val(),
                    AdultCount: $("#hfAdultCount").val(),
                    ChildCount: $("#hfChildCount").val(),
                    RateInventoryId: RateInventoryId
                }, function (data) {
                    if (data.DateFormate != "") {
                        $("#hfDateCount").text(data.DateFormate);
                    }
                    if (data.Price != "") {
                        $("#divCharges").show();
                        $("#btnCheckOutDiv").show();
                        $("#hfTax").text("₹" + data.Tax + ".00");
                        $("#hfFees").text("₹" + data.Fees + ".00");
                        $("#hfTotalValue").text("₹" + data.Price + ".00");
                        $("#hfSubTotal").val(data.Fees);
                        $("#hfTotal").val(data.Price);
                        $("#hfRateInventoryId").val(RateInventoryId);
                        $("#hfTaxAndFees").focus();
                        $("#hfOneRoomPrice").val(data.OneRoomPrice);
                        $("#hfSingleRoomPrice").val(data.SingleRoomPrice);
                        $("#hfRoomName").text(data.RoomName);
                    }
                }).fail(function (xhr, err) {
                    var responseTitle = $(xhr.responseText).filter('title').get(0);
                    alert($(responseTitle).text());
                })
        } catch (e) {
            alert(e)
        }
    }
}

function LoginFromCheckout() {
    CheckIn = $(".t-input-check-in").val();
    CheckOut = $(".t-input-check-out").val();
    RoomCount = $("#hfRoomCount").val();
    AdultCount = $("#hfAdultCount").val();
    ChildCount = $("#hfChildCount").val();
    SubTotal = $("#hfSubTotal").val();
    Total = $("#hfTotal").val();
    window.location.href = CommonURL + 'LogIn?Direct=Yes&RateInventoryID=' + $("#hfRateInventoryId").val() + '&CheckIn=' + CheckIn + '&CheckOut=' + CheckOut + '&RoomCount=' + RoomCount + '&AdultCount=' + AdultCount + '&ChildCount=' + ChildCount + '&SubTotal=' + SubTotal + '&Total=' + Total + '&Checked=False';
}

function CheckOutDetails() {
    CheckIn = GetQueryStringParams("CheckIn");
    CheckOut = GetQueryStringParams("CheckOut");
    RoomCount = $("#hfRoomcount").val();
    AdultCount = $("#hfAdultCount").val();
    ChildCount = $("#hfChildCount").val();
    RateInventoryID = $("#hfRateInventoryID").val();
    OneRoomPrice = $("#hfSubTotal1").val();
    SubTotal = $("#hfSubTotal").val();
    Total = $("#hfTotal").val();
    window.location.href = CommonURL + 'LogIn?Direct=Yes&RateInventoryID=' + RateInventoryID + '&CheckIn=' + CheckIn + '&CheckOut=' + CheckOut + '&RoomCount=' + RoomCount + '&AdultCount=' + AdultCount + '&ChildCount=' + ChildCount + '&SubTotal=' + SubTotal + '&Total=' + Total;

}
