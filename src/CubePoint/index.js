import React, { Component } from "react";
import "./index.css";
import * as THREE from "three";

var geometry, scene, points, vertices, attribute, colors, material, mesh, point, ambient, camera, renderer;
export default class Cube extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.timer = null;
  }
  componentDidMount() {
    // var geometry = new THREE.BoxGeometry(100, 100, 100);
    // geometry.rotateX(Math.PI / 4);
    this.animation();
  }

  // 1. 创建一个场景
  // 2. 创建模型
  // 3. 设置光源
  // 4. 创建相机，设置相机位置和相机镜头的朝向
  // 5. 创建3D渲染器，使用渲染器把创建的场景渲染出来
  initGeo() {
    scene = new THREE.Scene();
    // 在场景中添加雾的效果，Fog参数分别代表‘雾的颜色’、‘开始雾化的视线距离’、刚好雾化至看不见的视线距离’
    scene.fog = new THREE.Fog(0x000000, 0, 10000);
    scene.background = new THREE.Color(0xffffff);
    // 创建一个立方体
    /* ********* */
    // geometry = new THREE.BoxBufferGeometry(100, 100, 100);
    // 加载纹理
    // const a_ = new THREE.TextureLoader().load(
    //   "https://img.ljcdn.com/beike/ajax/m/1574229060592.jpg"
    // );
    // const b_ = new THREE.TextureLoader().load(
    //   "https://img.ljcdn.com/beike/ajax/m/1635846662207.jpg"
    // );
    // 创建网格材质（原料）
    // const material_1 = new THREE.MeshBasicMaterial({ map: a_ });
    // const material_2 = new THREE.MeshBasicMaterial({ map: b_ });
    // material = [
    //   ...new Array(3).fill(material_1),
    //   ...new Array(3).fill(material_2),
    // ];
    // material = new THREE.MeshPhongMaterial({
    //   color: 0xff76ff,
    //   flatShading: true,
    //   vertexColors: THREE.VertexColors,
    // });
    /* ********* */

    geometry = new THREE.BufferGeometry(); //声明一个缓冲几何体对象

    //类型数组创建顶点位置position数据
    vertices = new Float32Array([
      0, 0, 0, //顶点1坐标
      50, 0, 0, //顶点2坐标
      50, 50, 0, //顶点3坐标
      50, 50, 0, //顶点3坐标
      0, 50, 0, //顶点4坐标
      0, 0, 0, //顶点1坐标

      50, 0, 0, //顶点2坐标
      50, 50, 0, //顶点3坐标
      50, 50, 50, //顶点8坐标
      50, 50, 50, //顶点8坐标
      50, 0, 50, //顶点7坐标
      50, 0, 0, //顶点2坐标

      0, 0, 0, //顶点1坐标
      0, 50, 0, //顶点4坐标
      0, 50, 50, //顶点5坐标
      0, 50, 50, //顶点5坐标
      0, 0, 50, //顶点6坐标
      0, 0, 0, //顶点1坐标

      0, 50, 50, //顶点5坐标
      0, 0, 50, //顶点6坐标
      50, 0, 50, //顶点7坐标
      50, 0, 50, //顶点7坐标
      50, 50, 50, //顶点8坐标
      0, 50, 50, //顶点5坐标

      50, 50, 0, //顶点3坐标
      0, 50, 0, //顶点4坐标
      0, 50, 50, //顶点5坐标
      0, 50, 50, //顶点5坐标
      50, 50, 50, //顶点8坐标
      50, 50, 0, //顶点3坐标

      50, 0, 0, //顶点2坐标
      0, 0, 0, //顶点1坐标
      0, 0, 50, //顶点6坐标
      0, 0, 50, //顶点6坐标
      50, 0, 50, //顶点7坐标
      50, 0, 0, //顶点2坐标
    ]);
    // 创建属性缓冲区对象
    attribute = new THREE.BufferAttribute(vertices, 3); //3个为一组，作为一个顶点的xyz坐标
    // 设置几何体attributes属性的位置position属性
    geometry.attributes.position = attribute;
    //类型数组创建顶点颜色color数据
    colors = new Float32Array([
      1, 0, 0, //顶点1颜色
      0, 1, 0, //顶点2颜色
      0, 0, 1, //顶点3颜色
      0, 0, 1, //顶点3颜色
      1, 1, 0, //顶点4颜色
      1, 0, 0, //顶点1颜色

      0, 1, 0, //顶点2颜色
      0, 0, 1, //顶点3颜色
      1, 0, 1, //顶点8颜色
      1, 0, 1, //顶点8颜色
      1, 1, 1, //顶点7颜色
      0, 1, 0, //顶点2颜色

      1, 0, 0, //顶点1颜色
      1, 1, 0, //顶点4颜色
      0, 1, 1, //顶点5颜色
      0, 1, 1, //顶点5颜色
      1, 0, 1, //顶点6颜色
      1, 0, 0, //顶点1颜色

      0, 1, 1, //顶点5颜色
      1, 0, 1, //顶点6颜色
      1, 1, 1, //顶点7颜色
      1, 1, 1, //顶点7颜色
      1, 0, 1, //顶点8颜色
      0, 1, 1, //顶点5颜色

      0, 0, 1, //顶点3颜色
      1, 1, 0, //顶点4颜色
      0, 1, 1, //顶点5颜色
      0, 1, 1, //顶点5颜色
      1, 0, 1, //顶点8颜色
      0, 0, 1, //顶点3颜色

      0, 1, 0, //顶点2颜色
      1, 0, 0, //顶点1颜色
      1, 0, 1, //顶点6颜色
      1, 0, 1, //顶点6颜色
      1, 1, 1, //顶点7颜色
      0, 1, 0, //顶点2颜色
    ]);
    // 设置几何体attributes属性的颜色color属性
    geometry.attributes.color = new THREE.BufferAttribute(colors, 3); //3个为一组,表示一个顶点的颜色数据RGB
    //材质对象
    material = new THREE.PointsMaterial({
      // 使用顶点颜色数据渲染模型，不需要再定义color属性
      // color: 0xff0000,
      side: THREE.DoubleSide, // 双面渲染，否则旋转到某个角度有些面就看不到了，默认单面渲染
      vertexColors: THREE.VertexColors, //以顶点颜色为准
      size: 2.0, //点对象像素尺寸
    });
    // points = new THREE.Points(geometry, material); //点模型对象
    // scene.add(points);
    console.log("geometry", geometry);
    console.log("顶点位置数据", geometry.vertices);
    // 网格模型对象Mesh，生成网格
    mesh = new THREE.Mesh(geometry, material);
    // 网格模型添加到场景中
    scene.add(mesh);

    // 创建点光源
    point = new THREE.PointLight(0xffffff);
    point.position.set(100, 100, 100);
    scene.add(point);
    // 创建环境光
    ambient = new THREE.AmbientLight(0x4433ff);
    // 把光源放入场景中
    scene.add(ambient);

    var width = window.innerWidth; //窗口宽度
    var height = window.innerHeight; //窗口高度
    var k = width / height; //窗口宽高比
    var s = 100; //三维场景显示范围控制系数，系数越大，显示的范围越大
    // 创建相机对象
    camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 800);
    camera.position.set(100, 400, 100); //设置相机位置
    camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

    // 创建webgl渲染器实例
    renderer = new THREE.WebGLRenderer(); // antialias 抗锯齿
    renderer.setPixelRatio(window.devicePixelRatio);
    // 设置渲染器画布的大小
    renderer.setSize(window.innerWidth, window.innerHeight - 50);
    // 把画布实例（canvas）放入容器中
    document.body.appendChild(renderer.domElement);
  }

  // 动画刷新
  animation() {
    // console.log('animation', geometry)
    !geometry && this.initGeo();
    // if(!this.timer){
    //   this.timer = setInterval(()=> {
    //     // console.log('setInterval', geometry);
    //     this.update()
    //   }, 1000)
    // }
    this.update();
    window.requestAnimationFrame(this.animation.bind(this));
  }

  update() {
    mesh.rotateX(Math.PI / 180);
    mesh.rotateY(Math.PI / 180);
    mesh.rotateZ(Math.PI / 180);
    // mesh.rotation.x += 0.01;
    // mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
    // console.log('update', geometry);
  }

  render() {
    return (
      <div className="cube-demo">
        <div className="demo-title">webGL demo 旋转的立方体</div>
        {/* <canvas id="webgl-cube" width="300" height="375"></canvas> */}
      </div>
    );
  }
}
