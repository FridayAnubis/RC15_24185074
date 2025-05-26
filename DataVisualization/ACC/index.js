var dom = document.getElementById("chart-container");
var myChart = echarts.init(dom, null, {
  renderer: "svg",
  useDirtyRect: false,
});
var app = {};
var option;

$.get("./Accelerometer.csv", function (csvData) {
  const rows = csvData.split("\n").slice(1);
  const data = rows
    .map((row) => {
      const columns = row.split(",");
      const seconds = parseFloat(columns[1]);
      const x = parseFloat(columns[2]);
      const y = parseFloat(columns[3]);
      const z = parseFloat(columns[4]);
      const magnitude = Math.sqrt(x * x + y * y + z * z); // Calculate magnitude
      return [seconds, magnitude];
    })
    .filter((item) => !isNaN(item[0]) && !isNaN(item[1])); // filter out invalid data

  myChart.setOption(
    (option = {
      title: {
        text: "Accelerometer Magnitude",
        left: "1%",
      },
      tooltip: {
        trigger: "axis",
      },
      backgroundColor: "#fff0",
      grid: {
        left: "5%",
        right: "15%",
        bottom: "10%",
      },
      xAxis: {
        data: data.map(function (item) {
          return item[0];
        }),
        name: "Seconds Elapsed",
      },
      yAxis: {
        name: "Acceleration Magnitude (m/s²)",
        min: 0,
        max: 120,
      },
      toolbox: {
        right: 10,
        feature: {
          dataZoom: {
            yAxisIndex: "none",
          },
          restore: {},
          saveAsImage: {},
        },
      },
      dataZoom: [
        {
          startValue: data[0][0],
        },
        {
          type: "inside",
        },
      ],
      visualMap: {
        top: 50,
        right: 10,
        pieces: [
          { gt: 0, lte: 10, color: "#45496a" },
          { gt: 10, lte: 20, color: "#647AA7" },
          { gt: 20, lte: 30, color: "#94A6CA" },
          { gt: 30, color: "#C1CDE5" },
        ],
        outOfRange: {
          color: "#999",
        },
      },
      series: {
        name: "Acceleration",
        type: "line",
        data: data.map(function (item) {
          return item[1];
        }),
        markLine: {
          silent: true,
          lineStyle: {
            color: "#333",
          },
          data: [
            {
              yAxis: 10,
            },
            {
              yAxis: 20,
            },
            {
              yAxis: 30,
            },
          ],
        },
      },
    })
  );
});

if (option && typeof option === "object") {
  myChart.setOption(option);
}

window.addEventListener("resize", myChart.resize);
