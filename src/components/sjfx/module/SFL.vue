<template>
	<div>
	<!-- <el-card style="height: 95%;"> -->
		
	<!-- </el-card> -->
	<el-select v-model="sflCode" placeholder="请选择数据分析内容">
		<el-option
		v-for="item in sflCodeStr"
		:key="item.id"
		:label="item.text"
		:value="item.id">
		</el-option>
	</el-select>
	<h2 style="font-size: 14px;margin: 0px;padding: 10px 0px;">差异沉降均值极值</h2>
	<div id="comDataPanel"></div>
	</div>
</template>

<script>
export default {
	name: "SFL",
	components: {
  	},
    data() {
      return {
		  sflCodeStr:[],
		  sflCode:'',
      }
    },
	mounted() {
		this.getSysInfoCodeByMainCode();
		
  	},
	methods: {
		getSysInfoCodeByMainCode() {
			this.$axios.get(this.api.getSysInfoCodeByMainCode,{params:{maincode:'SFLPosition',maincodename :'',structure:this.GLOBAL.structure}}).then(response => {
				let objdata = JSON.parse(response)
				if(objdata.length>0){
					this.sflCodeStr = objdata
					this.sflCode = objdata[0].id
    			}
				console.log(objdata)
				
			});
		},
		// getTimeTypeInfo() {
		// 	this.$axios.get(this.api.getTimeTypeInfo,{params:{type : this.SensorByMonitType, para : this.SensorByMonitTypestr.id, structure : this.GLOBAL.structure}}).then(response => {
		// 		let objdata = JSON.parse(response)
		// 		if(objdata.length>0){
					
    	// 		}
		// 		console.log(objdata)
				
		// 	});
		// },
// 		changeSensor(selVal){
// 			this.currentsensorcode = selVal;
// 			this.MonitParaType = selVal.id;
// 			console.log(selVal)
// 3       	//this.name = selVal.label;
// 			this.getSjfxSensorInfo() 
// 		},
	},
	created () {
		//this.getMonitParaType()
	},
	
	computed: {
			//sensorcode()
		}
  }
</script>

<style>
</style>