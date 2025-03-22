$(document).ready(function () {
    $('.t-datepicker').tDatePicker({
        dateCheckIn: $("#hfCheckInDate").val(),
        dateCheckOut: $("#hfCheckOutDate").val(),
    });
})