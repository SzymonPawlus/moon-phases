

window.onload = function(){
    let date = document.getElementById('date');

    let now = new Date();

    let day = ("0" + now.getDate()).slice(-2);
    let month = ("0" + (now.getMonth() + 1)).slice(-2);

    date.value = now.getFullYear() + "-" + (month) + "-" + (day);
    dateHandler();
}

function dateHandler() {
    let date = document.getElementById("date").value;
    let target = new Date(date);
    let milliseconds_in_day = 24 * 60 * 60 * 1000;
    let epoch = 2459331.07598;
    let average_moon_month = 29.530588861;
    let julian_target = target.getTime() / milliseconds_in_day + 2440587.5;

    let moon_day = ((julian_target - epoch) % average_moon_month);
    if(moon_day < 0) moon_day += average_moon_month;

    let moon_percentage = Math.abs((average_moon_month / 2) - moon_day) / (average_moon_month / 2);

    let day = document.getElementById('day');
    let percentage = document.getElementById('percentage');
    day.innerText = `${moon_day.toFixed(0)} dzień księżycowy`;
    percentage.innerText = `${(moon_percentage * 100).toFixed(0)}%`;

    let moon = document.getElementById('moon');
    if(moon_day < average_moon_month / 2)
        moon.style.background = `linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) ${moon_percentage * 100}%, rgba(0,0,0,1) ${moon_percentage * 100}%)`;
    else
        moon.style.background = `linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) ${100 - moon_percentage * 100}%, rgba(255,255,255,1) ${100 - moon_percentage * 100}%)`;
}