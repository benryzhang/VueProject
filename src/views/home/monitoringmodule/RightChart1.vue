<template>
  <div class="right-chart-1">
    <div id="RightCharts"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "RightCharts",
  data() {
    return {};
  },
  mounted() {
    this.drawLine();
    window.setInterval(() => {
      setTimeout(() => {
       // this.drawLine();
      }, 0);
    }, 300000);
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("RightCharts"));
      this.$axios
        .get(this.api.getMapWarnInfo, {
          params: { structure: this.GLOBAL.structure },
        })
        .then((response) => {
          let data = JSON.parse(response);
          let res = [];
          let colorlist = [];
          res = data.map((item) => {
            if (item.value === "1") {
              colorlist.push("##fbda41");
            } else if (item.value === "2") {
              colorlist.push("#ee3f4d");
            } else {
              colorlist.push("#229453");
            }
            return { value: item.errtype, name: item.sensortypecode };
          });
          //console.log(colorlist)

          // 绘制图表
          myChart.setOption({
            title: {
              text: "24小时最新预警信息",
              left: "center",
              textStyle: { color: "#fff", fontSize: 14 },
            },

            tooltip: {
              trigger: "item",
            },
            legend: {
              orient: "vertical",
              left: 10,
              top: 20,
            },
            color: colorlist,
            // xAxis: {
            //    // data: ["ACC","DIS","FSG","FGT","HTM","GPS"],
            //     axisLabel:{
            //       textStyle:{
            //       color:'#fff'
            //       }
            //     }
            //   },
            legend: {
              textStyle: {
                //图例文字的样式
                color: "#fff",
                fontSize: 12,
              },
              type: "scroll",
              orient: "vertical",
              left: 10,
              //itemHeight: 10
              //top: 20,
              //bottom: 20,
            },
            series: [
              {
                //name: 'Access From',
                type: "pie",
                radius: "50%",
                data: res,

                //   itemStyle: {
                //     normal: {
                //         label: {
                //             textStyle: {
                //               color:'black',
                //                 fontSize: 14,
                //                 fontWeight:'bolder'
                //             }
                //         },
                //       // labelLine : {
                //       //       lineStyle:{
                //       //         color:'black'
                //       //       }
                //       //   }
                //     }
                // },
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)",
                  },
                },
              },
            ],
          });
        });
    },
  },
};
</script>

<style lang="less">
.right-chart-1 {
  width: 100%;
  // height: 210px;
  display: flex;
  flex-direction: column;
  background-color: rgba(16,21,41,0.4);
}
.right-chart-1 span {
  text-align: center;
  font-size: 14px;
  line-height: 24px;
  font-weight: bold;
}
#RightCharts {
  height: 206px;
  width: 100%;
}
</style>