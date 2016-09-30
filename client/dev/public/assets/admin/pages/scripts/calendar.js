var Calendar = function () {


    return {
        //main function to initiate the module
        init: function () {
            Calendar.initCalendar();
        },

        initCalendar: function () {

            if (!jQuery().fullCalendar) {
                return;
            }

            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();

            var h = {};

            if (Metronic.isRTL()) {
                if ($('#calendar').parents(".portlet").width() <= 720) {
                    $('#calendar').addClass("mobile");
                    h = {
                        right: 'title, prev, next',
                        center: '',
                        left: 'agendaDay, agendaWeek, month, today'
                    };
                } else {
                    $('#calendar').removeClass("mobile");
                    h = {
                        right: 'title',
                        center: '',
                        left: 'agendaDay, agendaWeek, month, today, prev,next'
                    };
                }
            } else {
                if ($('#calendar').parents(".portlet").width() <= 720) {
                    $('#calendar').addClass("mobile");
                    h = {
                        left: 'title, prev, next',
                        center: '',
                        right: 'today,month,agendaWeek,agendaDay'
                    };
                } else {
                    $('#calendar').removeClass("mobile");
                    h = {
                        left: 'title',
                        center: '',
                        right: 'prev,next,today,month,agendaWeek,agendaDay'
                    };
                }
            }

            var initDrag = function (el) {
                // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
                // it doesn't need to have a start or end
                var eventObject = {
                    title: $.trim(el.text()) // use the element's text as the event title
                };
                // store the Event Object in the DOM element so we can get to it later
                el.data('eventObject', eventObject);
                // make the event draggable using jQuery UI
                el.draggable({
                    zIndex: 999,
                    revert: true, // will cause the event to go back to its
                    revertDuration: 0 //  original position after the drag
                });
            };

            var addEvent = function (title) {

                title = title.length === 0 ? "Untitled Event" : title;
                var html = $('<div class="external-event label label-default">' + title + '</div>');
                jQuery('#event_box').append(html);
                initDrag(html);
            };

            $(".fc-title").prepend("<i class='fa fa-plus'></i>");
            //var add_button = '<input type="button" value="+" />';
            //$(".fc-day-number").prepend(add_button);


            $(".fc-day .fc-widget-content .fc-sun .fc-other-month .fc-past").append('<i class="fa fa-plus" aria-hidden="true"><a onclick="openAddEventDialog()"></a></i>');

            $('#external-events div.external-event').each(function () {
                initDrag($(this));
            });

            $('#event_add').unbind('click').click(function () {
                var title = $('#event_title').val();
                addEvent(title);
            });

            //predefined events
            $('#event_box').html("");
            addEvent("My Event 1");
            addEvent("My Event 2");
            addEvent("My Event 3");
            addEvent("My Event 4");
            addEvent("My Event 5");
            addEvent("My Event 6");

            $('#calendar').fullCalendar('destroy'); // destroy the calendar
            $('#calendar').fullCalendar({ //re-initialize the calendar
                header: h,
                defaultView: 'month', // change default view with available options from http://arshaw.com/fullcalendar/docs/views/Available_Views/ 
                slotMinutes: 15,
                editable: true,
                droppable: true, // this allows things to be dropped onto the calendar !!!

                dayClick: function (date, jsEvent, view) {

                    $('#responsiveList').modal('show');
                    //alert('Clicked on: ' + date.format());

                    //alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);

                    //alert('Current view: ' + view.name);

                    //// change the day's background color just for fun
                    //$(this).css('background-color', 'red');

                },

                drop: function (date, allDay) { // this function is called when something is dropped

                    debugger;
                    debugger;
                    // retrieve the dropped element's stored Event Object
                    var originalEventObject = $(this).data('eventObject');
                    // we need to copy it, so that multiple events don't have a reference to the same object
                    var copiedEventObject = $.extend({}, originalEventObject);

                    // assign it the date that was reported
                    copiedEventObject.start = date;
                    copiedEventObject.allDay = allDay;
                    copiedEventObject.className = $(this).attr("data-class");

                    alert($(this).attr("data-class"));
                    // render the event on the calendar
                    // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
                    $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);
                    // $(element).find('td.fc-day-number fc-sun fc-other-month fc-past').append('<i class="fa fa-plus" aria-hidden="true"></i>');
                    // is the "remove after drop" checkbox checked?
                    if ($('#drop-remove').is(':checked')) {
                        // if so, remove the element from the "Draggable Events" list
                        $(this).remove();
                    }
                },

                viewRender: function (view, element) {
                    var add_url = '<a class="tip add-task" title="" onClick = "openAddEvent();"  \n\data-original-title="Dodaj zadanie"><i class="icon-plus"></i></a>';
                    //$(".fc-day-number").before(add_url);


                    $(".fc-day-number").append(add_url);
                },

                //dayRender: function (date, cell) {
                //    debugger;
                //    $(cell).addClass('fa fa-plus');
                //    debugger;
                //},
                //customButtons: {
                //    myCustomButton: {
                //        text: 'custom!',
                //        click: function () {
                //            alert('clicked the custom button!');
                //        }
                //    }
                //},

                eventRender: function (event, element) {
                    //element.find(".fc-title").prepend("<i class='fa fa-plus'></i>");
                    element.attr('href', 'javascript:void(0);');
                    element.click(function () {
                        $('#responsive').modal('show');

                    });
                    //$(element).find('td.fc-day-number fc-sun fc-other-month fc-past').append('<i class="fa fa-plus" aria-hidden="true"></i>');
                },
                //dayclick: function (date, allday, jsevent, view) {
                //    var dateformat = new dateformat("yyyy-mm-dd hh:mm:ss");
                //    var str = dateformat.format(date); // date to string

                //    var alldayparam;
                //    if (allday) {
                //        //alert('clicked on the entire day: ' + str);
                //        alldayparam = 1;
                //    } else {
                //        //alert('clicked on the slot: ' + str);
                //        alldayparam = 0;
                //    }

                //    var url = "/samples/calendar/newschecule.html";
                //    $.ajax({
                //        type: 'post',
                //        url: url,
                //        data: {
                //            allday: alldayparam,
                //            datetm: str
                //        },
                //        datatype: 'html',
                //        success: function (data) {
                //            $('#editdialog').html(data);
                //        },
                //        error: function () {
                //            alert('error occur');
                //        }
                //    });

                //    $("#editdialog").dialog("open");
                //},

                events: [{
                    title: 'All Day Event',
                    start: new Date(y, m, 1),
                    backgroundColor: Metronic.getBrandColor('yellow')
                }, {
                    title: 'Long Event',
                    start: new Date(y, m, d - 5),
                    end: new Date(y, m, d - 2),
                    backgroundColor: Metronic.getBrandColor('green')
                }, {
                    title: 'Repeating Event',
                    start: new Date(y, m, d - 3, 16, 0),
                    allDay: false,
                    backgroundColor: Metronic.getBrandColor('red')
                }, {
                    title: 'Repeating Event',
                    start: new Date(y, m, d + 4, 16, 0),
                    allDay: false,
                    backgroundColor: Metronic.getBrandColor('green')
                }, {
                    title: 'Meeting',
                    start: new Date(y, m, d, 10, 30),
                    allDay: false,
                }, {
                    title: 'Lunch',
                    start: new Date(y, m, d, 12, 0),
                    end: new Date(y, m, d, 14, 0),
                    backgroundColor: Metronic.getBrandColor('grey'),
                    allDay: false,
                }, {
                    title: 'Birthday Party',
                    start: new Date(y, m, d + 1, 19, 0),
                    end: new Date(y, m, d + 1, 22, 30),
                    backgroundColor: Metronic.getBrandColor('purple'),
                    allDay: false,
                }, {
                    title: 'Click for Google',
                    start: new Date(y, m, 28),
                    end: new Date(y, m, 29),
                    backgroundColor: Metronic.getBrandColor('yellow'),
                    url: 'http://google.com/',
                }]
            });

        }

    };

}();


function openAddEvent() {

    debugger;
    $('#responsive').modal('show');
}