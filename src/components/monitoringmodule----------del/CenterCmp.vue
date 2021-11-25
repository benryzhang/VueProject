<template>
  <div class="left-chart-1">
    <!-- <div class="lc1-header">胶囊柱图</div> -->
    <div class="lc1-details">设备运行总数<span>430</span></div>
    <div id="main" style="height:400px;"></div>
    <!-- <dv-capsule-chart class="lc1-chart" :config="config" />
    <dv-decoration-2 style="height:10px;" />
    <dv-decoration-3 style="height:20px;" /> -->
    
  </div>
</template>

<script>
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
		 var 
option = {
    title: {
        text: '动态数据',
        subtext: '纯属虚构'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#283b56'
            }
        }
    },
    legend: {
        data:['均值极值', '预购队列']
    },
    
    toolbox: {
        show: true,
        feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
        }
    },
    dataZoom: {
        show: false,
        start: 0,
        end: 100
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: true,
            data: (function (){
                var now = new Date();
                var res = [];
                var len = 10;
                while (len--) {
                    res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
                    now = new Date(now - 2000);
                }
                return res;
            })()
        },
        {
            type: 'category',
            boundaryGap: true,
            data: (function (){
                var res = [];
                var len = 10;
                while (len--) {
                    res.push(10 - len - 1);
                }
                return res;
            })()
        }
    ],
    yAxis: [
        {
            type: 'value',
            scale: true,
            name: '价格',
            max: 30,
            min: 0,
            boundaryGap: [0.2, 0.2]
        },
        {
            type: 'value',
            scale: true,
            name: '预购量',
            max: 1200,
            min: 0,
            boundaryGap: [0.2, 0.2]
        }
    ],
    series: [
        {
            name: '预购队列',
            type: 'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: (function (){
                var res = [];
                var len = 10;
                while (len--) {
                    res.push(Math.round(Math.random() * 1000));
                }
                return res;
            })()
        },
        {
            name: '最新成交价',
            type: 'line',
            data: (function (){
                var res = [];
                var len = 0;
                while (len < 10) {
                    res.push((Math.random()*10 + 5).toFixed(1) - 0);
                    len++;
                }
                return res;
            })()
        }
    ]
};

app.count = 11;
setInterval(function (){
    var axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');

    var data0 = option.series[0].data;
    var data1 = option.series[1].data;
    data0.shift();
    data0.push(Math.round(Math.random() * 1000));
    data1.shift();
    data1.push((Math.random() * 10 + 5).toFixed(1) - 0);

    option.xAxis[0].data.shift();
    option.xAxis[0].data.push(axisData);
    option.xAxis[1].data.shift();
    option.xAxis[1].data.push(app.count++);

    myChart.setOption(option);
}, 2100);

//option && myChart.setOption(option);


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