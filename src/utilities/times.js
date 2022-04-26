const daysOverlap = (date1, date2) => (
  date1 === date2  
);

const timeOverlap = (event1Start, event1End, event2Start, event2End) => {
    // regex
    const eventOverlap = /^ *(\d\d?):(\d\d)/;

    // event 1 times
    const [event1StartMatch, event1StartHours, event1StartMinutes] = eventOverlap.exec(event1Start);
    const [event1EndMatch, event1EndHours, event1EndMinutes] = eventOverlap.exec(event1End);

    // event 2 times
    const [event2StartMatch, event2StartHours, event2StartMinutes] = eventOverlap.exec(event2Start);
    const [event2EndMatch, event2EndHours, event2EndMinutes] = eventOverlap.exec(event2End);

    // convert to minutes
    const event1StartTime = event1StartHours * 60 + event1StartMinutes * 1;
    const event1EndTime   = event1EndHours   * 60 + event1EndMinutes   * 1;
    const event2StartTime = event2StartHours * 60 + event2StartMinutes * 1;
    const event2EndTime   = event2EndHours   * 60 + event2EndMinutes   * 1;

    // logic
    return Math.max(event1StartTime, event2StartTime) < Math.min(event1EndTime, event2EndTime)
}