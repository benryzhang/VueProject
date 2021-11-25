<template>
  <div class="left-chart-3">
    <!-- <div class="lc3-header">基本信息</div>
    <div class="lc3-details">数据采集站<span>永州城南大桥</span></div>
    <div class="lc3-details">传感器总数<span>36</span></div>
    <div class="lc3-details">采集设备数<span>12</span></div>
    <div class="lc3-details"><el-button type="primary" icon="el-icon-video-play">开始采集</el-button></div> -->
    <div class="lc1-details">设备完好率<span>12</span></div>
    <!-- <dv-decoration-12 style="width:280px;height:280px;margin-left: 13%;margin-top: 4%;" /> -->
    <dv-decoration-9 style="width:256px;height:256px;margin-left: 13%;margin-top: 4%;font-size:24px;">96%</dv-decoration-9>
    <!-- <dv-capsule-chart class="lc3-chart" :config="config" /> 
    <dv-charts :option="option" :config="config"/> -->
    <!-- <dv-charts :option="option" style="" id='container'/> -->
    <!-- <dv-charts :option="option" id="container" style="width:100%;height:300px" /> -->
  </div>
</template>

<script>
 import Charts from '@jiaminghi/charts'

 const container = document.getElementById('container')

 const myChart = new Charts(container)
export default {
  name: 'BottomLeftChart2',
  data () {
    return {
      option: {
        series: [
          {
            type: 'gauge',
            startAngle: -Math.PI / 2,
            endAngle: Math.PI * 1.5,
            arcLineWidth: 7,
            data: [
              { name: '8小时以内', value: 25, gradient: ['#03c2fd', '#1ed3e5', '#2fded6'] },
              { name: '24小时以内', value: 45, gradient: ['#03c2fd', '#1ed3e5', '#2fded6'], radius: '52%' },
              { name: '48小时以内', value: 65, gradient: ['#03c2fd', '#1ed3e5', '#2fded6'], radius: '44%' },
              { name: '72小时以内', value: 35, gradient: ['#03c2fd', '#1ed3e5', '#2fded6'], radius: '36%' },
              { name: '大于72小时', value: 25, gradient: ['#03c2fd', '#1ed3e5', '#2fded6'], radius: '28%' }
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
            backgroundArc: {
              show: false
            },
            details: {
              show: true,
              formatter: '{name}',
              position: 'start',
              offset: [-10, 0],
              style: {
                fill: '#fff',
                fontSize: 12,
                textAlign: 'right'
              }
            }
          }
        ]
      }
    }
  }
}
</script>

<style>
.left-chart-3 {
	width: 100%;
	height: 37%;
	display: flex;
	flex-grow: 0;
	flex-direction: column;
}


</style>