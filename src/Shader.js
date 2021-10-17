import React,{ Component } from "react";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import vertexShader from "./vertex.glsl";
import {  GUI } from 'three/examples/jsm/libs/dat.gui.module';
import India from "./India.jpg"


export default class Shader extends Component {
   
    componentDidMount() {
        var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
console.log(vertexShader)
//Creates renderer and adds it to the DOM

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
let controls = new OrbitControls(camera, renderer.domElement);
scene.add(controls)
//The Box!
const textureLoader = new THREE.TextureLoader()
const flag = textureLoader.load(India)
console.log(flag)
//BoxGeometry (makes a geometry)
var geometry = new THREE.PlaneBufferGeometry(1,1,32,32)
//Material to apply to the cube (green)
const count = geometry.attributes.position.count

const randoms = new Float32Array(count)
for (let i=0;i<count;i++)
{
    randoms[i] = Math.random()
}
geometry.setAttribute('randoms', new THREE.BufferAttribute(randoms,1))
//Applies material to BoxGeometry

//Adds cube to the scene


//Sets camera's distance away from cube (using this explanation only for simplicity's sake - in reality this actually sets the 'depth' of the camera's position)
const material = new THREE.RawShaderMaterial({
    transparent:true,
    uniforms:
    {
        uFrequency: {value: new THREE.Vector2(10,0)},
        uTime: { value : 0},
        uColor : { value : new THREE.Color('orange')},
        uTexture : {value: flag}
    },
    vertexShader: `
    uniform mat4 projectionMatrix;
    uniform mat4 viewMatrix;
    uniform mat4 modelMatrix;
    uniform float uTime;
    varying float vrandoms;
    uniform vec2 uFrequency;
    attribute vec3 position;
    attribute float randoms;
    attribute vec2 uv;
    varying float vElevation;
    varying vec2 vUv;
    void main()
    {   

        vec4 modelPosition = modelMatrix * vec4(position,1.0);
        // modelPosition.z += sin(modelPosition.x * uFrequency.x + uTime) * 0.1;
        // modelPosition.z += sin(modelPosition.y * uFrequency.y + uTime) * 0.1;
        // modelPosition.z += randoms * 0.1;
        // modelPosition.y += 0.5;

        float elevation = sin(modelPosition.x * uFrequency.x + uTime) * 0.1;
        elevation += sin(modelPosition.y * uFrequency.y + uTime) * 0.1;
        modelPosition.z += elevation;
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectedPosition = projectionMatrix * viewPosition;
        
        gl_Position = projectedPosition;
        vrandoms = randoms;
        vUv = uv;
        vElevation = elevation;
    }
    
    `,
    fragmentShader:`
    precision mediump float;
    varying float vrandoms;
    varying vec2 vUv;
    uniform vec3 uColor;
    uniform sampler2D uTexture;
    varying float vElevation;
    void main(){
        vec4 textureColor = texture2D(uTexture,vUv);
        textureColor.rgb += vElevation ;
        gl_FragColor = textureColor;
    }
    `
})
console.log(material.uniforms.uTexture)
camera.position.z = 5;
var cube = new THREE.Mesh( geometry, material );
//Rendering
cube.scale.y = 2/3
scene.add( cube );
const gui = new GUI()

gui.add(material.uniforms.uFrequency.value,'x').min(0).max(20).step(0.01).name('FrequencyX')
gui.add(material.uniforms.uFrequency.value,'y').min(0).max(20).step(0.01).name('FrequencyY')
const clock = new THREE.Clock()
function render() {
  requestAnimationFrame( render );
  renderer.render( scene, camera );
  
const tick = () => 
{
    const elapsedTime = clock.getElapsedTime()
    material.uniforms.uTime.value = elapsedTime
}
tick()
}
render()


    }
    render() {
        return (
            <div style={{position:"absolute",zIndex:"0",top:"0",right:"00"}}>
         
            <div ref={ref => (this.mount = ref)}>
           
            </div>
            </div>
        )
    }
}