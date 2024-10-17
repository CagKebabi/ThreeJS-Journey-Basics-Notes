//GİRİŞ
//Geometrilerin her bir görünür pikseline bir renk vermek için materialler kullanılır.

//Her pikselin rengine karar veren algoritmalar shader adı verilen programlarda yazılır. Shader yazmak WebGL ve Three.js'nin en zorlayıcı 
//kısımlarından biridir, ancak endişelenmeyin; Three.js'de önceden yapılmış shader'lara sahip birçok yerleşik materyal vardır.

//Gelecek bir derste kendi shaderlarımızı nasıl oluşturacağımızı keşfedeceğiz. Şimdilik Three.js materyallerini kullanalım.

//SETUP
//Başlangıçta sahnemiz ​​herhangi bir nesne içermiyor ve siyah bir render almalısınız. Bu, Mesh'ler oluşturmanın temellerini gözden 
//geçirmek için mükemmel bir fırsattır .

//SAHNEMİZİ HAZIRLAMA
//Materialleri test etmek için güzel bir sahne hazırlamamız ve bazı texturelar yüklememiz gerekiyor.

//3 farklı geometriden (sphere, plane ve torus) oluşan 3 Mesh oluşturun ve 3'ünün hepsinde aynı MeshBasicMaterial'ı kullanın . 
//Evet, birden fazla mesh'te bir malzeme kullanabilirsiniz. Onları ayırmak için soldaki küreyi ve sağdaki torus'u hareket ettirin.

// /**
//  * Objects
//  */
// // MeshBasicMaterial
// const material = new THREE.MeshBasicMaterial()

// const sphere = new THREE.Mesh(
//     new THREE.SphereGeometry(0.5, 16, 16),
//     material
// )
// sphere.position.x = - 1.5

// const plane = new THREE.Mesh(
//     new THREE.PlaneGeometry(1, 1),
//     material
// )

// const torus = new THREE.Mesh(
//     new THREE.TorusGeometry(0.3, 0.2, 16, 32),
//     material
// )
// torus.position.x = 1.5

// scene.add(sphere, plane, torus)

//Artık Animasyon dersinde yaptığımız gibi, tick fonksiyonumuzda nesnelerimizi döndürebiliriz:

// /**
//  * Animate
//  */
// const clock = new THREE.Clock()

// const tick = () =>
// {
//     const elapsedTime = clock.getElapsedTime()

//     // Update objects
//     sphere.rotation.y = 0.1 * elapsedTime
//     plane.rotation.y = 0.1 * elapsedTime
//     torus.rotation.y = 0.1 * elapsedTime

//     sphere.rotation.x = 0.15 * elapsedTime
//     plane.rotation.x = 0.15 * elapsedTime
//     torus.rotation.x = 0.15 * elapsedTime

//     // ...
// }

// tick()

//3 nesnenizin yavaşça döndüğünü görmelisiniz.

//rotation.x için - 0.15 * elapsedTime kullanalım, böylece diğer yöne döndüklerinden ve kaybolmadan önce düzlemi daha uzun süre takdir 
//ettiğimizden emin olalım:

// sphere.rotation.x = - 0.15 * elapsedTime
// plane.rotation.x = - 0.15 * elapsedTime
// torus.rotation.x = - 0.15 * elapsedTime

//Keşfedeceğimiz materyaller textureları birçok farklı şekilde kullanıyor. Textures dersinde yaptığımız gibi TextureLoader'ı kullanarak 
//bazı texturelar yükleyelim.

//Tüm texture görüntüleri static/11-Materials/textures/ klasöründe yer almaktadır. Şimdilik, static/11-Materials/textures/ klasöründe yer alan tüm 
//kapı texturelarını, static/11-Materials/textures/ klasöründe yer alan ilk matcap dokusunu ve static/11-Materials/textures/ klasöründe yer 
//alan ilk gradient dokusunu yükleyeceğiz.

//Materiali örneklemeden önce bunu yaptığınızdan emin olun:

/**
 * Textures
 */
// const textureLoader = new THREE.TextureLoader()

// const doorColorTexture = textureLoader.load('./textures/door/color.jpg')
// const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg')
// const doorAmbientOcclusionTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg')
// const doorHeightTexture = textureLoader.load('./textures/door/height.jpg')
// const doorNormalTexture = textureLoader.load('./textures/door/normal.jpg')
// const doorMetalnessTexture = textureLoader.load('./textures/door/metalness.jpg')
// const doorRoughnessTexture = textureLoader.load('./textures/door/roughness.jpg')
// const matcapTexture = textureLoader.load('./textures/matcaps/1.png')
// const gradientTexture = textureLoader.load('./textures/gradients/3.jpg')

//Daha önce gördüğümüz gibi, map ve matcap olarak kullanılan dokuların sRGB'de kodlanması gerekiyor ve bunu Three.js'ye colorSpace'lerini 
//THREE.SRGBColorSpace olarak ayarlayarak bildirmemiz gerekiyor:

//doorColorTexture.colorSpace = THREE.SRGBColorSpace
//matcapTexture.colorSpace = THREE.SRGBColorSpace

//Tüm textureların iyi bir şekilde yüklendiğinden emin olmak için, Dokular dersinde gördüğümüz gibi, bunları map özelliğiyle 
//materyalinizde kullanabilirsiniz.

//const material = new THREE.MeshBasicMaterial({ map: doorColorTexture })

//Şimdiye kadar, geometrimize tekdüze bir renk veya doku uygulayan MeshBasicMaterial'ı kullandık.

//Three.js belgelerinde "material" ararsanız, kullanabileceğimiz birçok sınıf olduğunu göreceksiniz. Hadi deneyelim.

//MashBasicMaterial
//MeshBasicMaterial muhtemelen en "temel" malzemedir... Ancak henüz ele almadığımız birden fazla özellik var.

//Bu özelliklerin çoğunu, parametre olarak gönderdiğimiz nesnede malzemeyi örneklendirirken ayarlayabilirsiniz, ancak bu özellikleri 
//doğrudan örnekte de değiştirebilirsiniz:

// const material = new THREE.MeshBasicMaterial({
//     map: doorColorTexture
// })

// // Equivalent
// const material = new THREE.MeshBasicMaterial()
// material.map = doorColorTexture

//Dersin geri kalanında ikinci yöntemi kullanacağız ama siz dilediğinizi yapabilirsiniz.

//Map
//Map özelliği geometrinin yüzeyine bir texture uygulayacaktır:

//material.map = doorColorTexture

//Color
//Renk özelliği, geometrinin yüzeyine tekdüze bir renk uygulayacaktır. Renk özelliğini doğrudan değiştirdiğinizde, bir Renk sınıfı 
//örneği oluşturmalısınız. Birçok farklı biçim kullanabilirsiniz.

//Önce mapi yorum satırına alıp  bu renk biçimlerini test edin:

// // material.map = doorColorTexture
// material.color = new THREE.Color('#ff0000')
// material.color = new THREE.Color('#f00')
// material.color = new THREE.Color('red')
// material.color = new THREE.Color('rgb(255, 0, 0)')
// material.color = new THREE.Color(0xff0000)

//Renk ve mapi birleştirmek dokuyu şu renge göre renklendirecektir:

// material.map = doorColorTexture
// material.color = new THREE.Color('#ff0000')

//Wireframe
//Wireframe özelliği, kameranın uzaklığından bağımsız olarak, geometrinizi oluşturan üçgenleri 1 piksellik ince bir çizgiyle gösterecektir:

// // material.map = doorColorTexture
// // material.color = new THREE.Color('#ff0000')
// material.wireframe = true

//Gördüğünüz gibi plane geometrisi sadece iki üçgenden oluşuyor ve bu da dersin ilerleyen kısımlarında bir problem olacak.

//Opacity
//Opacity özelliği şeffaflığı kontrol eder ancak çalışması için, Three.js'ye bu materyalin artık şeffaflığı desteklediğini bildirmek 
//için şeffaflık özelliğini true olarak ayarlamanız gerekir.

// // material.map = doorColorTexture
// // material.color = new THREE.Color('#ff0000')
// // material.wireframe = true
// material.transparent = true
// material.opacity = 0.5

//Gri gibi görünse de, beyaz malzemenin altından siyah arka planı görebildiğimiz için öyle değil.

//AlphaMap
//Artık şeffaflık çalıştığına göre, şeffaflığı bir texture ile kontrol etmek için alphaMap özelliğini kullanabiliriz:

// // material.map = doorColorTexture
// // material.color = new THREE.Color('#ff0000')
// // material.wireframe = true
// material.transparent = true
// // material.opacity = 0.5
// material.alphaMap = doorAlphaTexture

//Side
//Side özelliği, facelerin hangi tarafının görünür olduğuna karar vermenizi sağlar. Varsayılan olarak, ön taraf görünürdür (THREE.FrontSide), 
//ancak bunun yerine arka tarafı (THREE.BackSide) veya her ikisini de (THREE.DoubleSide) gösterebilirsiniz:


// // material.map = doorColorTexture
// // material.color = new THREE.Color('#ff0000')
// // material.wireframe = true
// // material.transparent = true
// // material.opacity = 0.5
// // material.alphaMap = doorAlphaTexture
// material.side = THREE.DoubleSide


//Plane geometrimizin hem önünü hem de arkasını görmelisiniz.

//Mümkün olduğunca THREE.DoubleSide kullanmaktan kaçının çünkü yan taraf görünmese bile aslında render sırasında daha fazla kaynak 
//gerektirir.

//wireframe veya opacity gibi bu özelliklerden bazıları aşağıdaki materiallerin çoğuyla kullanılabilir. Bunları her seferinde 
//tekrarlamayacağız.

//MeshNormalMaterial 
//MeshNormalMaterial, Textures derslerinde gördüğümüz normal dokuya benzeyen güzel bir mor, mavimsi renk gösterir. Bu bir tesadüf değildir 
//çünkü ikisi de "normaller" dediğimiz şeyle ilişkilidir.

//Ayrıca, tüm nesnelerdeki materyalin yerini aldığından emin olmak için ona material diyeceğiz ve bir noktada geri dönmek isterseniz 
//MeshBasicMaterial'ı yorumlayacağız:

// // // MeshBasicMaterial
// // const material = new THREE.MeshBasicMaterial()
// // material.map = doorColorTexture
// // material.color = new THREE.Color('#ff0000')
// // material.wireframe = true
// // material.transparent = true
// // material.opacity = 0.5
// // material.alphaMap = doorAlphaTexture
// // material.side = THREE.DoubleSide

// // MeshNormalMaterial
// const material = new THREE.MeshNormalMaterial()

//Normaller, facein dış yönünü içeren her bir vertexe kodlanmış bilgilerdir. Bu normalleri oklar olarak görüntülerseniz, 
//geometrinizi oluşturan her bir tepe noktasından çıkan düz çizgiler elde edersiniz.(ders notlarında resim mecvut)

//Facein nasıl aydınlatılacağını veya çevrenin geometrilerin yüzeyinde nasıl yansıtılacağını veya kırılacağını hesaplamak gibi birçok şey 
//için Normal'leri kullanabilirsiniz.

//MeshNormalMaterial kullanıldığında, renk yalnızca kameraya göre normal yönelimi gösterecektir. Kürenin etrafında dönerseniz, kürenin 
//hangi kısmına baktığınızdan bağımsız olarak rengin her zaman aynı olduğunu göreceksiniz.

//MeshBasicMaterial ile keşfettiğimiz wireframe, transparent, opacity ve side gibi özelliklerden bazılarını kullanabilmenize rağmen, flatShading 
//adı verilen kullanabileceğiniz yeni bir özellik daha var:

//material.flatShading = true

//flatShading faceleri düzleştirecek, yani normaller vertxler arasında enterpole edilmeyecek.

//MeshNormalMaterial normalleri ayıklamak için yararlı olabilir, ama aynı zamanda harika görünür ve tıpkı ilithya'nın portföyünde https://www.ilithya.rocks yaptığı gibi olduğu gibi kullanabilirsiniz.

//MeshMatcapMaterial 
//MeshMatcapMaterial, çok iyi performans gösterirken ne kadar harika görünebildiği nedeniyle harika bir malzemedir.

//Çalışması için MeshMatcapMaterial'in küre gibi görünen bir referans texturea ihtiyacı vardır.

// // // MeshNormalMaterial
// // const material = new THREE.MeshNormalMaterial()
// // material.flatShading = true

// // MeshMatcapMaterial
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

//Meshler aydınlatılmış gibi görünecek, ancak bu doku tarafından yaratılan bir illüzyon. Sahnede ışık yok.

//Tek sorun, kameranın yönü ne olursa olsun sonucun aynı olması. Ayrıca, ışıklar olmadığı için ışıkları güncelleyemezsiniz.

///static/11-Materials/textures/matcaps/ klasöründe bulunan farklı dokuları deneyin (aşağıdaki satırlardan sadece biri):

// const matcapTexture = textureLoader.load('/textures/matcaps/2.png')
// const matcapTexture = textureLoader.load('/textures/matcaps/3.png')
// const matcapTexture = textureLoader.load('/textures/matcaps/4.png')
// const matcapTexture = textureLoader.load('/textures/matcaps/5.png')
// const matcapTexture = textureLoader.load('/textures/matcaps/6.png')
// const matcapTexture = textureLoader.load('/textures/matcaps/7.png')
// const matcapTexture = textureLoader.load('/textures/matcaps/8.png')

//Matcaps texturelarının nerede bulunacağını bilmek istiyorsanız, aşağıdaki geniş matcaps listesine göz atın: 
//https://github.com/nidorx/matcaps

//Lisansların hepsinin doğrulanmadığını ve bunları kişisel projeler dışında kullanmanıza izin verilmeyebileceğini unutmayın.

//Ayrıca, kameranın önündeki bir küreyi kare bir görüntüde işleyerek 3D yazılım kullanarak kendi matcap'lerinizi de oluşturabilirsiniz. 
//Hatta Photoshop gibi 2D yazılımlarda bir matcap oluşturmayı bile deneyebilirsiniz. Ve son olarak, Kevin Chapelier'in oluşturduğuna 
//benzer çevrimiçi araçları kullanabilirsiniz: https://www.kchapelier.com/matcap-studio/:

//MeshDepthMaterial 
//MeshDepthMaterial, eğer kameranın near değerine yakınsa geometriyi beyaza, eğer kameranın far değerine yakınsa siyaha boyayacaktır:

// // MeshDepthMaterial
// const material = new THREE.MeshDepthMaterial()

//Aslında bundan biraz daha karmaşıktır ve bu material aslında bir texturedaki derinliği kaydetmek için kullanılır, bu da gölgeleri işleme 
//gibi daha sonraki karmaşık hesaplamalar için kullanılabilir.

//Bunu gelecekteki bir derste daha fazla öğreneceğiz.

//MeshLambertMaterial 
//Bir sonraki materyal MeshLambertMaterial'dır :

// // MeshLambertMaterial
// const material = new THREE.MeshLambertMaterial()

//Az önce ne oldu? Konsolda hiçbir hata olmamasına rağmen ekran şimdi tamamen siyah.

//Şöyle ki: MeshLambertMaterial, listede ışıkların görülmesini gerektiren ilk malzemedir.

//Hadi, biraz ışık ekleyelim.

//Sahneye Işık Ekleme
//Sahnemize iki basit ışık ekleyeceğiz ancak konuya çok fazla girmeyeceğiz çünkü ışıklara ayrılmış bir ders var.

//Bir AmbientLight yaratın ve sahneye ekleyin:

// /**
//  * Lights
//  */
// const ambientLight = new THREE.AmbientLight(0xffffff, 1)
// scene.add(ambientLight)

//Bir PointLight oluşturun ve sahneye ekleyin:

// // ...

// const pointLight = new THREE.PointLight(0xffffff, 30)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
// scene.add(pointLight)

//Gördüğünüz gibi işler gerçekçileşiyor. Aydınlatma çok ikna edici olmasa da iyi bir başlangıç.

//MeshLambertMaterial, MeshBasicMaterial ile aynı özellikleri destekler ancak ışıklarla ilgili bazı özellikleri de destekler. 
//Bu özellikleri derste daha uygun malzemelerle ele alacağız.

//MeshLambertMaterial, ışık kullanan en performanslı malzemedir. Ne yazık ki parametreler kullanışlı değildir ve küre gibi yuvarlak 
//geometrilere yakından bakarsanız geometride garip desenler görebilirsiniz.

//MeshPhongMaterial 
//MeshPhongMaterial , MeshLambertMaterial'e çok benzer , ancak garip desenler daha az görünür ve ayrıca geometrinin yüzeyindeki ışık 
//yansımasını da görebilirsiniz:

// // MeshPhongMaterial
// const material = new THREE.MeshPhongMaterial()

//MeshPhongMaterial, MeshLambertMaterial'dan daha az performanslıdır. Ancak, bu seviyede gerçekten önemli değildir.

//Işık yansımasını shininess  propertysiyle kontrol edebilirsiniz. Değer ne kadar yüksekse, yüzey o kadar parlak olur. 
//Ayrıca yansımanın rengini specular propertysini kullanarak değiştirebilirsiniz:

// material.shininess = 100
// material.specular = new THREE.Color(0x1188ff)

//MeshToonMaterial 
//MeshToonMaterial, özellikleri bakımından MeshLambertMaterial'e benzer ancak çizgi film tarzına sahiptir:

// // MeshToonMaterial
// const material = new THREE.MeshToonMaterial()

//Varsayılan olarak, yalnızca iki parçalı bir renklendirme elde edersiniz (biri gölge için, diğeri ışık için). Renklendirmeye daha fazla 
//adım eklemek için, dersin başında gradientMap özelliğinde yüklediğimiz gradientTexture'ı kullanabilirsiniz:

//material.gradientMap = gradientTexture

//Çizgi film efekti artık çalışmıyor. Bunun nedeni, gradient textureının aslında 3'e 1 piksellik çok çok küçük bir texture olmasıdır. 
//Bu texturedan pikselleri çıkarırken, GPU bunları harmanlayacaktır. (Ders notlarında fotoğraf ile örnek var)

//Neyse ki, minFilter, magFilter sayesinde GPU'nun bu tür dokuları nasıl işlediğini kontrol edebiliriz, tıpkı mipmapping hakkında 
//konuşurken Textrues dersinde gördüğümüz gibi.

//minFilter ve magFilter'ı THREE.NearestFilter olarak değiştirin.

// // MeshToonMaterial
// const material = new THREE.MeshToonMaterial()
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// material.gradientMap = gradientTexture


//Artık çizgi film efektini görmelisiniz.

//Ve THREE.NearestFilter aslında texturea ait herhangi bir mipmap sürümünü kullanmadığından, gradientTexture.generateMipmaps'i false 
//olarak ayarlayarak biraz bellek boşaltmak için mipmap'lerin oluşturulmasını devre dışı bırakabiliriz:

// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// gradientTexture.generateMipmaps = false

//static/11-Mateirals/textures/gradients.5.jpg dosyasında bulunan görseli kullanarak daha fazla adım deneyebilirsiniz:

//const gradientTexture = textureLoader.load('/textures/gradients/5.jpg')

//MeshStandardMaterial 
//MeshStandardMaterial fiziksel tabanlı işleme prensiplerini (PBR) kullanır. Evet, Textures dersinde gördüğümüz PBR'den bahsediyoruz. 
//MeshLambertMaterial ve MeshPhongMaterial gibi, daha gerçekçi bir algoritma ve pürüzlülük ve metallik gibi daha iyi parametrelerle 
//ışıkları destekler.

//"Standart" olarak adlandırılır çünkü PBR birçok yazılım, motor ve kütüphanede standart haline gelmiştir. Amaç, gerçekçi parametrelerle 
//gerçekçi bir sonuç elde etmektir ve kullandığınız teknolojiden bağımsız olarak çok benzer bir sonuca sahip olmalısınız:

// // MeshStandardMaterial
// const material = new THREE.MeshStandardMaterial()

//Pürüzlülük(roughness ) ve metallik özelliklerini doğrudan değiştirebilirsiniz:

// material.metalness = 0.45
// material.roughness = 0.65

//Debug UI Ekleme
//Şimdi bir hata ayıklama kullanıcı arayüzü eklemek için mükemmel bir zaman olurdu. Bu, farklı özellikleri test etmek için çok yararlı 
//olacaktır.

//Öncelikle lil-gui bağımlılığını projemize eklemeliyiz . Terminalde, proje klasöründe (sunucunun şu anda çalışıyor olması gereken yerde), 
//aşağıdaki komutu kullanın:

//npm install lil-gui

//Daha sonra kodunuzun en üstüne şunu import edin ( eğer durdurduysanız lil-guisunucuyu tekrar başlatmayı unutmayın ):npm run dev

//import GUI from 'lil-gui'

//Artık şunun bir örneğini oluşturabilirsiniz GUI:

// /**
//  * Debug
//  */
// const gui = new GUI()

//Daha sonra (malzemeyi oluşturduktan sonra) şu ayarlamaları yapın:

// const material = new THREE.MeshStandardMaterial()
// material.metalness = 0.45
// material.roughness = 0.65

// gui.add(material, 'metalness').min(0).max(1).step(0.0001)
// gui.add(material, 'roughness').min(0).max(1).step(0.0001)

//Ve işte bu kadar. Artık metalliği ve pürüzlülüğü istediğiniz gibi değiştirebilirsiniz.

//Adding an environment map
//MeshStandardMaterial ile işimiz bitmedi, ancak daha fazla ilerlemeden önce, ortam haritası (environment map) adı verilen ek bir özellik 
//ekleyeceğiz.

//Ortam haritası, sahnenin etrafındaki şeylerin bir görüntüsü gibidir ve /static/11-Materials/textures/environmentMap/2k.hdr'de bulabilirsiniz. 
//İşletim sisteminiz destekliyorsa önizlemesini görebilirsiniz. Desteklemiyorsa endişelenmeyin, çünkü önemli değil ve Three.js bunu 
//halledebilir.

//Mevcut Yönlü Işık ve Ortam Işığı'na ek olarak, nesnelerinize yansıma, kırılma ve ayrıca aydınlatma eklemek için kullanabilirsiniz.

//Işıklar konusunda olduğu gibi, bunu da ayrıntılı olarak ele almayacağız çünkü buna ayrılmış bir ders var, bu derste kendi 
//environment maplarinizi oluşturmanın birçok yolunu da öğreneceksiniz.

//Gelecek çevre haritasını değerlendirebilmemiz için öncelikle MeshStandardMaterial'in metalliğini ve roughnessini değiştirerek başlayalım:

// const material = new THREE.MeshStandardMaterial()
// material.metalness = 0.7
// material.roughness = 0.2

//Daha önce belirtilen ortam haritası dosyasını yüklemek için RGBELoader'ı kullanmamız gerekir. RGBELoader'ı 
//three/examples/jsm/loaders/RGBELoader.js'den içe aktarın:

//import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

//Daha sonra, bunu rgbeLoader olarak örneklendirmemiz ve load() metodunu kullanarak ./textures/environmentMap/2k.hdr dosyasını 
//yüklememiz gerekiyor:

// /**
//  * Environment map
//  */
// const rgbeLoader = new RGBELoader()
// rgbeLoader.load('./textures/environmentMap/2k.hdr', (environmentMap) =>
// {
//     console.log(environmentMap)
// })

//textureLoader'ın aksine, ikinci parametre olarak bir geri çağırma fonksiyonu göndermemiz gerekiyor. Yüklenen ortam haritasını o 
//fonksiyonun parametresi olarak alabiliriz.

//Bunu sahnemize uygulayabilmek için, mapping özelliğini THREE.EquirectangularReflectionMapping olarak değiştirmemiz ve ardından bunu 
//sahnenin arka plan ve ortam özelliklerine atamamız gerekir:

// rgbeLoader.load('./textures/environmentMap/2k.hdr', (environmentMap) =>
//     {
//         environmentMap.mapping = THREE.EquirectangularReflectionMapping
    
//         scene.background = environmentMap
//         scene.environment = environmentMap
//     })

//Çevrenin geometrinin yüzeyinde yansıdığını görmelisiniz. Farklı sonuçlar için metalliği ve pürüzlülüğü ayarlamayı deneyin.

//Şimdilik yalnızca çevre haritasını eklemiş olsak da, MeshLambertMaterial ve MeshPhongMaterial ile de uyumludur.

//Ve çevre haritası kendi başına yeterli olduğundan, AmbientLight ve PointLight'ı kaldıracağız veya yorum satırına alacağız:

// // const ambientLight = new THREE.AmbientLight(0xffffff, 1)
// // scene.add(ambientLight)

// // const pointLight = new THREE.PointLight(0xffffff, 30)
// // pointLight.position.x = 2
// // pointLight.position.y = 3
// // pointLight.position.z = 4
// // scene.add(pointLight)

//Diğer Propertyler
//MeshStandardMaterial'in diğer özelliklerine devam edelim.

//Map özelliği basit bir texture uygulamanıza olanak tanır. doorColorTexture'ı kullanabilirsiniz:

//aoMap özelliği (kelimenin tam anlamıyla "ortam kapanma haritası"ambient occlusion map), texture karanlık olduğunda gölgeler ekleyecektir.

//Ardından, doorAmbientOcclusionTexture dokusunu kullanarak aoMap'i ekleyin ve aoMapIntensity özelliğini kullanarak yoğunluğu kontrol edin:

// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1

//Çatlaklar daha koyu görünmelidir, bu kontrast yaratır ve boyut ekler.

//aoMap'in yalnızca AmbientLight, environment map ve daha sonraki bir derste göreceğiniz HemisphereLight tarafından oluşturulan ışığı 
//etkilediğini unutmayın.

//displacementMap özelliği, gerçek rahatlama oluşturmak için köşeleri hareket ettirecektir:

//material.displacementMap = doorHeightTexture

//Korkunç görünmeli. Bunun nedeni geometrilerimizdeki tepe noktalarının eksikliği ve yer değiştirmenin çok güçlü olmasıdır.

//Geometrilere daha fazla subdivision ekleyin:

// new THREE.SphereGeometry(0.5, 64, 64),

// // ...

// new THREE.PlaneGeometry(1, 1, 100, 100),

// // ...

// new THREE.TorusGeometry(0.3, 0.2, 64, 128),

//Yükseltiler daha kesin görünüyor, ancak çok fazla güçlü. Bunu yer displacementScale  özelliğiyle kontrol edebiliriz:

//material.displacementScale = 0.1

//Tüm geometri için tekdüze metallik ve roughness belirtmek yerine, metalnessMap ve roughnessMap'i kullanabiliriz:

// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture

//Yansıma garip görünüyor çünkü metalness ve roughness özellikleri hala metalnessMap ve roughnessMap'i etkiliyor. Düzgün çalışması için 
//hem metalness'i hem de roughness'i 1'e ayarlamamız gerekiyor:

// material.metalness = 1
// material.roughness = 1

// Artık kapının metal kısımlarındaki yansımaların keyfini çıkarabiliriz. Dokunun, ahşapta vernik kaplama varmış gibi görünmesi için 
//yapıldığını unutmayın, bu yüzden hala bazı yansımaları algılayabiliriz.

// normalMap, normal yönelimi taklit edecek ve subdivisiona bakılmaksızın yüzeye ayrıntılar ekleyecektir:

//material.normalMap = doorNormalTexture

//NormalScale özelliği ile normal yoğunluğu değiştirebilirsiniz. Dikkatli olun, bu bir Vector2:

//material.normalScale.set(0.5, 0.5)

//Ve son olarak, alphaMap özelliğini kullanarak alfayı kontrol edebilirsiniz. Transparent özelliğini true olarak ayarlamayı unutmayın:

// material.transparent = true
// material.alphaMap = doorAlphaTexture

//MeshPhysicalMaterial 
//MeshPhysicalMaterial , MeshStandardMaterial ile aynıdır ancak şeffaf kaplama, parlaklık, yanardönerlik ve geçirgenlik - 
//clearcoat, sheen, iridescence, and transmission. gibi ek efektlerin desteğine sahiptir.

//Bu materyali uygulamak için, tüm MeshStandardMaterial'ı, özelliklerini ve ince ayarlarını kopyalayın, ardından sınıfı 
//MeshPhysicalMaterial ile değiştirin. MeshStandardMaterial'ı yorumlamayı unutmayın:

// /**
//  * MeshPhysicalMaterial
//  */
// // Base material
// const material = new THREE.MeshPhysicalMaterial()
// material.metalness = 1
// material.roughness = 1
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.1
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)

// gui.add(material, 'metalness').min(0).max(1).step(0.0001)
// gui.add(material, 'roughness').min(0).max(1).step(0.0001)

//Tüm önceki özellikler destekleniyor çünkü MeshPhysicalMaterial, MeshStandardMaterial'dan miras alıyor ve artık bu yeni özelliklere 
//erişebiliyoruz. Bu temel materyali koruyarak bunları ayrı ayrı deneyeceğiz.

//Clearcoat
//Şeffaf vernik(Clearcoat), gerçek malzemenin üstünde ince bir vernik tabakasını simüle edecektir. Bu katmanın kendi yansıtıcı özellikleri vardır ve 
//biz hala arkasındaki varsayılan malzemeyi görebiliriz.

//Örnek:https://threejs.org/examples/#webgl_materials_physical_clearcoat

//Clearcoat ve clearcoatRoughness özelliklerini ilgili ayarlamalarıyla birlikte ekleyin:

// // Clearcoat
// material.clearcoat = 1
// material.clearcoatRoughness = 0

// gui.add(material, 'clearcoat').min(0).max(1).step(0.0001)
// gui.add(material, 'clearcoatRoughness').min(0).max(1).step(0.0001)

//Sanki aynı malzemenin üstünde bir cam varmış gibi.

//Sheen
//Parlaklık, dar bir açıdan bakıldığında malzemeyi vurgulayacaktır. Bu etkiyi genellikle kumaş gibi kabarık malzemelerde görebiliriz.

//Örnek:https://threejs.org/examples/?q=sheen#webgl_loader_gltf_sheen

//Clearcoat kısmını yorum satırına alın.

//Sheen, sheenRoughness ve sheenColor özelliklerini ilgili ayarlamalarıyla ekleyin:

// // Sheen
// material.sheen = 1
// material.sheenRoughness = 0.25
// material.sheenColor.set(1, 1, 1)

// gui.add(material, 'sheen').min(0).max(1).step(0.0001)
// gui.add(material, 'sheenRoughness').min(0).max(1).step(0.0001)
// gui.addColor(material, 'sheenColor')

//Yine bu efekt dar bir açıdan bakıldığında malzemeye uygulanır. Kumaş benzeri malzemelerle en iyi şekilde çalışsa da, malzemenin 
//yumuşak hissettirmesini sağlar.

//Iridescence
//İridescence, yakıt birikintisi, sabun köpüğü veya bunları hatırlayabilecek yaşta olanlar için LaserDisc'ler gibi renk eserlerini 
//görebildiğimiz bir etkidir.

//Örnek:https://threejs.org/examples/?q=anis#webgl_loader_gltf_anisotropy

//Sheen kısmını yorumlayın.

//İridescence, iridescenceIOR ve iridescenceThicknessRange özelliklerini ilgili ayarlamalarıyla ekleyin:

// // Iridescence
// material.iridescence = 1
// material.iridescenceIOR = 1
// material.iridescenceThicknessRange = [ 100, 800 ]

// gui.add(material, 'iridescence').min(0).max(1).step(0.0001)
// gui.add(material, 'iridescenceIOR').min(1).max(2.333).step(0.0001)
// gui.add(material.iridescenceThicknessRange, '0').min(1).max(1000).step(1)
// gui.add(material.iridescenceThicknessRange, '1').min(1).max(1000).step(1)

//Transmission
//Transmission, ışığın malzemeden geçmesini sağlayacaktır. Bu, sadece opaklık içeren şeffaflıktan daha fazlasıdır çünkü nesnenin arkasındaki 
//görüntü deforme olur.

//Örnek:https://threejs.org/examples/?q=physica#webgl_materials_physical_transmission_alpha

//İridescence kısmını yorumlayın.

//Transmisyon, ior ve thickness  özelliklerini ilgili ayarlamalarıyla ekleyin:

// // Transmission
// material.transmission = 1
// material.ior = 1.5
// material.thickness = 0.5

// gui.add(material, 'transmission').min(0).max(1).step(0.0001)
// gui.add(material, 'ior').min(1).max(10).step(0.0001)
// gui.add(material, 'thickness').min(0).max(1).step(0.0001)

//Nesneler yarı saydam hissedilir.

//ior, Kırılma İndeksi anlamına gelir ve simüle etmek istediğiniz malzeme türüne bağlıdır.

//Bir elmasın ior'u 2,417, suyun ior'u 1,333 ve havanın ior'u 1,000293'tür.

//Tüm listeyi Wikipedia'da bulabilirsiniz https://en.wikipedia.org/wiki/List_of_refractive_indices

//Kalınlık sabit bir değerdir ve nesnenin gerçek kalınlığı hesaba katılmaz.

//Şu anda, malzememizi bozan birçok haritamız var, ancak iletim saf bir malzemeyle de gerçekten iyi görünüyor.

//Tüm haritaları kaldırın veya yorumlayın ve metalliği ve pürüzlülüğü 0 olarak ayarlayın:

// const material = new THREE.MeshPhysicalMaterial()
// material.metalness = 0
// material.roughness = 0
// // material.map = doorColorTexture
// // material.aoMap = doorAmbientOcclusionTexture
// // material.aoMapIntensity = 1
// // material.displacementMap = doorHeightTexture
// // material.displacementScale = 0.1
// // material.metalnessMap = doorMetalnessTexture
// // material.roughnessMap = doorRoughnessTexture
// // material.normalMap = doorNormalTexture
// // material.normalScale.set(0.5, 0.5)
// // material.transparent = true
// // material.alphaMap = doorAlphaTexture

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js' //environment map kullanmak için bu özelliği kullanacağız
import "./style.css"

/**
 * Debug
 */
const gui = new GUI()

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

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
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('./11-Materials/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('./11-Materials/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('./11-Materials/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./11-Materials/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('./11-Materials/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('./11-Materials/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('./11-Materials/textures/door/roughness.jpg')
const gradientTexture = textureLoader.load('./11-Materials/textures/gradients/3.jpg')
//const gradientTexture = textureLoader.load('/11-Materials/textures/gradients/5.jpg')
const matcapTexture = textureLoader.load('./11-Materials/textures/matcaps/1.png')
//const matcapTexture = textureLoader.load('/11-Materials/textures/matcaps/2.png')
//const matcapTexture = textureLoader.load('/11-Materials/textures/matcaps/3.png')
//const matcapTexture = textureLoader.load('/11-Materials/textures/matcaps/4.png')
//const matcapTexture = textureLoader.load('/11-Materials/textures/matcaps/5.png')
//const matcapTexture = textureLoader.load('/11-Materials/textures/matcaps/6.png')
//const matcapTexture = textureLoader.load('/11-Materials/textures/matcaps/7.png')
//const matcapTexture = textureLoader.load('/11-Materials/textures/matcaps/8.png')

doorColorTexture.colorSpace = THREE.SRGBColorSpace
matcapTexture.colorSpace = THREE.SRGBColorSpace

/**
 * Objects
 */
// MeshBasicMaterial
// //const material = new THREE.MeshBasicMaterial({ map: doorColorTexture })

// // Equivalent
// const material = new THREE.MeshBasicMaterial()
// // material.map = doorColorTexture
// // material.color = new THREE.Color('#ff0000')

// // material.color = new THREE.Color('#ff0000')
// // material.color = new THREE.Color('#f00')
// // material.color = new THREE.Color('red')
// // material.color = new THREE.Color('rgb(255, 0, 0)')
// //material.color = new THREE.Color(0xff0000)

// //material.wireframe = true

// //material.transparent = true //materialimize opacity vereceğimiz zaman bu değer true olmalıdır
// //material.opacity = 0.1
// //material.alphaMap = doorAlphaTexture //textureumuz ile opacity uygular

// material.side = THREE.DoubleSide //geometrilein diğer kısımlarınada texture uygular kullanılması performansı düşürür

// // MeshNormalMaterial
// const material = new THREE.MeshNormalMaterial()
//material.flatShading = true

// // MeshMatcapMaterial
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

// // MeshDepthMaterial
// const material = new THREE.MeshDepthMaterial()

// // MeshLambertMaterial
// const material = new THREE.MeshLambertMaterial()

// // MeshPhongMaterial
// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color(0x1188ff)

// // MeshToonMaterial
// const material = new THREE.MeshToonMaterial()
// material.gradientMap = gradientTexture
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// gradientTexture.generateMipmaps = false

// // MeshStandardMaterial
// const material = new THREE.MeshStandardMaterial()
// material.metalness = 1
// material.roughness = 1

// material.map = doorColorTexture

// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1

// material.displacementMap = doorHeightTexture

// material.displacementScale = 0.1 

// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture

// material.normalMap = doorNormalTexture

// material.normalScale.set(0.5, 0.5)

// material.transparent = true
// material.alphaMap = doorAlphaTexture

// gui.add(material, 'metalness').min(0).max(1).step(0.0001)
// gui.add(material, 'roughness').min(0).max(1).step(0.0001)

/**
 * MeshPhysicalMaterial
 */
// // Base material
// const material = new THREE.MeshPhysicalMaterial()
// material.metalness = 1
// material.roughness = 1
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.1
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)
// material.transparent = true
// material.alphaMap = doorAlphaTexture

// // Clearcoat
// material.clearcoat = 1
// material.clearcoatRoughness = 0

// gui.add(material, 'clearcoat').min(0).max(1).step(0.0001)
// gui.add(material, 'clearcoatRoughness').min(0).max(1).step(0.0001)

// // Sheen
// material.sheen = 1
// material.sheenRoughness = 0.25
// material.sheenColor.set(1, 1, 1)

// gui.add(material, 'sheen').min(0).max(1).step(0.0001)
// gui.add(material, 'sheenRoughness').min(0).max(1).step(0.0001)
// gui.addColor(material, 'sheenColor')

// // Iridescence
// material.iridescence = 1
// material.iridescenceIOR = 1
// material.iridescenceThicknessRange = [ 100, 800 ]

// gui.add(material, 'iridescence').min(0).max(1).step(0.0001)
// gui.add(material, 'iridescenceIOR').min(1).max(2.333).step(0.0001)
// gui.add(material.iridescenceThicknessRange, '0').min(1).max(1000).step(1)
// gui.add(material.iridescenceThicknessRange, '1').min(1).max(1000).step(1)

//Bu kısım transmission için kullanılır diğer materialler için üs kısımı yorum satırından kaldırıp burayı yorum satırına alabilirz.
const material = new THREE.MeshPhysicalMaterial()
material.metalness = 0
material.roughness = 0
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.1
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)
// material.transparent = true
// material.alphaMap = doorAlphaTexture

// Transmission
material.transmission = 1
material.ior = 1.5
material.thickness = 0.5

gui.add(material, 'transmission').min(0).max(1).step(0.0001)
gui.add(material, 'ior').min(1).max(10).step(0.0001)
gui.add(material, 'thickness').min(0).max(1).step(0.0001)

gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
)
sphere.position.x = - 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128),
    material
)
torus.position.x = 1.5

scene.add(sphere, plane, torus)

// /**
//  * Lights
//environment map eklediğimizde kendisi ışık için yeterli olduğundan light bölmümümüzü yorum satırına alabiliriz.
//  */
// const ambientLight = new THREE.AmbientLight(0xffffff, 1)
// scene.add(ambientLight)

// const pointLight = new THREE.PointLight(0xffffff, 30)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
// scene.add(pointLight)

/**
 * Environment map
 */
const rgbeLoader = new RGBELoader()
rgbeLoader.load('./11-Materials/textures/environmentMap/2k.hdr', (environmentMap) =>
{
    //console.log(environmentMap)
    environmentMap.mapping = THREE.EquirectangularReflectionMapping
    
    scene.background = environmentMap
    scene.environment = environmentMap
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

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    plane.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = -0.15 * elapsedTime
    plane.rotation.x = -0.15 * elapsedTime
    torus.rotation.x = -0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()