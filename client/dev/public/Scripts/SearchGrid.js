///////////////////////////////////////////////  Search For People  ///////////////////////////////////////////////  

function paginationsSearchForPeople(page) {

    var id = "";
    var mtype = "";
    var kl = Controller;
    $("#hdnPageNumSearch").val(page);
    var res = $("#hdnPageOrderTypeSearch").val().split("_");

    $.ajax({
        url: "/" + Controller + "/PaginationForSearch",
        type: "post",
        data: { page: page, pageSize: $('#ddlPageSizeSearch').val(), order: $('#hdnPageOrderSearch').val(), orderType: res[1] },
        success: function (data) {
            var totalPage = parseInt(data.totalPage);
            var page = parseInt(data.page);
            var totalRecord = parseInt(data.totalRecord);
            $("#divdataSearch").html(data.TableData);
            PageNumsSearchForPeople(totalPage, page, totalRecord);
            if ($("#hdnPageFilterSearch").val() != "" && $("#hdnPageKeySearch").val() != "")
                $("#" + $("#hdnPageFilterSearch").val()).css("color", "#428bca");
        }
    });
    return false;
}

function PageOrderSearchForPeople(order, peoplename, eventname, date,phone,email) {
    var OrderType = $("#hdnPageOrderTypeSearch").val();
    if (OrderType == null || OrderType == "") {
        $("#hdnPageOrderTypeSearch").val(order + "_ASC");
    }
    else {
        var res = OrderType.split("_");
        if (res[0] == order && res[1] == "ASC") {
            $("#hdnPageOrderTypeSearch").val(order + "_DESC")
        }
        else if (res[0] == order && res[1] == "DESC") {
            $("#hdnPageOrderTypeSearch").val(order + "_ASC")
        }
        else {
            $("#hdnPageOrderTypeSearch").val(order + "_ASC")
        }
    }
    $("#hdnPageOrderSearch").val(order);

    var id = "";
    var mtype = "";
    var kl = Controller;
    $("#hdnPageNumSearch").val(1);
    var res = $("#hdnPageOrderTypeSearch").val().split("_");

    $.ajax({
        url: "/PeopleWeb/PaginationForSearch",
        type: "post",
        data: { page: 1, pageSize: $('#ddlPageSizeSearch').val(), order: $('#hdnPageOrderSearch').val(), orderType: res[1], peopleid: peoplename, eventid: eventname, date: date, phone: phone, email: email },
        success: function (data) {
            var totalPage = parseInt(data.totalPage);
            var page = parseInt(data.page);
            var totalRecord = parseInt(data.totalRecord);
            $("#divdataSearch").html(data.TableData);
            PageNumsSearchForPeople(totalPage, page, totalRecord);
            if ($("#hdnPageFilterSearch").val() != "" && $("#hdnPageKeySearch").val() != "")
                $("#" + $("#hdnPageFilterSearch").val()).css("color", "#428bca");
        }
    });

    return false;
}

function DeleteRecordSearchForPeople(id) {
    if (confirm('Are you sure you want to delete?')) {
        $.ajax({
            url: "/" + Controller + "/Delete",
            data: { id: id },
            type: "post",
            success: function (data) {
                paginationsSearchForEvent($("#hdnPageNumSearch").val());
                var str = " ";
                clearTimeout(window.eto);
                if (data.ResultData != '') {
                    Messages(data.ResultData, 'Warning', 'warning');
                }
                else {
                    Messages('Deleted successfully.', 'Success', 'success');
                }
            }
        });
    }
}

function PageNumsSearchForPeople(totalPage, page, totalRecord) {
    var retval = "";
    var PageDetails = "";

    if (totalPage > 1) {
        var start = page;

        while (start % 10 != 1)
        { start--; }

        var end = start + 10;

        retval += '<div class="input-group" style="float:right;width: 100px;padding-left: 15px;"><input type="text" value="' + page + '" name="txtPageNumsSearch" class="form-control txtPaginationNumsSearch" /><span class="input-group-btn"><button class="btn" type="button" onclick="txtPaginationNumSearchForPeople(' + totalPage + ',this)">Go</button></span></div>';

        retval += "<div style='float:right;'>";
        if (page > 1)
            retval += "<ul class='pagination'> <li class='previous'><a href='' onclick='return paginationsSearchForPeople(" + (page - 1) + ")'>Prev</a> </li> </ul>";

        if (start != 1)
            retval += "<ul class='pagination'> <li><a href='' onclick='return paginationsSearchForPeople(" + (start - 1) + ")'>...</a> </li> </ul>";

        if (end <= totalPage) {
            var i;
            for (i = start; i < end; i++) {
                if (page == i)
                    retval += "<ul class='pagination'> <li class='active'><a href='javascript:'>" + i + "</a> </li> </ul>";
                else
                    retval += "<ul class='pagination'> <li><a href='' onclick='return paginationsSearchForPeople(" + i + ")'>" + i + "</a></li> </ul>";
            }
            retval += "<ul class='pagination'> <li><a href='' onclick='return paginationsSearchForPeople(" + i + ")'>...</a></li> </ul>";
        }
        else {
            for (var i = start; i <= totalPage; i++) {
                if (page == i)
                    retval += "<ul class='pagination'> <li class='active'><a href='javascript:'>" + i + "</a> </li> </ul>";
                else
                    retval += "<ul class='pagination'> <li><a href='' onclick='return paginationsSearchForPeople(" + i + ")'>" + i + "</a></li> </ul>";
            }
        }
        if (page < totalPage)
            retval += "<ul class='pagination'> <li class='next'><a href='' onclick='return paginationsSearchForPeople(" + (page + 1) + ")'>Next</a> </li> </ul>";
        retval += "</div>";

        PageDetails = "<b style='color:#337ab7;'>Page : " + page + " Of " + totalPage + " (" + totalRecord + " Items) </b>";
    }
    $(".PageNumSearch").html(retval);
    retval = "<b style='color:#337ab7;'>Total Records : " + totalRecord + "</b>&nbsp;";
    $("#PageTotalsSearch").html(retval);
}

function txtPaginationNumSearchForPeople(totalPage, obj) {
    var txtNums = $(obj).parent().siblings(':first').val();
    if (!txtNums.match(/^[0-9]*$/)) {
        alert("Enter Only Digits !");
        $(obj).parent().siblings(':first').val('');
        return;
    }
    if (!(txtNums > 0 && txtNums <= totalPage)) {
        alert("Invalid Page Number!");
        $(obj).parent().siblings(':first').val('');
        return;
    }
    if ($("#hdnPageNumSearch").val() != txtNums)
        paginationsSearchForPeople(txtNums);
}

///////////////////////////////////////////////  Search For Event  ///////////////////////////////////////////////  

function paginationsSearchForEvent(page) {

    var id = "";
    var mtype = "";
    var kl = Controller;
    $("#hdnPageNumSearch").val(page);
    var res = $("#hdnPageOrderTypeSearch").val().split("_");

    $.ajax({
        url: "/" + Controller + "/PaginationForSearch",
        type: "post",
        data: { page: page, pageSize: $('#ddlPageSizeSearch').val(), order: $('#hdnPageOrderSearch').val(), orderType: res[1] },
        success: function (data) {
            var totalPage = parseInt(data.totalPage);
            var page = parseInt(data.page);
            var totalRecord = parseInt(data.totalRecord);
            $("#divdataSearch").html(data.TableData);
            PageNumsSearchForEvent(totalPage, page, totalRecord);
            if ($("#hdnPageFilterSearch").val() != "" && $("#hdnPageKeySearch").val() != "")
                $("#" + $("#hdnPageFilterSearch").val()).css("color", "#428bca");
        }
    });
    return false;
}

function PageOrderSearchForEvent(order,eventname,stop,date) {
    var OrderType = $("#hdnPageOrderTypeSearch").val();
    if (OrderType == null || OrderType == "") {
        $("#hdnPageOrderTypeSearch").val(order + "_ASC");
    }
    else {
        var res = OrderType.split("_");
        if (res[0] == order && res[1] == "ASC") {
            $("#hdnPageOrderTypeSearch").val(order + "_DESC")
        }
        else if (res[0] == order && res[1] == "DESC") {
            $("#hdnPageOrderTypeSearch").val(order + "_ASC")
        }
        else {
            $("#hdnPageOrderTypeSearch").val(order + "_ASC")
        }
    }
    $("#hdnPageOrderSearch").val(order);
    
    var id = "";
    var mtype = "";
    var kl = Controller;
    $("#hdnPageNumSearch").val(1);
    var res = $("#hdnPageOrderTypeSearch").val().split("_");

    $.ajax({
        url: "/EventWeb/PaginationForSearch",
        type: "post",
        data: { page: 1, pageSize: $('#ddlPageSizeSearch').val(), order: $('#hdnPageOrderSearch').val(), orderType: res[1], eventid: eventname, stop: stop, date: date },
        success: function (data) {
            var totalPage = parseInt(data.totalPage);
            var page = parseInt(data.page);
            var totalRecord = parseInt(data.totalRecord);
            $("#divdataSearch").html(data.TableData);
            PageNumsSearchForEvent(totalPage, page, totalRecord);
            if ($("#hdnPageFilterSearch").val() != "" && $("#hdnPageKeySearch").val() != "")
                $("#" + $("#hdnPageFilterSearch").val()).css("color", "#428bca");
        }
    });

    return false;
}

function DeleteRecordSearchForEvent(id) {
    if (confirm('Are you sure you want to delete?')) {
        $.ajax({
            url: "/" + Controller + "/Delete",
            data: { id: id },
            type: "post",
            success: function (data) {
                paginationsSearchForEvent($("#hdnPageNumSearch").val());
                var str = " ";
                clearTimeout(window.eto);
                if (data.ResultData != '') {
                    Messages(data.ResultData, 'Warning', 'warning');
                }
                else {
                    Messages('Deleted successfully.', 'Success', 'success');
                }
            }
        });
    }
}

function PageNumsSearchForEvent(totalPage, page, totalRecord) {
    var retval = "";
    var PageDetails = "";

    if (totalPage > 1) {
        var start = page;

        while (start % 10 != 1)
        { start--; }

        var end = start + 10;

        retval += '<div class="input-group" style="float:right;width: 100px;padding-left: 15px;"><input type="text" value="' + page + '" name="txtPageNumsSearch" class="form-control txtPaginationNumsSearch" /><span class="input-group-btn"><button class="btn" type="button" onclick="txtPaginationNumSearchForEvent(' + totalPage + ',this)">Go</button></span></div>';

        retval += "<div style='float:right;'>";
        if (page > 1)
            retval += "<ul class='pagination'> <li class='previous'><a href='' onclick='return paginationsSearchForEvent(" + (page - 1) + ")'>Prev</a> </li> </ul>";

        if (start != 1)
            retval += "<ul class='pagination'> <li><a href='' onclick='return paginationsSearchForEvent(" + (start - 1) + ")'>...</a> </li> </ul>";

        if (end <= totalPage) {
            var i;
            for (i = start; i < end; i++) {
                if (page == i)
                    retval += "<ul class='pagination'> <li class='active'><a href='javascript:'>" + i + "</a> </li> </ul>";
                else
                    retval += "<ul class='pagination'> <li><a href='' onclick='return paginationsSearchForEvent(" + i + ")'>" + i + "</a></li> </ul>";
            }
            retval += "<ul class='pagination'> <li><a href='' onclick='return paginationsSearchForEvent(" + i + ")'>...</a></li> </ul>";
        }
        else {
            for (var i = start; i <= totalPage; i++) {
                if (page == i)
                    retval += "<ul class='pagination'> <li class='active'><a href='javascript:'>" + i + "</a> </li> </ul>";
                else
                    retval += "<ul class='pagination'> <li><a href='' onclick='return paginationsSearchForEvent(" + i + ")'>" + i + "</a></li> </ul>";
            }
        }
        if (page < totalPage)
            retval += "<ul class='pagination'> <li class='next'><a href='' onclick='return paginationsSearchForEvent(" + (page + 1) + ")'>Next</a> </li> </ul>";
        retval += "</div>";

        PageDetails = "<b style='color:#337ab7;'>Page : " + page + " Of " + totalPage + " (" + totalRecord + " Items) </b>";
    }
    $(".PageNumSearch").html(retval);
    retval = "<b style='color:#337ab7;'>Total Records : " + totalRecord + "</b>&nbsp;";
    $("#PageTotalsSearch").html(retval);
}

function txtPaginationNumSearchForEvent(totalPage, obj) {
    var txtNums = $(obj).parent().siblings(':first').val();
    if (!txtNums.match(/^[0-9]*$/)) {
        alert("Enter Only Digits !");
        $(obj).parent().siblings(':first').val('');
        return;
    }
    if (!(txtNums > 0 && txtNums <= totalPage)) {
        alert("Invalid Page Number!");
        $(obj).parent().siblings(':first').val('');
        return;
    }
    if ($("#hdnPageNumSearch").val() != txtNums)
        paginationsSearchForEvent(txtNums);
}