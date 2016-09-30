function ValidateForm(RequiredVal, RangeVal, RegularVal, CompareVal, ImageVal) {
    var ErrorMessage = "";
    if (RequiredVal != null && RequiredVal.length > 0) {
        for (var i = 0; i < RequiredVal.length; i++) {
            var FieldName = RequiredVal[i].id;
            var FieldValue = RequiredVal[i].value;
            var controlType = RequiredVal[i].controlType;

            if (controlType == "TextBox") {
                if (FieldValue == "" && ErrorMessage == "") {
                    ErrorMessage = "<p>- " + FieldName + " is Required</p>";
                }
                else if (FieldValue == "") {
                    ErrorMessage += "<p>- " + FieldName + " is Required</p>";
                }
            }

            else if (controlType == "Dropdown") {
                if (FieldValue == 0 && ErrorMessage == "") {
                    ErrorMessage = "<p>- Please select " + FieldName + "</p>";
                }
                else if (FieldValue == 0) {
                    ErrorMessage += "<p>- Please select " + FieldName + "</p>";
                }
            }
            else if (controlType == "CHKEditor") {
                var ckLength = CKEDITOR.instances[FieldValue].getData().replace(/<[^>]*>/gi, '').length;
                if (!ckLength && ErrorMessage == "") {
                    ErrorMessage = "<p>- " + FieldName + " is Required</p>";
                }
                else if (!ckLength) {
                    ErrorMessage += "<p>- " + FieldName + " is Required</p>";
                }
            }
        }
    }

    if (CompareVal != null && CompareVal.length > 0) {
        for (var i = 0; i < CompareVal.length; i++) {
            var FieldName1 = CompareVal[i].id1;
            var FieldValue1 = CompareVal[i].value1;
            var FieldName2 = CompareVal[i].id2;
            var FieldValue2 = CompareVal[i].value2;

            if (ErrorMessage == "" && FieldValue1 != "" && FieldValue2 != "") {
                if (FieldValue1 != FieldValue2) {
                    ErrorMessage = "<p>- " + FieldName1 + " and " + FieldName2 + " do not Match</p>";
                }
            }
            else if (FieldValue1 != "" && FieldValue2!= "") {
                if (FieldValue1 != FieldValue2) {
                    ErrorMessage += "<p>- " + FieldName1 + " and " + FieldName2 + " do not Match</p>";
                }
            }
        }
    }

    if (RangeVal != null && RangeVal.length > 0) {

        for (var i = 0; i < RangeVal.length; i++) {
            var FieldName = RangeVal[i].id;
            var FieldValue = parseInt(RangeVal[i].value);
            var MinValue = parseInt(RangeVal[i].minRange);
            var MaxValue = parseInt(RangeVal[i].maxRange);

            if (MaxValue == 0) {
                FieldValue = RangeVal[i].value;
                if (FieldValue != "" && (FieldValue.length < MinValue) && ErrorMessage == "") {
                    ErrorMessage = "<p>- " + FieldName + " is too short it must be at least " + MinValue + " characters</p>";
                }
                else if (FieldValue != "" && (FieldValue.length < MinValue) && ErrorMessage != "") {
                    ErrorMessage += "<p>- " + FieldName + " is too short it must be at least " + MinValue + " characters</p>";
                }
            }
            else if (MinValue == MaxValue) {
                FieldValue = RangeVal[i].value;
                if (FieldValue != "" && (FieldValue.length < MinValue || FieldValue.length > MaxValue) && ErrorMessage == "") {
                    ErrorMessage = "<p>- " + FieldName + " must be " + MinValue + " digits</p>";
                }
                else if (FieldValue != "" && (FieldValue.length < MinValue || FieldValue.length > MaxValue) && ErrorMessage != "") {
                    ErrorMessage += "<p>- " + FieldName + " must be " + MinValue + " digits</p>";
                }
            }
            else {
                if (FieldValue!= "" && (FieldValue < MinValue || FieldValue > MaxValue) && ErrorMessage == "") {
                    ErrorMessage = "<p>- " + FieldName + " must from " + MinValue + " to " + MaxValue + "</p>";
                }
                else if (FieldValue != "" && (FieldValue < MinValue || FieldValue > MaxValue) && ErrorMessage != "") {
                    ErrorMessage += "<p>- " + FieldName + " must from " + MinValue + " to " + MaxValue + "</p>";
                }
            }
        }
    }

    if (RegularVal != null && RegularVal.length > 0) {
        for (var i = 0; i < RegularVal.length; i++) {

            var FieldName = RegularVal[i].id;
            var FieldValue = RegularVal[i].value;
            var FieldType = RegularVal[i].expressionType;

            if (FieldType == "Url") {

                var myRegExp = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;
                if (!myRegExp.test(FieldValue) && ErrorMessage == "" && FieldValue != "") {
                    ErrorMessage = "<p>- " + FieldName + " is invalid</p>";
                } else if (!myRegExp.test(FieldValue) && FieldValue != "") {
                    ErrorMessage += "<p>- " + FieldName + " is invalid";
                }
            }
            if (FieldType == "Email") {
                var pattern = new RegExp(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/);

                if (!pattern.test(FieldValue) && ErrorMessage == "") {
                    ErrorMessage = "- " + FieldName + " is invalid</p>";
                }
                else if (!pattern.test(FieldValue) && ErrorMessage != "") {
                    ErrorMessage += "<p>- " + FieldName + " is invalid</p>";
                }
            }
            else if (FieldType == "Characters") {
                var pattern = new RegExp("^[a-zA-Z]+$");

                if (!pattern.test(FieldValue) && ErrorMessage == "") {
                    ErrorMessage = "<p>- " + FieldName + " accept only characters</p>";
                }
                else if (!pattern.test(FieldValue) && ErrorMessage != "") {
                    ErrorMessage += "<p>- " + FieldName + " accept only characters</p>";
                }
            }
            else if (FieldType == "Number") {

                if (FieldValue != "" && !FieldValue.match(/^\d+(?:\.\d{1,2})?$/) && ErrorMessage == "") {
                    ErrorMessage = "<p>- " + FieldName + "Accept only two digits after point or Number</p>";
                }
                else if (FieldValue!= "" && !FieldValue.match(/^\d+(?:\.\d{1,2})?$/) && ErrorMessage != "") {
                    ErrorMessage += "<p>- " + FieldName + "Accept only two digits after point or Number</p>";
                }
            }
        }
    }

    if (ImageVal != null && ImageVal.length > 0) {
        for (var i = 0; i < ImageVal.length; i++) {
            var FieldName = ImageVal[i].id;
            var FieldValue = ImageVal[i].value;
            ;
            if (FieldValue != "") {
                if (!(FieldValue == "gif" || FieldValue == "png" || FieldValue == "bmp" || FieldValue == "jpeg" || FieldValue == "jpg")) {
                    if (ErrorMessage != "") {
                        ErrorMessage += "<p>- " + FieldName + " accept only file types of GIF, PNG, JPG, JPEG and BMP</p>";
                    }
                    else {
                        ErrorMessage += "<p>- " + FieldName + " accept only file types of GIF, PNG, JPG, JPEG and BMP</p>";
                    }
                }
            }
        }
    }

    if (ErrorMessage != "") {

        ErrorMessage = "</br>" + ErrorMessage;
        $('#errorBody').html(ErrorMessage);
        $('#uidemo-modals-alerts-danger').css('display', 'block');
        $('#uidemo-modals-alerts-danger').addClass('in');
        return false;
    }
    else {
        return true;
    }
}