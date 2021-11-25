<template>
<div id="welcome">
  <div>
    <div id="container"></div>
  </div>
</div>
         <!-- <div class="grid-content bg-purple">
          <el-card style="width:100%;height:100%">
           
          
          </el-card>
         <el-calendar :v-model="new Date()"></el-calendar> 
        </div>-->
 

    <!-- <el-card class="box-card">
           <el-calendar v-model="value"></el-calendar>
    </el-card>
  </div>-->
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
import * as THREE from 'three'
import { OBJLoader, MTLLoader } from "three-obj-mtl-loader";
import { CSS2DRenderer, CSS2DObject } from "three-css2drender";
const OrbitControls = require("three-orbit-controls")(THREE);
export default {
  name: "vue-three",
  data() {
    return {
      texts: {
        code: "",
        type: "",
      },
      dragTop: -100,
      dragLeft: -200,
      widthBox: '',
      heightBox: '',
      cabinetData: [
      ],
      scene: "",
      light: "",
      camera: "",
      controls: "",
      renderer: "",
      
    };
  },
  methods: {
    //初始化three.js相关内容
    init() {
      this.scene = new THREE.Scene();
      //this.scene.background = new THREE.Color(0xf0f0f0);
      this.scene.add(new THREE.AmbientLight(0x505050)); //环境光
      this.light = new THREE.DirectionalLight(0x1e90ff, 1); //从正上方（不是位置）照射过来的平行光，0.45的强度
      this.light.position.set(0, 0, 420);
      ////this.light.position.multiplyScalar(0.3);
      this.scene.add(this.light);
      //var axisHelper = new THREE.AxisHelper(20); //参数是坐标轴的长度
      //this.scene.add(new THREE.AmbientLight(0x505050));
      const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4); //环境光
      this.scene.add(ambientLight);
      //const pointLight = new THREE.PointLight(0xffffff, 0.8);//点光源
      //this.camera.add(pointLight);

      // var light = new THREE.PointLight(0x1e90ff);
      // this.light.position.set(0, 0, 420);
      // this.scene.add(this.light);
      //this.scene.add(axisHelper);
      //初始化相机
      this.camera = new THREE.PerspectiveCamera(40,window.innerWidth / (window.innerHeight),1,200000000);
      this.camera.position.set(-360 ,0, 240);
      //const pointLight = new THREE.PointLight(0xffffff, 0.8);//点光源
      //this.camera.add(pointLight);
      this.camera.lookAt(this.scene.position);
      //初始化控制器
      this.controls = new OrbitControls(this.camera);
      // this.controls.target.set(0, 0, 0);
      // this.controls.minDistance = 80;
      // this.controls.maxDistance = 400;
      // this.controls.maxPolarAngle = Math.PI / 3;
      this.controls.rotateSpeed = 1;
      this.controls.zoomSpeed = 1;
      this.controls.noZoom = false;// 控制是否缩放
      this.controls.noPan = false; // 控制右键是否平移
      this.controls.update();
      //渲染
      this.renderer = new THREE.WebGLRenderer({
        alpha: true,
      });
      this.renderer.setClearColor(0xffffff);
      this.renderer.setPixelRatio(window.devicePixelRatio); //为了兼容高清屏幕
      this.renderer.setSize(window.innerWidth, window.innerHeight);
 
      const container = document.getElementById("container");
      container.appendChild(this.renderer.domElement);
      window.addEventListener("resize", this.onWindowResize, false); //添加窗口监听事件（resize-onresize即窗口或框架被重新调整大小）
    },
    //窗口监听函数
    onWindowResize() {
      this.camera.aspect = window.innerWidth /(window.innerHeight);
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, (window.innerHeight));
    },
    animate() {
      this.controls.update();
      requestAnimationFrame(this.animate);
      this.render();
    },
    render() {
      this.renderer.render(this.scene, this.camera);
    },
    //外部模型加载函数
    loadObj() {
      let objLoader = new OBJLoader();
      let mtlLoader = new MTLLoader();
      let _this = this;
      //包含材质
      // mtlLoader.setPath("/static/models/")
      mtlLoader.load("/model/bridge.mtl", (materials) => {
        // console.log("acm", acm);
        // materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load("/model/bridge.obj", (obj) => {
          // obj.scale.set(30, 30, 30);
          // obj.position.set(0, 0, 0);
          _this.oldChildren = _this.dealMeshMaterial(obj.children);
          obj.position.set(-45, 0, 0); //模型摆放的位置
          //obj.scale.set(0.1, 0.01, 0.01); //模型放大或缩小，有的时候看不到模型，考虑是不是模型太小或太大。
          this.scene.add(obj);
        });
      });
    },
    /**
     * 留住每个模型的原材质
     */
    dealMeshMaterial(arrs) {
      let result = [];
      for (let i = 0; i < arrs.length; i++) {
        let obj = {
          name: arrs[i].name,
          material: arrs[i].material,
        };
        result.push(obj);
      }
      return result;
    },
    /**
     * 用户交换事件
     */
    initControls() {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      // 拉近摄像头
      this.controls.minDistance = 5;
      this.controls.maxDistance = 600;
      // 垂直旋转
      this.controls.maxPolarAngle = Math.PI / 2;
      this.controls.minPolarAngle = Math.PI / 4;
 
      this.controls.target.set(0, 5, 0);
      this.controls.autoRotate = false;
      this.controls.autoRotateSpeed = 0.5;
    },
    /**
     * 点击事件
     */
    mouseClick(event) {
      // 还原之前的 点击状态
      this.restore(this.scene.children[3].children, this.oldChildren);
      // 获取 raycaster 和所有模型相交的数组，其中的元素按照距离排序，越近的越靠前
      let intersects = this.getIntersects(event);
      console.log('点击了对象：'+intersects);
      // 获取选中最近的 Mesh 对象
      if (
        intersects.length != 0 &&
        intersects[0].object instanceof THREE.Mesh
      ) {
        let selectObject = intersects[0].object;
        this.showObject(selectObject, event);
      }
    },
    /**点击事件，高亮的原理是之前先备份一份原材质，在点击之前先还原，最后通过new THREE.材质map 使用原来记录的材质map添加一个高亮颜色就可以了*/
    restore(arrsNew, arrsOld) {
      for (let i = 0; i < arrsNew.length; i++) {
        for (let j = 0; j < arrsOld.length; j++) {
          if (arrsNew[i].name === arrsOld[j].name) {
            arrsNew[i].material = arrsOld[j].material;
            break;
          }
        }
      }
    },
    /**
     * 展示点击内容
     */
    showObject(obj, event) {
      console.log(obj.name);
      let key = obj.name;
      let objs = this.cabinetData.filter((item) => {
        return item.code === key;
      });
      // 显示内容，高亮
      if (objs.length > 0) {
        let oldOneMaterial = this.oldChildren.filter(
          (item) => item.name === key
        )[0];
        obj.material = new THREE.MeshPhongMaterial({
          color: 0xfff,
          map: oldOneMaterial.material.map,
        });
        // oldOneMaterial.material.visible = false;
        //obj.material.visible = false;
        this.texts = objs[0];
        // 处理坐标
        this.dragTop = event.clientY - 50;
        this.dragLeft = event.clientX - 100;
      }
    },
    /**
     * 将屏幕坐标转换为3d 坐标
     */
    getIntersects(event) {
      var mainCanvas=event.path[0];
      event.preventDefault();
      var raycaster = new THREE.Raycaster();
      var mouse = new THREE.Vector2();
      // mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      // mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      mouse.x = ((event.clientX - mainCanvas.getBoundingClientRect().left)/mainCanvas.offsetWidth) * 2 - 1;
      mouse.y = -((event.clientY - mainCanvas.getBoundingClientRect().top)/mainCanvas.offsetHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, this.camera);
      var intersects = raycaster.intersectObjects(this.scene.children, true);
      return intersects;
    },
  },
  mounted() {
    this.init();
    this.loadObj();
    this.animate();
  },
};

  // export default {
  //   name: 'ThreeTest',
  //   data () {
  //     return {
  //       camera: null,
  //       scene: null,
  //       renderer: null,
  //       mesh: null
  //     }
  //   },
  //   methods: {
  //     init: function () {
  //       //alert('s')
  //       let container = document.getElementById('container')
  //       //this.camera = new Three.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 0.01, 10)
  //       this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 2000000);
  //       this.camera.position.set(0, 0, 300);
        
  //       this.controls = new THREE.OrbitControls(camera);
  //       this.controls.rotateSpeed = 1;
  //       this.controls.zoomSpeed = 1;
  //       this.controls.noZoom = false;// 控制是否缩放
  //       this.controls.noPan = false; // 控制右键是否平移
  //       this.scene = new THREE.Scene;
  //       this.scene.add(new THREE.AmbientLight(0x505050));
  //       let plight = new THREE.PointLight(13421772);
  //       this.plight.position = camera.position;
  //       this.scene.add(plight);

  //       (new THREE.OBJMTLLoader(manager)).load('model/bridge.obj', 'model/bridge.mtl', function(a) {
  //         a.traverse(function(subobj) {
  //           if (subobj instanceof THREE.Mesh) {
  //             children.push(subobj);
  //           }
  //         });
  //         // a.rotation.y+=Math.PI/2;//旋转180°
  //         // a.position.x=-250;
  //         this.scene.add(a);
  //         $("div#message").text("").hide();
  //       }, function(a) {$("div#message").text( "\u6b63\u5728\u52a0\u8f7d\u6a21\u578b " + (Math.round(a.loaded / a.total * 100) + "%") + " (" + Math.round(a.loaded / 1024 / 1024 * 10) / 10 + "M/" + Math.round(a.total / 1024 / 1024 * 10) / 10 + "M)"); });
  //       renderer = new THREE.WebGLRenderer({ antialias : true });
  //       renderer.setClearColor(0xffffff);
  //       renderer.setSize(window.innerWidth, window.innerHeight);
  //       container.appendChild(renderer.domElement);
  //       renderer.domElement.addEventListener("click", onDocumentMouseDown, false);
  //       renderer.domElement.addEventListener("mousemove", onDocumentMouseMove, false);
  //       window.addEventListener("resize", onWindowResize, false);
  //       //this.camera.position.z = 0.6
  //       // this.scene = new Three.Scene()
  //       // let geometry = new Three.BoxGeometry(0.2, 0.2, 0.2)
  //       // let material = new Three.MeshNormalMaterial()
  //       // this.mesh = new Three.Mesh(geometry, material)
  //       // //this.scene.add(this.camera)

  //       // this.renderer = new Three.WebGLRenderer({antialias: true})
  //       // this.renderer.setSize(container.clientWidth, container.clientHeight)

  //       // //var scene = new THREE.Scene()
  //       // //scene.add(camera)
  //       // new OBJLoader().load('model/bridge.obj' , obj => {
  //       //   scene.add(obj)
  //       // })
  //       //container.appendChild(this.renderer.domElement)
  //     },
  //     animate: function () {
  //       // renderer.render(scene, camera)
  //       // stats.update()
  //       // controls.update()
  //       // requestAnimationFrame(this.animate)//再次调用animate方法实现刷新
  //        requestAnimationFrame(this.animate)
  //       // this.mesh.rotation.x += 0.01
  //       // this.mesh.rotation.y += 0.02
  //        this.renderer.render(this.scene, this.camera)
  //     }
  //   },
  //   mounted () {
  //     this.init()
  //     this.animate()
  //   }
  // }
</script>
<style scoped>
  #container {
  
  margin: 0 auto;

  overflow: hidden;
}
 
.text {
  position: absolute;
  font-size: 40px;
  color: #47fff8;
  left: 40px;
  bottom: 60px;
  cursor: pointer;
  animation: glow-animation 2s linear infinite alternate;
}
.moveText {
  position: absolute;
  padding: 10px;
  background: rgba(154, 200, 225, 0.3);  
}
@keyframes glow-animation {
  0% {
    font-size: 40px;
  }
  50% {
    font-size: 42px;
  }
  100% {
    font-size: 44px;
  }
}
</style>
