//points (you can set from here)
const valueOfPoints = {
  joy: {
    "not at all": 1,
    "a little": 0.8,
    some: 0.6,
    "a lot": 0.4
  },
  benefit: {
    "not at all": 1,
    "a little": 0.8,
    some: 0.6,
    "a lot": 0.4
  },
  painful: {
    "not at all": 1,
    "a little": 1.33,
    some: 1.67,
    "a lot": 2
  }
};

// leaning
var dom = document.getElementById("chart");
var myChart = echarts.init(dom);
var app = {};
option = null;

option = {
  title: {
    text: "Preference",
    left: "center"
  },
  series: [
    {
      type: "gauge",
      startAngle: 180,
      endAngle: 0,
      progress: {
        show: true,
        width: 15,
        roundCap: true
      },
      axisLine: {
        roundCap: true,
        lineStyle: {
          width: 15,
          color: [[1, "#3dead647"]],

          backgroundColor: "transparent"
        }
      },
      axisTick: {
        show: true
      },
      splitLine: {
        length: 15,
        lineStyle: {
          width: 0,
          color: "#999"
        }
      },
      axisLabel: {
        show: false,
        distance: 15,
        color: "#999",
        fontSize: 14
      },
      pointer: {
        icon: "path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z",
        length: "85%",
        width: 6,
        offsetCenter: [0, "0"]
      },
      anchor: {
        show: true,
        showAbove: true,
        size: 10,
        itemStyle: {
          borderWidth: 3
        }
      },
      detail: {
        show: false,
        valueAnimation: true,
        fontSize: 30,
        offsetCenter: [0, "20%"]
      },
      data: [
        {
          value: 50
        }
      ]
    }
  ]
};

function updateChart(value) {
  option.series[0].data[0].value = value;

  if (option && typeof option === "object") {
    myChart.setOption(option, true);
  }
}
updateChart(50);
//====================================================
// Add event listener to close button

// Show warning message
function showWarning(message) {
  Swal.fire({
    icon: "error",
    title: "Fill out the form correctly",
    text: message
  });
}

// leaning function
const updateLeaning = (op1, op2) => {
  let newValue = 50;
  if (op1 > op2) {
    newValue = newValue - op1 / 2;
  } else {
    newValue = newValue + op2 / 2;
  }
  updateChart(newValue);
};

// Variables
const form = document.querySelector("#calculatorNew");
const calculateButton = document.querySelector("#submitform");

let prevTimeValue,
  prevOption1Name,
  prevOption1Cost,
  prevOption1Benefit,
  prevOption1Joy,
  prevOption1Pain,
  prevOption1Time,
  prevOption2Name,
  prevOption2Cost,
  prevOption2Benefit,
  prevOption2Joy,
  prevOption2Pain,
  prevOption2Time;

function getDataPointFromSelect(selectId) {
  const selectElement = document.getElementById(selectId);
  const pointName = selectElement.getAttribute("data-point").toLowerCase();
  const selectedOption = selectElement.value.toLowerCase();
  console.log(
    pointName,
    selectedOption,
    valueOfPoints[pointName][selectedOption]
  );
  return valueOfPoints[pointName][selectedOption] || null;
}
// Function to calculate results and make POST request
function calculate(event) {
  event.preventDefault();

  // Get current input values

  // section 2
  const timeValue = parseFloat(document.getElementById("timevalue").value);
  const option_1_name = document.getElementById("option1name").value;
  const option_2_name = document.getElementById("option2name").value;
  const option_1_time = parseFloat(
    document.getElementById("option1time").value
  );
  const option_2_time = parseFloat(
    document.getElementById("option2time").value
  );
  const option_1_cost = parseFloat(
    document.getElementById("option1cost").value
  );
  const option_2_cost = parseFloat(
    document.getElementById("option2cost").value
  );
  const option_1_joy = parseFloat(getDataPointFromSelect("option1joy"));
  const option_2_joy = parseFloat(getDataPointFromSelect("option2joy"));
  const option_1_benefit = parseFloat(getDataPointFromSelect("option1benefit"));
  const option_2_benefit = parseFloat(getDataPointFromSelect("option2benefit"));
  const option_1_pain = parseFloat(getDataPointFromSelect("option1pain"));
  const option_2_pain = parseFloat(getDataPointFromSelect("option2pain"));

  console.log(option_1_benefit, option_1_cost, option_1_time);
  // Check if input values have changed
  if (
    timesValue === prevTimeValue &&
    option_1_name === prevOption1Name &&
    option_2_name === prevOption2Name &&
    option_1_time === prevOption1Time &&
    option_2_time === prevOption2Time &&
    option_1_cost === prevOption1Cost &&
    option_2_cost === prevOption2Cost &&
    option_1_joy === prevOption1Joy &&
    option_2_joy === prevOption2Joy &&
    option_1_benefit === prevOption1Benefit &&
    option_2_benefit === prevOption2Benefit &&
    option_1_pain === prevOption1Pain &&
    option_2_pain === prevOption2Pain
  ) {
    return; // If input values haven't changed, do nothing
  }
  // Update previous input values
  prevTimeValue = timeValue;
  prevOption1Name = option_1_name;
  prevOption2Name = option_2_name;
  prevOption1Time = option_1_time;
  prevOption2Time = option_2_time;
  prevOption1Cost = option_1_cost;
  prevOption2Cost = option_2_cost;
  prevOption1Joy = option_1_joy;
  prevOption2Joy = option_2_joy;
  prevOption1Benefit = option_1_benefit;
  prevOption2Benefit = option_2_benefit;
  prevOption1Pain = option_1_pain;
  prevOption2Pain = option_2_pain;

  // Validate input values
  if (
    isNaN(timeValue) ||
    isNaN(option_1_cost) ||
    isNaN(option_1_time) ||
    isNaN(option_1_joy) ||
    isNaN(option_1_pain) ||
    isNaN(option_1_benefit) ||
    isNaN(option_2_cost) ||
    isNaN(option_2_time) ||
    isNaN(option_2_joy) ||
    isNaN(option_2_pain) ||
    isNaN(option_2_benefit) ||
    option_1_name === "" ||
    option_2_name === ""
  ) {
    showWarning("All inputs are required");
    return;
  }

  //======================
  //formulas for section 2
  //======================
  const option1_Cost_Formula = timeValue * option_1_time + option_1_cost;
  const option2_Cost_Formula = timeValue * option_2_time + option_2_cost;

  //   calculate
  const op1cost = Math.round(option1_Cost_Formula * 100) / 100;
  const op2cost = Math.round(option2_Cost_Formula * 100) / 100;

  //   preference
  // option 1
  const option1_Preference_Formula =
    ((op2cost * option_2_joy * option_2_benefit * option_2_pain) /
      (op1cost * option_1_joy * option_1_benefit * option_1_pain +
        op2cost * option_2_joy * option_2_benefit * option_2_pain)) *
    100;

  // option 2
  const option2_Preference_Formula =
    ((op1cost * option_1_joy * option_1_benefit * option_1_pain) /
      (op1cost * option_1_joy * option_1_benefit * option_1_pain +
        op2cost * option_2_joy * option_2_benefit * option_2_pain)) *
    100;

  // calculate
  const op1preference = Math.round(option1_Preference_Formula);
  const op2preference = Math.round(option2_Preference_Formula);

  // update the meter
  updateLeaning(op1preference, op2preference);
  //======================
  //formulas for section 2 end
  //======================

  // Display results on page
  // section 2
  document.getElementById("op1valuecost").textContent = op1cost;
  document.getElementById("op1prefer").textContent = op1preference;
  document.getElementById("op2valuecost").textContent = op2cost;
  document.getElementById("op2prefer").textContent = op2preference;

  // Make POST request to Google Sheets
  calculateButton.disabled = true;
  calculateButton.textContent = "Calculating...";
  let requestBody = new FormData(form);
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbwwfeQTiRSEwsg-_Q2wxbcVpglhaNPlXK5N1pDtkVsbriWhXNsN9PIQFdGc-sNe60t0eg/exec";
  fetch(scriptURL, { method: "POST", body: requestBody })
    .then((response) => {
      console.log("Success!", response);
    })
    .catch((error) => {
      console.log("Error!", error.message);
    })
    .finally(() => {
      calculateButton.disabled = false;
      calculateButton.textContent = "Recalculate";
    });
}

//clear all values
function clearForm() {
  document.getElementById("calculatorNew").reset();
  document.getElementById("op1valuecost").textContent = "0";
  document.getElementById("op1prefer").textContent = "0";
  document.getElementById("op2valuecost").textContent = "0";
  document.getElementById("op2prefer").textContent = "0";
  calculateButton.textContent = "Calculate";
}

//run calculator on form submit
form.addEventListener("submit", calculate);

// ip address
async function getUserIpAddress2() {
  const response = await fetch("https://api.ipify.org/?format=json");
  const data = await response.json();
  const ipAddress = data.ip;
  document.getElementById("userIP2").value = ipAddress;
}
getUserIpAddress2();

// dynamic name
const op1name = document.getElementById("option1name");
const op2name = document.getElementById("option2name");
const dynamic1 = document.querySelectorAll(".dynamic1");
const dynamic2 = document.querySelectorAll(".dynamic2");
const CHAR_LIMIT = 30; // set the character limit to 20

op1name.addEventListener("input", function () {
  let value = op1name.value;
  if (value.length > CHAR_LIMIT) {
    value = value.slice(0, CHAR_LIMIT); // truncate the value to the character limit
  }
  op1name.value = value; // update the input field value
  dynamic1.forEach(function (element) {
    element.innerText = value;
  });
});

op2name.addEventListener("input", function () {
  let value = op2name.value;
  if (value.length > CHAR_LIMIT) {
    value = value.slice(0, CHAR_LIMIT); // truncate the value to the character limit
  }
  op2name.value = value; // update the input field value
  dynamic2.forEach(function (element) {
    element.innerText = value;
  });
});
