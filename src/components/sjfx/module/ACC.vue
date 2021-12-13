<template>
	<div>
	<!-- <el-card style="height: 95%;"> -->
		
	<!-- </el-card> -->
	<el-select v-model="comComponent" placeholder="请选择构件名称" @change="comOnSelect">
		<el-option
		v-for="item in comComponentStr"
		:key="item.id"
		:label="item.text"
		:value="item.id">
		</el-option>
	</el-select>
	<el-select v-model="accCode" placeholder="请选择数据分析内容">
		<el-option
		v-for="item in accCodeStr"
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
//import commentListVue from '../../../../../vue2-element-touzi-admin-dev-permission/src/page/index/components/commentList.vue';
export default {
	name: "ACC",
	components: {
  	},
    data() {
      return {
			sflCodeStr:[],
			sflCode:'',
			comComponentStr:[],
			comComponent:'',
			currentSensorTypeCode:'ACC',
			timeMode:'R',
      }
    },
	mounted() {
		this.getSjfxSensorInfo();
		
  	},
	methods: {
		// getSysInfoCodeByMainCode() {
		// 	this.$axios.get(this.api.getSysInfoCodeByMainCode,{params:{maincode:'SFLPosition',maincodename :'',structure:this.GLOBAL.structure}}).then(response => {
		// 		let objdata = JSON.parse(response)
		// 		if(objdata.length>0){
		// 			this.sflCodeStr = objdata
		// 			this.sflCode = objdata[0].id
    	// 		}
		// 		console.log(objdata)
				
		// 	});
		// },
		getSjfxSensorInfo() {
			//console.log(this.SensorByMonitType+ 'sd')
			this.$axios.get(this.api.getSjfxSensorInfo,{params:{type:this.currentSensorTypeCode,para:'sensor',component:'',monitpara:'结构振动',structure:this.GLOBAL.structure}}).then(response => {
				let objdata = JSON.parse(response)
				console.log(objdata)
				this.comComponentStr = objdata
				//this.comComponent = objdata.id
				this.comComponent = objdata[0].id
				//this.getTimeTypeInfo()
				//this.comOnSelect()
			});
		},
		comOnSelect(){
			// let component = JSON.stringify(this.comComponent)
			// //let ds = component.split(',')
			// console.log(component)
			// this.$axios.get(this.api.getSjfxSensorInfo,{params:{type:this.currentSensorTypeCode,para:'sensor',component:this.comComponent,monitpara:'结构振动',structure:this.GLOBAL.structure}}).then(response => {
			// 	let objdata = JSON.parse(response)
			// 	console.log(objdata)
			// 	//this.comComponentStr = objdata
			// 	//this.comComponent = objdata.id
			// 	//this.comComponent = objdata[0].id
			// 	//this.getTimeTypeInfo()
			// });
		}
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