//Bu derste objelere nasıl transform ugulayacağımızı öğreneceğiz. Bu öğrendiklerimile bir sonraki derste animasyon oluşturmayı öğreneceğiz.
//Objelere transform uygulayabileceğimiz 4 özellik vardır.
//1-position
//2-scale
//3-rotation
//4-quaternion *
//object3D den inherit alan tüm classlar, perspectiveCamera veya mesh gibi özelliklere sahiptir.
//Dersteki lessons links kısmına tıklayıp perspectiveCamera objesine tıklayıp threejs in sayfasına gidersek dökümanın üst kısmında
//açtığımız elemanın hangi elemanın içerisinde oluğunu görürüz. perspectiveCamera ya tıklarsak;
//Object3D > Camera > PerspectiveCamera yani camera object3d içindedir perpectivecamera ise camera içindedir.Veya
//mesh e bakacak olursak Object3D > Mesh olduğunu görürüz. Object3D içerisindeki bütün objectler ve classlar yukarıda saydığımız
//4 özelliğe sahiptir. Bu özellikler matrice ile compile edilir (bunu tam olarak anlamamıza gerek yok). uyguladığımız rotation,
//scale vs gibi transformlarımız matrices ile derlenip gpuya gönderilir.
//Bu derste bir önceki örneğimiz üzerinden devam edeceğiz.



import * as THREE from 'three'

//Canvas
const canvas = document.querySelector("canvas.webgl") 

//Scene
const scene = new THREE.Scene() 

//Object
const geometry = new THREE.BoxGeometry(1, 1, 1) 
const material = new THREE.MeshBasicMaterial({color: 0xff0000})
const mesh = new THREE.Mesh(geometry, material) 

scene.add(mesh) 

//Sizes
const sizes = {
    width:800,
    height:600
}

//Camrea
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height) 
camera.position.z = 3 
scene.add(camera)  

//Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas 
})

renderer.setSize(sizes.width, sizes.height) 

renderer.render(scene, camera) 