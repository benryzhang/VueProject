<template>
  <div id="data-view">
    <div class="main-header">
        <Header/>
        <Timebar/>
      </div>
    <dv-full-screen-container>
      <dv-border-box-10>
      <!-- <dv-border-box-11 title="动力灾害监控数据分析平台"></dv-border-box-11> -->
      <!-- <dv-border-box-10> -->
      

      <div class="main-container">
        <!-- <dv-border-box-10> -->
              <CenterCmp />
        <!-- </dv-border-box-10> -->
      </div>
      <!-- <div class="left-domain"> -->
            <!-- <LeftDomain /> -->
            <!-- <Left-Chart-2 />
            <Left-Chart-3 /> -->
      <!-- </div> -->
      <div class="left-top-container">
        <div class="">
          <LeftChart1 />
          <!-- <Left-Chart-2 />
          <Left-Chart-3 /> -->
          </div>
      </div>
      <div class="left-bottom-container">
        <div class="">
          <LeftChart2 />
          </div>
      </div>
      <div class="right-top-container">
        <div class="">
          <RightChart1 />
          </div>
      </div>
      <div class="right-center-container">
        <div class="">
          <RightChart2 />
          </div>
      </div>
      <div class="right-bottom-container">
        <div class="">
          <RightChart3 />
          </div>
      </div>
      </dv-border-box-10>
    </dv-full-screen-container>
    
  </div>
</template>

<script>
import Header from './monitoringmodule/header.vue'
import Timebar from './monitoringmodule/timebar.vue'
import CenterCmp from './monitoringmodule/CenterCmp.vue'
import LeftDomain from './monitoringmodule/LeftDomain.vue'
import LeftChart1 from './monitoringmodule/LeftChart1.vue'
import LeftChart2 from './monitoringmodule/LeftChart2.vue'
import RightChart1 from './monitoringmodule/RightChart1.vue'
import RightChart2 from './monitoringmodule/RightChart2.vue'
import RightChart3 from './monitoringmodule/RightChart3.vue'

 //import LeftChart2 from './LeftChart2'
// import LeftChart3 from './LeftChart3'
// import CenterCmp from './CenterCmp'
// import RightChart1 from './RightChart1'
// import RightChart2 from './RightChart2'
// import BottomCharts from './BottomCharts'
export default {
  name: 'DataView',
   components: {
     Header,
     Timebar,
     CenterCmp,
     LeftDomain,
     LeftChart1,
     LeftChart2,
     RightChart1,
     RightChart2,
     RightChart3
  //   LeftChart1,
   //  LeftChart2,
  //   LeftChart3,
  //   CenterCmp,
  //   RightChart1,
  //   RightChart2,
  //   BottomCharts
   },
  data () {
    return {
      
      
    }
  },
  mounted() {
    
  },
  methods: {

  }
}
</script>

<style>
#data-view {
	width: 100%;
  height: 100%;
  background:#030409;
  /* background-color: #030409; 
  background-image: url(../../assets/img/bggif.png);
  background-size: cover; */
	color: #fff;
  position: relative;
}

body {
	margin: 0;
	padding: 0
}

.dv-full-screen-container {
	background-size: 100% 100%;
	box-shadow: 0 0 3px #00f;
	display: flex;
	flex-direction: column
}



.mh-left {
	/* font-size: 20px;*/
	color: #08e5ff; 
}

.mh-middle {
	font-size: 30px
}

.mh-left,.mh-right {
  width: 450px;
  
}

.main-container {
	height: 100%
}

.border-box-content {
	padding: 20px;
	box-sizing: border-box;
	display: flex;
	display: block
}

.border-box-content {
	flex-direction: column
}

/* .left-domain {
  position: absolute;
  left: 1%;
  top: 8%;
	width: 22%;
  background: #10152f;
	box-sizing: border-box;
  border: #00ffff solid 2px;
	display: block;
	float: left;
  /* z-index: 999; 
  height: 210px;
  /* animation:mymove 1s infinite;
-webkit-animation:mymove 1s infinite; Safari and Chrome 
} 
/* 
@keyframes mymove
{
from {left:-200px;}
to {left:0px;}
}

@-webkit-keyframes mymove
{
from {left:200px;}
to {left:0px;}
} */
.left-top-container {
  position: absolute;
  left: 1%;
  top: 30%;
	width: 22%;
  background:linear-gradient(to left, rgba(24, 24, 32, 0) 0%, rgb(30, 42, 59) 100%);
	box-sizing: border-box;
	display: block;
	float: left;
  /* z-index: 999; */
  border:#00ffff solid 2px;
  
}
.left-bottom-container {
  position: absolute;
  left: 1%;
  top: 65%;
	width: 22%;
  background:linear-gradient(to left, rgba(24, 24, 32, 0) 0%, rgb(30, 42, 59) 100%);
	box-sizing: border-box;
	display: block;
	float: left;
  /* z-index: 999; */
  border:#00ffff solid 2px;
  
}
.right-top-container {
  position: absolute;
  right: 1%;
  top: 8%;
	width: 22%;
  background:linear-gradient(to left, rgba(24, 24, 32, 0) 0%, rgb(30, 42, 59) 100%);
	box-sizing: border-box;
	display: block;
	float: left;
  /* z-index: 999; */
  border:#00ffff solid 2px;
  height:210px;
  
}

.right-center-container {
  position: absolute;
  right: 1%;
  top: 30%;
	width: 22%;
  background:linear-gradient(to left, rgba(24, 24, 32, 0) 0%, rgb(30, 42, 59) 100%);
	box-sizing: border-box;
	display: block;
	float: left;
  /* z-index: 999; */
  border:#00ffff solid 2px;
  
}
.right-bottom-container {
  position: absolute;
  right: 1%;
  top: 65%;
	width: 22%;
  background:linear-gradient(to left, rgba(24, 24, 32, 0) 0%, rgb(30, 42, 59) 100%);
	box-sizing: border-box;
	display: block;
	float: left;
  /* z-index: 999; */
  border:#00ffff solid 2px;
  
}
.right-main-container {
	width: 78%;
	padding-left: 5px;
	box-sizing: border-box;
	display: block;
	float: left
}

.rmc-top-container {
	height: 65%;
	display: flex
}

.rmctc-left-container {
	width: 70%;
	display: flex
}

.rmctc-right-container {
	width: 30%;
  display: flex;
  padding-left: 5px;
}

.rmc-bottom-container {
	height: 35%;
	display: flex
}

.rmctc-chart-1,.rmctc-chart-2 {
	height: 50%;
	display: flex
}
/* 
#top-header {
  position: relative;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  flex-shrink: 0;}
  .header-center-decoration {
    width: 40%;
    height: 60px;
    margin-top: 12px;
  }
  .header-left-decoration, .header-right-decoration {
    width: 25%;
    height: 60px;
  }
  .center-title {
    position: absolute;
    font-size: 24px;
    font-weight: bold;
    left: 50%;
    top: 15px;
    transform: translateX(-50%);
  }
.header-fixed-decoration{width: 120px; height: 50px; line-height: 50px; text-align:center;margin-left:200px;} */
.dv-border-box-9 .border-box-content{padding: 0;cursor: pointer;color:#08e5ff}
</style>