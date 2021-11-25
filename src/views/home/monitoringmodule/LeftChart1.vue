<template>
  <div class="left-chart-1">
	<div id="topCharts"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: 'LeftCharts',
  data () {
    return {
      
    }
  },
  mounted(){
    this.drawLine();
    window.setInterval(() => {
    setTimeout(() => {
        this.drawLine();
        }, 0)
        }, 300000)
  },
  methods: {
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('topCharts'))
        // 绘制图表
        myChart.setOption({
          title: { text: '在线离线结构',
          left: 'center',//主副标题的水平位置
          top: 'top',//主副标题的垂直位置
          padding: 5,//标题内边距,
          //backgroundColor: '#ccc',//背景颜色；
          //borderColor: '#000',//边框的颜色
          //borderWidth: 1,//标签线框
          //borderRadius: 10,//边框切圆角
          // shadowBlur: 10,//图形阴影模糊大小.
          // shadowColor: 'aqua',//阴影颜色
          // shadowOffsetX: '60',//阴影水平方向上的偏移距离
          // shadowOffsetY: '70',//阴影垂直方向上的偏移距离
          textStyle:{color:'#fff',fontSize:14}},
          
          tooltip: {trigger: 'item'},
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          legend: {
              textStyle: { //图例文字的样式
                  color: '#fff',
                  fontSize: 12
              },
              type: 'scroll',
              orient: 'vertical',
              left: 10,
              top: 20,
              bottom: 20,
          },
          series: [
            {
            name: '',
            type: 'pie',
            radius: '50%',

            labelLine:{  
                normal:{  
                      length:5,  // 改变标示线的长度
                      lineStyle: {
                        color: "#fff"  // 改变标示线的颜色
                      }
                },
            },
            label: {
                normal: {
                      textStyle: {
                            color: '#fff'  // 改变标示文字的颜色
                      }
                }
            },
            data: [
              { value: 1, name: '在线结构' },
              { value: 0, name: '离线结构' },
              
            ],
            itemStyle: {
                      emphasis: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      },
                      normal: {
                          color: function(params) {
                            var colorList = [
                      {
                          c1: ' #01ccfe',  //实践
                          c2: '#1268f3'
                      },
                      {
                          c1: '#00c18c',//操作
                          c2: '#5FE2E4'
                      }]
                        return new echarts.graphic.LinearGradient(1, 0, 0, 0, [{ //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上

                          offset: 0,
                          color: colorList[params.dataIndex].c1
                      }, {
                          offset: 1,
                          color: colorList[params.dataIndex].c2
                      }])                                    
                    /*  return colorList[params.dataIndex]*/
                  }
              }
          },
				emphasis: {
					itemStyle: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
				}
			]
        });
    }
  }
}
</script>

<style lang="less">
.left-chart-1 {
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  background: #10152f
 }

#topCharts {height:350px;width: 100%;}
</style>