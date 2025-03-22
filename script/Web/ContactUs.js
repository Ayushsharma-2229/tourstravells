$(document).ready(function () {
    $("#errName").hide();
    $("#errPhone").hide();
    $("#errEmail").hide();
    $("#SuccessMessage").hide();
    $("#btnSave").click(function () {
        InsertUpdateContactDetail();
    })
    $(document).keydown(function (event) {
        if (event.keyCode == 13) {
            InsertUpdateContactDetail();
        }
    })
})

function InsertUpdateContactDetail() {
    try {
        $.post(CommonURL + "GrandNirvana/InsertUpdateContactDetail",
            {
                Name: $("#txtName").val(),
                Phone: $("#txtPhone").val(),
                Subject: $("#txtSubject").val(),
                Email: $("#txtEmail").val(),
                Message: $("#txtMessage").val()
            }, function (data) {
                if (data.Status == "2") {
                    $("#errName").text(data.Result).show();
                    $("#errPhone").hide();
                    $("#errEmail").hide();
                    $("#SuccessMessage").hide();
                    Focus(data.Focus);
                }
                else if (data.Status == "3") {
                    $("#errName").hide();
                    $("#errEmail").hide();
                    $("#SuccessMessage").hide();
                    $("#errPhone").text(data.Result).show();
                    Focus(data.Focus);
                }
                else if (data.Status == "4") {
                    $("#errName").hide();
                    $("#errPhone").hide();
                    $("#SuccessMessage").hide();
                    $("#errEmail").text(data.Result).show();
                    Focus(data.Focus);
                }
                else {
                    $("#errName").hide;
                    $("#errPhone").hide();
                    $("#errEmail").hide();
                    $("#SuccessMessage").text(data.Result).show();
                    Focus(data.Focus);
                    ClearData();
                }
            }).fail(function (xhr, err) {
                var responseTitle = $(xhr.responseText).filter('title').get(0);
                alert($(responseTitle).text());
            })
    } catch (e) {
        $("#SuccessMessage").text(e.Message).show();
    }
}

function ClearData() {
    $("#txtName").val("");
    $("#txtPhone").val("");
    $("#txtSubject").val("");
    $("#txtEmail").val("");
    $("#txtMessage").val("");
}