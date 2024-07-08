import * as THREE from 'three'

//Canvas
const canvas = document.querySelector("canvas.webgl") //.webgl elementine sahip olan canvas elementi. Burada seçici aynı css selector gibi çalışır

//Three js ile modelimizi görmek için 4 şeye ihtiyacımız vardır
//Scene - İçine nesneler modeller ışık vb. koyduğumuz konteyner gibidir.
//Objects - geometriler, import edilen modeller, particles, ışık vb. gibi birçok şey olabilir.
//Camera - bildiğimiz kamreadır elementlerimizi görmemizi sağlar. Birden fazla kamerada kullanılabilir fakat genelde bir tane kullanılır. Çünkü bir kameramızı istediğimiz yere harekewt ettirebiliriz.
//Renderer - kameranın bakış açısından görülen sahneyi oluşturacaktır. sonuç acanvas'a çizilir.

//Görünen objeler three.js de "Mesh" olarak adlandırılır. Mesh 2 şeyin kombinasyonudur (shape - şekil örnek:küp) ve (material - nasıl gözüktüğü örnek:kırmızı) 

//Scene
const scene = new THREE.Scene() 

//Object
const geometry = new THREE.BoxGeometry(1, 1, 1) //girilen 3 parametre küpün x,y,z ekseninde boyutunu belirler
const material = new THREE.MeshBasicMaterial({color: 0xff0000}) //'#ff000' veya 'red' gibi yazabiliriz. ayrıca color: 0xff0000, wireframe:true yazarsak objemizin iskeletini görebiliriz.
const mesh = new THREE.Mesh(geometry, material) //Meshimizi geometry ve material değerlerimizle oluşturduk

scene.add(mesh) //sahnemize meshimizi ekledik

//Sizes
const sizes = {
    width:800,
    height:600
}

//Camrea
//1. parametresi görüş açınızın ne kadar büyük olduğu derece cinsinden ifade edilir ve dikey görüş açısına karşılık gelir. Dürbünle yakınlaştırma gibi düşünülebilir.
//2. parametresi aspect ratio. aspect ratio yüksekliğe göre genişliktir. Canvas genişliğinin yüksekliğe bölümesidir.
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height) //75 aslında yüksek bir değerdir ortalama 35 olması iyidir fakat objemizi kaybettiğimizde kolay görmemiz için şimdilik 75 kullanıyoruz.
camera.position.z = 3 //herhangi bir pozisyon belirtmediğimiz sürece kameralarımız elementlerimiz vs. nin pozisyonları 0,0,0 dır bu nedenle camramızın z ekseninde pozisyonunu değiştirdik böylece sahnedeki küpümüzü görebildik.
scene.add(camera) //cameramızı sahnemize ekledik  

//Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas //canvasımızın hangi element olduğunu belirttik
})

renderer.setSize(sizes.width, sizes.height) //render edilen canvasın boyutunu tekrar belirttik

renderer.render(scene, camera) //elementlerimizi canvasa render ettik