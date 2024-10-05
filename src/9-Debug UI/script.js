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
//Bazen, sadece talep üzerine talimatları tetiklemek isteriz. Şu anda, hata ayıklama kullanıcı arayüzümüzde bir yere tıkladığımızda 
//küpün küçük bir dönüş animasyonu gerçekleştirmesini istiyoruz.

//Bunu, bir fonksiyon içeren bir özelliği tweak'e göndererek yapabiliriz. Ne yazık ki, bu, bir fonksiyonun kendi başına böyle 
//oturmasını ve sonra onu lil-gui'ye göndermesini sağlayamayacağımız anlamına gelir:

// const myFunction = () => {
//     console.log('do something')
// }
// gui.add(myFunction, '???')

//Ancak daha önce oluşturduğumuz debugObject nesnesine bir spin özelliği ekleyebilir ve içine bir GSAP animasyonu entegre edebiliriz:

// debugObject.spin = () =>
//     {
//         gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 })
//     }

//Son olarak şu değişikliği ekleyebiliriz debugObject.spin:

// debugObject.spin = () =>
//     {
//         // ...
//     }
//     gui.add(debugObject, 'spin')

//Bir buton göreceksiniz spin, bu butona tıkladığınızda küpünüz 360° dönecektir.

//GEOMETRİYİ AYARLAMA
//Geometri alt bölümlerini(subdivision) biraz değiştirmeyi deneyelim mi?

//Öncelikle üçgenleri görselleştirmek için wireframe değerini true olarak ayarlayacağız:

//const material = new THREE.MeshBasicMaterial({ color: '#9c7fe3', wireframe: true })

//BoxGeometry belgelerini kontrol ederseniz, alt bölümü kontrol eden parametrelerin widthSegments, heightSegments ve depthSegments 
//olarak adlandırıldığını göreceksiniz.

//Geometry.widthSegments'a bir ince ayar eklemeyi deneyelim:

// gui
//     .add(geometry, 'widthSegments')
//     .min(1)
//     .max(20)
//     .step(1)

//widthSegments geometrinin bir özelliği olmadığı için bir hata alıyoruz.

//widthSegments yalnızca BoxGeometry'yi örneklendirdiğimizde gönderdiğimiz bir parametredir. Tüm geometriyi yalnızca bir kez oluşturmak 
//için kullanılacaktır.

//İlk olarak, gerçek bir özellik olmadığı için, debugObject nesnesine bir alt bölüm özelliği eklememiz ve ince ayarlarımızı buna 
//uygulamamız gerekir:

// debugObject.subdivision = 2
// gui
//     .add(debugObject, 'subdivision')
//     .min(1)
//     .max(20)
//     .step(1)

//Adını subdivision koyduk, böylece onu üç widthSegments, heightSegments ve depthSegments'in hepsinde kullanabiliriz.

//Sonra, ayar değeri değiştiğinde, eski geometriyi yok edip yepyeni bir tane inşa edeceğiz.

//Bunu yapmak için, önce ayardaki onChange olayını dinleyeceğiz:

// gui
//     .add(debugObject, 'subdivision')
//     .min(1)
//     .max(20)
//     .step(1)
//     .onChange(() =>
//     {
//         console.log('subdivision changed')
//     })


//Bir geometri oluşturmak CPU için oldukça uzun bir süreç olabilir. Şu anda, kullanıcı aralık ayarını çok fazla sürükleyip bırakırsa 
//çok fazla tetiklenebilecek olan change olayını dinliyoruz.

//onChange kullanmak yerine, yalnızca değeri ayarlamayı bıraktığımızda tetiklenecek olan onFinishChange kullanacağız:

// gui
//     .add(debugObject, 'subdivision')
//     .min(1)
//     .max(20)
//     .step(1)
//     .onFinishChange(() =>
//     {
//         console.log('subdivision finished changing')
//     })

//Bu console.log() yerine, debugObject.subdivision kullanarak yeni bir geometri oluşturabilir ve bunu geometri özelliğine atayarak mesh 
//ile ilişkilendirebiliriz:

// gui
//     .add(debugObject, 'subdivision')
//     .min(1)
//     .max(20)
//     .step(1)
//     .onFinishChange(() =>
//     {
//         mesh.geometry = new THREE.BoxGeometry(
//             1, 1, 1,
//             debugObject.subdivision, debugObject.subdivision, debugObject.subdivision
//         )
//     })

//Ve bu kadar, ama küçük bir hata yaptık. Eski geometriler hala GPU belleğinde bir yerlerde duruyor ve bu da bellek sızıntısı(memory leak) yaratabilir.

//Bunu düzeltmek için, yenisini oluşturmadan önce eski geometride dispose() metodunu çağırabiliriz:

// gui
//     .add(debugObject, 'subdivision')
//     .min(1)
//     .max(20)
//     .step(1)
//     .onFinishChange(() =>
//     {
//         mesh.geometry.dispose()
//         mesh.geometry = new THREE.BoxGeometry(
//             1, 1, 1,
//             debugObject.subdivision, debugObject.subdivision, debugObject.subdivision
//         )
//     })

//FOLDERS
//Çok daha fazla ince ayar yaptığımızı ve hata ayıklama kullanıcı arayüzünün kalabalıklaşmaya başladığını hayal edelim. addFolder() 
//metodunu kullanarak bunları klasörlere ayırabiliriz.

//Bir klasör oluşturmak için addFolder()'ı çağırın ve istediğiniz ismi parametre olarak gönderin. Bunu ince ayarlardan önce yaptığınızdan 
//ve cubeTweaks olarak kaydettiğinizden emin olun:

//const cubeTweaks = gui.addFolder('Awesome cube')

//Daha sonra, ince ayarlar oluşturmak için guı kullanmak yerine cubeTweaks değişkenini kullanın:

// const cubeTweaks = gui.addFolder('Awesome cube')

// cubeTweaks
//     .add(mesh.position, 'y')
//     // ...

// cubeTweaks
//     .add(mesh, 'visible')

// cubeTweaks
//     .add(material, 'wireframe')

// cubeTweaks
//     .addColor(material, 'color')
//     // ...

// // ...
// cubeTweaks
//     .add(debugObject, 'spin')

// // ...
// cubeTweaks
//     .add(debugObject, 'subdivision')
//     // ...

//Varsayılan olarak close() metoduyla kapatabilirsiniz:

//const cubeTweaks = gui.addFolder('Awesome cube')
//cubeTweaks.close()

//GUI KURULUMU
//lil-gui esnektir ve ondan en iyi şekilde yararlanmak için bazı parametreleri, yöntemleri ve püf noktalarını göreceğiz.

//GENİŞLİK
//Genişliği, genişlik özelliğine sahip bir nesneyi GUI oluşturucusuna göndererek kontrol edebilirsiniz:

// const gui = new GUI({
//     width: 300
// })

//TITLE
//Panelin üst kısmındaki başlığı title özelliği ile değiştirebilirsiniz:

// const gui = new GUI({
//     width: 300,
//     title: 'Nice debug UI'
// })

//CLOSE FOLDERS
//Paneldeki tüm klasörleri closeFolders ile kapatabiliriz:

// const gui = new GUI({
//     width: 300,
//     title: 'Nice debug UI',
//     closeFolders: true
// })

//HIDE
//hide() metodunu çağırarak paneli tamamen gizleyebilirsiniz:

// const gui = new GUI({
//     width: 300,
//     title: 'Nice debug UI',
//     closeFolders: false,
// })
// // gui.close()
// gui.hide()

//TOGGLING
//Peki bunu bir kez daha nasıl gösterebiliriz? Bu size kalmış, ancak hızlı bir çözüm keydown olayını dinlemek ve eğer h tuşuysa, 
//şu anda gizli olup olmadığını belirten _hidden özelliğine göre geçiş yapmak olabilir, bu da bir boolean olarak:

// window.addEventListener('keydown', (event) =>
//     {
//         if(event.key == 'h')
//             gui.show(gui._hidden)
//     })

//İşte bitirdik. Ancak merak ediyorsanız, daha fazla kurulum ve özellik için lil-gui belgelerine bir göz atın:
//-Positioning
//-Having the tweak updated if the property changes
//-Other types of tweaks like the Select
//-Etc.

//ÇÖZÜM
//-Sonraki alıştırmaların belirli anlarında hata ayıklama kullanıcı arayüzümüzü kullanacağız. Ancak, istediğiniz kadar ince ayar eklemekten 
//çekinmeyin. Pratik yapmak ve yaratıcı şeyler inşa etmeye başlamak için mükemmel bir yoldur.

//İlerledikçe ince ayarlar eklemenizi öneririm. Tüm ince ayarları projenin sonuna eklemeyi düşünürseniz, muhtemelen hiç ince ayar yapmadan 
//ve fırsatları kaçırarak sonuçlanırsınız.

//Sonraki derslerin bazılarının lil-gui yerine dat.GUI kullanılarak kaydedildiğini unutmayın. Çok büyük bir fark yaratmaz ve sorunsuz bir 
//şekilde takip edebilmelisiniz.

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import "../9-Debug UI/style.css"
import GUI from 'lil-gui' //lil-gui import ettik
import gsap from 'gsap'


/**
 * Debug
 */
const gui = new GUI({
    width:300, //guı panelimizin genişliğini 300px yaptık.
    title: 'Nice debug UI', //paneldeki ana dosyamıza isim verdik.
    closeFolders: true //tüm dosyalar varsayılan olarak kapalı gelir.
})
//gui.close()//gui dosyamız varsayılan olarak kapalı gelir.
//gui.hide()//panelimizi tamamen gizler

//H tuşuna bastığıımızada panelin gizlemek veya açmak istiyoruz.
window.addEventListener('keydown', (event) =>
    {
        if(event.key == 'h')
            gui.show(gui._hidden)
    })

//
const debugObject = {}

debugObject.color = '#a778d8'
const cubeTweaks = gui.addFolder('Awesome cube') //GUI Panelinde Awesome cube adında bir dosya oluşturduk ve küp ile ilgili işlemlerimizi bu dosya içine aldık. Aşağıda guı yerine cubeTweaks yazarak bunu yaptık.
//cubeTweaks.close()//Dosya varsayılan olarak sayfa ilk açıldığında kapalı olur. Sonrasında üstüne tıklayarak açabiliriz.

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
cubeTweaks.add(mesh.position, 'y')
    .min(- 3)
    .max(3)
    .step(0.01)
    .name('elevation')

cubeTweaks.add(mesh, 'visible')

cubeTweaks.add(material, 'wireframe')

cubeTweaks.addColor(debugObject, 'color').onChange((value) => { //material debugObject olarak değiştirildi
    // console.log('value has changed')
    // console.log(material.color)
    // console.log(value)
    // console.log(value.getHexString())
    material.color.set(debugObject.color)
})

debugObject.spin = () =>{
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 })
}

cubeTweaks.add(debugObject, 'spin')

// gui
//     .add(geometry, 'widthSegments')
//     .min(1)
//     .max(20)
//     .step(1)

debugObject.subdivision = 2
cubeTweaks
    .add(debugObject, 'subdivision')
    .min(1)
    .max(20)
    .step(1)
    .onFinishChange(() =>{
        mesh.geometry.dispose()
        mesh.geometry = new THREE.BoxGeometry(
            1, 1, 1,
            debugObject.subdivision, debugObject.subdivision, debugObject.subdivision
        )
    })
    // .onChange(() =>
    //     {
    //         console.log('subdivision changed')
    //     })

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