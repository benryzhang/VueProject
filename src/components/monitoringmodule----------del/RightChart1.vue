<template>
  <div class="right-chart-1">
    <div class="rc1-header"></div>
    <!-- <div class="lc1-details">设备运行总数<span>430</span></div>
    <dv-capsule-chart class="lc1-chart" :config="config" /> 
    <dv-charts :option="option" :config="config"/>-->
    <!-- <dv-charts :option="option" style="" id='container'/> -->
    <dv-charts :option="option" id="rightchart1"  />
  </div>
</template>


<script>
import Charts from '@jiaminghi/charts'
//import { changeDefaultConfig } from '@jiaminghi/charts'
const container = document.getElementById('rightchart1')

const myChart = new Charts(container)
//changeDefaultConfig('color', ['#67e0e3'])


export default {
  name: 'BottomLeftChart2',
  data () {
    return {
       option : {
  title: {
    text: '畅销饮料占比饼状图',
    //changeDefaultConfig:
  },
  style: {
  fontSize: 11,
},
  series: [
    {
      type: 'pie',
      data: [
        { name: '可口可乐', value: 93 },
        { name: '百事可乐', value: 32 },
        { name: '哇哈哈', value: 65 },
        { name: '康师傅', value: 44 },
        { name: '统一', value: 52 },
      ],
      insideLabel: {
        show: true
      },
      roseType: true
    }
  ]
}
    }
  }
}
</script>

<style>
.right-chart-1 {
  width: 100%;
  height: 98%;
  display: flex;
  flex-direction: column;
  padding: 20px;}
  .rc1-header {
    font-size: 24px;
    font-weight: bold;
    height: 30px;
    line-height: 30px;
  }
  .rc1-chart-container {
    flex: 1;
    display: flex;
  }
  .left {
    width: 30%;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;}
    .number {
      font-size: 34px;
      color: #096dd9;
      font-weight: bold;
      margin-bottom: 30px;
    }
  
  .right {
    flex: 1;
    padding-bottom: 20px;
    padding-right: 20px;
    box-sizing: border-box;
  }


</style>