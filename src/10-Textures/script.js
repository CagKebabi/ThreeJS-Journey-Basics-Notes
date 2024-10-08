//GİRİŞ
//Kırmızı küpünüzden sıkıldınız mı? Biraz doku eklemenin zamanı geldi.
//Ama öncelikle dokular nedir ve onlarla neler yapabiliriz?

//TEXTURES NEDİR?
//Textures, muhtemelen bildiğiniz gibi, geometrilerinizin yüzeyini kaplayacak görsellerdir. Birçok texture türü, geometrinizin görünümü 
//üzerinde farklı etkilere sahip olabilir. Bu sadece renkle ilgili değildir.

//COLOR (veya ALBEDO) - NOT:Ne olduğunu daha iyi anlamak için dersin websitesindeki notlarına bak
//Albedo TEXTURE en basit olanıdır. Sadece dokunun piksellerini alır ve bunları geometriye uygular.

//ALPHA - NOT:Ne olduğunu daha iyi anlamak için dersin websitesindeki notlarına bak
//Alpha texture, beyazın görülebildiği ve siyahın görülemediği gri tonlamalı bir görüntüdür.

//HEIGHT - NOT:Ne olduğunu daha iyi anlamak için dersin websitesindeki notlarına bak
//Height texture, biraz rahatlama yaratmak için köşeleri hareket ettirecek gri tonlamalı bir görüntüdür. Bunu görmek istiyorsanız 
//alt bölüm(subdivision) eklemeniz gerekir.

//NORMAL - NOT:Ne olduğunu daha iyi anlamak için dersin websitesindeki notlarına bak 
//Normal texture küçük detaylar ekleyecektir. Köşeleri hareket ettirmeyecektir ancak ışığın yüzün farklı şekilde yönlendirildiğini 
//düşünmesini sağlayacaktır. Normal dokular, geometriyi alt bölümlere ayırmanıza gerek olmadığı için iyi performansla detaylar 
//eklemek için çok kullanışlıdır.

//AMBIENT OCCLUSION
//Ortam tıkanıklığı(AMBIENT OCCLUSİON) texture, yüzeyin çatlaklarında sahte gölge oluşturacak bir gri tonlamalı görüntüdür. 
//Fiziksel olarak doğru olmasa da, kontrast oluşturmaya kesinlikle yardımcı olur.

//METALNESS
//Metallik dokusu, hangi parçanın metalik (beyaz) ve metalik olmayan (siyah) olduğunu belirleyecek bir gri tonlamalı görüntüdür. 
//Bu bilgi yansıma oluşturmaya yardımcı olacaktır.

//ROUGHNESS (PÜRÜSSÜZLÜK)
//Pürüzlülük, metallikle birlikte gelen gri tonlamalı bir görüntüdür ve hangi kısmın pürüzlü (beyaz) ve hangi kısmın pürüzsüz (siyah) 
//olduğunu belirleyecektir. Bu bilgi ışığı dağıtmaya yardımcı olacaktır. Bir halı çok engebelidir ve üzerindeki ışık yansımasını 
//göremezsiniz, suyun yüzeyi ise çok pürüzsüzdür ve üzerinde ışığın yansımasını görebilirsiniz. Burada, ahşap üzerinde şeffaf bir 
//kaplama olduğu için düzgündür.

//PBR
//Bu texturelar (özellikle metalness ve roughness) PBR prensipleri dediğimiz şeyi takip eder. PBR, Physically Based Rendering'in 
//kısaltmasıdır. Gerçekçi sonuçlar elde etmek için gerçek yaşam yönlerini takip etme eğiliminde olan birçok tekniği yeniden gruplandırır.

//Başka birçok teknik olmasına rağmen, PBR gerçekçi renderlar için standart haline geliyor ve birçok yazılım, motor ve kütüphane bunu 
//kullanıyor.

//Şimdilik, sadece textureların nasıl yükleneceğine, nasıl kullanılacağına, hangi dönüşümleri uygulayabileceğimize ve nasıl optimize 
//edileceğine odaklanacağız. PBR hakkında daha fazlasını sonraki derslerde göreceğiz, ancak merak ediyorsanız, burada daha fazlasını 
//öğrenebilirsiniz:

//https://marmoset.co/posts/basic-theory-of-physically-based-rendering/
//https://marmoset.co/posts/physically-based-rendering-and-you-can-too/

//TEXTURELAR NASIL YÜKLENİR?
//Image in URL ini almak.
//Texture u yüklemek için resim dosyasının URL'sine ihtiyacımız var.

//Bir derleme aracı kullandığımız (vite) için, onu edinmenin iki yolu var.

//Resim dokusunu klasöre koyup /src/JavaScript bağımlılığını içe aktarır gibi içe aktarabilirsiniz:

// import imageSource from './image.png'

// console.log(imageSource)

//Veya bu resmi /static/ klasörüne koyabilir ve URL'ye resmin yolunu (/static olmadan) ekleyerek erişebilirsiniz:

// const imageSource = '/image.png'

// console.log(imageSource)

//Dikkatli olun, bu /static/ klasörü yalnızca Vite şablonunun yapılandırması nedeniyle çalışır. Başka türde paketleyici kullanıyorsanız, 
//projenizi uyarlamanız gerekebilir.

//Kursun geri kalanında /static/ klasör tekniğini kullanacağız.

//RESİMİ YÜKLEMEK
//Az önce gördüğümüz kapı textureları /static/ klasöründe bulabilirsiniz ve bunları yüklemenin birden fazla yolu var.

//NATIVE JAVASCRIPT KULANMAK
//Yerel JavaScript ile, öncelikle bir Image örneği oluşturmalı, load olayını dinlemeli ve ardından img'yı yüklemeye başlamak için 
//src özelliğini değiştirmelisiniz

// const image = new Image()
// image.onload = () =>
// {
//     console.log('image loaded')
// }
// image.src = '/textures/door/color.jpg'

//Konsolda 'image loaded' ifadesinin göründüğünü görmelisiniz. Gördüğünüz gibi, kaynak kodunu /static klasörü olmadan 
//'/textures/door/color.jpg' olarak ayarladık.

//Bu image i doğrudan kullanamayız. Önce bu imageden bir Texture oluşturmamız gerekir.

//Bunun nedeni, WebGL'nin GPU tarafından erişilebilen çok özel bir biçime ihtiyaç duyması ve ayrıca dokulara mipmapping gibi bazı 
//değişikliklerin uygulanacak olmasıdır ancak bunlar hakkında birazdan daha fazla bilgi edineceğiz.

//texture u Texture classıyla oluşturun:

// const image = new Image()
// image.addEventListener('load', () =>
// {
//     const texture = new THREE.Texture(image)
// })
// image.src = '/textures/door/color.jpg'

//Şimdi yapmamız gereken, o texture ı materyalde kullanmak. Ne yazık ki, texture değişkeni bir fonksiyonda bildirildi ve bu fonksiyonun 
//dışında ona erişemiyoruz. Bu, scope adı verilen bir JavaScript sınırlamasıdır.

//Mesh'i fonksiyon içerisinde oluşturabilirdik, fakat texture ı fonksiyon dışında oluşturup, görüntü yüklendikten sonra texture needsUpdate 
//özelliğini true olarak ayarlayarak güncellemekten oluşan daha iyi bir çözüm var:

// const image = new Image()
// const texture = new THREE.Texture(image)
// image.addEventListener('load', () =>
// {
//     texture.needsUpdate = true
// })
// image.src = '/textures/door/color.jpg'

//Bunu yaparken, hemen texture değişkenini kullanabilirsiniz ve görüntü yüklenene kadar şeffaf olacaktır.

//Küp üzerindeki texture ımızı görmek için, color özelliğini map ile değiştirin ve texture'ı değer olarak kullanın:

//const material = new THREE.MeshBasicMaterial({ map: texture })

//Küpünüzün her iki tarafında kapı dokusunu görmelisiniz. ancak, doku garip bir şekilde soluk görünüyor.

//Bunun nedeni, görüntünün sRGB renk alanı kullanılarak kodlanmış olması ancak Three.js'nin bundan haberdar olmamasıdır.

//Bunu düzeltmek için, renk alanlarını THREE.sRGBColorSpace olarak ayarlamanız gerekir:

//const texture = new THREE.Texture(image)
//texture.colorSpace = THREE.SRGBColorSpace

//Artık doğru renkleri elde ediyorsunuz.

//Genel fikir, bir materialin map veya matcap'inde (daha sonra göreceğiz) kullanılan textureların özelliklerinin sRGB'de kodlanması 
//gerektiğidir ve colorSpace'i THREE.sRGBColorSpace olarak ayarlamamız gerekir, ancak yalnızca bunlar için.

//Renk alanı(color space) hakkında daha fazla bilgi için Realistic Render dersine bakın.

//TEXTURELOADER KULLANMAK
//Yerel JavaScript tekniği o kadar karmaşık değil, ancak TextureLoader ile daha da basit bir yol var.

//TextureLoader sınıfını kullanarak bir değişkeni örneklendirin ve bir doku oluşturmak için .load(...) yöntemini kullanın:

// const textureLoader = new THREE.TextureLoader()
// const texture = textureLoader.load('/textures/door/color.jpg')
// texture.colorSpace = THREE.SRGBColorSpace

//Dahili olarak, Three.js daha önce yaptığı şeyi yaparak görüntüyü yükleyecek ve hazır olduğunda dokuyu güncelleyecektir.

//Sadece bir TextureLoader örneğiyle istediğiniz kadar doku yükleyebilirsiniz.

//Path den sonra 3 işlev gönderebilirsiniz. Bunlar aşağıdaki olaylar için çağrılacaktır:

//görüntü başarıyla yüklendiğinde yükleme
//yükleme devam ederken ilerleme
//bir şeyler ters gittiğinde hata

// const textureLoader = new THREE.TextureLoader()
// const texture = textureLoader.load(
//     '/textures/door/color.jpg',
//     () =>
//     {
//         console.log('loading finished')
//     },
//     () =>
//     {
//         console.log('loading progressing')
//     },
//     () =>
//     {
//         console.log('loading error')
//     }
// )
// texture.colorSpace = THREE.SRGBColorSpace

//Eğer texture çalışmıyorsa, neler olduğunu görmek ve hataları saptamak için bu callback fonksiyonlarını eklemek faydalı olabilir.

//LOADİNGMANAGER KULLANMAK
//Son olarak, yüklenecek birden fazla görüntünüz varsa ve tüm görüntüler yüklendiğinde bildirim almak gibi olayları karşılıklı hale 
//getirmek istiyorsanız, bir LoadingManager kullanabilirsiniz.

//LoadingManager sınıfının bir örneğini oluşturun ve bunu TextureLoader'a geçirin:

// const loadingManager = new THREE.LoadingManager()
// const textureLoader = new THREE.TextureLoader(loadingManager)

//Aşağıdaki özellikleri kendi onStart, onLoad, onProgress ve onError fonksiyonlarınızla değiştirerek çeşitli olayları dinleyebilirsiniz:

// const loadingManager = new THREE.LoadingManager()
// loadingManager.onStart = () =>
// {
//     console.log('loading started')
// }
// loadingManager.onLoad = () =>
// {
//     console.log('loading finished')
// }
// loadingManager.onProgress = () =>
// {
//     console.log('loading progressing')
// }
// loadingManager.onError = () =>
// {
//     console.log('loading error')
// }

// const textureLoader = new THREE.TextureLoader(loadingManager)

//Artık ihtiyacınız olan tüm görselleri yüklemeye başlayabilirsiniz:

// const colorTexture = textureLoader.load('/textures/door/color.jpg')
// colorTexture.colorSpace = THREE.SRGBColorSpace
// const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
// const heightTexture = textureLoader.load('/textures/door/height.jpg')
// const normalTexture = textureLoader.load('/textures/door/normal.jpg')
// const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
// const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
// const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

//Burada görebileceğiniz gibi, texture değişkeninin adını colorTexture olarak değiştirdik, bu yüzden bunu materialde de değiştirmeyi unutmayın:

//const material = new THREE.MeshBasicMaterial({ map: colorTexture })

//LoadingManager, bir loading elementi göstermek ve yalnızca tüm varlıklar yüklendiğinde gizlemek istiyorsanız çok kullanışlıdır. 
//Gelecekteki bir derste göreceğimiz gibi, bunu diğer yükleyici türleriyle de kullanabilirsiniz.

//UV UNWRAPPING
//Bir küpün üzerine texture yerleştirmek oldukça mantıklı olsa da, diğer geometriler için işler biraz daha zor olabilir.

//BoxGeometry'nizi diğer geometrilerle değiştirmeyi deneyin:

// const geometry = new THREE.BoxGeometry(1, 1, 1)

// // Or
// const geometry = new THREE.SphereGeometry(1, 32, 32)

// // Or
// const geometry = new THREE.ConeGeometry(1, 1, 32)

// // Or
// const geometry = new THREE.TorusGeometry(1, 0.35, 32, 100)

//Gördüğünüz gibi, texture geometriyi örtmek için farklı şekillerde geriliyor veya sıkıştırılıyor.

//Buna UV açma denir. Bunu bir origamiyi veya şeker ambalajını düzleştirmek için açmak gibi düşünebilirsiniz. Her tepe noktası(vertex) düz 
//(genellikle kare) bir düzlemde 2B koordinata sahip olacaktır.

//Aslında bu UV 2D koordinatlarını geometry.attributes.uv özelliğinde görebilirsiniz:

//console.log(geometry.attributes.uv)

//Bu UV koordinatları, ilkel öğeleri kullandığınızda Three.js tarafından oluşturulur. Kendi geometrinizi oluşturur ve buna bir doku 
//uygulamak isterseniz, UV koordinatlarını belirtmeniz gerekir.

//Geometriyi bir 3D yazılımı kullanarak yapıyorsanız, UV açma işlemini de yapmanız gerekir.

//Endişelenmeyin; çoğu 3D yazılımında aynı işi görecek otomatik açma özelliği bulunur.

//TRANSFORMING THE TEXTURE
//Tek Ttexturea sahip küpümüze geri dönelim ve bu texturea ne tür transform özellikleri uygulayabileceğimize bakalım.

//REPEAT
//Repeat özelliğini kullanarak textureı tekrarlayabilirsiniz, bu bir Vector2'dir, yani x ve y özelliklerine sahiptir.

//Bu özellikleri değiştirmeyi deneyin:

// const colorTexture = textureLoader.load('/textures/door/color.jpg')
// colorTexture.colorSpace = THREE.SRGBColorSpace
// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3

//Gördüğünüz gibi, doku tekrar etmiyor, ancak daha küçük ve son piksel gerilmiş gibi görünüyor.

//Bunun nedeni, dokunun varsayılan olarak kendini tekrar edecek şekilde ayarlanmamış olmasıdır. Bunu değiştirmek için, 
//THREE.RepeatWrapping sabitini kullanarak wrapS ve wrapT özelliklerini güncellemeniz gerekir.

//wrapS x ekseni içindir
//wrapT y ekseni içindir

// colorTexture.wrapS = THREE.RepeatWrapping
// colorTexture.wrapT = THREE.RepeatWrapping

//Yönü THREE.MirroredRepeatWrapping ile de değiştirebilirsiniz:

//OFFSET
//Texture ı, x ve y özelliklerine sahip bir Vector2 olan offset özelliğini kullanarak ofsetleyebilirsiniz. Bunları değiştirmek sadece 
//UV koordinatlarını ofsetleyecektir:

// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5

//ROTATION
//Texture ı, radyan cinsinden açıya karşılık gelen basit bir sayı olan rotation özelliğini kullanarak döndürebilirsiniz:

//colorTexture.rotation = Math.PI * 0.25

//Eğer ofset ve repeat özelliklerini kaldırırsanız, dönüşün küpün yüzlerinin sol alt köşesi etrafında gerçekleştiğini göreceksiniz:

//Aslında bu 0, 0 UV koordinatlarıdır. Bu dönüşün pivotunu değiştirmek isterseniz, bunu aynı zamanda bir Vector2 olan center özelliğini 
//kullanarak yapabilirsiniz:

// colorTexture.rotation = Math.PI * 0.25
// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5

//Texture artık kendi merkezinde dönecektir.

//FILTERING VE MIPMAPPING
//Küpün üst yüzüne baktığınızda bu yüzey neredeyse tamamen gizlenmiş haldeyken çok bulanık bir doku göreceksiniz.

//Bunun nedeni filtreleme ve mipmapping'dir.

//Mipmapping (veya boşluklu "mip mapping"), 1x1 texture elde edene kadar bir dokunun daha küçük bir versiyonunu tekrar tekrar oluşturmaktan 
//oluşan bir tekniktir. Tüm bu texture varyasyonları GPU'ya gönderilir ve GPU, dokunun en uygun versiyonunu seçer.

//Three.js ve GPU tüm bunları zaten halleder ve siz sadece hangi filtre algoritmasının kullanılacağını ayarlayabilirsiniz. İki tür 
//filtre algoritması vardır: küçültme filtresi(minification) ve büyütme(magnification) filtresi.

//KÜÇÜLTME(MINIFICATION) FİLTRESİ
//Küçültme filtresi, texture pikselleri render piksellerinden daha küçük olduğunda gerçekleşir. Başka bir deyişle, texture kapladığı yüzey 
//için çok büyüktür.

//Texture ın minification filtresini minFilter özelliğini kullanarak değiştirebilirsiniz.

//6 olası değer vardır:
//THREE.NearestFilter
//THREE.LinearFilter
//THREE.NearestMipmapNearestFilter
//THREE.NearestMipmapLinearFilter
//THREE.LinearMipmapNearestFilter
//THREE.LinearMipmapLinearFilter

//Varsayılanı THREE.LinearMipmapLinearFilter'dır. Textureın görünümünden memnun değilseniz, diğer filtreleri denemelisiniz.

//Her birini görmeyeceğiz, ancak çok farklı bir sonuç veren THREE.NearestFilter'ı test edeceğiz:

//colorTexture.minFilter = THREE.NearestFilter

//1 piksel oranının(pizel ratio) üstünde bir cihaz kullanıyorsanız, çok fazla fark görmezsiniz. Değilse, kamerayı bu yüzün neredeyse gizlendiği 
//yere yerleştirin ve daha fazla ayrıntı ve garip eserler elde etmelisiniz.

///static/textures/ klasöründe bulunan checkerboard-1024x1024.png dokusuyla test ederseniz, bu eserleri daha net göreceksiniz:

//const colorTexture = textureLoader.load('/textures/checkerboard-1024x1024.png')

//Gördüğünüz eserlere moiré desenleri denir ve bunlardan genellikle kaçınmak istersiniz.

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import "./style.css"

/**
 * Textures
 */
//-----------------------------1.Yöntem-----------------------
// const image = new Image()
// const texture = new THREE.Texture(image)
// texture.colorSpace = THREE.SRGBColorSpace //görüntünün sRGB renk alanı kullanılarak kodlanmış olması ancak Three.js'nin bundan haberdar olmadığı için bunu belirttik.
// image.addEventListener('load', () =>
// {
//     texture.needsUpdate = true //texture ı günceller
//     console.log('image loaded')
// })
// image.src = '/textures/door/color.jpg' //static içindeki bu dosyaya bu şekilde ulaşabilmemizi sağlayan ayarlama vite.config içerisinde yapılmıştır.
//------------------------------2.Yöntem----------------------
const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = () =>
{
    console.log('loading started')
}
loadingManager.onLoad = () =>
{
    console.log('loading finished')
}
loadingManager.onProgress = () =>
{
    console.log('loading progressing')
}
loadingManager.onError = () =>
{
    console.log('loading error')
}
const textureLoader = new THREE.TextureLoader(loadingManager) //loadingManager parametresini girerek loading managerı aktif hale getirdik
const colorTexture = textureLoader.load('/textures/door/color.jpg')
// const colorTexture = textureLoader.load('/textures/checkerboard-1024x1024.png')
colorTexture.colorSpace = THREE.SRGBColorSpace
//texturea transform repeat özelliği uygulama
colorTexture.repeat.x = 2
colorTexture.repeat.y = 3
//texturea transform offset özelliği uygulama
colorTexture.offset.x = 0.5
colorTexture.offset.y = 0.5
//texturea transorm rotation özelliği uygulama
colorTexture.rotation = Math.PI * 0.25
//textureın rotation özelliğinin kendi etrafında uygulanması için aşağıdaki gibi uygulama yapmalıyız
colorTexture.center.x = 0.5
colorTexture.center.y = 0.5
//repeat özellğiğinin olması gerektiği şekilde düzgün çalışması ve görünmesi için wrapS wrapT özelli,klerini güncelledik.
// colorTexture.wrapS = THREE.RepeatWrapping
// colorTexture.wrapT = THREE.RepeatWrapping
//diğer alternatif
colorTexture.wrapS = THREE.MirroredRepeatWrapping
colorTexture.wrapT = THREE.MirroredRepeatWrapping
//Textureda minification filtresi kullanma
colorTexture.minFilter = THREE.NearestFilter

const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const heightTexture = textureLoader.load('/textures/door/height.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
// const texture = textureLoader.load('/textures/door/color.jpg',
//         // () =>
//         // {
//         //     console.log('loading finished')
//         // },
//         // () =>
//         // {
//         //     console.log('loading progressing')
//         // },
//         // () =>
//         // {
//         //     console.log('loading error')
//         // }
//     )
// texture.colorSpace = THREE.SRGBColorSpace

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
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const material = new THREE.MeshBasicMaterial({ map: colorTexture }) //textureımızı görmek için map parametresini kullanıyoruz.
const geometry = new THREE.BoxGeometry(1, 1, 1)
// console.log(geometry.attributes.uv) //geometrinin uv koordinatlarını görmek için kullanabiliriz.
//TEXTURE ın küp dışında diğer geometrilerde nasıl göründüğünü görmek için aşağıdaki diğer geometrileri deneyin
// const geometry = new THREE.SphereGeometry(1, 32, 32)

// // Or
// const geometry = new THREE.ConeGeometry(1, 1, 32)

// // Or
// const geometry = new THREE.TorusGeometry(1, 0.35, 32, 100)

const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

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
camera.position.z = 1
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