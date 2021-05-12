const milliseconds_in_day = 24 * 60 * 60 * 1000;
const epoch = 2459316.68750;             // New moon - 12/4/2021 4:30:00
const average_moon_month = 29.530588861; // Average moon cycle

window.onload = function(){
    // Set Date to today
    let date = document.getElementById('date');
    let now = new Date();

    // Alternative conversion
    // let day = ("0" + now.getDate()).slice(-2);
    // let month = ("0" + (now.getMonth() + 1)).slice(-2);
    //
    // date.value = now.getFullYear() + "-" + (month) + "-" + (day);

    // Set today and proceed
    date.value = now.toISOString().substr(0, 10);
    dateHandler();
}

function dateHandler() {
    // Get date from filed
    let date = document.getElementById("date").value;
    let target = new Date(date);

    // Calculate julian date from UNIX time
    let julian_target = target.getTime() / milliseconds_in_day + 2440587.5;

    // Move time to 12:00
    julian_target += 0.5;

    // Calculate time passed since chosen new moon
    let time_from_last_new = julian_target - epoch;
    let moon_day = time_from_last_new % average_moon_month;

    // Negative modulo case
    if(moon_day < 0) moon_day += average_moon_month;

    // 0                      - New Moon
    // average_moon_month / 2 - Full Moon
    // average_moon_month     - New Moon

    // Calculate time to / from full moon in the cycle
    // It takes half the cycle from new moon to full moon
    let diff_from_full_moon = Math.abs(moon_day - (average_moon_month / 2));

    // Normalize it to < 0 , 1 >
    let normalized_difference = diff_from_full_moon / (average_moon_month / 2);

    // Full moon - 100%
    // New moon - 0%
    let moon_percentage = (1 - normalized_difference) * 100;

    // Get elements on stage
    let day = document.getElementById('day');
    let percentage = document.getElementById('percentage');

    // Write the results
    day.innerText = `${moon_day.toFixed(0)} dzień księżycowy`;
    percentage.innerText = `${(moon_percentage).toFixed(0)}%`;

    // Set gradient dependently on (moon_percentage)
    let moon = document.getElementById('moon');
    if(moon_day > average_moon_month / 2)
        moon.style.background = `linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) ${moon_percentage}%, rgba(0,0,0,1) ${moon_percentage}%)`;
    else
        moon.style.background = `linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) ${100 - moon_percentage}%, rgba(255,255,255,1) ${100 - moon_percentage}%)`;
}
