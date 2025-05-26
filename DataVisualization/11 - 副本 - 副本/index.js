var dom = document.getElementById("chart-container");
var myChart = echarts.init(dom, null, {
  renderer: "svg",
  useDirtyRect: false,
});
var app = {};
var option;

// 改用CSV数据
$.get("./AlignedData.csv", function (csvData) {
  // 解析CSV数据
  const rows = csvData.split("\n").slice(1); // 跳过标题行
  const data = rows
    .map((row) => {
      const columns = row.split(",");
      return [parseFloat(columns[2]), parseFloat(columns[14])]; // seconds_elapsed和bpm
    })
    .filter((item) => !isNaN(item[0]) && !isNaN(item[1])); // 过滤无效数据

  myChart.setOption(
    (option = {
      title: {
        text: "Motion",
        left: "1%",
      },
      tooltip: {
        trigger: "axis",
      },
      grid: {
        show: false,
        left: "5%",
        right: "15%",
        bottom: "10%",
      },
      xAxis: {
        show: false,
        data: data.map(function (item) {
          return item[0];
        }),
        name: "Seconds Elapsed",
      },
      yAxis: {
        show: false,
        inverse: true,
        name: "Motion",
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
          startValue: data[0][0], // 从第一个数据点开始
        },
        {
          type: "inside",
        },
      ],
      visualMap: {
        top: 50,
        right: 10,
        color: ["#354F7C"],
        // pieces: [
        //   { gt: 0, lte: -60, color: "#354F7C" },
        //   { gt: -120, lte: -100, color: "#647AA7" },
        //   { gt: -100, lte: -80, color: "#94A6CA" },
        //   { gt: -80, lte: -60, color: "#C1CDE5" },
        //   { gt: -60, lte: -40, color: "#E7ECF7" },
        //   { gt: 0, color: "#FEFEFF" },
        // ],
        outOfRange: {
          color: "#999",
        },
      },
      series: {
        name: "Motion",
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
              yAxis: 90,
            },
            {
              yAxis: 105,
            },
            {
              yAxis: 110,
            },
            {
              yAxis: 115,
            },
            {
              yAxis: 120,
            },
            {
              yAxis: 125,
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
