document.addEventListener("DOMContentLoaded", function(){
  document.getElementById("result-box").style.display = "none";
  document.getElementById("ekg_svg").style.display = "none";
});

function calculateBloodPressureResult() {
  var systolic = document.getElementsByName("systolic")[0].value;
  var diastolic = document.getElementsByName("diastolic")[0].value;
  var blood_pressure_result = calculateBloodPressure(systolic, diastolic);
  
  var blood_pressure_html = bloodPressureHtml(blood_pressure_result)

  document.getElementById("result").innerHTML = "";
  document.getElementById("result-box").style.display = "block";
  document.getElementById("result-box").style.height = "17%";

  document.getElementById("ekg_svg").style.display = "block";
  setTimeout(function(){ 
    document.getElementById("ekg_svg").style.display = "none";
    document.getElementById("result-box").style.height = "10%";
    document.getElementById("result").innerHTML = blood_pressure_html;
  }, 1300);
}

function calculateBloodPressure(systolic, diastolic){
  if(isNaN(systolic) || isNaN(diastolic)){
    return { reading: 'Моля, въведете валидни числа'};
  }
  else if(systolic <= 60 || diastolic <= 40){
    return { reading: 'Моля, въведете вашите числа правилно' + ''};
  }
  else if(systolic >= 180 || diastolic >= 120){
    return {reading:'Хипертонична криза', color:'DarkRed'};
  }
  else if(systolic >= 140 || diastolic >= 90){
    return {reading: 'Етап 2 хипертония', color: 'FireBrick'};
  }
  else if(systolic >= 130 || diastolic >= 80){
    return {reading: 'Етап 1 хипертония', color:'Crimson'};
  }
  else if(systolic >= 120 && diastolic >= 60){
    return {reading: 'повишено кръвно налягане', color: 'IndianRed'};
  }
  else if(systolic >= 90 || diastolic >= 60){
    return {reading: 'нормално кръвно налягане', color: 'LightSkyBlue'};
  }
  else{
    return {reading: 'Хипотония', color: 'Lavender'};
  }
}

function bloodPressureHtml(blood_pressure_result){
  if(blood_pressure_result.color){
    return "<div class='blood-pressure-result'>Вашето кръвно налягане е: " + "<div class='blood-pressure-number' style='background-color:" + blood_pressure_result.color + "'>" + blood_pressure_result.reading + "</div>" + "</div>"
  }
  else{
    return "<div class='blood-pressure-result warning'>" + blood_pressure_result.reading + "</div>";
  };
}