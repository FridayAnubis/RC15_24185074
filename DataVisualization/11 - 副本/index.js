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
      return [parseFloat(columns[2]), parseFloat(columns[15])]; // seconds_elapsed和bpm
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
        name: "Motion",
        min: 0,
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
        pieces: [
          { gt: 0, lte: 4, color: "#354F7C" },
          { gt: 4, lte: 8, color: "#647AA7" },
          { gt: 8, lte: 12, color: "#94A6CA" },
          { gt: 12, lte: 16, color: "#C1CDE5" },
          { gt: 16, lte: 20, color: "#E7ECF7" },
          { gt: 20, color: "#FEFEFF" },
        ],
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
