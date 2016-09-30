"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var event_service_1 = require('../services/event.service');
var ContactInfo = (function () {
    function ContactInfo(description, ondescription, offdescription) {
        this.description = description;
        this.ondescription = ondescription;
        this.offdescription = offdescription;
    }
    return ContactInfo;
}());
var ContactInfoTemp = (function () {
    function ContactInfoTemp(description, ondescription, offdescription) {
        this.description = description;
        this.ondescription = ondescription;
        this.offdescription = offdescription;
    }
    return ContactInfoTemp;
}());
var Eventform = (function () {
    function Eventform(_postService, _router) {
        this._postService = _postService;
        this._router = _router;
        this.event = { eventId: '', eventName: '', eventDescription: '' };
        this.eventSchedule = {
            EventMsg: '',
            EventID: '',
            IsRecurring: '1',
            IsOneOff: '0',
            RecurringID: 1,
            NumericDay: '0',
            AlphaDAy: '0',
            Week: '0',
            Month: '0',
            ScheduleCount: '',
            EventDate: '',
            IsEdit: false
        };
        this.eventScheduleArray = [];
        this.checkAddEdit = { value: 0 };
        this.stopnamevalue = "";
        this.row_Index = -1;
        this.edited = false;
        this.checking_uniquness = false;
        this.isFavorite = true;
        this.step1active = true;
        this.step2active = false;
        this.step3active = false;
        this.step1 = 1;
        this.step2 = 0;
        this.step3 = 0;
        this.back1 = false;
        this.back2 = false;
        this.continue1 = true;
        this.continue2 = false;
        this.submit_btn = false;
        this.width = 33.33;
        this.recurring_shown = true;
        this.one_off_shown = false;
        this.numberic_day = true;
        this.alpha_day = false;
        this.butMonthDisabled = false;
        this.butNumericDayDisabled = false;
        this.butAlphaDisabled = false;
        this.butWeekDisabled = true;
        this.demoNumber = 31;
        this.counter = Array;
        this.RecurringList = [];
        this.selectedvalue = 1;
        this.EventScheudleButtonText = 'Add';
        this.information = [];
        this.informationtemp = [];
        this.myInfo = this.information[0];
        this.onVal = this.information[1];
        this.offVal = this.information[2];
        this.EventSchedule = [];
        this.GetRecurringList();
    }
    Eventform.prototype.GetRecurringList = function () {
        var _this = this;
        this._postService.getRecurringList()
            .subscribe(function (_recurringList) {
            _this.RecurringList = _recurringList;
            console.log(_this.RecurringList);
            _this.SetControlsOnRecurring(1);
        });
    };
    Eventform.prototype.cont1 = function () {
        this.step1 = 0;
        this.step2 = 1;
        this.step3 = 0;
    };
    Eventform.prototype.cont2 = function () {
        this.step1 = 0;
        this.step2 = 0;
        this.step3 = 1;
    };
    Eventform.prototype.numberReturn = function (length) {
        return new Array(length);
    };
    Eventform.prototype.SetControlsOnRecurring = function (value) {
        if (value == "1") {
            this.butMonthDisabled = false;
            this.butNumericDayDisabled = false;
            this.butAlphaDisabled = true;
            this.numberic_day = true;
            this.alpha_day = false;
        }
        else if (value == "2") {
            this.butMonthDisabled = true;
            this.butNumericDayDisabled = false;
            this.butAlphaDisabled = true;
            this.numberic_day = true;
            this.alpha_day = false;
        }
        else if (value == "3") {
            this.butMonthDisabled = true;
            this.butNumericDayDisabled = true;
            this.butAlphaDisabled = false;
            this.numberic_day = false;
            this.alpha_day = true;
        }
        else if (value == "4") {
            this.butMonthDisabled = true;
            this.butNumericDayDisabled = true;
            this.butAlphaDisabled = true;
            this.numberic_day = false;
            this.alpha_day = true;
        }
        else {
            this.butMonthDisabled = true;
            this.butNumericDayDisabled = true;
            this.butAlphaDisabled = true;
        }
    };
    Eventform.prototype.onEventchange = function (value) {
        this.ResetEventScheduleItem(false);
        this.SetControlsOnRecurring(value);
    };
    Eventform.prototype.ResetEventScheduleItem = function (IsScheduleCount) {
        this.eventSchedule.EventID = '';
        this.eventSchedule.IsRecurring = '1';
        this.eventSchedule.IsOneOff = '0';
        this.eventSchedule.RecurringID = 1;
        this.eventSchedule.NumericDay = '0';
        this.eventSchedule.AlphaDAy = '0';
        this.eventSchedule.Week = '0';
        this.eventSchedule.Month = '0';
        this.eventSchedule.EventDate = '';
        this.eventSchedule.EventMsg = '';
        this.eventSchedule.IsEdit = false;
        if (IsScheduleCount)
            this.eventSchedule.ScheduleCount = '';
    };
    Eventform.prototype.step3_checked = function (value) {
        this.ResetEventScheduleItem(true);
        this.SetControlsOnRecurring(1);
        if (value == "recurring") {
            console.log('if');
            this.recurring_shown = true;
            this.one_off_shown = false;
            this.eventSchedule.IsRecurring = '1';
            this.eventSchedule.IsOneOff = '0';
        }
        else {
            console.log('else');
            this.one_off_shown = true;
            this.recurring_shown = false;
            this.eventSchedule.IsRecurring = '0';
            this.eventSchedule.IsOneOff = '1';
        }
    };
    Eventform.prototype.addInfo = function (newInfo, onVal, offVal, checkAddEdit_new) {
        if (this.checkAddEdit.value == 0) {
            if (newInfo) {
                if (onVal) {
                    onVal = 1;
                }
                else {
                    onVal = "";
                }
                if (offVal) {
                    offVal = 1;
                }
                else {
                    offVal = "";
                }
                this.information.push(new ContactInfo(newInfo, onVal, offVal));
            }
        }
        else {
            this.information.splice(this.row_Index - 1, 1, (new ContactInfoTemp(newInfo, onVal, offVal)));
            this.checkAddEdit.value = 0;
        }
    };
    Eventform.prototype.removeInfo = function (info, i) {
        this.information.splice(i - 1, 1);
    };
    Eventform.prototype.editInfo = function (info, i) {
        //this.information.splice(i-1, 1);
        var title = info.description;
        var on = info.ondescription;
        var off = info.offdescription;
        this.stopnamevalue = title;
        this.checkAddEdit.value = 1;
        this.row_Index = i;
        //this.information.push(new ContactInfo(title,on,off));
    };
    Eventform.prototype.keypress_event = function () {
        this.edited = false;
        this.event_error = "";
    };
    Eventform.prototype.onBack1 = function (value) {
        this.checking_uniquness = false;
        this.step1active = true;
        this.step2active = false;
        this.step3active = false;
        this.width = 33.33;
        this.back1 = false;
        this.back2 = false;
        this.continue1 = true;
        this.continue2 = false;
        this.submit_btn = false;
    };
    Eventform.prototype.onContinue2 = function (value) {
        this.checking_uniquness = false;
        this.step1active = false;
        this.step2active = false;
        this.step3active = true;
        this.width = 100;
        this.back1 = false;
        this.back2 = true;
        this.continue1 = false;
        this.continue2 = false;
        this.submit_btn = true;
    };
    Eventform.prototype.onContinue = function (value) {
        var _this = this;
        this.checking_uniquness = true;
        this.edited = false;
        var name = value.name;
        var description = value.description;
        this.event_name = name;
        this.event.eventName = name;
        this.event.eventDescription = description;
        this._postService.checkUniqueness(name)
            .subscribe(function (posts) {
            _this.edited = true;
            _this.event_error = "Event Tittle Already exists.";
            _this.checking_uniquness = false;
        }, function (response) {
            if (response.status == 404) {
                _this.step1active = false;
                _this.step2active = true;
                _this.step3active = false;
                _this.width = 66.66;
                _this.back1 = true;
                _this.back2 = false;
                _this.continue1 = false;
                _this.continue2 = true;
                _this.submit_btn = false;
            }
        });
        //  this._postService.createPost({ Name: name, Description: description })
        // 	.subscribe(
        //           posts => {
        //                  this.checking_uniquness=false;
        //                  this.step1active=false;
        //                  this.step2active=true;
        //                  this.step3active=false;
        //                  this.width=66.66;
        //                  this.back1=true;
        //                  this.back2=false;
        //                  this.continue1=false;
        //                  this.continue2=true;
        //                  this.submit_btn=false;
        //           },
        //           response => {
        //              if(response.status == 406){
        //                 this.edited = true;
        //                 this.event_error= "Event Tittle Already exists.";
        //                 this.checking_uniquness=false;
        //               } 
        //           }
        // );
    };
    Eventform.prototype.onSubmit = function (value) {
        var name = value.name;
        var description = value.description;
    };
    Eventform.prototype.addEventSchedule = function () {
        this.SetEventScheduleMessages();
        console.log(this.eventSchedule);
        if (this.eventSchedule.IsEdit == false) {
            this.eventScheduleArray.push({
                EventMsg: this.eventSchedule.EventMsg,
                EventID: this.eventSchedule.EventID,
                IsRecurring: this.eventSchedule.IsRecurring,
                IsOneOff: this.eventSchedule.IsOneOff,
                RecurringID: this.eventSchedule.RecurringID,
                NumericDay: this.eventSchedule.NumericDay,
                AlphaDAy: this.eventSchedule.AlphaDAy,
                Week: this.eventSchedule.Week,
                Month: this.eventSchedule.Month,
                ScheduleCount: this.eventSchedule.ScheduleCount,
                EventDate: this.eventSchedule.EventDate
            });
        }
        else {
            this.eventScheduleArray.splice(this.row_Index, 1, {
                EventMsg: this.eventSchedule.EventMsg,
                EventID: this.eventSchedule.EventID,
                IsRecurring: this.eventSchedule.IsRecurring,
                IsOneOff: this.eventSchedule.IsOneOff,
                RecurringID: this.eventSchedule.RecurringID,
                NumericDay: this.eventSchedule.NumericDay,
                AlphaDAy: this.eventSchedule.AlphaDAy,
                Week: this.eventSchedule.Week,
                Month: this.eventSchedule.Month,
                ScheduleCount: this.eventSchedule.ScheduleCount,
                EventDate: this.eventSchedule.EventDate
            });
        }
        console.log(this.eventScheduleArray);
        this.ResetEventScheduleItem(true);
        this.SetControlsOnRecurring(1);
    };
    Eventform.prototype.editSchedule = function (item, rowindex) {
        this.SetControlsOnRecurring(item.RecurringID);
        this.eventSchedule.EventMsg = item.EventMsg;
        this.eventSchedule.EventID = item.EventID;
        this.eventSchedule.IsRecurring = item.IsRecurring;
        this.eventSchedule.IsOneOff = item.IsOneOff;
        this.eventSchedule.RecurringID = item.RecurringID;
        this.eventSchedule.NumericDay = item.NumericDay;
        this.eventSchedule.AlphaDAy = item.AlphaDAy;
        this.eventSchedule.Week = item.Week;
        this.eventSchedule.Month = item.Month;
        this.eventSchedule.ScheduleCount = item.ScheduleCount;
        this.eventSchedule.EventDate = item.EventDate;
        this.eventSchedule.IsEdit = true;
        this.row_Index = rowindex;
    };
    Eventform.prototype.removeSchedule = function (item, rowindex) {
        this.eventScheduleArray.splice(rowindex, 1);
    };
    Eventform.prototype.SetEventScheduleMessages = function () {
        var month = new Array();
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";
        if (this.eventSchedule.IsRecurring == '1') {
            if (this.eventSchedule.RecurringID == 1) {
                var name = month[parseInt(this.eventSchedule.Month) - 1];
                this.eventSchedule.EventMsg = 'Every ' + this.eventSchedule.ScheduleCount + ' years in ' + name + ' on ' + this.eventSchedule.NumericDay;
            }
            else if (this.eventSchedule.RecurringID == 2) {
                var name = month[parseInt(this.eventSchedule.Month) - 1];
                this.eventSchedule.EventMsg = 'Every ' + this.eventSchedule.ScheduleCount + '  months in on ' + this.eventSchedule.NumericDay;
            }
            else if (this.eventSchedule.RecurringID == 3) {
                var name = month[parseInt(this.eventSchedule.Month) - 1];
                this.eventSchedule.EventMsg = 'Every ' + this.eventSchedule.ScheduleCount + '  week on ' + this.eventSchedule.AlphaDAy;
            }
            else if (this.eventSchedule.RecurringID == 4) {
                var name = month[parseInt(this.eventSchedule.Month) - 1];
                this.eventSchedule.EventMsg = 'Daily ' + this.eventSchedule.ScheduleCount + '  times';
            }
        }
    };
    Eventform = __decorate([
        core_1.Component({
            selector: 'eventform',
            templateUrl: 'event/templates/eventform.html',
            styleUrls: ['event/styles/eventform.css']
        }), 
        __metadata('design:paramtypes', [event_service_1.EventService, router_1.Router])
    ], Eventform);
    return Eventform;
}());
exports.Eventform = Eventform;
