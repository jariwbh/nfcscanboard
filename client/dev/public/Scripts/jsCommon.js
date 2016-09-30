function StartLoading() {
    $("#divProgress").show();
}
var DummyArea = "";
function EndLoading() {
    $("#divProgress").hide();
}


function Loading() {
    //for progress loading
    //$(document).ajaxSend(function () {
    //    document.getElementById("divProgress").style.display = "block";
    //});
    //$(document).ajaxStart(function () {
    //    document.getElementById("divProgress").style.display = "block";
    //});
    //$(document).ajaxComplete(function () {
    //    document.getElementById("divProgress").style.display = "none";
    //});
    //$(document).ajaxError(function () {
    //    document.getElementById("divProgress").style.display = "none";
    //});
    //$(document).ajaxStop(function () {
    //    document.getElementById("divProgress").style.display = "none";
    //});
    //$(document).ajaxSuccess(function () {
    //    document.getElementById("divProgress").style.display = "none";
    //});

    //
    paginations(1);
    $("#delete").click(function () {
        DeleteData($("#hdnchkID").val());
        return false;
    });
    $("#reset").click(function () {
        ResetData();
        return false;
    });
    $('#txtPopupSearch').keypress(function (e) {
        if (e.keyCode == 13) {
            btnStringClick();
        }
    });

    $(document).keyup(function (event) {
        if (event.which == 27) {
            $('#errorBody').html('');
            $('#uidemo-modals-alerts-danger').css('display', 'none');
            $('#uidemo-modals-alerts-danger').removeClass('in');
        }
    });

}

$(function () {
    $("#btnDown").hover(function (e) {
        $("#btnsave").addClass("open");
    });
    $(".dropdownMenuForButton").on('mouseleave', function () {
        $("#btnsave").removeClass("open");
    });
});

function ResetData() {
    checkboxes = document.getElementsByName('select');
    for (var i = 0, n = checkboxes.length; i < n; i++) {
        checkboxes[i].checked = false;
    }

    $("#hdnPageNum").val('');
    $("#hdnPageOrder").val('');
    $("#hdnPageOrderType").val('');
    $("#hdnPageFilter").val('');
    $("#hdnPageKey").val('');
    $("#hdnPageOption").val('');
    $("#hdnDateFromKey").val('');
    $("#hdnDateToKey").val('');
    //$("#ddlPageSize").val('10');
    if (Controller == "Tabs") {
        $("#hdnDispOrderId").val('');
    }

    $("#ddlStringSearch").val('Contains');
    $("#txtPopupSearch").val('');
    $("#txtdtFrm").val('');
    $("#txtdtTo").val('');
    if (Controller == "Admin/SubCategory") {
        paginationsForRecursiveTable(1);
    }
    else {
        paginations(1);
    }
}

function PageOrder(order) {
    var OrderType = $("#hdnPageOrderType").val();
    if (OrderType == null || OrderType == "") {
        $("#hdnPageOrderType").val(order + "_ASC");
    }
    else {
        var res = OrderType.split("_");
        if (res[0] == order && res[1] == "ASC") {
            $("#hdnPageOrderType").val(order + "_DESC")
        }
        else if (res[0] == order && res[1] == "DESC") {
            $("#hdnPageOrderType").val(order + "_ASC")
        }
        else {
            $("#hdnPageOrderType").val(order + "_ASC")
        }
    }
    $("#hdnPageOrder").val(order);
    if (Controller == "Admin/SubCategory") {
        paginationsForRecursiveTable(1);
    }
    else {
        paginations(1);
    }
    return false;
}

function clearFilter() {
    $('#PopUpString').val('');
    $('#txtPopupSearch').val('');
    $('#PopUpDateTime').val('');
    $('#hdnPageFilter').val('');
    $("#ddlStringSearch").val('Contains');
    paginations($("#hdnPageNum").val());

    $('#PopUpString').fadeOut('slow');
    $('#PopUpDateTime').fadeOut('slow');
    $("#lblFilterBoxError").css({ 'display': 'none' });

    return false;
};

function SearchPopupOpen(strName, e, flag) {
    var pos = $(e).position();
    var x;
    var y;
    if ($('.PageNum').html() == '') {
        x = pos.top + 144;
        y = pos.left + 144;
    }
    else {
        x = pos.top + 140;
        y = pos.left + 140;
    }

    $("#lblFilterBoxError").css({ 'display': 'none' });
    $('#txtPopupSearch').val('');

    if (flag == undefined) {
        $("#ddlStringSearch").html('<option value="Equals">Equals</option><option selected="selected" value="Contains">Contains</option><option value="StartsWith">StartsWith</option><option value="EndsWith">EndsWith</option>');
        $("#txtPopupSearch").unbind("keydown");
        $("#txtPopupSearch").keydown(function (ev) {

            return true;
        });
    }
    else {
        $("#ddlStringSearch").html('<option selected="selected" value="Equal">Equal</option><option value="GreaterThan">Greatar Than</option><option value="LessThan">Less Than</option>');
        $("#txtPopupSearch").keydown(function (ev) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ($.inArray(ev.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                // Allow: Ctrl+A, Command+A
                (ev.keyCode == 65 && (ev.ctrlKey === true || ev.metaKey === true)) ||
                // Allow: home, end, left, right, down, up
                (ev.keyCode >= 35 && ev.keyCode <= 40)) {
                // let it happen, don't do anything
                return;
            }
            // Ensure that it is a number and stop the keypress
            if ((ev.shiftKey || (ev.keyCode < 48 || ev.keyCode > 57)) && (ev.keyCode < 96 || ev.keyCode > 105)) {
                ev.preventDefault();
            }
        });
    }

    if ($('#hdnPageFilter').val() == strName) {
        //$('#PopUpString').toggle('slow');
        $('#PopUpString').css({ 'top': x, 'left': y, 'position': 'absolute' }).fadeIn('slow');

    }
    else {
        $('#PopUpString').fadeOut(1);
        $('#PopUpString').css({ 'top': x, 'left': y, 'position': 'absolute' }).fadeIn('slow');
    }

    $('#PopUpDateTime').fadeOut('slow');
    $('#hdnPageFilter').val(strName);
    $("#txtPopupSearch").focus();
    return false;
};

function SearchPopupDateTimeOpen(fromDate, e) {
    var pos = $(e).position();
    //var x = pos.top + 25;
    //var y = pos.left - 102;
    var x = pos.top + 276;
    var y = pos.left - 87;
    $('#PopUpDateTime').css({ 'top': x, 'left': y, 'position': 'absolute' }).toggle('slow');
    $('#PopUpString').fadeOut('slow');
    $('#hdnPageFilter').val('');
};

function btnStringClick() {
    if ($("#txtPopupSearch").val() == "") {
        $("#lblFilterBoxError").css({ 'display': 'block' });
    }
    else {
        $('#PopUpString').fadeOut('slow');
        $('#PopUpDateTime').fadeOut('slow');
        if ($('#hdnPageFilter').val() == "") {
            $("#hdnDateFromKey").val($("#txtdtFrm").val());
            $("#hdnDateToKey").val($("#txtdtTo").val());
            $("#hdnPageOption").val('');
            $("#hdnPageKey").val('');
            $("#ddlStringSearch").val('Contains');
            $("#txtPopupSearch").val('');
        }
        else {
            $("#hdnPageOption").val($("#ddlStringSearch").val());
            $("#hdnPageKey").val($("#txtPopupSearch").val());
            $("#hdnDateFromKey").val('');
            $("#hdnDateToKey").val('');
            $("#txtdtFrm").val('');
            $("#txtdtTo").val('');
            $("#" + $("#hdnPageFilter").val()).css("color", "red");
        }
        $("#lblFilterBoxError").css({ 'display': 'none' });
        paginations(1);
    }
    return false;
};

$(document).click(function (e) {
    var clicked = $(e.target);
    if (clicked.is('#PopUpString') || clicked.parents().is('#PopUpString') || clicked.is('#PopUpDateTime') || clicked.parents().is('#PopUpDateTime') || clicked.is('.fa-filter') || clicked.parents().is('.fa-filter') || clicked.is('.day') || clicked.parents().is('.day')) {
        return;
    } else {
        $('#PopUpString').fadeOut('slow');
        $('#PopUpDateTime').fadeOut('slow');
    }
});

function DeleteData(select) {
    if ($('.select:checked').length == 0) {
        alert("Select atleast any one!");
        return false;
    }
    if (confirm('Are you sure you want to delete?')) {
        $.ajax({
            url: "/" + Controller + "/Delete",
            data: { select: select },
            type: "post",
            success: function (data) {
                paginations($("#hdnPageNum").val());
                var str = " ";
                clearTimeout(window.eto);
                if (data.ResultData != '') {
                    Messages(data.ResultData, 'Success', 'success');
                }
                else {
                    Messages('Deleted successfully.', 'Success', 'success');
                }
            }
        });
    }
    return false;
}

function IsActive(id) {
    $.ajax({
        url: "/" + Controller + "/isActive",
        data: { Iid: id },
        type: "post",
        success: function (data) {
            if (Controller == "Admin/SubCategory") {
                paginationsForRecursiveTable($("#hdnPageNum").val());
            }
            else {
                paginations($("#hdnPageNum").val());
            }
            clearTimeout(window.eto);
            if (data.Status == "True") {

                Messages('Activated Successfully.', 'Success', 'success');
            }
            else
                Messages('Deactivated Successfully.', 'Success', 'success');
        }
    });
}

function IsPagePermission(id, action) {
    //$.ajax({
    //    url: "/" + Controller + "/IsPagePermission",
    //    data: { id: id, action: action },
    //    type: "post",
    //    success: function (data) {
    //        if (Controller == "Admin/SubCategory") {
    //            paginationsForRecursiveTable($("#hdnPageNum").val());
    //        }
    //        else {
    paginations($("#hdnPageNum").val());
    //        }
    //        //paginations($("#hdnPageNum").val());
    //        clearTimeout(window.eto);
    //        // errorMessage("Changed successfully.", "success");
    //        $.growl.notice({ title: 'Success', message: "Changed successfully." });
    //    }
    //});
}

function paginations(page) {
    
    if (Controller != "EventWeb") {
        Add();
    }


    var id = "";

    var mtype = "";
    var kl = Controller;
    $("#hdnPageNum").val(page);
    var res = $("#hdnPageOrderType").val().split("_");

    if (Controller == "Home") {
        $.ajax({
            url: "/" + Controller + "/Pagination",
            type: "post",
            data: { page: page, pageSize: $('#ddlPageSize').val(), filter: $('#hdnPageFilter').val(), order: $('#hdnPageOrder').val(), orderType: res[1], Key: $("#hdnPageKey").val(), filterOption: $("#hdnPageOption").val(), dtFrm: $("#hdnDateFromKey").val(), dtTo: $("#hdnDateToKey").val(), id: id, mtype: mtype, strDate : "" },
            success: function (data) {
                var totalPage = parseInt(data.totalPage);
                var page = parseInt(data.page);
                var totalRecord = parseInt(data.totalRecord);
                $("#divdata").html(data.TableData);
                PageNums(totalPage, page, totalRecord);
                if ($("#hdnPageFilter").val() != "" && $("#hdnPageKey").val() != "")
                    $("#" + $("#hdnPageFilter").val()).css("color", "#428bca");
            }
        });
    }
    else {
        $.ajax({
            url: "/" + Controller + "/Pagination",
            type: "post",
            data: { page: page, pageSize: $('#ddlPageSize').val(), filter: $('#hdnPageFilter').val(), order: $('#hdnPageOrder').val(), orderType: res[1], Key: $("#hdnPageKey").val(), filterOption: $("#hdnPageOption").val(), dtFrm: $("#hdnDateFromKey").val(), dtTo: $("#hdnDateToKey").val(), id: id, mtype: mtype },
            success: function (data) {
                var totalPage = parseInt(data.totalPage);
                var page = parseInt(data.page);
                var totalRecord = parseInt(data.totalRecord);
                $("#divdata").html(data.TableData);
                PageNums(totalPage, page, totalRecord);
                if ($("#hdnPageFilter").val() != "" && $("#hdnPageKey").val() != "")
                    $("#" + $("#hdnPageFilter").val()).css("color", "#428bca");
            }
        });
    }


    return false;
}

function PageNums(totalPage, page, totalRecord) {
    var retval = "";
    var PageDetails = "";

    if (totalPage > 1) {
        var start = page;

        while (start % 10 != 1)
        { start--; }

        var end = start + 10;

        retval += '<div class="input-group" style="float:right;width: 100px;padding-left: 15px;"><input type="text" value="' + page + '" name="txtPageNums" class="form-control txtPaginationNums" /><span class="input-group-btn"><button class="btn" type="button" onclick="txtPaginationNum(' + totalPage + ',this)">Go</button></span></div>';

        retval += "<div style='float:right;'>";
        if (page > 1)
            retval += "<ul class='pagination'> <li class='previous'><a href='' onclick='return paginations(" + (page - 1) + ")'>Prev</a> </li> </ul>";

        if (start != 1)
            retval += "<ul class='pagination'> <li><a href='' onclick='return paginations(" + (start - 1) + ")'>...</a> </li> </ul>";

        if (end <= totalPage) {
            var i;
            for (i = start; i < end; i++) {
                if (page == i)
                    retval += "<ul class='pagination'> <li class='active'><a href='javascript:'>" + i + "</a> </li> </ul>";
                else
                    retval += "<ul class='pagination'> <li><a href='' onclick='return paginations(" + i + ")'>" + i + "</a></li> </ul>";
            }
            retval += "<ul class='pagination'> <li><a href='' onclick='return paginations(" + i + ")'>...</a></li> </ul>";
        }
        else {
            for (var i = start; i <= totalPage; i++) {
                if (page == i)
                    retval += "<ul class='pagination'> <li class='active'><a href='javascript:'>" + i + "</a> </li> </ul>";
                else
                    retval += "<ul class='pagination'> <li><a href='' onclick='return paginations(" + i + ")'>" + i + "</a></li> </ul>";
            }
        }
        if (page < totalPage)
            retval += "<ul class='pagination'> <li class='next'><a href='' onclick='return paginations(" + (page + 1) + ")'>Next</a> </li> </ul>";
        retval += "</div>";

        PageDetails = "<b style='color:#337ab7;'>Page : " + page + " Of " + totalPage + " (" + totalRecord + " Items) </b>";
    }
    $(".PageNum").html(retval);
    retval = "<b style='color:#337ab7;'>Total Records : " + totalRecord + "</b>&nbsp;";
    $("#PageTotals").html(retval);
}

function txtPaginationNum(totalPage, obj) {
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
    if ($("#hdnPageNum").val() != txtNums)
        paginations(txtNums);
}

function toggle(source) {
    $(".select").prop('checked', source.checked);
    if (source.checked == true)
        $("#hdnchkID").val($('input[name="select"]:checked').map(function () { return $(this).val().toString(); }).get().join("/"));
    else
        $("#hdnchkID").val('');
}

function GetSelectedIDs(obj) {
    if (obj.checked) {
        if ($('.select:checked').length == $('.select').length) {
            $("#selectall").prop('checked', true);
        }
    }
    else {
        $("#selectall").attr('checked', false);
    }
    $("#hdnchkID").val($('input[name="select"]:checked').map(function () { return $(this).val().toString(); }).get().join("/"));
    return false;
}

function errorMessage(msg, types) {
    $.bootstrapGrowl(msg, {
        type: types,
        align: 'center',
        //width: '200px',
        allow_dismiss: true
    });

}

function setUpCK(ControlId, Tools) {
    //AdminPanel Or ClientSide
    var instance = CKEDITOR.instances[ControlId];
    if (instance) {
        CKEDITOR.remove(ControlId);
    }
    CKEDITOR.config.toolbar = Tools;
    CKEDITOR.replace(ControlId, {
        filebrowserBrowseUrl: '/Admin/CKFileUploader/BrowseImage'
    });
}

function readURL(input, id, hdnid) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#' + id)
                //.css('background-image', 'url(' + e.target.result + ')')
                .attr('src', e.target.result)
                .height(150);
        };
        reader.readAsDataURL(input.files[0]);
        $('#' + hdnid).val(input.files[0].name);
    }
}

function paginationsForRecursiveTable(page) {

    var id = "";
    var mtype = "";
    $("#hdnPageNum").val(page);
    var res = $("#hdnPageOrderType").val().split("_");
    $.ajax({
        url: "/" + Controller + "/Pagination",
        type: "post",
        data: { page: page, pageSize: $('#ddlPageSize').val(), filter: $('#hdnPageFilter').val(), order: $('#hdnPageOrder').val(), orderType: res[1], Key: $("#hdnPageKey").val(), filterOption: $("#hdnPageOption").val(), dtFrm: $("#hdnDateFromKey").val(), dtTo: $("#hdnDateToKey").val(), id: id, mtype: mtype },
        success: function (data) {
            var totalPage = parseInt(data.totalPage);
            var page = parseInt(data.page);
            var totalRecord = parseInt(data.totalRecord);
            $("#tdTable").html($.parseHTML(data.TableData));
            PageNumsForRecursiveTable(totalPage, page, totalRecord);
            if ($("#hdnPageFilter").val() != "" && $("#hdnPageKey").val() != "")
                $("#" + $("#hdnPageFilter").val()).css("color", "#428bca");
            $('#tdTable').aCollapTable({
                startCollapsed: false,
                addColumn: false,
                plusButton: '<span class="i"><i class="fa fa-plus-square"></i></span> ',
                minusButton: '<span class="i"><i class="fa fa-minus-square"></i></span> '
            });
        }
    });
    return false;
}

function PageNumsForRecursiveTable(totalPage, page, totalRecord) {

    var retval = "";
    var PageDetails = "";

    if (totalPage > 1) {
        var start = page;

        while (start % 10 != 1)
        { start--; }

        var end = start + 10;
        retval += "<div style='float:left;'>";
        if (page > 1)
            retval += "<ul class='pagination'> <li class='previous'><a href='' onclick='return paginationsForRecursiveTable(" + (page - 1) + ")'>Prev</a> </li> </ul>";

        if (start != 1)
            retval += "<ul class='pagination'> <li><a href='' onclick='return paginationsForRecursiveTable(" + (start - 1) + ")'>...</a> </li> </ul>";

        if (end <= totalPage) {
            var i;
            for (i = start; i < end; i++) {
                if (page == i)
                    retval += "<ul class='pagination'> <li class='active'><a href='javascript:'>" + i + "</a> </li> </ul>";
                else
                    retval += "<ul class='pagination'> <li><a href='' onclick='return paginationsForRecursiveTable(" + i + ")'>" + i + "</a></li> </ul>";
            }
            retval += "<ul class='pagination'> <li><a href='' onclick='return paginationsForRecursiveTable(" + i + ")'>...</a></li> </ul>";
        }
        else {
            for (var i = start; i <= totalPage; i++) {
                if (page == i)
                    retval += "<ul class='pagination'> <li class='active'><a href='javascript:'>" + i + "</a> </li> </ul>";
                else
                    retval += "<ul class='pagination'> <li><a href='' onclick='return paginationsForRecursiveTable(" + i + ")'>" + i + "</a></li> </ul>";
            }
        }
        if (page < totalPage)
            retval += "<ul class='pagination'> <li class='next'><a href='' onclick='return paginationsForRecursiveTable(" + (page + 1) + ")'>Next</a> </li> </ul>";
        retval += "</div>";
        retval += '<div class="input-group" style="float:right;width: 100px;"><input type="text" value="' + page + '" name="txtPageNums" class="form-control txtPaginationNums" /><span class="input-group-btn"><button class="btn" type="button" onclick="txtPaginationNumForRecursiveTable(' + totalPage + ',this)">Go</button></span></div>';
        PageDetails = "<b style='color:#337ab7;'>Page : " + page + " Of " + totalPage + " (" + totalRecord + " Items) </b>";
    }
    $(".PageNum").html(retval);
    retval = "<b style='color:#337ab7;'>Total Records : " + totalRecord + "</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    $("#PageTotals").html(retval);
}

function txtPaginationNumForRecursiveTable(totalPage, obj) {
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
    if ($("#hdnPageNum").val() != txtNums)
        paginationsForRecursiveTable(txtNums);
}

function IsDelete(id) {
    if (confirm('Are you sure you want to delete?')) {
        $.ajax({
            url: "/" + Controller + "/isDelete",
            data: { strSubCategoryId: id },
            type: "post",
            success: function (data) {
                paginationsForRecursiveTable($("#hdnPageNum").val());
                clearTimeout(window.eto);
                if (data.ResultData == "Reference Exist.") {
                    //$.growl.Warning({ title: "", message: Controller.split('/')[1] + " Reference Exists." });
                    Messages(Controller.split('/')[1] + ' Reference Exists.', 'Warning', 'Warning');
                    //$.growl.notice({ title: 'Success', message: Controller.split('/')[1] + " Reference Exists." });
                }
                else if (data.ResultData == "Operation Failed.") {
                    Messages(Controller.split('/')[1] + ' Operation Failed.', 'Warning', 'warning');
                    //$.growl.warning({ title: "", message: Controller.split('/')[1] + " Operation Failed." });
                }
                else {
                    Messages(Controller.split('/')[1] + ' Deleted Successfully.', 'Error', 'error');
                    //$.growl.error({ title: "", message: Controller.split('/')[1] + " Deleted Successfully." });
                }
            }
        });
    }
    return false;
}

function noimg(fileid, imgid, hdnid) {
    $('#' + imgid).attr('src', '/Areas/Admin/images/NoImages.png').height(150);
    $('#' + fileid).val('');
    $('#' + hdnid).val('');
}

function Add(id) {
    $.ajax({
        url: "/" + Controller + "/AddEditFunction",
        type: "post",
        data: { id: id },
        success: function (data) {
            $("#AddEditDiv").html(data.TableData);
        }
    });
    return false;
}


function Messages(message, head, icon) {
    $.toast({
        heading: head,
        text: message,
        showHideTransition: 'slide',
        icon: icon,
        position: 'top-right',

    })
}

function DeleteRecord(id) {
    if (confirm('Are you sure you want to delete?')) {
        $.ajax({
            url: "/" + Controller + "/Delete",
            data: { id: id },
            type: "post",
            success: function (data) {
                paginations($("#hdnPageNum").val());
                var str = " ";
                clearTimeout(window.eto);
                if (data.ResultData != '') {
                    Messages(data.ResultData, 'Warning', 'warning');
                }
                else if(data.ResultData == 'Refrence exist.') {
                    Messages('Refrence exist', 'Warning', 'warning');
                }
                else {
                    Messages('Deleted successfully.', 'Success', 'success');
                }
            }
        });
    }
}


//function Warning(message) {
//    $.toast({
//        heading: 'Warning',
//        text: message,
//        showHideTransition: 'slide',
//        icon: 'warning',
//        position: 'top-right',
//    })
//}

//function ErrorMessage(message) {
//    $.toast({
//        heading: 'Error',
//        text: message,
//        showHideTransition: 'slide',
//        icon: 'error',
//        position: 'top-right',
//    })
//}