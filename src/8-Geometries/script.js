//GİRİŞ
//Şimdiye kadar küpümüzü oluşturmak için yalnızca BoxGeometry sınıfını kullandık . Bu derste çeşitli diğer geometrileri keşfedeceğiz, 
//ancak önce bir geometrinin gerçekte ne olduğunu anlamamız gerekiyor.

//GEOMETRİ NEDİR?
//Three.js'de geometriler, köşelerden(vertices) (3 boyutlu uzaydaki nokta koordinatları) ve yüzeylerden(faces)
//(bu köşeleri birleştirerek bir yüzey oluşturan üçgenler) oluşur.

//Meshler oluşturmak için geometriler kullanırız, ancak siz de parçacıkları(particles) oluşturmak için geometriler kullanabilirsiniz. 
//Her tepe noktası (vertex) (tepe noktalarının tekili) bir parçacığa(particle) karşılık gelecektir, ancak bu gelecekteki bir ders içindir.

//Köşelerdeki konumdan daha fazla veri depolayabiliriz. İyi bir örnek UV koordinatları veya normallerden bahsetmek olabilir. 
//Göreceğiniz gibi, bunlar hakkında daha sonra daha fazla şey öğreneceğiz.

//FARKLI YERLEŞİK GEOMETRİLER
//Three.js'de birçok yerleşik geometri vardır. Her birini nasıl örnekleyeceğinizi tam olarak bilmenize gerek olmasa da, bunların var 
//olduğunu bilmek iyidir.

//Göreceğimiz tüm yerleşik geometriler BufferGeometry sınıfından miras alır. Bu sınıfın translate(...), rotateX(...), normalize() gibi 
//birçok yerleşik METODU vardır ancak bunları bu derste kullanmayacağız.

//Geometri dokümantasyon sayfalarının çoğunda örnekler bulunmaktadır.

//-BoxGeometry Bir kutu oluşturmak.
//-PlaneGeometry Dikdörtgen bir düzlem oluşturmak için.
//-CircleGeometry Bir disk veya diskin bir kısmını (pasta grafiği gibi) oluşturmak.
//-ConeGeometry Bir koni veya bir koninin bir kısmını oluşturmak için. Koninin tabanını açabilir veya kapatabilirsiniz.
//-CylinderGeometry Bir silindir oluşturmak için. Silindirin uçlarını açabilir veya kapatabilirsiniz ve her bir ucun yarıçapını değiştirebilirsiniz.
//-RingGeometry  Düz bir halka veya düz bir dairenin bir kısmını oluşturmak.
//-TorusGeometry Kalınlığı (bir simit gibi) veya bir halka parçası olan bir halka oluşturmak.
//-TorusKnotGeometry  Bir çeşit düğüm geometrisi oluşturmak.
//-DodecahedronGeometry 12 yüzlü bir küre oluşturmak için. Daha yuvarlak bir küre için detaylar ekleyebilirsiniz.
//-OctahedronGeometry 8 yüzlü bir küre oluşturmak için. Daha yuvarlak bir küre için detaylar ekleyebilirsiniz.
//-TetrahedronGeometry 4 yüzlü bir küre oluşturmak için (detayları artırmazsanız pek de küre olmayacaktır). Daha yuvarlak bir küre için detaylar ekleyebilirsiniz.
//-IcosahedronGeometry Yaklaşık olarak aynı büyüklükteki üçgenlerden oluşan bir küre oluşturmak.
//-SphereGeometry Yüzleri dörtgenlere benzeyen en popüler küre türünü oluşturmak için (dörtgenler sadece iki üçgenin birleşimidir).
//-ShapeGeometry Bir yola dayalı bir şekil oluşturmak.
//-TubeGeometry Bir yolu takip eden bir tüp oluşturmak.
//-ExtrudeGeometry Bir yola dayalı bir ekstrüzyon oluşturmak için. Eğimi ekleyebilir ve kontrol edebilirsiniz.
//-LatheGeometry Bir vazo veya vazonun bir kısmını (daha çok bir devrim gibi) oluşturmak.
//-TextGeometry 3 boyutlu bir metin oluşturmak için fontu typeface json formatında sağlamanız gerekecektir.

//Three.js tarafından desteklenmeyen belirli bir geometriye ihtiyacınız varsa, JavaScript'te kendi geometrinizi oluşturabilir veya bunu 
//bir 3D yazılımında yapabilir, dışa aktarabilir ve projenize içe aktarabilirsiniz. Bunu daha sonra daha detaylı öğreneceğiz.

//BOX ÖRNEĞİ
//Zaten bir küp yaptık ama parametreler hakkında fazla konuşmadık. Çoğu geometrinin parametreleri vardır ve kullanmadan önce her zaman 
//belgelere göz atmalısınız.

//BoxGeometry'nin 6 parametresi vardır :
//width-x: Eksen üzerindeki boyut
//height-y: Eksen üzerindeki boyut
//depth-z: Eksen üzerindeki boyut
//widthSegments-x: Eksende kaç tane alt bölüm var?
//heightSegments-y: Eksende kaç tane alt bölüm var?
//depthSegments-z: Eksende kaç tane alt bölüm var?

//Alt bölümler, yüzün(face) ne kadar üçgenden oluşması gerektiğine karşılık gelir. Varsayılan olarak 'dir 1, yani yüz başına yalnızca 
//üçgen olacaktır. Alt bölümü olarak ayarlarsanız 2, yüz başına 8 üçgen elde edersiniz:

//const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)

//Sorun şu ki bu üçgenleri göremiyoruz.
//İyi bir çözüm, materyalimize wireframe: true eklemektir. Wireframe, her üçgeni sınırlayan çizgileri gösterecektir:

//const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })

//Gördüğünüz gibi her yüzde 8 üçgen var.
//Bu, düz yüzlü bir küp için geçerli olmasa da, SphereGeometry kullanıldığında daha ilginç hale geliyor :

//const geometry = new THREE.SphereGeometry(1, 32, 32)

//Ne kadar çok alt bölüm eklersek, yüzleri(face) o kadar az ayırt edebiliriz. Ancak çok fazla köşe ve yüzün performansı etkileyeceğini unutmayın.

//KENDİ BUFFER GEOMETRİNİZİ OLUŞTURMA
//Bazen kendi geometrilerimizi oluşturmamız gerekir. Geometri çok karmaşıksa veya kesin bir şekle sahipse, onu bir 3D yazılımında 
//oluşturmak daha iyidir (ve bunu gelecekteki bir derste ele alacağız), ancak geometri çok karmaşık değilse, BufferGeometry kullanarak 
//kendimiz oluşturabiliriz .

//Kendi buffer geometrinizi oluşturmak için, boş bir BufferGeometry örneği oluşturarak başlayın . Basit bir üçgen oluşturacağız:

//// Create an empty BufferGeometry
//const geometry = new THREE.BufferGeometry()

//Bir BufferGeometry'ye köşe eklemek için bir Float32Array ile başlamalısınız .

//Float32Array, yerel JavaScript tipi dizilerdir. İçerisinde yalnızca float'ları saklayabilirsiniz ve bu dizinin uzunluğu sabittir.

//Bir Float32Array oluşturmak için uzunluğunu belirtebilir ve daha sonra doldurabilirsiniz:

//const positionsArray = new Float32Array(9)

// // First vertice
// positionsArray[0] = 0
// positionsArray[1] = 0
// positionsArray[2] = 0

// // Second vertice
// positionsArray[3] = 0
// positionsArray[4] = 1
// positionsArray[5] = 0

// // Third vertice
// positionsArray[6] = 1
// positionsArray[7] = 0
// positionsArray[8] = 0

//Veya bir dizi geçirebilirsiniz:

// const positionsArray = new Float32Array([
//     0, 0, 0, // First vertex
//     0, 1, 0, // Second vertex
//     1, 0, 0  // Third vertex
// ])

//Gördüğünüz gibi, vertices koordinatları doğrusal olarak belirtilir. Dizi, ilk vertexin x, y ve z'sini, ardından ikinci köşenin 
//x, y ve z'sini vb. belirttiğiniz tek boyutlu bir dizidir.

//Bu diziyi BufferGeometry'ye göndermeden önce onu BufferAttribute'a dönüştürmeniz gerekir .

//İlk parametre yazdığınız diziye karşılık gelir ve ikinci parametre bir tepe noktası niteliğini oluşturan değerlere karşılık gelir. 
//Daha önce gördüğümüz gibi, bu diziyi okumak için 3'er 3'er gitmemiz gerekir çünkü bir tepe noktası konumu 3 değerden ( x, y ve z) oluşur:

//const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)

//Daha sonra bu niteliği BufferGeometry'mize setAttribute(...) metodu kullanarak ekleyebiliriz. İlk parametre bu niteliğin adıdır ve 
//ikinci parametre değerdir:

//geometry.setAttribute('position', positionsAttribute)

//'position' İsmini seçmemizin sebebi Three.js dahili shader'larının köşeleri konumlandırmak için bu değeri arayacak olmasıdır. 
//Shader derslerinde bu konuda daha fazla bilgi edineceğiz.

//Faceler, vertex lerin sırasına göre otomatik olarak oluşturulacaktır.

//BUFFER GEOMERTRİ TAMAMLANMIŞ HALİ:

// // Create an empty BufferGeometry
// const geometry = new THREE.BufferGeometry()

// // Create a Float32Array containing the vertices position (3 by 3)
// const positionsArray = new Float32Array([
//     0, 0, 0, // First vertex
//     0, 1, 0, // Second vertex
//     1, 0, 0  // Third vertex
// ])

// // Create the attribute and name it 'position'
// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
// geometry.setAttribute('position', positionsAttribute)

//Ayrıca bir sürü rastgele üçgen de oluşturabiliriz:

// Create an empty BufferGeometry
//const geometry = new THREE.BufferGeometry()

// Create 50 triangles (450 values)
// const count = 50
// const positionsArray = new Float32Array(count * 3 * 3)
// for(let i = 0; i < count * 3 * 3; i++)
// {
//     positionsArray[i] = (Math.random() - 0.5) * 4
// }

// // Create the attribute and name it 'position'
// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
// geometry.setAttribute('position', positionsAttribute)

//Tek zorluk count * 3 * 3 kısmı olabilir ama açıklaması oldukça basit: 50 üçgene ihtiyacımız var. Her üçgen 3 köşeden ve her köşe 3 
//değerden (x, y ve z) oluşuyor.

//INDEX
//BufferGeometry ile ilgili ilginç bir şey, index özelliğini kullanarak köşeleri karşılıklı hale getirebilmenizdir. 
//Bir küpü düşünün. Birden fazla yüz, köşelerdeki gibi bazı köşeleri kullanabilir. Ve yakından bakarsanız, her köşe çeşitli komşu 
//üçgenler tarafından kullanılabilir. Bu, daha küçük bir öznitelik dizisi ve performans iyileştirmesiyle sonuçlanacaktır. 
//Ancak bu bölümü o derste ele almayacağız.


import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import "../8-Geometries/style.css"

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
// const geometry = new THREE.SphereGeometry(1, 32, 32)
//const geometry = new THREE.BoxGeometry(1, 1, 1 , 2, 2, 2)

// Create an empty BufferGeometry start
///------------------------------------------Buffer Geometri ile Üçgen Oluşturmak--------------------------------------
// const geometry = new THREE.BufferGeometry()

// // Create a Float32Array containing the vertices position (3 by 3)
// const positionsArray = new Float32Array([
//     0, 0, 0, // First vertex
//     0, 1, 0, // Second vertex
//     1, 0, 0  // Third vertex
// ])

// // Create the attribute and name it 'position'
// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
// geometry.setAttribute('position', positionsAttribute)
///-------------------------------------------Buffer Geometri ile Rastgele Üçgenler Oluşturmak----------------------------------------------
// Create an empty BufferGeometry
const geometry = new THREE.BufferGeometry()

// Create 50 triangles (450 values)
const count = 50 //Buradaki sayıyı arttırarak daha fazla üçgen oluşturabiliriz.
const positionsArray = new Float32Array(count * 3 * 3)
for(let i = 0; i < count * 3 * 3; i++)
{
    positionsArray[i] = (Math.random() - 0.5) * -0.5
}

// Create the attribute and name it 'position'
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
geometry.setAttribute('position', positionsAttribute)
// Create an empty BufferGeometry end

const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe:true })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()