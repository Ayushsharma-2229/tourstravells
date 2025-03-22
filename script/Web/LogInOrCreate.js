$(document).ready(function () {
    var Direct = GetQueryStringParams("Direct");
    var CheckIn = GetQueryStringParams("CheckIn");
    var CheckOut = GetQueryStringParams("CheckOut");
    var RoomCount = GetQueryStringParams("RoomCount");
    var AdultCount = GetQueryStringParams("AdultCount");
    var ChildCount = GetQueryStringParams("ChildCount");
    var SubTotal = GetQueryStringParams("SubTotal");
    var Total = GetQueryStringParams("Total");
    var Checked = GetQueryStringParams("Checked");
    ClearDataForSignUp();
    ClearDataForLogIn();
    if (Direct != undefined && Direct != null && Direct != "" && CheckIn != null && CheckIn != undefined && CheckOut != null && CheckOut != undefined
        && RoomCount != null && RoomCount != undefined && AdultCount != null && AdultCount != undefined && ChildCount != null && ChildCount != undefined
        && Checked=="False") {
        var RateInventoryID = GetQueryStringParams("RateInventoryID");
        CheckLogin(CheckIn, CheckOut, RoomCount, AdultCount, ChildCount,SubTotal, Total, RateInventoryID);
    }
    $("#btnLogIn").click(function () {
        if (Direct != "Yes") {
            LogIn();
        }
        else {
            LogInFromCheckOut();
        }
    })
    $("#btnSignUp").click(function () {
        if (Direct != "Yes") {
            SignUp();
        }
        else {
            SignUpFromCheckOut();
        }
    })
    $("#txtEmailForLogIn").keyup(function (event) {
        if (event.keyCode === 13) {
            if (Direct != "Yes") {
                LogIn();
            }
            else {
                LogInFromCheckOut();
            }
        }
    });
    $("#txtPasswordForLogIn").keyup(function (event) {
        if (event.keyCode === 13) {
            if (Direct != "Yes") {
                LogIn();
            }
            else {
                LogInFromCheckOut();
            }
        }
    });
    $("#txtNameForSignUp").keyup(function (event) {
        if (event.keyCode === 13) {
            if (Direct != "Yes") {
                SignUp();
            }
            else {
                SignUpFromCheckOut();
            }
        }
    });
    $("#txtEmailForSignUp").keyup(function (event) {
        if (event.keyCode === 13) {
            if (Direct != "Yes") {
                SignUp();
            }
            else {
                SignUpFromCheckOut();
            }
        }
    });
    $("#txtPasswodForSignUp").keyup(function (event) {
        if (event.keyCode === 13) {
            if (Direct != "Yes") {
                SignUp();
            }
            else {
                SignUpFromCheckOut();
            }
        }
    });
    $("#txtConfirmPasswordForSignUp").keyup(function (event) {
        if (event.keyCode === 13) {
            if (Direct != "Yes") {
                SignUp();
            }
            else {
                SignUpFromCheckOut();
            }
        }
    });
})

function CheckLogin(CheckIn, CheckOut, RoomCount, AdultCount, ChildCount,SubTotal, Total, RateInventoryID) {
    try {
        $.post(CommonURL + "GrandNirvana/CheckLogin",
            {
                CheckIn: CheckIn,
                CheckOut: CheckOut,
                RoomCount: RoomCount,
                AdultCount: AdultCount,
                ChildCount: ChildCount,
                RateInventoryID: RateInventoryID,
                SubTotal: SubTotal,
                Total: Total
            }, function (data) {
                if (data.Status=="True") {
                        window.location.href = CommonURL + 'CheckOut?RateInventoryID=' + RateInventoryID;
                    }
                    else {
                    window.location.href = CommonURL + 'LogIn?Direct=Yes&RateInventoryID=' + RateInventoryID + '&CheckIn=' + CheckIn + '&CheckOut=' + CheckOut + '&RoomCount=' + RoomCount + '&AdultCount=' + AdultCount + '&ChildCount=' + ChildCount + '&SubTotal=' + SubTotal + '&Total=' + Total+'&Checked=True';
                    }
            }).fail(function (xhr, err) {
                var responseTitle = $(xhr.responseText).filter('title').get(0);
                alert($(responseTitle).text());
            })
    } catch (e) {
        alert(e)
    }
}

function LogIn() {
    var Direct = GetQueryStringParams("Direct");
    var Room = GetQueryStringParams("Room");
    try {
        $.post(CommonURL + "GrandNirvana/GetLogIn",
            {
                EmailForLogIn: $("#txtEmailForLogIn").val(),
                PasswordForLogIn: $("#txtPasswordForLogIn").val(),
            }, function (data) {
                if (data.Status == "2") {
                    $("#errPasswordForLogIn").hide();
                    $("#errEmailForLogIn").text(data.Result).show();
                    $("#" + data.Focus).focus();
                }
                else if (data.Status == "3") {
                    $("#errEmailForLogIn").hide();
                    $("#errPasswordForLogIn").text(data.Result).show();
                    $("#" + data.Focus).focus();
                }
                else {
                    if (Direct != null && Direct != "" && Direct == "Yes") {
                        window.location.href = CommonURL + 'CheckOut?Room=' + Room;
                    }
                    else {
                        window.location.href = CommonURL + 'Dashboard';
                    }
                    $("#SuccsessMsg").text(data.Result).show();
                    ClearDataForLogIn();
                }
            }).fail(function (xhr, err) {
                var responseTitle = $(xhr.responseText).filter('title').get(0);
                alert($(responseTitle).text());
            })
    } catch (e) {
        alert(e)
    }
}

function ClearDataForLogIn() {
    $("#errEmailForLogIn").hide();
    $("#errPasswordForLogIn").hide();
    $("#txtEmailForLogIn").val("");
    $("#txtPasswordForLogIn").val("");
}

function SignUp() {
    try {
        $.post(CommonURL + "GrandNirvana/InsertSignUp",
            {
                NameForSignUp: $("#txtNameForSignUp").val(),
                EmailForSignUp: $("#txtEmailForSignUp").val(),
                PasswodForSignUp: $("#txtPasswodForSignUp").val(),
                ConfirmPasswordForSignUp: $("#txtConfirmPasswordForSignUp").val(),
            }, function (data) {
                if (data.Status == "2") {
                    $("#errEmailForSignUp").hide();
                    $("#errPasswordForSignUp").hide();
                    $("#errConfirmPasswordForSignUp").hide();
                    $("#errNameForSignUp").text(data.Result).show();
                    $("#" + data.Focus).focus();
                }
                else if (data.Status == "3") {
                    $("#errNameForSignUp").hide();
                    $("#errPasswordForSignUp").hide();
                    $("#errConfirmPasswordForSignUp").hide();
                    $("#errEmailForSignUp").text(data.Result).show();
                    $("#" + data.Focus).focus();
                }
                else if (data.Status == "4") {
                    $("#errNameForSignUp").hide();
                    $("#errConfirmPasswordForSignUp").hide();
                    $("#errEmailForSignUp").hide();
                    $("#errPasswordForSignUp").text(data.Result).show();
                    $("#" + data.Focus).focus();
                }
                else if (data.Status == "5") {
                    $("#errNameForSignUp").hide();
                    $("#errPasswordForSignUp").hide();
                    $("#errEmailForSignUp").hide();
                    $("#errConfirmPasswordForSignUp").text(data.Result).show();
                    $("#" + data.Focus).focus();
                }
                else {
                    $("#SuccsessMsgForSignUp").text(data.Result).show();
                    ClearDataForSignUp();
                    window.location.href = CommonURL + 'Dashboard';
                }
            }).fail(function (xhr, err) {
                var responseTitle = $(xhr.responseText).filter('title').get(0);
                alert($(responseTitle).text());
            })
    } catch (e) {
        alert(e)
    }
}

function ClearDataForSignUp() {
    $("#errNameForSignUp").hide();
    $("#errEmailForSignUp").hide();
    $("#errPasswordForSignUp").hide();
    $("#errConfirmPasswordForSignUp").hide();
    $("#txtNameForSignUp").val("");
    $("#txtEmailForSignUp").val("");
    $("#txtPasswodForSignUp").val("");
    $("#txtConfirmPasswordForSignUp").val("");
}

function LogInFromCheckOut() {
    var Direct = GetQueryStringParams("Direct");
    var RateInventoryID = GetQueryStringParams("RateInventoryID");
    CheckIn = GetQueryStringParams("CheckIn");
    CheckOut = GetQueryStringParams("CheckOut");
    RoomCount = GetQueryStringParams("RoomCount");
    AdultCount = GetQueryStringParams("AdultCount");
    ChildCount = GetQueryStringParams("ChildCount");
    SubTotal = GetQueryStringParams("SubTotal");
    Total = GetQueryStringParams("Total");
    try {
        $.post(CommonURL + "GrandNirvana/LogInFromCheckOut",
            {
                EmailForLogIn: $("#txtEmailForLogIn").val(),
                PasswordForLogIn: $("#txtPasswordForLogIn").val(),
                CheckIn: CheckIn,
                CheckOut: CheckOut,
                RoomCount: RoomCount,
                AdultCount: AdultCount,
                ChildCount: ChildCount,
                RateInventoryID: RateInventoryID,
                SubTotal: SubTotal,
                Total: Total
            }, function (data) {
                if (data.Status == "2") {
                    $("#errPasswordForLogIn").hide();
                    $("#errEmailForLogIn").text(data.Result).show();
                    $("#" + data.Focus).focus();
                }
                else if (data.Status == "3") {
                    $("#errEmailForLogIn").hide();
                    $("#errPasswordForLogIn").text(data.Result).show();
                    $("#" + data.Focus).focus();
                }
                else {
                    if (Direct != null && Direct != "" && Direct == "Yes") {
                        window.location.href = CommonURL + 'CheckOut?RateInventoryID=' + RateInventoryID;
                    }
                    else {
                        window.location.href = CommonURL + 'Dashboard';
                    }
                    $("#SuccsessMsg").text(data.Result).show();
                    ClearDataForLogIn();
                }
            }).fail(function (xhr, err) {
                var responseTitle = $(xhr.responseText).filter('title').get(0);
                alert($(responseTitle).text());
            })
    } catch (e) {
        alert(e)
    }
}

function SignUpFromCheckOut() {
    var Direct = GetQueryStringParams("Direct");
    var RateInventoryID = GetQueryStringParams("RateInventoryID");
    CheckIn = GetQueryStringParams("CheckIn");
    CheckOut = GetQueryStringParams("CheckOut");
    RoomCount = GetQueryStringParams("RoomCount");
    AdultCount = GetQueryStringParams("AdultCount");
    ChildCount = GetQueryStringParams("ChildCount");
    SubTotal = GetQueryStringParams("SubTotal");
    Total = GetQueryStringParams("Total");
    try {
        $.post(CommonURL + "GrandNirvana/SignUpFromCheckOut",
            {
                NameForSignUp: $("#txtNameForSignUp").val(),
                EmailForSignUp: $("#txtEmailForSignUp").val(),
                PasswodForSignUp: $("#txtPasswodForSignUp").val(),
                ConfirmPasswordForSignUp: $("#txtConfirmPasswordForSignUp").val(),
                CheckIn: CheckIn,
                CheckOut: CheckOut,
                RoomCount: RoomCount,
                AdultCount: AdultCount,
                ChildCount: ChildCount,
                RateInventoryID: RateInventoryID,
                SubTotal: SubTotal,
                Total: Total
            }, function (data) {
                if (data.Status == "2") {
                    $("#errEmailForSignUp").hide();
                    $("#errPasswordForSignUp").hide();
                    $("#errConfirmPasswordForSignUp").hide();
                    $("#errNameForSignUp").text(data.Result).show();
                    $("#" + data.Focus).focus();
                }
                else if (data.Status == "3") {
                    $("#errNameForSignUp").hide();
                    $("#errPasswordForSignUp").hide();
                    $("#errConfirmPasswordForSignUp").hide();
                    $("#errEmailForSignUp").text(data.Result).show();
                    $("#" + data.Focus).focus();
                }
                else if (data.Status == "4") {
                    $("#errNameForSignUp").hide();
                    $("#errConfirmPasswordForSignUp").hide();
                    $("#errEmailForSignUp").hide();
                    $("#errPasswordForSignUp").text(data.Result).show();
                    $("#" + data.Focus).focus();
                }
                else if (data.Status == "5") {
                    $("#errNameForSignUp").hide();
                    $("#errPasswordForSignUp").hide();
                    $("#errEmailForSignUp").hide();
                    $("#errConfirmPasswordForSignUp").text(data.Result).show();
                    $("#" + data.Focus).focus();
                }
                else {
                    if (Direct != null && Direct != "" && Direct == "Yes") {
                        window.location.href = CommonURL + 'CheckOut?RateInventoryID=' + RateInventoryID;
                    }
                    else {
                        window.location.href = CommonURL + 'Dashboard';
                    }
                    $("#SuccsessMsgForSignUp").text(data.Result).show();
                    ClearDataForSignUp();
                }
            }).fail(function (xhr, err) {
                var responseTitle = $(xhr.responseText).filter('title').get(0);
                alert($(responseTitle).text());
            })
    } catch (e) {
        alert(e)
    }
}