//绘制line型echart图表,ec为生成echarts的默认引用对象,lid为生成图表的DIV名称,arr为图表title名称,seriesName为图表series名称,marginSize为图表边距对象,splitFlag为是否对x轴时间进行分割,xAxisType为x轴类型
function initLineEcharts(ec, lid, arr, seriesName, marginSize, splitFlag, xAxisType) {
  // 基于准备好的dom，初始化echarts图表
  alert('yintu')
	var myChart = ec.init(document.getElementById(lid));
	// 图表的option信息
	var option = {
		// 图表title标题
		title : {
			text : arr,
			textStyle : {
				fontSize : 12,
				fontWeight : 'normal'
			}
		},
		// 图表提示信息
		tooltip : {
			show: true
		},
		// 图表的工具栏
		toolbox : {
			show : false,
			orient : 'horizontal',
			feature : {
				// 数据缩放
				dataZoom : {
					show : true
				},
				// 恢复初始
				restore : {
					show : true
				},
				// 数据分析
				dataView : {
					show : true,
					readOnly : true
				},
				// 类型转换
				magicType : {
					show : true,
					type : [ 'line', 'bar' ]
				},
				// 保存图片
				saveAsImage : {
					show : true
				}
			}
		},
		//加载动画时长
		animationDurationUpdate:10,
		//是否启用拖拽重计算特性，默认关闭(即值为false)
		calculable : false,
		// 图表的图例信息
		legend : {
			x:'center',
        	y:'top',
			data : seriesName
		},
		// 图表的X轴
		xAxis : [ {
			type : xAxisType,
			data : [ '-' ],
			axisLabel:{
				formatter: function(value){
					if(splitFlag == "Y"){
						var t=value.split(" ")[1];
						return t;
					}else{
						return value;
					}			                	
				}	
			}
		} ],
		// 图表的Y轴
		yAxis : [ {
			scale : true,
			type : 'value'
		} ],
		// 图表的边距信息
		grid : {
			x : marginSize.x,
			x2 : marginSize.x2,
			y : marginSize.y,
			y2 : marginSize.y2
		},
		// 动态生成序列信息
		series : function() {
			var serie = [];
			for (v in seriesName) {
				var item = {
					name : seriesName[v],
					type : 'line',
					data : [ 0 ],
					symbol : 'none'
				};
				serie.push(item);
			}
			return serie;
		}()
	};
	// 为echarts对象加载数据
	myChart.setOption(option);
	// 反馈为echarts信息
	return myChart;
}

function initBarEcharts(ec, lid, arr, seriesName, marginSize, splitFlag, xAxisType) {
	// 基于准备好的dom，初始化echarts图表
	var myChart = ec.init(document.getElementById(lid));
	// 图表的option信息
	var option = {
		// 图表title标题
		title : {
			text : arr,
			textStyle : {
				fontSize : 12,
				fontWeight : 'normal'
			}
		},
		// 图表提示信息
		tooltip : {
			show: true
		},
		// 图表的工具栏
		toolbox : {
			show : false,
			orient : 'horizontal',
			feature : {
				// 数据缩放
				dataZoom : {
					show : true
				},
				// 恢复初始
				restore : {
					show : true
				},
				// 数据分析
				dataView : {
					show : true,
					readOnly : true
				},
				// 类型转换
				magicType : {
					show : true,
					type : [ 'line', 'bar' ]
				},
				// 保存图片
				saveAsImage : {
					show : true
				}
			}
		},
		animationDurationUpdate:10,
		//是否启用拖拽重计算特性，默认关闭(即值为false)
		calculable : false,
		// 图表的图例信息
		legend : {
			x:'center',
        	y:'top',
//        	orient:'vertical',
			data : seriesName
		},
		// 图表的X轴
		xAxis : [ {
			name : '',
			nameLocation : 'end',
			type : xAxisType,
			data : [ '-' ]
		} ],
		// 图表的Y轴
		yAxis : [ {
//			name : '',
//		    nameLocation : 'end',
//			nameTextStyle : {
//				align : 'right',
//				baseline : 'middle',
//			},
			scale : true,
			type : 'value'
		} ],
		// 图表的边距信息
		grid : {
			x : marginSize.x,
			x2 : marginSize.x2,
			y : marginSize.y,
			y2 : marginSize.y2
		},
		// 动态生成序列信息
		series : function() {
			var serie = [];
			for (v in seriesName) {
				var item = {
					name : seriesName[v],
					type : 'bar',
					data : [ 0 ],
					symbol : 'none'
				}
				serie.push(item);
			}
			;
			return serie;
		}()
	};
	// 为echarts对象加载数据
	myChart.setOption(option);
	// 反馈为echarts信息
	return myChart;
}

function initScatterCharts(ec, lid, arr, seriesName, marginSize) {
	var myChart = ec.init(document.getElementById(lid));
	var option = {
		tooltip : {
			trigger : 'item',
			showDelay : 0
		},
		title : {
			text : arr,
			textStyle : {
				fontSize : 12,
				fontWeight : 'normal'
			}
		},
		toolbox : {
			show : false,
			feature : {
				// 数据缩放
				dataZoom : {
					show : true
				},
				// 恢复初始
				restore : {
					show : true
				},
				// 数据分析
				dataView : {
					show : true,
					readOnly : true
				},
				// 类型转换
				magicType : {
					show : true,
					type : [ 'line', 'bar' ]
				},
				// 保存图片
				saveAsImage : {
					show : true
				}
			}
		},
		//是否启用拖拽重计算特性，默认关闭(即值为false)
		calculable : false,
		legend : {
			data : seriesName
		},
		xAxis : [ {
			type : 'value',
			scale : true,
			data : [ 0 ]
		} ],
		yAxis : [ {
			type : 'value',
			scale : true
		} ],
		grid : {
			x : marginSize.x,
			x2 : marginSize.x2,
			y : marginSize.y,
			y2 : marginSize.y2
		},
		series : function() {
			var serie = [];
			for (v in seriesName) {
				var item = {
					name : seriesName[v],
					type : 'scatter',
					data : [ 0 ]
				}
				serie.push(item);
			}
			;
			return serie;
		}()
	};
	myChart.setOption(option);
	return myChart;
}

function initMixEcharts(ec, lid, arr, seriesName, marginSize, serieTypes) {
	// 基于准备好的dom，初始化echarts图表
	var myChart = ec.init(document.getElementById(lid));
	// 图表的option信息
	var option = {
		// 图表title标题
		title : {
			text : arr,
			textStyle : {
				fontSize : 12,
				fontWeight : 'normal'
			}
		},
		// 图表提示信息
		tooltip : {
			trigger : 'item'
		},
		// 图表的工具栏
		toolbox : {
			show : false,
			orient : 'horizontal',
			feature : {
				// 数据缩放
				dataZoom : {
					show : true
				},
				// 恢复初始
				restore : {
					show : true
				},
				// 数据分析
				dataView : {
					show : true,
					readOnly : true
				},
				// 类型转换
				magicType : {
					show : true,
					type : [ 'line', 'bar' ]
				},
				// 保存图片
				saveAsImage : {
					show : true
				}
			}
		},
		//是否启用拖拽重计算特性，默认关闭(即值为false)
		calculable : false,
		// 图表的图例信息
		legend : {
			data : seriesName
		},
		// 图表的X轴
		xAxis : [ {
			name : '',
			type : 'category',
			nameLocation : 'end',
			data : [ "-" ]
		} ],
		// 图表的Y轴
		yAxis : [ {
			name : '',
			nameLocation : 'end',
			nameTextStyle : {
				align : 'right',
				baseline : 'middle',
			},
			type : 'value'
		} ],
		// 图表的边距信息
		grid : {
			x : marginSize.x,
			x2 : marginSize.x2,
			y : marginSize.y,
			y2 : marginSize.y2
		},
		// 动态生成序列信息
		series : function() {
			var serie = [];
			for (v in seriesName) {
				var item = {
					name : seriesName[v],
					type : serieTypes[v],
					data : [ 0 ],
					symbol : 'none'
				}
				serie.push(item);
			}
			;
			return serie;
		}()
	};
	// 为echarts对象加载数据
	myChart.setOption(option);
	// 反馈为echarts信息
	return myChart;
}

// 绘制pie型echart图表
function initPieEcharts(ec, lid, arr) {
	// 基于准备好的dom，初始化echarts图表
	var myChart = ec.init(document.getElementById(lid));
	var option = {
		title : {
			text : arr,
			x : 'center',
			textStyle : {
				fontSize : 12,
				fontWeight : 'normal'
			}
		},
		tooltip : {
			trigger : 'item',
			formatter : "{a} <br/>{b} : {c} ({d}%)"
		},
		toolbox : {
			show : false,
			orient : 'horizontal',
			feature : {
				dataView : {
					show : true,
					readOnly : false
				},
				restore : {
					show : true
				},
				saveAsImage : {
					show : true
				}
			}
		},
		// calculable : true,
		legend : {
			orient : 'vertical',
			x : 'left',
			data : [ 0 ]
		},
		series : [ {
			type : 'pie',
			radius : '80%',
			center : [ '50%', '60%' ],
			data : [ 0 ]
		} ]
	};
	// 为echarts对象加载数据
	myChart.setOption(option);
	return myChart;
}
// 绘制Gauge型echart图表
function initGaugeEcharts(ec, lid, arr, unit, text){   
    var myChart = ec.init(document.getElementById(lid));
    var option = {
    		tooltip : {
		        formatter: "{b} : {c}"+unit
		    },
		    title : {
		    	x : 'right',
				text : arr,
				textStyle : {
					fontSize : 12,
					fontWeight : 'normal'
				}
			},
		    series : [
				        {
				            type:'gauge',
				            radius:[0, '90%'],
				            splitNumber: 10,       // 分割段数，默认为5
				            axisLine: {            // 坐标轴线
				                lineStyle: {       // 属性lineStyle控制线条样式
				                    color: [[0.2, '#48b'],[0.8, '#48b'],[1, '#48b']], 
				                    width: 8
				                }
				            },
				            axisTick: {            // 坐标轴小标记
				                splitNumber: 10,   // 每份split细分多少段
				                length :12,        // 属性length控制线长
				                lineStyle: {       // 属性lineStyle控制线条样式
				                    color: 'auto'
				                }
				            },
				            axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
				                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
				                    color: 'auto'
				                }
				            },
				            splitLine: {           // 分隔线
				                show: true,        // 默认显示，属性show控制显示与否
				                length :20,         // 属性length控制线长
				                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
				                    color: 'auto'
				                }
				            },
				            pointer : {
				                width : 5
				            },
				            title : {
				                show : true,
				                offsetCenter: [0, '-40%'],       // x, y，单位px
				                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
				                    fontWeight: 'bolder'
				                }
				            },
				            detail: {
				            	formatter: function(value){
									if(value == "数据中断"){
										return value;
									}else{
										return value+unit;
									}			                	
								},
				            	textStyle: {    
			                    	color: 'auto',
			                    	fontWeight: 'bolder',
			                    	fontSize : 15
			                	}
				            },
				            data:[{value: 0, name: text}]
				        }
				    ]
    };
    myChart.setOption(option); 
    return myChart;
}