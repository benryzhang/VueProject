//绘制line型echart图表,ec为生成echarts的默认引用对象,lid为生成图表的DIV名称,arr为图表title名称,seriesName为图表series名称,marginSize为图表边距对象
function initLineEcharts(ec, lid, arr, seriesName, marginSize, sizeFlag) {
	// 基于准备好的dom，初始化echarts图表
	if(sizeFlag == undefined || sizeFlag == "N"){
		marginSize = { "x" : 80, "x2" : 45,"y" : 40, "y2" : 30 };
	}
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
		calculable : true,
		// 图表的图例信息
		legend : {
			x:'center',
        	y:'top',
			data : seriesName
		},
		// 图表的X轴
		xAxis : [ {
			name : '',
			type : 'category',
			data : [ "-" ]
		} ],
		// 图表的Y轴
		yAxis : [ {
			name : '',
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

function initBarEcharts(ec, lid, arr, seriesName, marginSize, sizeFlag) {
	if(sizeFlag == undefined || sizeFlag == "N"){
		marginSize = { "x" : 80, "x2" : 45,"y" : 40, "y2" : 30 };
	}
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
					readOnly : false
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
		calculable : false,
		// 图表的图例信息
		legend : {
			orient : 'vertical',
			data : seriesName
		},
		// 图表的X轴
		xAxis : [ {
			name : '',
			type : 'category',
			data : [ "-" ]
		} ],
		// 图表的Y轴
		yAxis : [ {
			name : '',
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

function initScatterCharts(ec, lid, arr, seriesName, marginSize, sizeFlag) {
	if(sizeFlag == undefined || sizeFlag == "N"){
		marginSize = { "x" : 80, "x2" : 45,"y" : 40, "y2" : 30 };
	}
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
				dataView : {
					show : true,
					readOnly : false
				},
				dataZoom : {
					show : true
				},
				restore : {
					show : true
				},
				saveAsImage : {
					show : true
				}
			}
		},
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
				};
				serie.push(item);
			}
			return serie;
		}()
	};
	myChart.setOption(option);
	return myChart;
}

function initMixEcharts(ec, lid, arr, seriesName, marginSize, serieTypes, sizeFlag) {
	if(sizeFlag == undefined || sizeFlag == "N"){
		marginSize = { "x" : 80, "x2" : 45,"y" : 40, "y2" : 30 };
	}
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
					readOnly : false
				},
				// 类型转换
				magicType : {
					show : true,
					type : serieTypes
				},
				// 保存图片
				saveAsImage : {
					show : true
				}
			}
		},
		calculable : false,
		// 图表的图例信息
		legend : {
			data : seriesName
		},
		// 图表的X轴
		xAxis : [ {
			name : '',
			type : 'category',
			data : [ "-" ]
		} ],
		// 图表的Y轴
		yAxis : [ {
			name : '',
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

