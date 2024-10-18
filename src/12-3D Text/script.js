//-----GİRİŞ-----
//Zaten biraz içerik oluşturmak için yeterli temel bilgiye sahibiz. İlk projemiz için, ilithya'nın https://www.ilithya.rocks/ adresindeki 
//harika portföyüyle yaptığı şeyi yeniden yaratacağız ve sahnenin ortasında etrafta yüzen nesnelerle büyük bir 3D metin olacak.

//Bu portföy, Three.js'yi öğrenirken oldukça erken bir dönemde neler yapabileceğinize dair mükemmel bir örnektir. Basit, etkili 
//ve harika görünüyor.

//Three.js, TextGeometry sınıfıyla 3D metin geometrilerini zaten destekliyor. Sorun şu ki, bir yazı tipi belirtmeniz gerekiyor ve bu yazı 
//tipi, typeface adı verilen belirli bir json biçiminde olmalı.

//Lisanslardan bahsetmeyeceğiz, ancak kişisel kullanım için değilse yazı tipini kullanma hakkına sahip olmalısınız.

//-----typeface Fontu Nasıl Elde Ederiz?-----
//Bu formatta font edinmenin birçok yolu vardır. İlk olarak, fontunuzu şuna benzer dönüştürücülerle dönüştürebilirsiniz: 
//https://gero3.github.io/facetype.js/. Bir dosya sağlamanız ve dönüştür düğmesine tıklamanız gerekir.

//Ayrıca fontları /node_modules/three/examples/fonts/ klasöründe bulunan Three.js örneklerinde de bulabilirsiniz. 
//Bu fontları alıp /static/ klasörüne koyabilirsiniz veya json oldukları ve .json dosyaları Vite'deki .js dosyaları gibi desteklendiği 
//için doğrudan JavaScript dosyanıza aktarabilirsiniz:

//Bu iki tekniği, /node_modules/three/examples/fonts/ dosyasını açarak, helvetiker_regular.typeface.json ve LICENSE dosyalarını alarak 
//ve bunları /static/fonts/ klasörüne (oluşturmanız gereken) koyarak birleştireceğiz.

//Artık yazı tipine temel URL'nin sonuna /fonts/helvetiker_regular.typeface.json yazarak erişilebiliyor.

//-----Load the Font-----
//Yazı tipini yüklemek için FontLoader adlı yeni bir loader classı kullanmalıyız.

//Bu class THREE değişkeninde mevcut değildir. Bunu, daha önce derste OrbitControls sınıfında yaptığımız gibi içe aktarmamız gerekir:

//Bu yükleyici TextureLoader gibi çalışır. textureLoader kısmından sonra aşağıdaki kodu ekleyin (başka bir font kullanıyorsanız, pathi 
//değiştirmeyi unutmayın):

// /**
//  * Fonts
//  */
// const fontLoader = new FontLoader()

// fontLoader.load(
//     '/fonts/helvetiker_regular.typeface.json',
//     (font) =>
//     {
//         console.log('loaded')
//     }
// )

//Konsolunuzda 'loaded' almalısınız. Almazsanız, önceki adımları kontrol edin ve konsolda olası hataları arayın.

//Artık fonksiyon içindeki font değişkenini kullanarak fonta erişebiliyoruz. TextureLoader'ın aksine, kodumuzun geri kalanını bu başarılı 
//fonksiyonunun içine yazmamız gerekiyor.

//-----Create the Geometry-----
//Daha önce söylediğimiz gibi TextGeometry kullanacağız.

//FontLoader da olduğu gibi, onu içe aktarmamız gerekiyor:

//import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

//Three.js in TextGeometry döküman sayfasındaki örnek koda dikkat edin; parametrelerin değerler, sahnemizdekilerden çok daha büyüktür.

//Kodunuzu başarılı fonksiyonunun içine yazdığınızdan emin olun:

// fontLoader.load(
//     '/fonts/helvetiker_regular.typeface.json',
//     (font) =>
//     {
//         const textGeometry = new TextGeometry(
//             'Hello Three.js',
//             {
//                 font: font,
//                 size: 0.5,
//                 depth: 0.2,
//                 curveSegments: 12,
//                 bevelEnabled: true,
//                 bevelThickness: 0.03,
//                 bevelSize: 0.02,
//                 bevelOffset: 0,
//                 bevelSegments: 5
//             }
//         )
//         const textMaterial = new THREE.MeshBasicMaterial()
//         const text = new THREE.Mesh(textGeometry, textMaterial)
//         scene.add(text)
//     }
// )


//İyileştirmeye ihtiyaç duyan beyaz bir 3D metin elde etmelisiniz.

//Öncelikle küpten kurtulun. Amacı her şeyin çalıştığından emin olmaktı.

//Eğer havalı bir şey görmek istiyorsanız, materyalinize wireframe:true ekleyin.

//const textMaterial = new THREE.MeshBasicMaterial({ wireframe: true })

//Artık geometrinin nasıl oluşturulduğunu görebilirsiniz ve çok sayıda üçgen var. Bir metin geometrisi oluşturmak bilgisayar için uzun 
//ve zordur. Bunu çok fazla yapmaktan kaçının ve curveSegments ve bevelSegments özelliklerini azaltarak geometriyi mümkün olduğunca 
//düşük poly tutun.

//Detayların seviyesinden memnun kaldığınızda wireframe i kaldırın.

//-----Center the Text-----
//Metni ortalamanın birkaç yolu vardır. Bunu yapmanın bir yolu sınırlayıcı(bounding) kullanmaktır. Sınırlayıcı, geometrinin kapladığı alanı 
//belirten geometriyle ilişkili bilgidir. Bir kutu veya küre olabilir.

//Bu sınırlamaları gerçekten göremezsiniz, ancak Three.js'nin nesnenin ekranda olup olmadığını kolayca hesaplamasına yardımcı olur ve eğer 
//değilse, nesne bile oluşturulmaz. Buna frustum ayıklama (frustum culling) denir, ancak bu dersin konusu değildir.

//İstediğimiz şey bu sınırlamayı kullanarak geometrinin boyutunu bilmek ve onu yeniden merkezlemek. Varsayılan olarak, Three.js küre 
//sınırlamasını (sphere bounding) kullanıyor. İstediğimiz şey, daha kesin olmak gerekirse, bir kutu sınırlaması (box bounding). 
//Bunu yapmak için, Three.js'den geometri üzerinde computeBoundingBox()'ı çağırarak bu kutu sınırlamasını hesaplamasını isteyebiliriz:

//textGeometry.computeBoundingBox()

//Ve bu kutuyu geometrideki boundingBox özelliği ile kontrol edebiliriz.

//console.log(textGeometry.boundingBox)

//Sonuç, bir min özelliği ve bir max özelliği olan Box3 adlı bir nesnedir. Min özelliği, beklediğimiz gibi 0'da değildir. Bunun nedeni
//bevelThickness ve bevelSize'dır, ancak şimdilik bunu görmezden gelebiliriz.

//Artık ölçülere sahip olduğumuza göre, nesneyi hareket ettirebiliriz. Meshi hareket ettirmek yerine, tüm geometriyi hareket ettireceğiz. 
//Bu şekilde, mesh hala sahnenin merkezinde olacak, ancak metin geometrisi de meshimizin içinde ortalanmış olacak.

//Bunu yapmak için geometrimizde computeBoundingBox() metodundan hemen sonra translate(...) metodunu kullanabiliriz:

// textGeometry.translate(
//     - textGeometry.boundingBox.max.x * 0.5,
//     - textGeometry.boundingBox.max.y * 0.5,
//     - textGeometry.boundingBox.max.z * 0.5
// )

//Metin ortalanmalı ancak çok hassas olmak istiyorsanız, 0,02 olan bevelSize değerini de çıkarmalısınız:

// textGeometry.translate(
//     - (textGeometry.boundingBox.max.x - 0.02) * 0.5, // Subtract bevel size
//     - (textGeometry.boundingBox.max.y - 0.02) * 0.5, // Subtract bevel size
//     - (textGeometry.boundingBox.max.z - 0.03) * 0.5  // Subtract bevel thickness
// )

//Burada yaptığımız şey aslında geometri üzerinde center() metodunu çağırarak çok daha hızlı yapılabilir :D:

// textGeometry.center()

//Çok daha kolay, değil mi? Bunu kendimiz yapmanın amacı sınırlamalar(boundings) ve frustum culling hakkında bilgi edinmekti.

//-----Add a Matcap Material-----
//Metnimize havalı bir materyal eklemenin zamanı geldi. MeshMatcapMaterial kullanacağız çünkü havalı görünüyor ve harika bir 
//performansı var.

//Öncelikle bir matcap texture u seçelim. /12-3D Text/static/textures/matcaps/ klasöründe bulunan matcap'leri kullanacağız ancak kendi 
//matcap'lerinizi kullanmaktan çekinmeyin.

//Ayrıca bu repodan https://github.com/nidorx/matcaps indirebilirsiniz. Seçmek için çok fazla zaman harcamayın! Kişisel kullanım için 
//değilse, kullanma hakkınız olduğundan emin olun. Yüksek çözünürlüklü bir texturea ihtiyacınız yok ve 256x256 fazlasıyla yeterli olmalı.

//Artık kodda bulunan TextureLoader'ı kullanarak dokuyu yükleyebiliriz:

//const matcapTexture = textureLoader.load('/textures/matcaps/1.png')

//Map ve matcap olarak kullanılan textureların sRGB'de kodlanması gerekiyor ve bunu Three.js'e colorSpace'lerini THREE.SRGBColorSpace 
//olarak ayarlayarak bildirmemiz gerekiyor:

// const matcapTexture = textureLoader.load('/textures/matcaps/1.png')
// matcapTexture.colorSpace = THREE.SRGBColorSpace

//Artık çirkin MeshBasicMaterial'ımızı güzel bir MeshMatcapMaterial ile değiştirebilir ve matcapTexture değişkenimizi matcap 
//özelliğiyle kullanabiliriz:

//const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })

//Üzerinde hoş görünümlü bir materyal bulunan hoş bir metniniz olmalı.

//-----Add Objects-----
//Etrafta yüzen nesneler ekleyelim. Bunu yapmak için, bir donut yaratacağız ancak bir döngü fonksiyonu içinde.

//Başarı fonksiyonunda, text kısmından hemen sonra, döngü fonksiyonunu ekleyin:

// for(let i = 0; i < 100; i++)
//     {
        
//     }

//Bunu başarı fonksiyonunun dışında da yapabilirdik ama metnin ve nesnelerin birlikte oluşturulmasına iyi bir sebepten dolayı 
//ihtiyacımız olacak, bunu birazdan göreceksiniz. 

//Bu döngüde, metin ve Mesh için kullanılan materyalin aynısı olan bir TorusGeometry (bir donut için kullanılan teknik bir isim) oluşturun:

//100 donutun hepsini aynı yerde oluşturmuş olduk.

//Konumlarına biraz rastgelelik ekleyelim:

// donut.position.x = (Math.random() - 0.5) * 10
// donut.position.y = (Math.random() - 0.5) * 10
// donut.position.z = (Math.random() - 0.5) * 10

//Sahnede dağılmış 100 donut elde etmelisiniz.

//Rotaiona rastgelelik ekleyin. 3 ekseni de döndürmeye gerek yok ve donut simetrik olduğundan, bir dönüşün yarısı yeterlidir:

// donut.rotation.x = Math.random() * Math.PI
// donut.rotation.y = Math.random() * Math.PI

//Donutlar her yöne dönebilmelidir.

//Son olarak, ölçeğe rastgelelik ekleyebiliriz. Ancak dikkatli olun; 3 eksenin (x, y, z) hepsi için aynı değeri kullanmamız gerekiyor:

// const scale = Math.random()
// donut.scale.set(scale, scale, scale)

//-----Optimize-----
//Kodumuz çok optimize edilmemiş. Önceki derste gördüğümüz gibi, aynı materyali birden fazla Mesh'te kullanabiliriz, ancak aynı
//geometriyi de kullanabiliriz.

//donutGeometry ve donutMaterial'ı döngüden çıkarın:

// const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
// const donutMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })

// for(let i = 0; i < 100; i++)
// {
//     // ...
// }

//Aynı sonucu elde etmelisiniz, ancak daha da ileri gidebiliriz. Metnin materyali donut için olanla aynıdır.

//DonutMaterial'ı kaldıralım, textMaterial'ı material olarak yeniden adlandıralım ve hem metin hem de donut için kullanalım:

// const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
                
// // ...

// const text = new THREE.Mesh(textGeometry, material)

// // ...

// for(let i = 0; i < 100; i++)
// {
//     const donut = new THREE.Mesh(donutGeometry, material)
    
//     // ...
// }

//Daha da ileri gidebiliriz, ancak optimizasyonlarla ilgili özel bir ders var.

//İsterseniz daha fazla şekil ekleyebilir, onları hareketlendirebilir ve hatta diğer matcap'leri deneyebilirsiniz.

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import "./style.css"
import typefaceFont from 'three/examples/fonts/helvetiker_regular.typeface.json'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/12-3D Text/textures/matcaps/1.png')
matcapTexture.colorSpace = THREE.SRGBColorSpace
/**
 * Fonts
 */
const fontLoader = new FontLoader()

fontLoader.load(
    '12-3D Text/fonts/helvetiker_regular.typeface.json',
    (font) =>
    {
        console.log('loaded')
        const textGeometry = new TextGeometry(
            'Hello Three.js',
            {
                font: font,
                size: 0.5,
                depth: 0.2,
                curveSegments: 4, //Bu değerler performans için mümkün olduğunca düşük tutulmalıdır düşük değer girilmesi daha az polygon anlamına gelir.
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4 //Bu değerler performans için mümkün olduğunca düşük tutulmalıdır düşük değer girilmesi daha az polygon anlamına gelir.
            }
        )
        // const textMaterial = new THREE.MeshBasicMaterial({wireframe: true})
        const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
        const text = new THREE.Mesh(textGeometry, textMaterial)

        //Centering Text
        //----Zor yol
        // textGeometry.computeBoundingBox()
        // // console.log(textGeometry.boundingBox)
        // textGeometry.translate(
        //     - (textGeometry.boundingBox.max.x - 0.02) * 0.5, // Subtract bevel size
        //     - (textGeometry.boundingBox.max.y - 0.02) * 0.5, // Subtract bevel size
        //     - (textGeometry.boundingBox.max.z - 0.03) * 0.5  // Subtract bevel thickness
        // )
        //----Kolay yol
        textGeometry.center()

        scene.add(text)

        //Konsolda 'donuts' adında bir timer oluşturduk eğer aşağıdaki döngü dışındaki donutGeometry ve donutMaterial i yorum satırına
        //alıp döngü içerisindeki donutGeometry ve donutMaterial yorum satırından çıkartırsak performansı nasıl etkilediğini konsolda 
        //görebiliriz.
        const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
        const donutMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })

        console.time('donuts')

        //Adding Objects
        for(let i = 0; i < 100; i++)
            {
                //donutGeometry ve donutMaterial döngü dışına alırsak 100 adet oluşturmamış oluruz bir kere oluşturup hepsinde aynı 
                //geometry ve materyali kullanırız böylece performansı önemli ölçüde arttırmış oluruz.
                // const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
                // const donutMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
                const donut = new THREE.Mesh(donutGeometry, donutMaterial)

                donut.position.x = (Math.random() - 0.5) * 10
                donut.position.y = (Math.random() - 0.5) * 10
                donut.position.z = (Math.random() - 0.5) * 10

                donut.rotation.x = Math.random() * Math.PI
                donut.rotation.y = Math.random() * Math.PI

                const scale = Math.random()
                donut.scale.set(scale, scale, scale)

                scene.add(donut)
            }
            console.timeEnd('donuts')
    }
)

/**
 * Object
 */
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial()
)

// scene.add(cube)

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