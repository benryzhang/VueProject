<template>
  <div class="left-chart-1">
    <div class="lc1-header">动态环图</div>
    <!-- <div class="lc1-details">设备运行总数<span>430</span></div>
    <dv-capsule-chart class="lc1-chart" :config="config" /> -->
    <dv-active-ring-chart :config="config" style="width:100%;height:260px" />
    <dv-decoration-2 style="height:10px;" />
    <dv-decoration-3 style="height:20px;" />
  </div>
</template>

<script>
export default {
  name: 'LeftChart2',
  radius: '40%',
  activeRadius: '50%',
  data () {
    return {
      config: {
        data: [
    {
      name: '周口',
      value: 55
    },
    {
      name: '南阳',
      value: 120
    },
    {
      name: '西峡',
      value: 78
    },
    {
      name: '驻马店',
      value: 66
    },
    {
      name: '新乡',
      value: 80
    }
  ],
  digitalFlopStyle: {
    fontSize: 20
  },
  showOriginValue: true
      }
    }
  }
}
</script>

<style>
.left-chart-1 {
  width: 100%;
  height: 37%;
  display: flex;
  flex-grow: 0;
  flex-direction: column;}
  .lc1-header {
    text-align: center;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    margin-bottom: 20px;
  }
  .lc1-details {
    height: 50px;
    font-size: 16px;
    display: flex;
    align-items: center;
    text-indent: 20px;
  
  }
  .lc1-chart {
    flex: 1;
  }
     .lc1-details span {
      color: #096dd9;
      font-weight: bold;
      font-size: 35px;
      margin-left: 20px;
    }

</style>