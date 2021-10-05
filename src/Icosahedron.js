import React,{ Component } from "react";
import * as THREE from "three";


function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    console.log("S",width)
    return {
        width,
        height
    }
    
  }

export default class Icosahedron extends Component {
    constructor(props) {
        super(props);
    
        
        this.state = {
          w:getWindowDimensions()
          
        };

      }
    componentDidMount() {
        window.addEventListener("resize", () => {
            this.setState( {w:getWindowDimensions()})
            console.log("resizes",this.state)
          });
          
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera( 38, 500/250,0.1,1000);
        camera.rotation.z=Math.PI*23.5/180
        var renderer = new THREE.WebGLRenderer({ alpha: true } );
      
        renderer.setSize(this.state.w.width,this.state.w.height);

        this.mount.appendChild( renderer.domElement );
      

var L4 = new THREE.PointLight( 0xFFFFFF, 1);
L4.position.z = 200;
L4.position.y = 1000;
L4.position.x = -1000;
scene.add(L4);
let light = new THREE.DirectionalLight(0xffffff, 1);
light.position.setScalar(1);
scene.add(light, new THREE.AmbientLight(0xffffff, 0.5));

THREE.BufferGeometry.prototype.tripleFace = tripleFace;
let g = new THREE.IcosahedronGeometry(10,8).tripleFace()

const count = g.attributes.position.count;
  

				
  g.setAttribute( 'color', new THREE.BufferAttribute( new Float32Array( count * 3 ), 3 ) );
 
  const colors1 = g.attributes.color;
		
//   
var cols = [{
    stop: 0,
    color: new THREE.Color(0xf7b000)
  }, {
    stop: .10,
    color: new THREE.Color(0xdd0080)
  }, {
    stop: .20,
    color: new THREE.Color(0x622b85)
  }, {
    stop: .30,
    color: new THREE.Color(0x734b6d)
  },{
    stop: .40,
    color: new THREE.Color(0x007dae)
  },
  {
    stop: .50,
    color: new THREE.Color(0xd900dd)
  }, {
    stop: .60,
    color: new THREE.Color(0x77c8db)
  },
  {
    stop: .70,
    color: new THREE.Color(0xdd0080)
  },{
    stop: .80,
    color: new THREE.Color(0xffb88c)
  },{
    stop: .90,
    color: new THREE.Color(0xdd5e89)
  }, {
    stop: 1,
    color: new THREE.Color(0xdd8500)
  }
];
  var rev = true;
  let ae = new THREE.Vector3()
  setGradient(g, cols,'y', rev);
  
  function setGradient(g, colors, axis, reverse) {
    let pos = g.attributes.position;
 
   
    g.computeBoundingBox();
  
    var bbox = g.boundingBox;
    var size = new THREE.Vector3().subVectors(bbox.max, bbox.min);
  
   
     var  normalized = new THREE.Vector3(),
      normalizedAxis = 0;
  
   var colorss;
    for (var c = 0; c < colors.length - 1; c++) {
        
      var colorDiff = colors[c + 1].stop - colors[c].stop;
     
   
       for (var i = 0; i <= pos.count; i++) {
    
        
        ae.fromBufferAttribute(pos, i   + 0);
        
        
          normalizedAxis = normalized.subVectors(ae, bbox.min).divide(size)[axis];
          if (reverse) {
            normalizedAxis = 1 - normalizedAxis;
          }
          if (normalizedAxis >= colors[c].stop && normalizedAxis <= colors[c + 1].stop){
            var localNormalizedAxis = (normalizedAxis - colors[c].stop) / colorDiff;
            colorss = colors[c].color.clone().lerp(colors[c + 1].color, localNormalizedAxis);
            colors1.setXYZ( i, colorss.r, colorss.g, colorss.b);
      
          }
        }
    }
      
    }
      
let m =  new THREE.MeshPhongMaterial( {

  vertexColors: true,
 

} );
let o = new THREE.Mesh(g, m);
scene.add(o);


let l = new THREE.Mesh(g, new THREE.MeshBasicMaterial({color:"black",wireframe: true}));
l.scale.setScalar(1.002);
scene.add(l);
// l.rotation.x = Math.PI/4;

renderer.setAnimationLoop(()=>{
  renderer.render(scene, camera);
});

function tripleFace(){
  let geometry = this;
  let pos = geometry.attributes.position;
  
  if (geometry.index != null) {
    
    return;
  }
  
  let facesCount = pos.count / 3;
  
  let pts = [];
  let triangle = new THREE.Triangle();
  let a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3();
  for(let i = 0; i < facesCount; i++){
    a.fromBufferAttribute(pos, i * 3 + 0);
    b.fromBufferAttribute(pos, i * 3 + 1);
    c.fromBufferAttribute(pos, i * 3 + 2);
    triangle.set(a, b, c);
    let o = new THREE.Vector3();
    triangle.getMidpoint(o);
    
    // make it tetrahedron-like
    let l = a.distanceTo(b);
    let h = Math.sqrt(3) / 2 * l * 0.15;// scale it at your will
                                        // remove 0.125 to get tetrahedrons
    let d = o.clone().normalize().setLength(h); 
    o.add(d);
    
    pts.push(
      o.clone(), a.clone(), b.clone(),
      o.clone(), b.clone(), c.clone(),
      o.clone(), c.clone(), a.clone()
    );
  }
  
  let g = new THREE.BufferGeometry().setFromPoints(pts);
  g.computeVertexNormals()
  
  return g;
}




// console.log("memory :",BufferGeometryUtils.estimateBytesUsed( o.geometry )+BufferGeometryUtils.estimateBytesUsed( l.geometry ),"bytes")


camera.position.z = 20
camera.position.x = -12
camera.position.y = -6


renderer.setAnimationLoop(_ => {
  o.rotation.y += 0.0025;
  

  l.rotation.y += 0.0025

 
  renderer.render(scene, camera);
  
 
  g.attributes.color.needsUpdate = true;
})
window.addEventListener("resize", () => {
            this.setState( {w:getWindowDimensions()})
            console.log("resizes",this.state)
            camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
            renderer.setSize(this.state.w.width,this.state.w.height);
          });
    }
    render() {
        return (
            <div id="Icosa" style={{position:"absolute",zIndex:"0",top:"0",right:"00"}}>
         
            <div ref={ref => (this.mount = ref)}>
           
            </div>
            </div>
        )
    }
}