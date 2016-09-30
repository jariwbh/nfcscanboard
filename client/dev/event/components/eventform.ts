import { Component, OnInit, Inject }             from '@angular/core';

import { FormBuilder, FormGroup, Validators }    from '@angular/forms';
import { Router, ActivatedRoute }                from '@angular/router';

import { BasicValidators }                       from '../../shared/components/basicValidators';


import { EventService }                          from '../services/event.service';

import { EventModel }                            from '../models/events.model';


class ContactInfo {
    constructor(
        public description: string,
        public ondescription: string,
        public offdescription: string) { }

}

class ContactInfoTemp {
    constructor(
        public description: string,
        public ondescription: string,
        public offdescription: string
        ) { }

}


@Component({
  selector: 'eventform',
  templateUrl: 'event/templates/eventform.html',
  styleUrls: ['event/styles/eventform.css']
})
export class Eventform {
  
    event = { eventId: '', eventName: '', eventDescription: '' };
    eventSchedule = {
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

    eventScheduleArray = [];

    checkAddEdit = { value: 0 };

    public stopnamevalue = "";

    row_Index = -1;

    public event_error;
    public edited = false;
    public checking_uniquness = false;
    public isFavorite = true;

    public step1active:boolean = true;
    public step2active = false;
    public step3active = false;

    public step1 = 1;
    public step2 = 0;
    public step3 = 0;


    public back1 = false;
    public back2 = false;
    public continue1 = true;
    public continue2 = false;
    public submit_btn = false;

    public width: Number = 33.33;

    public event_name;

    public recurring_shown = true;
    public one_off_shown = false;

    public numberic_day = true;
    public alpha_day = false;

    butMonthDisabled: boolean = false;
    butNumericDayDisabled: boolean = false;
    butAlphaDisabled: boolean = false;
    butWeekDisabled: boolean = true;
    demoNumber = 31;
    counter = Array;

    RecurringList = [];
    public selectedvalue = 1;

    constructor(
        private _postService: EventService,
        private _router:Router) {
            this.GetRecurringList();
        }
    public EventScheudleButtonText ='Add';
    GetRecurringList() {
        this._postService.getRecurringList()
            .subscribe(
            _recurringList => {
                this.RecurringList = _recurringList;
                console.log(this.RecurringList);
                this.SetControlsOnRecurring(1);
            }
            )
    }
    information = [];

    informationtemp = [];

    myInfo = this.information[0];
    onVal = this.information[1];
    offVal = this.information[2];

    EventSchedule = [];

    inlineRadioOptions: string;

    

    cont1() {
        this.step1 = 0;
        this.step2 = 1;
        this.step3 = 0;
    }

    cont2() {
        this.step1 = 0;
        this.step2 = 0;
        this.step3 = 1;
    }

    numberReturn(length) {
        return new Array(length);
    }

    SetControlsOnRecurring(value) {
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
    }

    onEventchange(value) {
        this.ResetEventScheduleItem(false);
        this.SetControlsOnRecurring(value);
    }
    ResetEventScheduleItem(IsScheduleCount) {
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
    }

    step3_checked(value) {

        this.ResetEventScheduleItem(true);
        this.SetControlsOnRecurring(1);
        if (value == "recurring") {
            console.log('if');
            this.recurring_shown = true;
            this.one_off_shown = false;
            this.eventSchedule.IsRecurring = '1';
            this.eventSchedule.IsOneOff = '0';
        } else {
            console.log('else');
            this.one_off_shown = true;
            this.recurring_shown = false;
            this.eventSchedule.IsRecurring = '0';
            this.eventSchedule.IsOneOff = '1';
        }
    }

    addInfo(newInfo: string, onVal?, offVal?, checkAddEdit_new?) {

        if (this.checkAddEdit.value == 0) {

            if (newInfo) {

                if (onVal) {
                    onVal = 1;
                } else {
                    onVal = "";
                }

                if (offVal) {
                    offVal = 1;
                } else {
                    offVal = "";
                }
                this.information.push(new ContactInfo(newInfo, onVal, offVal));


            }


        } else {


            this.information.splice(this.row_Index - 1, 1, (new ContactInfoTemp(newInfo, onVal, offVal)));
            this.checkAddEdit.value = 0;

        }

    }

    removeInfo(info, i) {
        this.information.splice(i - 1, 1);
    }

    editInfo(info, i) {

        //this.information.splice(i-1, 1);
        var title = info.description;
        var on = info.ondescription;
        var off = info.offdescription;
        this.stopnamevalue = title;

        this.checkAddEdit.value = 1;
        this.row_Index = i;

        //this.information.push(new ContactInfo(title,on,off));
    }

    keypress_event() {
        this.edited = false;
        this.event_error = "";
    }

    onBack1(value: any) {

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


    }

    onContinue2(value: any) {
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
    }

    onContinue(value: any) {

        this.checking_uniquness = true;
        this.edited = false;

        var name = value.name;
        var description = value.description;

        this.event_name = name;

        this.event.eventName = name;
        this.event.eventDescription = description;

        this._postService.checkUniqueness(name)
            .subscribe(
            posts => {
                this.edited = true;
                this.event_error = "Event Tittle Already exists.";
                this.checking_uniquness = false;
            },
            response => {
                if (response.status == 404) {

                    this.step1active = false;
                    this.step2active = true;
                    this.step3active = false;
                    this.width = 66.66;

                    this.back1 = true;
                    this.back2 = false;
                    this.continue1 = false;
                    this.continue2 = true;
                    this.submit_btn = false;

                }
            }
            )


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


    }

    onSubmit(value: any) {
        var name = value.name;
        var description = value.description;
    }


    addEventSchedule() {

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
        else
        {
              this.eventScheduleArray.splice(this.row_Index, 1,{

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
            } );
        }

        console.log(this.eventScheduleArray);
        this.ResetEventScheduleItem(true);
        this.SetControlsOnRecurring(1);

    }
    editSchedule(item, rowindex) {
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

        this.row_Index=rowindex;
    }
    removeSchedule(item, rowindex) {
        this.eventScheduleArray.splice(rowindex, 1);
    }
    SetEventScheduleMessages() {
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
    }
}
