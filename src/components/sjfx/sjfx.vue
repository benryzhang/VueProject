<template>
<div>
	<el-card style="height: 20%;">

  <el-select v-model="MonitParaType" placeholder="请选择监测类别">
    <el-option
      v-for="item in MonitParaTypeStr"
      :key="item.code"
      :label="item.name"
      :value="item.code">
      <!-- <span style="float: left">{{ item.code }}</span> -->
      <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name }}</span> -->
    </el-option>
  </el-select>
  <el-select v-model="SensorByMonitType" @change="changeSensor" placeholder="请选择监测内容">
    <el-option
      v-for="item in SensorByMonitTypestr"
      :key="item.children[0].id"
      :label="item.text"
      :value="item.children[0].id">
      <span style="float: left">{{ item.id }}</span>
      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.children[0].text}}</span>
    </el-option>
  </el-select>
  <el-select v-model="SjfxSensor" placeholder="请选择传感器编号">
    <el-option
      v-for="item in SjfxSensorInfostr"
      :key="item.id"
      :label="item.text"
      :value="item.id">
    </el-option>
  </el-select>
  <!-- <el-select v-model="year" placeholder="年度选择">
    <el-option
      v-for="item in yearStr"
      :key="item.value"
      :label="item.label"
      :value="item.value">
      <span style="float: left">{{ item.label }}</span>
      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
    </el-option>
  </el-select> -->
  <!-- <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in yearStr"
      :key="item.value"
      :label="item.label"
      :value="item.value">
      <span style="float: left">{{ item.label }}</span>
      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
    </el-option>
  </el-select>
  <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in yearStr"
      :key="item.value"
      :label="item.label"
      :value="item.value">
      <span style="float: left">{{ item.label }}</span>
      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
    </el-option>
  </el-select>
  <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in yearStr"
      :key="item.value"
      :label="item.label"
      :value="item.value">
      <span style="float: left">{{ item.label }}</span>
      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
    </el-option>
  </el-select>
  <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in yearStr"
      :key="item.value"
      :label="item.label"
      :value="item.value">
      <span style="float: left">{{ item.label }}</span>
      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
    </el-option>
  </el-select> -->
  <el-button type="primary">查询s</el-button>
</el-card>

<el-card style="height: 80%;">
	<!-- <div :is="sensorcode"></div> -->
	<div :is="currentsensorcode"></div>
	<!-- <SFL/> -->
</el-card>
</div>
</template>

<script>
import SFL from "./module/SFL.vue";
import FGT from "./module/FGT.vue";
import ACC from "./module/ACC.vue";
import SMS from "./module/SMS.vue";
import INC from "./module/INC.vue";
import DIS from "./module/DIS.vue";
import THM from "./module/MTH.vue";
import FSG from "./module/FSG.vue";
  export default {
	name: "sjfx",
	components: {
		SFL,
		FGT,
		FSG,
		INC,
		ACC,
		THM,
		SMS,
		DIS
  	},
    data() {
      return {
		SFL:SFL,
		FGT:FGT,
		FSG:FSG,
		INC:INC,
		ACC:ACC,
		THM:THM,
		SMS:SMS,
		DIS:DIS,
		currentsensorcode: 'ACC',
		MonitParaTypeStr:[],
        MonitParaType: '',
		SensorByMonitTypestr:[],
		SensorByMonitType:'',
		SjfxSensorInfostr:[],
		SjfxSensorInfo:'',
		SjfxSensor:'',
		yearStr:[],
		year:'',
		value:'',
		sensorcode:''
      }
    },
	mounted() {
		this.getMonitParaType();
		this.getSensorByMonitType();
		this.getSysInfoCodeByMainCode();
		
  	},
	methods: {
		getMonitParaType() {
			this.$axios.get(this.api.getMonitParaType,{params:this.GLOBAL.structure}).then(response => {
				let objdata = JSON.parse(response)
				this.MonitParaTypeStr = objdata.root
				this.MonitParaType = objdata.root[0].name;
				
			});
		},
		getSensorByMonitType() {
			this.$axios.get(this.api.getSensorByMonitType,{params:this.GLOBAL.structure}).then(response => {
				let objdata = JSON.parse(response)
				
				this.SensorByMonitTypestr = objdata
				//console.log(objdata[0].children[0].children[0].text)
				this.SensorByMonitType = objdata[0].children[0].id;
				// this.SensorByMonitType = objdata.root[0].name;
				this.getSjfxSensorInfo();
				
			});
		},
		// getSjfxSensorInfo() {
		// 	console.log(this.SensorByMonitType+ 'sd')
		// 	this.$axios.get(this.api.getSjfxSensorInfo,{params:{type:this.SensorByMonitType,para:'sensor',component:'["SXWBDUXINGANGBAN"]',monitpara:'结构振动',structure:this.GLOBAL.structure}}).then(response => {
		// 		let objdata = JSON.parse(response)
		// 		console.log(objdata)
		// 		this.SjfxSensorInfostr = objdata
		// 		this.SjfxSensorInfo = objdata.id
		// 		//this.SjfxSensor = objdata[0].id
		// 		this.getTimeTypeInfo()
		// 	});
		// },
		getSysInfoCodeByMainCode() {
			this.$axios.get(this.api.getSysInfoCodeByMainCode,{params:{maincode:'SJFXDefaultType',maincodename :'',structure:this.GLOBAL.structure}}).then(response => {
				let objdata = JSON.parse(response)
				if(objdata.length>0){
					
    			}
				console.log(objdata)
				
			});
		},
		getTimeTypeInfo() {
			this.$axios.get(this.api.getTimeTypeInfo,{params:{type : this.SensorByMonitType, para : this.SensorByMonitTypestr.id, structure : this.GLOBAL.structure}}).then(response => {
				let objdata = JSON.parse(response)
				if(objdata.length>0){
					
    			}
				console.log(objdata)
				
			});
		},
		changeSensor(selVal){
			this.currentsensorcode = selVal;
			this.MonitParaType = selVal.id;
			console.log(selVal)
3       	//this.name = selVal.label;
			this.getSjfxSensorInfo() 
		},
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
