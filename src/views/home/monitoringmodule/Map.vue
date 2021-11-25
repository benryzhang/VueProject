<template>
  <div class="center-cmp">
    <div class="cc-header">
      <dv-decoration-1 style="width:25%;height:50px;" />
      <!-- <dv-border-box-2 class='header-fixed-decoration' style="width:200px;height:50px;font-size:16px;">
            系统综合管理平台
          </dv-border-box-2> -->
      <div class="cc-title">通用数据采集综合展示平台</div>
          <div class="cc-time" >{{nowTime}}</div>
      <!-- <dv-decoration-1 style="width:200px;height:50px;" /> -->

    </div>

    <!-- <div class="cc-details">
      <div>设备总数</div>
      <div class="card">2</div>
      <div class="card">1</div>
      <div class="card">3</div>
      <div class="card">7</div>
    </div> -->

    <div class="cc-main-container">
      <baidu-map class="bm-view" :center="center" :zoom="zoom" @ready="handler"></baidu-map>
    </div>
        <div class="station-info">
          <!-- <div class="mh-time">{{nowTime}}</div> -->
        </div>
      </div>

      <!-- <LabelTag :config="labelConfig" /> -->
    <!-- </div> -->
  <!-- </div> -->


</template>

<script>
//import LabelTag from './LabelTag'
import Charts from '@jiaminghi/charts'
import mapCenterPoint from '@/assets/img/mapCenterPoint.png'
import mapPoint from '@/assets/img/mapPoint.png'

const container = document.getElementById('container')

const myChart = new Charts(container)
export default {
  name: 'CenterCmp',
  components: {
    //LabelTag
  },
  
  data () {
    return {
         nowTime:'',
         cards: [],
         redwarn:{},
         flyline:{
            centerPoint: [0.48, 0.35],
  points: [
    {
      position: [0.52, 0.135],
      text: 'ACC'
    },
    {
      position: [0.43, 0.19],
      text: 'FSG'
    },
    {
      position: [0.59, 0.65],
      text: 'FGT'
    },
    {
      position: [0.53, 0.87],
      text: 'SHH'
    },
    {
      position: [0.45, 0.74],
      text: 'VEH'
    },
    {
      position: [0.16, 0.38],
      text: 'GPS'
    },
    {
      position: [0.82, 0.55],
      text: 'ACA'
    }
    
  ],
  k: 0.5,
//   bgImgUrl: '../../../assets/img/viewbg.png',
  centerPointImg: {
    url: mapCenterPoint
  },
  pointsImg: {
    url: mapPoint
  },         
         },
         yellowwarn :{
            series: [
                {
                type: 'gauge',
                startAngle: -Math.PI / 2,
                endAngle: Math.PI * 1.5,
                arcLineWidth: 10,
                data: [
                    { name: 'itemA', value: 112, gradient: ['#fed71a', '#fcd217', '#fcd217'] }
                ],
                axisLabel: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                pointer: {
                    show: false
                },
                dataItemStyle: {
                    lineCap: 'round'
                },
                details: {
                    show: true,
                    formatter: '{value}条',
                    style: {
                        fill: '#1ed3e5',
                        fontSize: 20
                    }
                }
                }
            ]
            },
      redwarn :{
            series: [
                {
                type: 'gauge',
                startAngle: -Math.PI / 2,
                endAngle: Math.PI * 1.5,
                arcLineWidth: 10,
                data: [
                    { name: 'itemA', value: 65, gradient: ['#ed5a65', '#a61b29', '#a61b29'] }
                ],
                axisLabel: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                pointer: {
                    show: false
                },
                dataItemStyle: {
                    lineCap: 'round'
                },
                details: {
                    show: true,
                    formatter: '{value}条',
                    style: {
                        fill: '#1ed3e5',
                        fontSize: 20
                    }
                }
                }
            ]
            },
    }
  },
  mounted() {
    this.nowTimes();
    //const { createData } = this
    this.createData();
    //setInterval(this.createData, 30000)
  },
  methods: {
    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear();
      let month =new Date(timeStamp).getMonth() + 1 < 10? "0" + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1;
      let date =new Date(timeStamp).getDate() < 10? "0" + new Date(timeStamp).getDate(): new Date(timeStamp).getDate();
      let hh =new Date(timeStamp).getHours() < 10? "0" + new Date(timeStamp).getHours(): new Date(timeStamp).getHours();
      let mm =new Date(timeStamp).getMinutes() < 10? "0" + new Date(timeStamp).getMinutes(): new Date(timeStamp).getMinutes();
      let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
       const myDate = new Date()
      let week = myDate.getDay() // 星期
      let weekArr = [ '星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六' ]

     
      //this.week = '星期' + '日一二三四五六'.charAt(myDate.getDay())
      this.nowTime = year + "年" + month + "月" + date +"日"+" "+hh+":"+mm+':'+ss + ' ' + weekArr[week];
    },
    nowTimes(){
      this.timeFormate(new Date());
      setInterval(this.nowTimes,1000);
      this.clear()
    },
    clear(){
      clearInterval(this.nowTimes)
      this.nowTimes = null;
    },
     createData () {
         
    //   const { randomExtend } = this
    //   this.cards = new Array(2).fill(0).map((foo, i) => ({
    //     title: '测试路段' + (i + i),
    //     total: {
    //       number: [randomExtend(9000, 10000)],
    //       content: '{nt}',
    //       textAlign: 'right',
    //       style: {
    //         fill: '#ea6027',
    //         fontWeight: 'bold'
    //       }
    //     },
    //     num: {
    //       number: [randomExtend(30, 60)],
    //       content: '{nt}',
    //       textAlign: 'right',
    //       style: {
    //         fill: '#26fcd8',
    //         fontWeight: 'bold'
    //       }
    //     },
    //     ring: {
    //       series: [
    //         {
    //           type: 'gauge',
    //           startAngle: -Math.PI / 2,
    //           endAngle: Math.PI * 1.5,
    //           arcLineWidth: 13,
    //           radius: '80%',
    //           data: [
    //             { name: '红色预警', value: randomExtend(40, 60) }
    //           ],
    //           axisLabel: {
    //             show: false
    //           },
    //           axisTick: {
    //             show: false
    //           },
    //           pointer: {
    //             show: false
    //           },
    //           backgroundArc: {
    //             style: {
    //               stroke: '#224590'
    //             }
    //           },
    //           details: {
    //             show: true,
    //             formatter: '红色预警{value}%',
    //             style: {
    //               fill: '#1ed3e5',
    //               fontSize: 20
    //             }
    //           }
    //         }
    //       ],
    //       color: ['#03d3ec']
    //     }
    //   }))
      },
      randomExtend (minNum, maxNum) {
      if (arguments.length === 1) {
        return parseInt(Math.random() * minNum + 1, 10)
      } else {
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
      }
    }
  }
}
</script>

<style lang="less">
.center-cmp {
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-direction: column;
  .el-button--primary{width: 180px;
    font-size: 30px;}
  .cc-header {
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 30px;
    font-weight: bold;
  }
  .cc-details {
    height: 120px;
    display: flex;
    justify-content: center;
    font-size: 32px;
    align-items: center;
    .card {
      background-color: rgba(4,49,128,.6);
      color: #08e5ff;
      height: 70px;
      width: 70px;
      font-size: 45px;
      font-weight: bold;
      line-height: 70px;
      text-align: center;
      margin: 10px;
    }
  }
  .cc-main-container {
    position: relative;
    flex: 1;
    display: flex;
    // background-image: url(../../../assets/img/viewbg.png);
    .ccmc-middle {
      width: 50%;
      height: 90%;
      .active-ring-name {
        font-size: 20px !important;
      }
    }
    .ccmc-left, .ccmc-right {
      width: 25%;
      display: block;
      flex-direction: column;
      justify-content: center;
      font-size: 24px;
      span {
        font-size: 24px;
        font-weight: bold;
      }
      .station-info {
        height: 80px;
        display: block;
        align-items: center;
      }
    }
    .ccmc-left {
      align-items: flex-end;
      span {
        margin-left: 2px;
      }
    }
    .ccmc-right {
    //   align-items: flex-start;
      span {
        margin-right: 20px;
      }
    }
  }
  .label-tag {
    position: absolute;
    width: 500px;
    height: 30px;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
}
.cc-time{    line-height: 44px;font-size: 16px; color:#fff;padding-top:20px;}
.cc-title{width:50%;text-align: center;}


#cards {
//   display: flex;
//   justify-content: space-between;
//   height: 100%;
//padding-top:30px;
  .card-item {
    background-color: rgba(6, 30, 93, 0.5);
    border-top: 2px solid rgba(1, 153, 209, .5);
    width: 48%;
    display: flex;
    flex-direction: column;
  }
  .card-header {
    // display: flex;
    height: 20%;
    text-align: center;
    width:100%;
    .card-header-left {
      font-size: 18px;
      font-weight: bold;
    //   padding-left: 20px;
    }
    .card-header-right {
      padding-right: 20px;
      font-size: 40px;
      color: #03d3ec;
    }
  }
  .ring-charts {
    height: 260px;
    width:100%;
  }
  .card-footer {
    height: 25%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .card-footer-item {
    padding: 5px 10px 0px 10px;
    box-sizing: border-box;
    width: 40%;
    background-color: rgba(6, 30, 93, 0.7);
    border-radius: 3px;
    .footer-title {
      font-size: 15px;
      margin-bottom: 5px;
    }
    .footer-detail {
      font-size: 20px;
      color: #1294fb;
      display: flex;
      font-size: 18px;
      align-items: center;
      .dv-digital-flop {
        margin-right: 5px;
      }
    }
  }
}
</style>