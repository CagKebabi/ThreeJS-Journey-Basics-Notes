//GİRİŞ
//Her yaratıcı projenin temel bir yönü, onu kolayca ayarlayabilmektir. Geliştirici (siz) ve proje üzerinde çalışan diğer aktörler 
//(tasarımcılar veya hatta müşteri gibi) mümkün olduğunca çok parametreyi değiştirebilmelidir.

//En iyi deneyimi yaşamaları için mükemmel rengi, hızı, miktarı vb. bulmaları için bunu hesaba katmalısınız. Harika görünen beklenmedik 
//sonuçlar bile elde edebilirsiniz.

//Öncelikle bir hata ayıklama arayüzüne ihtiyacımız var.

//HTML / CSS / JS kullanarak kendi hata ayıklama kullanıcı arayüzünüzü oluşturabilmenize rağmen, halihazırda birden fazla kütüphane 
//bulunmaktadır:
//-dat.GUI
//-lil-gui
//-control-panel
//-ControlKit
//-Uil
//-Tweakpane
//-Guify
//-Oui

//Bunların hepsi istediğimizi yapabilir, ancak popüler, bakımı kolay ve kullanımı kolay olduğu için lil-gui'yi kullanacağız.

//dat.GUI dan lil-gui'a
//Başlangıçta Three.js Journey alıştırmalarının hepsi dat.GUI kullanıyordu.

//Bir süredir bu kütüphane güncellenmiyor ve NPM onu yüklerken güvenlik açığı uyarıları tetiklemeye başladı. O zamandan beri bu 
//güvenlik açıkları giderildi, ancak alternatifler ortaya çıkmaya başladı ve lil-gui'nin dat.GUI için bir drop-in yedek olarak 
//giderek daha popüler hale gelmesinin nedeni bu. Eklenen bonus ise daha iyi özelliklere sahip olması.

//Three.js Journey egzersizlerinin hepsi artık lil-gui kullanıyor, ancak videolarda dat.GUI'ye yapılan göndermeleri fark edebilirsiniz. 
//Bunları görmezden gelin ve lil-gui'yi aynı şekilde kullanın.

//Bu arada GUI, Grafiksel Kullanıcı Arayüzü(Graphical User Interface.) anlamına gelir.

//ÖRNEK

//Bruno Simon portfoyünde oldukça iyi bir hata ayıklama kullanıcı arayüzü örneği bulabilirsiniz. Bu kullanıcı arayüzü yalnızca #debugURL'ye eklediğinizde görünür.
//https://bruno-simon.com/#debug
//Yer çekimini, renkleri, hızı, elementlerin pozisyonlarını vb. ayarlayabilirsiniz.
//Tüm bu ayarlamaları yapmak çok zamanımı aldı ancak bunlar olmadan oyun daha az dengeli görünecekti.

//KURULUM
//Başlangıçta küpümüz var, ancak bağımlılıklar lil-gui'yi içermiyor. Bunu ekleyeceğiz ve bazı ayarlamalar yapacağız.

//lil-gui ÖRNEKLEME
//Projemize lil-gui eklemek için Node.js ile sağlanan NPM adlı bağımlılık yöneticisini kullanabiliriz 
//(tıpkı önceki bir derste GSAP için yaptığımız gibi).

//Terminalinizde (sunucu çalışmıyorken veya aynı klasördeki başka bir terminal penceresini kullanarak) npm install lil-gui 
//komutunu çalıştırın

//lil-gui artık node_modules/ klasöründe mevcuttur ve bunu script.js'imize aktarabiliriz. Sunucuyu yeniden başlatmayı unutmayın:

//import GUI from 'lil-gui'

//Artık lil-gui'yi bir gui değişkeninde örneklendirebiliriz ve bunu en baştan, içe aktarmaların hemen ardından yapabiliriz:

// /**
//  * Debug
//  */
// const gui = new GUI()

//DEĞİŞİK TÜRDEKİ AYARLAMALAR
//Ekranın sağ üst köşesinde boş bir panel görebilirsiniz. Bu panele ekleyebileceğiniz farklı türde ince ayarlar vardır:

//-Range —minimum ve maksimum değere sahip sayılar için
//-Color —çeşitli formatlardaki renkler için
//-Text —basit metinler için
//-Checkbox —boolen değerleri için ( trueveya false)
//-Select —değerler listesinden bir seçim yapmak için
//-Button —fonksiyonları tetiklemek için

//Bu değişikliklerden bazılarını ele alalım.

//RANGE
//Ekleyeceğimiz ilk ayar range dir.

//Ayarların çoğu gui.add(...) kullanılarak eklenebilir. İlk parametre nesnedir ve ikinci parametre ayarlamak istediğiniz nesnenin 
//özelliğidir.

//Nesneyi ve özelliğini oluşturduktan sonra gui.add(...) eklemeniz gerekir. Aksi takdirde, lil-gui'den henüz var olmayan bir şeyi 
//ayarlamasını isteyeceksiniz.

//mesh.position.y ile deneyelim:

// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)

// gui.add(mesh.position, 'y')

//Panelde bir input görünmelidir. Bunu değiştirmeyi deneyin ve küpün buna göre hareket ettiğini izleyin.
//Minimum değeri, maksimum değeri ve hassasiyeti belirtmek için bunları parametrelerde ayarlayabilirsiniz:

//gui.add(mesh.position, 'y', - 3, 3, 0.01)

//Bunu yaparak, sürükleyip bırakabileceğimiz kullanışlı bir aralık girdisi elde ederiz.

//Bu kadar çok parametreye sahip olmak istemiyorsanız, add(...) yönteminden hemen sonra zincirleme yaparak 
//min(...), max(...) ve step(...) yöntemlerini kullanabilirsiniz:

//gui.add(mesh.position, 'y').min(- 3).max(3).step(0.01)

//Etiketi değiştirmek için name(...) metodunu kullanın:

// gui
//     .add(mesh.position, 'y')
//     .min(- 3)
//     .max(3)
//     .step(0.01)
//     .name('elevation')

//non-properties İÇİN AYARLAMALAR
//Burada dikkat edilmesi gereken önemli bir nokta, lil-gui'nin yalnızca özellikleri değiştirebilmesidir. Bir değişkeni 
//güncellemek istiyorsanız, şunları yapamazsınız:

// let myVariable = 1337
// gui.add(myVariable, '???')

//Ancak bunu yapmak için bazı hilelere başvurabilirsiniz, örneğin lil-gui'nin nesne üzerinde kullanacağı özellikleri tutma amacı 
//olan bir nesne yaratabilirsiniz:

// const myObject = {
//     myVariable: 1337
// }
// gui.add(myObject, 'myVariable')

//Bu değişikliği kaldırın çünkü bu, dersin ilerleyen kısımlarında pratiğe dökeceğimiz bir örnekti.

//CHECKBOX
//lil-gui, ne tür bir özelliği ayarlamak istediğinizi otomatik olarak algılayacak ve karşılık gelen arayüzü kullanacaktır. 
//Bunun iyi bir örneği Object3D'nin visible özelliğidir. Bu, false ise nesneyi gizleyecek bir boolean'dır:

//gui.add(mesh, 'visible')

//Gördüğünüz gibi, lil-gui bir CHECKBOX seçti çünkü visible özelliği bir boolean.

//Aynısını material ın wireframe özelliğiyle de yapabiliriz:

//gui.add(material, 'wireframe')

//COLORS
//Renkleri işlemek biraz daha zordur. material in renk özelliğini değiştirmeyi deneyelim.

//Öncelikle add(...) yerine addColor(...) kullanmalıyız çünkü renk özelliği bir dize, bir boolean veya bir sayı değildir. 
//Çeşitli özelliklere sahip bir nesnedir çünkü Three.js Color sınıfının bir örneğidir. Bu özellikler arasında lil-gui'nin güzel 
//bir ayarlamayı görüntülemek için kullanabileceği r, g ve b bulunur:

//gui.addColor(material, 'color')

//Panelinizde bir renk seçici görmelisiniz.

//Şimdi renk seçiciden renk seçtiğimiz zaman bize rengin kodunu verir. Seçtiğimiz rengin kodunu materialimize eklediğimizde
//seçtiğimiz rengin o olmadığını görürüz.

//Bunun nedeni Three.js'nin render'ı optimize etmek için bazı renk yönetimi uygulamalarıdır. Sonuç olarak, ince ayarda görüntülenen 
//renk değeri dahili olarak kullanılan değerle aynı değildir.

//Şimdilik renk yönetimi hakkında konuşmayacağız ve bunu gelecek bir derse bırakacağız. Ancak, doğru renk değerini istiyoruz.
//Bununla başa çıkmanın iki yolu vardır.

//Değiştirilen rengin doğru bir şekilşde alınması.
//İlk çözüm, renk örneğindeki getHexString() metodu sayesinde, ayar değeri değiştiğinde Three.js tarafından dahili olarak kullanılan 
//rengi almaktan oluşur.

//Başlamak için, herhangi bir ince ayar değişikliğinin farkında olmamız gerekir. Bunu yapmak için, onChange() metodunu kullanabiliriz:

// gui
//     .addColor(material, 'color')
//     .onChange(() =>
//     {
//         console.log('value has changed')
//     })

//Daha sonra Color örneğine erişmemiz gerekiyor ve klasik material.color'ı kullanabiliriz veya fonksiyonun bir parametresi olarak 
//doğrudan bir değer alabiliriz:

// gui
//     .addColor(material, 'color')
//     .onChange((value) =>
//     {
//         console.log(material.color)
//         console.log(value)
//     })

//Her ikisi de material in renk özelliğinden gelen aynı Renk örneğidir.
//Değeri kullanalım ve getHexString()'in sonucunu consola yazalım:

// gui
//     .addColor(material, 'color')
//     .onChange((value) =>
//     {
//         console.log(value.getHexString())
//     })

//Yani kodunuzda güvenle kullanabileceğiniz renk değeri budur.

//Bu tekniğin sorunu, Konsolu açık tutmanız gerekmesidir ve bu, özellikle tasarımcılar veya istemci için pek kullanışlı değildir.

//2. Yöntem
//İkinci çözüm, Three.js tarafından değiştirilmeden önce renkle ilgilenmekten oluşur.

//İlk olarak, rengi Three.js dışında bir yere kaydetmemiz gerekir. Amacı özellikleri tutmak olan bir nesne yaratacağız.

//Ben şahsen buna global, parametreler veya debugObject adını vermeyi ve lil-gui'yi örnekledikten hemen sonra koymayı seviyorum:

//const gui = new GUI()
//const debugObject = {}

//Daha sonra debugObject'e bir renk özelliği ekleyeceğiz ve bunu küpü oluşturmadan önce yapacağız, böylece onu hemen MeshBasicMaterial'in 
//renk özelliğine gönderebileceğiz:

//debugObject.color = '#3a6ea6'

//const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
//const material = new THREE.MeshBasicMaterial({ color: debugObject.color, wireframe: false })

//Bunu yaparak, başlangıç ​​rengini yalnızca bir yerde elde ederiz.

//Daha sonra, material.color üzerinde yaptığımız önceki ayarlama yerine, bunu debugObject.color olarak değiştireceğiz:

// gui
//     .addColor(debugObject, 'color')
//     .onChange(() =>
//     {
//         console.log(value.getHexString())
//     })

//Ve son olarak, console.log() yapmak yerine, material.color'ı set() metodunu kullanarak güncelleyeceğiz:

// gui
//     .addColor(debugObject, 'color')
//     .onChange(() =>
//     {
//         material.color.set(debugObject.color)
//     })

//Kimsenin Konsolu açmasına gerek kalmaması için bu çözümü kullanmayı seviyorum, ancak bu size kalmış.

//debugObject.color'ı #a778d8'e geri koyalım.

//Function / Button
//

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import "../9-Debug UI/style.css"
import GUI from 'lil-gui' //lil-gui import ettik
import gsap from 'gsap'


/**
 * Debug
 */
const gui = new GUI()
const debugObject = {}

debugObject.color = '#a778d8'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({ color: debugObject.color })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

//GUI AYARLARI
// gui.add(mesh.position, 'y', - 3, 3, 0.01)
gui.add(mesh.position, 'y')
    .min(- 3)
    .max(3)
    .step(0.01)
    .name('elevation')

gui.add(mesh, 'visible')

gui.add(material, 'wireframe')

gui.addColor(debugObject, 'color').onChange((value) => { //material debugObject olarak değiştirildi
    // console.log('value has changed')
    // console.log(material.color)
    // console.log(value)
    // console.log(value.getHexString())
    material.color.set(debugObject.color)
})
//-----
// const myObject = {
//     myVariable: 1337
// }
// gui.add(myObject, 'myVariable')

/**
 * Sizes
 */
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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
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