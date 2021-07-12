<template>
<div id="welcome">
  <dv-full-screen-container>content</dv-full-screen-container>
    <el-row :gutter="10">
      <!-- 左边部分 -->
      <el-col :span="10" >
        <!-- 传感器实时显示信息 -->
        <el-card class="box-card">
        <div class="Echarts">
          <div id="main" style="width: 650px;height:400px;"></div>
        </div>
        </el-card>
        
      </el-col>
      <!-- 右边部分 ---->
      <el-col :span="14" >
        <div class="grid-content bg-purple">
          <!-- 项目概况 -->
        <el-card class="box-card" style="margin-top:20px;padding:0px;">
          <div id="introduce">
            <p style="width:100%">{{ introduceText }}</p>
          </div>
        </el-card>

          <!-- <el-calendar :v-model="new Date()"></el-calendar> -->
        </div>
      </el-col>
      <!-- 右边部分 --
      <el-col :span="14" >
        <div class="grid-content bg-purple">
          <el-card style="min-height:650px;">
           
          
          </el-card>
          <!-- <el-calendar :v-model="new Date()"></el-calendar> 
        </div>
      </el-col>-->
    </el-row>

    <!-- <el-card class="box-card">
           <el-calendar v-model="value"></el-calendar>
    </el-card>-->
  </div>
<!-- <div id="welcome">
  <el-row :gutter="10">
  <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content bg-purple"></div>
    <div class="Echarts">
    <div id="main" style="width: 600px;height:400px;"></div>
  </div>
  </el-col>
  <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple-light"></div></el-col>
  <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple"></div></el-col>
  <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content bg-purple-light"></div></el-col>
</el-row>
</div> -->


</template>

<script>
import { borderBox1 } from '@jiaminghi/data-view'

//Vue.use(borderBox1)
export default {
  data() {
    return {
      introduceText:'',
      structure:{structure:this.GLOBAL.structure},
    };
  },
  name: 'Echarts',
  methods:{
    async getobjdescribe() {
      await this.$http.get(this.api.getviewinfo,{params:this.structure}).then(response => {
        // var jsonParseJson=JSON.parse(data);
				// 	$("#banner").empty();
			 	// 	$.each(jsonParseJson,function(idx,rows)
				//  	{   
				//  		if(rows.paratype == 1){
				//   			$("#banner").append("<p style = 'text-indent:2em;text-align: left;padding:0px 10px 0px 20px;'> "+rows.parainfo+"</p>");
				// 		}else if (rows.paratype == 2){
				// 			$("#banner").append("<p><div style='text-align:center'><img src='"+rows.parainfo+"' style='width:80%'></div></p>");
				// 		}else if (rows.paratype == 3){
				// 			$("#title").append(rows.parainfo);
				// 		}
        // 	});	
      //   <section id="header">
			// 	<header>
			// 		<h1 id="title"></h1>
			// 		<p>工程简介</p>
			// 	</header>
			// </section>
		
			// <section id="banner">
				
			// </section>
        console.log(response.body)
        this.introduceText = response.body
      });},
	  myEcharts(){
		  // 基于准备好的dom，初始化echarts实例
		  var myChart = this.$echarts.init(document.getElementById('main'));

		  // 指定图表的配置项和数据
		 var option = {
           title: {
        text: '传感器实时监测统计',
        //subtext: '虚构数据',
        left: 'center'
    },
       color:['#67C23A','#E6A23C','#EF0E0E','#67C23A','#67C23A','#67C23A','#67C23A','#67C23A'],
  legend: {
    orient: "vertical",
    left: "left",
    data: ["ACC", "FGT", "FSG", "THM", "UAN", "INC", "CFS", "WLI"]
  },
  series: [{
    type: "pie",
    radius: ['40%', '55%'],
    data: [{
      value: 1,
      name: "ACC"
    }, {
      value: 1,
      name: "FGT"
    }, {
      value: 1,
      name: "FSG"
    }, {
      value: 1,
      name: "THM"
    }, {
      value: 1,
      name: "UAN"
    }
    , {
      value: 1,
      name: "INC"
    }
    , {
      value: 1,
      name: "CFS"
    }
    , {
      value: 1,
      name: "WLI"
    }],
     label: {
      fontWeight: "bolder",
      fontSize: 20
    },
    itemStyle: {
      color: null,
      borderType: "solid",
      borderWidth: 3,
      borderColor: "#fff"
    }
  }]
}


/*
window.onload = function() {
    setTimeout(startRotate, 500);
}
*/


		  // 使用刚指定的配置项和数据显示图表。
		  myChart.setOption(option);
		  }
  },
  mounted() {
    this.myEcharts();
    //this.getobjdescribe();
  }
}
</script>

<style>

</style>
