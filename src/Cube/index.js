import React, { Component } from "react";
import "./index.css";
import * as THREE from 'three';

var geometry, scene, material, mesh, point, ambient, camera, renderer
export default class Cube extends Component {
  constructor(props){
    super(props)
    this.state= {}
    this.timer = null
  }
  componentDidMount() {
    // var geometry = new THREE.BoxGeometry(100, 100, 100);
    // geometry.rotateX(Math.PI / 4);
    this.animation()
  }
  
  initGeo(){
    scene = new THREE.Scene();
    geometry = new THREE.BoxGeometry(100, 100, 100);
    const a_ = new THREE.TextureLoader().load( 'https://img.ljcdn.com/beike/ajax/m/1574229060592.jpg' );
    const b_ = new THREE.TextureLoader().load('https://img.ljcdn.com/beike/ajax/m/1635846662207.jpg')
    const material_1 = new THREE.MeshBasicMaterial( { map: a_ } );
    const material_2 = new THREE.MeshBasicMaterial( { map: b_ } );
    material = [...new Array(3).fill(material_1), ...new Array(3).fill(material_2)]
    // material = new THREE.MeshLambertMaterial({
    //   color: 0xff76ff
    // }); //材质对象Material
    mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    scene.add(mesh); //网格模型添加到场景中
    point = new THREE.PointLight(0x4433ff);
    point.position.set(100, 100, 100); //点光源位置
    scene.add(point); //点光源添加到场景中

    ambient = new THREE.AmbientLight(0x444444);
    scene.add(ambient);
    var width = window.innerWidth; //窗口宽度
    var height = window.innerHeight; //窗口高度
    var k = width / height; //窗口宽高比
    var s = 220; //三维场景显示范围控制系数，系数越大，显示的范围越大
    //创建相机对象
    camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 800);
    camera.position.set(100, 400, 100); //设置相机位置
    camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

    renderer = new THREE.WebGLRenderer({ antialias: true }); // antialias 抗锯齿
    renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight - 200 );
    document.body.appendChild(renderer.domElement);
  }

  animation(){
    // console.log('animation', geometry)
    !geometry && this.initGeo();
    // if(!this.timer){
    //   this.timer = setInterval(()=> {
    //     // console.log('setInterval', geometry);
    //     this.update()
    //   }, 1000)
    // }
    this.update()
    window.requestAnimationFrame(this.animation.bind(this));
  }

  update(){
    mesh.rotateX(Math.PI / 145);
    mesh.rotateY(Math.PI / 145);
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
