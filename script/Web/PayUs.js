$(document).ready(function () {
    $("#errName").hide();
    $("#errPhone").hide();
    $("#errEmail").hide();
    $("#errAmount").hide();
    $("#errAddress").hide();
    $("#SuccessMessage").hide();
    $("#btnSave").click(function () {
        InsertUpdatePayNow();
    })
    $(document).keydown(function (event) {
        if (event.keyCode == 13) {
            InsertUpdatePayNow();
        }
    })
})

function InsertUpdatePayNow() {
    $("#errName").hide();
    $("#errPhone").hide();
    $("#errEmail").hide();
    $("#errAmount").hide();
    $("#errAddress").hide();
    try {
        $.post(CommonURL + "GrandNirvana/InsertUpdatePayNow",
            {
                Name: $("#txtName").val(),
                Phone: $("#txtPhoneNo").val(),
                Address: $("#txtAddress").val(),
                Email: $("#txtEmail").val(),
                Amount: $("#txtAmount").val()
            }, function (data) {
                if (data.Status == "2") {
                    $("#errName").text(data.Result).show();
                    Focus(data.Focus);
                }
                else if (data.Status == "3") {
                    $("#errEmail").text(data.Result).show();
                    Focus(data.Focus);
                }
                else if (data.Status == "4") {
                    $("#errPhone").text(data.Result).show();
                    Focus(data.Focus);
                }
                else if (data.Status == "5") {
                    $("#errAmount").text(data.Result).show();
                    Focus(data.Focus);
                }
                else if (data.Status == "6") {
                    $("#errAddress").text(data.Result).show();
                    Focus(data.Focus);
                }
                else {
                    window.location.href = CommonURL + "GrandNirvana/CCARequestPayUs?amt=" + data.Amount + "";
                }
            }).fail(function (xhr, err) {
                var responseTitle = $(xhr.responseText).filter('title').get(0);
                alert($(responseTitle).text());
            })
    } catch (e) {
        alert(e)
    }
}

