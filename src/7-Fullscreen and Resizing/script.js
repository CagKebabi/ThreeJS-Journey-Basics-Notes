//GİRİŞ
//canvasımızın şu anki sabit çözünürlüğü 800x600. WebGL'nizin tüm ekrana sığması gerekmiyor, ancak sürükleyici bir deneyim istiyorsanız 
//daha iyi olabilir.

//Öncelikle, canvasın tüm kullanılabilir alanı kaplamasını isteriz. Sonra, kullanıcı penceresini yeniden boyutlandırdığında hala sığdığından
//emin olmamız gerekir. Son olarak, kullanıcıya tam ekranda deneyimi denemesi için bir yol sağlamamız gerekir.

//SETUP
//Başlangıç, önceki derste bitirdiğimiz şeyleri içerir. Küpümüz ortadadır ve kamerayı hareket ettirmek için sürükleyip bırakabiliriz.

//CANVASI VIEWPORTA SIĞDIRMA
//Canvasın görünüm alanına tam olarak uyması için, sizes değişkeninde sabit sayılar kullanmak yerine window.innerWidth ve window.innerHeight 
//değişkenlerini kullanın:

// // Sizes
// const sizes = {
//     width: window.innerWidth,
//     height: window.innerHeight
// }

//Canvasın artık görüntü alanının genişliğine ve yüksekliğine sahip olduğunu görebilirsiniz. Ne yazık ki, beyaz bir kenar boşluğu ve 
//bir scrollbar var (scrollbarı görmüyorsanız kaydırmayı deneyin).

//Sorun şu ki, tüm tarayıcıların daha h etiketleri, link elementi, paragraflar elementi padding ve margin
//gibi varsayılan stilleri var. Bunu düzeltmenin birçok yolu var ve bu web sitenizin geri kalanına bağlı olabilir. Başka içerikleriniz 
//varsa, bunu yaparken bunlardan hiçbirini bozmamaya çalışın.

//Kısaca tarayıcıların varsayılan css özelliklerini kısıtlamak ve canvasımızı ekranımıza tam sığdırmak için bu ders bir css dosyası oluşturduk 
//ve bu js dosyasına import ettik

//Artık WebGL'nizin tüm ihtişamıyla keyfini çıkarabilirsiniz. Ne yazık ki, pencereyi yeniden boyutlandırırsanız, tuval uymayacaktır.
//Yeniden boyutlandırmayla ilgilenmemiz gerekiyor.

//YENİDEN BOYUTLANDIRMAYI YÖNET
//Canvası yeniden boyutlandırmak için öncelikle pencerenin ne zaman yeniden boyutlandırıldığını bilmemiz gerekir. Bunu yapmak için 
//window un resize eventini kullanabilirsiniz:

// window.addEventListener('resize', () =>{
//     console.log('window has been resized')
// })

//Artık pencere yeniden boyutlandırılırken bir fonksiyonu tetiklediğimize göre, kodumuzdaki birkaç şeyi güncellememiz gerekiyor.
//İlk olarak, sizes değişkenini güncellemeliyiz:

// window.addEventListener('resize', () =>
// {
//     // Update sizes
//     sizes.width = window.innerWidth
//     sizes.height = window.innerHeight
// })

//İkinci olarak, kameranın görüntü oranını(aspect ratio), aspect özelliğini değiştirerek güncellemeliyiz:

// window.addEventListener('resize', () =>{
//     // ...
    
//     // Update camera
//     camera.aspect = sizes.width / sizes.height
// })

//Kamera özelliklerini, örneğin aspect değiştirdiğinizde, camera.updateProjectionMatrix() kullanarak projeksiyon matrisini de 
//güncellemeniz gerekir. Matrisler hakkında daha sonra konuşacağız:

// window.addEventListener('resize', () =>
// {
//     // ...
    
//     camera.updateProjectionMatrix()
// })

//Son olarak, renderer'ı güncellemeliyiz. Renderer'ı güncellemek canvas genişliğini ve yüksekliğini otomatik olarak güncelleyecektir:

// window.addEventListener('resize', () =>{
//     // ...
    
//     // Update renderer
//     renderer.setSize(sizes.width, sizes.height)
// })

//Tamamlanmış hali:

// window.addEventListener('resize', () =>
// {
//     // Update sizes
//     sizes.width = window.innerWidth
//     sizes.height = window.innerHeight
    
//     // Update camera
//     camera.aspect = sizes.width / sizes.height
//     camera.updateProjectionMatrix()
    
//     // Update renderer
//     renderer.setSize(sizes.width, sizes.height)
// })

//Pencereyi istediğiniz gibi yeniden boyutlandırabilirsiniz, canvas, herhangi bir kaydırma çubuğu veya taşma olmadan görünüm alanını 
//kaplamalıdır.

//PIXEL RATIO AYARLAMA
//Bazılarınız kenarlarda merdiven şeklinde bulanık bir render ve eserler görebilir (aliasing olarak adlandırılır), ancak hepiniz 
//göremezsiniz. Eğer görüyorsanız, bunun nedeni piksel oranı 1'den büyük bir ekranda test yapıyor olmanızdır.
//Piksel oranı, yazılım kısmında bir piksel birimi için ekranda kaç tane fiziksel pikseliniz olduğuna karşılık gelir.

//Biraz hikaye;
//Birkaç yıl önce, tüm ekranların piksel oranı 1'di ve her şey yolundaydı. Ancak ekranınıza yakından baktığınızda, o pikselleri 
//görebiliyordunuz ve bu, görüntülerin ne kadar hassas ve yazı tiplerinin ne kadar ince olabileceği konusunda bir sınırlamaydı.

//Bu konuda en çok şey yapan şirket Apple'dı. Apple bir fırsat gördü ve retina adı verilen 2 piksel oranına sahip ekranlar üretmeye başladı. 
//Şimdi, birçok üretici bunu yapıyor ve daha da yüksek piksel oranlarına sahip ekranlar görebilirsiniz.

//Bu görüntü kalitesi için iyi bir şey olsa da, 2 piksel oranı, işlenmesi gereken piksel sayısının 4 katı anlamına gelir. 3 piksel oranı 
//ise işlenmesi gereken piksel sayısının 9 katı anlamına gelir.

//Ve tahmin edin ne oldu? En yüksek piksel oranları genellikle en zayıf cihazlarda —mobil cihazlarda— bulunur.
//İşte kare hızınız gitti.

//PIXEL ORANINI YÖNETME
//Ekran piksel oranını elde etmek için window.devicePixelRatio'yu kullanabilirsiniz ve renderer'ınızın piksel oranını güncellemek için 
//renderer.setPixelRatio(...)'u çağırmanız yeterlidir.

//Sadece cihazın piksel oranını bu yönteme göndermeyi düşünebilirsiniz, ancak yüksek piksel oranına sahip cihazlarda performans 
//sorunlarıyla karşılaşırsınız.

//2'den büyük bir piksel oranına sahip olmak çoğunlukla pazarlamadır. Gözleriniz 2 ile 3 arasında neredeyse hiçbir fark görmeyecektir 
//ancak bu performans sorunları yaratacak ve pili daha hızlı boşaltacaktır. Yapabileceğiniz şey piksel oranını 2 ile sınırlamaktır. 
//Bunu yapmak için Math.min() kullanabilirsiniz:

//renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

//Piksel oranı değiştiğinde bildirim almak için teknikler vardır, ancak bu yalnızca farklı piksel oranlarına sahip birden fazla ekrana 
//sahip olan ve genellikle bir ekrandan diğerine geçerken pencerelerini yeniden boyutlandıran kullanıcılarla ilgilidir. Bu nedenle, 
//bu yöntemi yeniden boyutlandırma geri aramasına da ekleyeceğiz:

// window.addEventListener('resize', () =>{
//     // Update sizes
//     sizes.width = window.innerWidth
//     sizes.height = window.innerHeight
    
//     // Update camera
//     camera.aspect = sizes.width / sizes.height
    
//     // Update renderer
//     renderer.setSize(sizes.width, sizes.height)
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// })

//FULLSCREEN AYARLAMA
//Artık CANVAS tüm kullanılabilir alanı doğru piksel oranıyla kapladığını gördüğümüze göre, tam ekran desteği eklemenin zamanı geldi.

//İlk olarak, tam ekran modunu tetikleyecek eylemin ne olduğuna karar vermeliyiz. Bir HTML düğmesi olabilir, ancak bunun yerine çift 
//tıklama kullanacağız.

//Çift tıklama gerçekleştiğinde tam ekran moduna geçeceğiz; yani pencere tam ekran modunda değilse, çift tıklama tam ekran modunu 
//etkinleştirecek ve pencere zaten tam ekran modundaysa, çift tıklama tam ekran modundan çıkacak.

//Öncelikle double click olayını dinlememiz gerekiyor, bunu dblclick eventiyle yapabiliriz:

// window.addEventListener('dblclick', () =>{
//     console.log('double click')
// })

//Bu event Chrome Android hariç çoğu modern tarayıcıda çalışacaktır:
//https://developer.mozilla.org/docs/Web/API/Element/dblclick_event

//Artık etkinliğimiz olduğuna göre, 3 şeye ihtiyacımız var:
//-Zaten tam ekran olup olmadığını bilmenin bir yolu
//-Tam ekran moduna geçmenin bir yöntemi
//-Tam ekran modundan çıkmanın bir yöntemi

//Tam ekran modunda olup olmadığımızı öğrenmek için document.fullscreenElement fonksiyonunu kullanabiliriz:

// window.addEventListener('dblclick', () =>
// {
//     if(!document.fullscreenElement)
//     {
//         console.log('go fullscreen')
//     }
//     else
//     {
//         console.log('leave fullscreen')
//     }
// })

//Tam ekran isteğinde bulunma yöntemi öğeyle ilişkilidir. Bunun nedeni, tam ekranda ne olacağını seçebilmenizdir. Tüm sayfa, 
//herhangi bir DOM öğesi veya <canvas> olabilir.

//<canvas> öğesini kullanacağız ve üzerinde requestFullscreen() metodunu çağıracağız:

// window.addEventListener('dblclick', () =>
// {
//     if(!document.fullscreenElement)
//     {
//         canvas.requestFullscreen()
//     }
//     else
//     {
//         console.log('leave fullscreen')
//     }
// })

//Tam ekran modundan çıkma yöntemi aşağıdaki kod üzerinde mevcuttur:

// window.addEventListener('dblclick', () =>
// {
//     if(!document.fullscreenElement)
//     {
//         canvas.requestFullscreen()
//     }
//     else
//     {
//         document.exitFullscreen()
//     }
// })

//Sonucu test etmek için herhangi bir yere çift tıklayıp tam ekran moduna geçebilirsiniz.

//Safarinin tam ekran gibi basit özellikleri resmi olarak desteklemesi zaman alıyor ve document.fullscreenElement, 
//canvas.requestFullscreen ve document.exitFullscreen için çalışmasını sağlamak amacıyla ön ekli sürümleri kullanmamız gerekiyor
//db eventimiz ile ilgili herşey tüm modern tarayıcılarda düzgün çalışmalıdır.:

// window.addEventListener('dblclick', () =>
// {
//     const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

//     if(!fullscreenElement)
//     {
//         if(canvas.requestFullscreen)
//         {
//             canvas.requestFullscreen()
//         }
//         else if(canvas.webkitRequestFullscreen)
//         {
//             canvas.webkitRequestFullscreen()
//         }
//     }
//     else
//     {
//         if(document.exitFullscreen)
//         {
//             document.exitFullscreen()
//         }
//         else if(document.webkitExitFullscreen)
//         {
//             document.webkitExitFullscreen()
//         }
//     }
// })

//Safari'nin en son sürümleri, yukarıdaki düzenleme olmadan tam ekran API'sini destekler.

// Yine de, yukarıdaki örneği kullanmak iki nedenden dolayı iyi bir uygulama olarak kabul edilir:

// Bazı kullanıcılar Safari'nin eski sürümlerini kullanır
// Tam ekran API'si iPhone'da desteklenmez, ancak iPad'de yalnızca öneklerle desteklenir

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import "../7-Fullscreen and Resizing/style.css" //bu ders için oluşturduğumuz css dosyası

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
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//RESIZE EVENT
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

//DOUBLE CLICK EVENT
window.addEventListener('dblclick', () =>
{
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if(!fullscreenElement)
    {
        if(canvas.requestFullscreen)
        {
            canvas.requestFullscreen()
        }
        else if(canvas.webkitRequestFullscreen)
        {
            canvas.webkitRequestFullscreen()
        }
    }
    else
    {
        if(document.exitFullscreen)
        {
            document.exitFullscreen()
        }
        else if(document.webkitExitFullscreen)
        {
            document.webkitExitFullscreen()
        }
    }
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
// controls.enabled = false  //orbitcontrolsü devre dışı bırakır

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

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