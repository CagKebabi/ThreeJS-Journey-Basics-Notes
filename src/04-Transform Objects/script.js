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
//Bu özeelliklerimizin bildiğimiz üzere x -y -z değerleri vardır ve biz bu değerleri değişir.

//Position
//x değeri sağa sola y değeri yukarı alağı z değeri ise ileri geri hareket ettirir. Fakat bu bağlama göre değişir.
//Yani camera oryantasyonuna göre çok farklı sonuçlar alabilirsiniz. Mesela kameramız sağ tarafda konumlu ve sahneye baksaydı
//x ve z eksenleri (axes) farkl olurdu. Diğer yazılımlarda da Unreal Engine, Blender, Unity gibi eksenleri farklı olabilir.
//Mesela birinde objeyi yukarı konumlandırmak için z eksenini kullanıyor olabillir. Bu durumda bizim Three.js e adapte olmamız lazım
//Varsayılan olarak y eksenini yukarı aşağı x ekseninin sağa sola z ekseninin ileri geri olduğunu dikkate alacağız. Fakat dediğimiz gibi
//bunlar varsayılan değerlerdir eksenleri istediğimiz gibi değştirebliriz.

//Object kısmına yazdığımız mesh.position değerleri ile oynayarak positionu daha iyi anlayabliriz. Fakat dikkat etmemiz gereken bir nokta var
//eğer bu poswition değerlerini veya objeye camreaya vs atadığımız değerleri render ettiğimiz kısmın altına yazarsak değişikliklerimizi
//göremeyiz çünkü sahneyi öncesinde render ettiğimiz için sonrasına yazılan değerler sahnede gözükmez. Bu aynı şey örneğin mesh imizin
//özelliklerini değiştiriyorsak sahneye eklemeden önce yazmalıyız.

//Position sadece bir object değildir aynı zamanda vector dur. threejs de vector2 vector3 ve vector4 vardır. vector3 x,y ve z den
//fazlasıdır. Birçok metodu vardır dökümantasyondan bunlar incelenebilir. Metodlarından birine örnek olarak yine object ksımında
//console.log(mesh.position.length()) yazdık ve konsolda 1.3601470508735443 değerini bize verdi. .length() metodu sahnein merkezi
//ile objemizin pozisyonu arasınaki mesafeyi bize verir. meshimizi position z değerini değiştirirsek .length() deüerinin değiştiğini 
//görebiliriz. 
//bir vector3 objesi ile objemiz arasındaki mesafeyi görmek için ise .distanceTo() meodunuz kullanabiliriz. camera mızı nerede
//oluşturduysak onun altında objectimizin camera ile arasındaki mesafeyi görmek istediğimiz için .distanceTo(camera.position) yazdık.

//Position parametresini kullanırken bazen zorlanabiliriz. İşte bu noktada axesHelper kullanarak sahnemizin x y z eksenlerini görebiliriz.
//Mavi renkli olan eksen çizgimizi görmek için kamerayı bişraz hareket ettirdik.

import * as THREE from 'three'

//Canvas
const canvas = document.querySelector("canvas.webgl")

//Scene
const scene = new THREE.Scene()

//AXES HELPER
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper)

//Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({color: 0xff0000})
const mesh = new THREE.Mesh(geometry, material)

// mesh.position.x = 0.7
// mesh.position.y = -0.6
// mesh.position.z = 1

//yukarıdaki gibi tek tek yazmak yerine hepsine bir kerede değer atamak için aşağıdaki gibi set() metodunu kullanabiliriz.
mesh.position.set(0.7, -0.6, 1)

scene.add(mesh)

//vector3 metodları
console.log(mesh.position.length());
// mesh.position.normalize() //bu metod position.length() paramtresi 1 e sabitler. Bu oluşturduğumuz küpü perspective değilde düz bir şekilde görmemizi sağlar.

//Sizes
const sizes = {
    width:800,
    height:600
}

//Camrea
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.set(1,1,5)
scene.add(camera)

//vector3 metodu
console.log(mesh.position.distanceTo(camera.position))

//Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)

renderer.render(scene, camera)