//GİRİŞ
//Zaten bir PerspectiveCamera oluşturduk, ancak dokümanlarda görebileceğiniz gibi başka kamera türleri de var.

//Camera
//Camera sınıfı soyut(abstract) sınıf olarak adlandırdığımız bir sınıftır. Bunu doğrudan kullanmanız beklenmez, 
//ancak ortak özelliklere ve yöntemlere erişmek için ondan miras alabilirsiniz. Aşağıdaki sınıflardan bazıları 
//Camera sınıfından miras alır.

//ArrayCamera
//ArrayCamera, sahnenizi birden fazla kamera kullanarak birden fazla kez işlemek için kullanılır. Her kamera canvasın belirli bir alanını 
//işler. Bunu, bölünmüş bir ekranı paylaşmak zorunda olduğumuz eski tarzda konsollarda çok oyunculu oyunlarına benzetebilirsiniz.

//StereoCamera
//StereoCamera, beyninizi derinlik olduğuna inandıracak bir paralaks efekti yaratmak için gözleri taklit eden iki kamera aracılığıyla 
//sahneyi işlemek için kullanılır. Sonucu görmek için VR başlığı veya kırmızı ve mavi gözlükler gibi yeterli donanıma sahip olmalısınız.

//CubeCamera
//CubeCamera, çevrenin bir render'ını oluşturmak için her yöne (ileri, geri, sola, sağa, yukarı ve aşağı) bakan bir render elde etmek 
//için kullanılır. Yansıma veya gölge haritası için bir ortam haritası oluşturmak için kullanabilirsiniz. 
//Bunlar hakkında daha sonra konuşacağız.

//OrthographicCamera
//OrthographicCamera, perspektif olmadan sahnenizin ortografik render'larını oluşturmak için kullanılır. Age of Empire gibi bir RTS 
//oyunu yapıyorsanız kullanışlıdır. Öğeler, kameradan uzaklıklarına bakılmaksızın ekranda aynı boyutta olacaktır.

//PerspectiveCamera
//PerspectiveCamera daha önce kullandığımız ve perspektifli gerçek bir kamerayı simüle ettiğimiz kameradır. 
//OrthographicCamera ve PerspectiveCamera'ya odaklanacağız.

//PERSPECTIVECAMERA
//Daha önce gördüğümüz gibi, PerspectiveCamera classının örneklenmesi için bazı parametrelere ihtiyacı var, 
//ancak tüm olası parametreleri kullanmadık. Üçüncü ve dördüncü parametreleri ekleyin:

//const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 100)

//PerspectiveCamera nın aldığı parametreleri daha detaylı konuşalım;

//Field of view
//Görüş alanı adı verilen ilk parametre, kameranızın görüş alanının derece cinsinden dikey genlik açısına karşılık gelir. 
//Küçük bir açı kullanırsanız, uzun bir kapsam efekti elde edersiniz ve geniş bir açı kullanırsanız, balık gözü efekti elde edersiniz 
//çünkü sonunda kameranın gördüğü şey tuvale uyması için gerilir veya sıkıştırılır.
//Doğru görüş alanını seçmek için, bazı şeyleri denemeniz gerekecek. Ben genellikle 45 ile 75 arasında bir görüş alanı kullanıyorum.

//Aspect ratio
//İkinci parametre en boy oranı olarak adlandırılır ve genişliğin yüksekliğe bölünmesine karşılık gelir. 
//Bunun tuval genişliği ile tuval yüksekliğinin bir sonucu olduğunu ve Three.js'nin bunu kendi kendine hesaplaması gerektiğini 
//düşünebilirsiniz ancak Three.js'yi çok belirli şekillerde kullanmaya başlarsanız durum her zaman böyle olmaz. Ancak bizim durumumuzda, 
//tuval genişliğini ve tuval yüksekliğini kullanabilirsiniz. Bu değerleri bir nesnede kaydetmenizi öneririm çünkü bunlara birden fazla kez 
//ihtiyacımız olacak:

//const sizes = {
//    width: 800,
//    height: 600
//}

//Near and far
//Yakın ve uzak olarak adlandırılan üçüncü ve dördüncü parametreler, kameranın ne kadar yakın ve ne kadar uzağı görebildiğine 
//karşılık gelir. Kameraya yakın değerinden daha yakın veya uzak değerinden daha uzak olan herhangi bir nesne veya nesnenin bir 
//parçası render'da gösterilmez.
//Bunu, ağaçların uzaktan fırladığını görebildiğiniz eski yarış oyunlarındaki gibi görebilirsiniz.
//0.0001 ve 9999999 gibi çok küçük ve çok büyük değerler kullanmaya meyilli olsanız da, iki yüzün hangisinin diğerinin üstünde render 
//edileceği konusunda kavga ettiği z-fighting adlı bir hatayla karşılaşabilirsiniz.
//https://twitter.com/FreyaHolmer/status/799602767081848832
//https://twitter.com/Snapman_I_Am/status/800567120765616128
//Makul değerler kullanmaya çalışın ve bunları yalnızca ihtiyacınız olduğunda artırın. Bizim durumumuzda 0.1 ve 100'ü kullanabiliriz.

//ORTHOGRAPHICCAMERA
//Ders boyunca bu tür bir kamera kullanmayacağız ancak belirli projelerde faydalı olabilir.
//OrthographicCamera, PerspectiveCamera'dan perspektif eksikliği ile ayrılır; bu, nesnelerin kameraya olan uzaklıklarından bağımsız 
//olarak aynı boyutta olacağı anlamına gelir.
//Sağlamanız gereken parametreler PerspectiveCamera'dan çok farklıdır.
//Bir görüş alanı (field of view) yerine, kameranın her yönde (sol, sağ, üst ve alt) ne kadar uzağı görebileceğini sağlamalısınız. 
//Daha sonra PerspectiveCamera için yaptığımız gibi yakın ve uzak değerlerini sağlayabilirsiniz.

//const camera = new THREE.OrthographicCamera(- 1, 1, 1, - 1, 0.1, 100)

//Gördüğünüz gibi, perspektif yok ve küpümüzün kenarları paralel görünüyor. Sorun şu ki küpümüz kübik görünmüyor.
//Bunun nedeni, sol, sağ, üst ve alt için sağladığımız 1 veya -1 değerleridir, yani kare bir alan oluşturuyoruz, ancak bu kare alan 
//dikdörtgen tuvalimize uyacak şekilde gerilecek ve tuvalimiz kare değil.
//Tuval oranını (genişlik x yükseklik) kullanmamız gerekiyor. aspectRatio adlı bir değişken oluşturalım (tıpkı PerspectiveCamera gibi) 
//ve bu oranı içinde saklayalım:

//const aspectRatio = sizes.width / sizes.height
//const camera = new THREE.OrthographicCamera(- 1 * aspectRatio, 1 * aspectRatio, 1, - 1, 0.1, 100)

//Bu, tuval genişliğimiz yüksekliğinden daha büyük olduğu için render alanı genişliğinden daha büyük bir render alanıyla sonuçlanır.
//Şimdi küp gibi görünen bir küpümüz var.

//Custom controls 
//PerspectiveCamera'mıza geri dönelim. OrthographicCamera'yı yorum satırına alalım, PerspectiveCamera'nın yorumunu kaldırın, kamerayı 
//küpe bakacak şekilde hareket ettirin ve tick fonksiyonundaki mesh rotasyonunu kaldırın:

// // Camera
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 1000)

// // const aspectRatio = sizes.width / sizes.height
// // const camera = new THREE.OrthographicCamera(- 1 * aspectRatio, 1 * aspectRatio, 1, - 1, 0.1, 100)

// // camera.position.x = 2
// // camera.position.y = 2
// camera.position.z = 3
// camera.lookAt(mesh.position)
// scene.add(camera)

//Şimdi yapmak istediğimiz şey kamerayı faremizle kontrol etmek. Öncelikle fare koordinatlarını bilmek istiyoruz. Bunu, 
//addEventListener ile mousemove olayını dinleyerek yerel JavaScript kullanarak yapabiliriz.
//Koordinatlar, callback function argümanında event.clientX ve event.clientY olarak bulunacaktır:

// // Cursor
// window.addEventListener('mousemove', (event) =>
//     {
//         console.log(event.clientX, event.clientY)
//     })

//Bu değerleri kullanabiliriz, ancak bunları ayarlamanızı öneririm. Ayarlamaktan kastım 1 genliğe sahip olmak ve değerin 
//hem negatif hem de pozitif olabilmesidir.

//Eğer sadece x değerine odaklanırsak bu şu anlama gelir:

//-imleciniz tuvalin en solundaysa, - 0,5 almalısınız
//-imleciniz tuvalin ortasındaysa, 0 almalısınız
//-imleciniz tuvalin en sağındaysa, 0,5 almalısınız

//Bu zorunlu olmasa da, bu tür temiz değerlere sahip olmak faydalıdır.
//Tıpkı size değişkeninde olduğu gibi, varsayılan x ve y özelliklerine sahip bir imleç değişkeni oluşturacağız ve daha sonra bu 
//özellikleri mousemove geri aramasında güncelleyeceğiz:

// // Cursor
// const cursor = {
//     x: 0,
//     y: 0
// }

// window.addEventListener('mousemove', (event) =>
// {
//     cursor.x = event.clientX / sizes.width - 0.5
//     cursor.y = event.clientY / sizes.height - 0.5

//     console.log(cursor.x, cursor.y)
// })

//event.clientX'i sizes.width'e böldüğümüzde 0 ile 1 arasında bir değer elde ederiz (eğer imleci tuvalin üzerinde tutarsak), 0,5'i 
//çıkardığımızda ise -0,5 ile 0,5 arasında bir değer elde ederiz.
//Artık fare konumu cursor object değişkeninde saklanıyor ve tick fonksiyonunda kamera konumunu güncelleyebilirsiniz:

// const tick = () =>
//     {
//         // ...
    
//         // Update camera
//         camera.position.x = cursor.x
//         camera.position.y = cursor.y
    
//         // ...
//     }

//Gördüğünüz gibi, çalışıyor ancak eksen hareketleri biraz yanlış görünüyor. Bunun nedeni, Three.js'de yukarı doğru giderken position.y 
//ekseninin pozitif olması ancak web sayfasında aşağı doğru giderken clientY ekseninin pozitif olmasıdır.

//Tüm formülün önüne - ekleyerek (parantezleri unutmayın) güncellerken cursor.y'yi basitçe tersine çevirebilirsiniz:

// window.addEventListener('mousemove', (event) =>
//     {
//         cursor.x = event.clientX / sizes.width - 0.5
//         cursor.y = - (event.clientY / sizes.height - 0.5)
//     })

//Son olarak, cursor.x ve cursor.y'yi çarparak genliği artırabilir ve kameranın lookAt(...) metodunu kullanarak ağa bakmasını 
//isteyebilirsiniz:

// const tick = () =>
//     {
//         // ...
    
//         // Update camera
//         camera.position.x = cursor.x * 5
//         camera.position.y = cursor.y * 5
//         camera.lookAt(mesh.position)
    
//         // ...
//     }


//Math.sin(...) ve Math.cos(...) kullanarak kameranın mesh etrafında tam bir dönüşünü yaparak daha da ileri gidebiliriz.
//sin ve cos, birleştirildiğinde ve aynı açıyla kullanıldığında, nesneleri bir daire üzerine yerleştirmemizi sağlar. Tam bir dönüş yapmak 
//için, bu açının genliği π'nin 2 katı olmalıdır ("pi" olarak adlandırılır). Bilmeniz için, tam bir dönüşe "tau" denir ancak JavaScript'te 
//bu değere erişimimiz yoktur ve bunun yerine π kullanmak zorundayız.

//Math.PI kullanarak yerel JavaScript'te π'nin bir yaklaşımına erişebilirsiniz.
//Bu çemberin yarıçapını artırmak için, Math.sin(...) ve Math.cos(...) sonucunu çarpabilirsiniz:

// const tick = () =>
//     {
//         // ...
    
//         // Update camera
//         camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2
//         camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2
//         camera.position.y = cursor.y * 3
//         camera.lookAt(mesh.position)
    
//         // ...
//     }
    
//     tick()

//Bu, kamerayı kontrol etmek için iyi bir başlangıç ​​olsa da Three.js, aynı şeyi ve çok daha fazlasını yapmanıza yardımcı olmak için 
//Constrols adı verilen birden fazla classı entegre etti.



//Built-in controls 
//Three.js dökümanında "controls" yazarsanız, çok sayıda önceden yapılmış kontrol olduğunu göreceksiniz. Dersin geri kalanında 
//bunlardan yalnızca birini kullanacağız, ancak rollerini bilmek ilginç olabilir.

//FlyControls
//FlyControls, kamerayı sanki bir uzay gemisindeymişsiniz gibi hareket ettirmenizi sağlar. 3 eksende dönebilir, ileri ve geri gidebilirsiniz.

//FirstPersonControls
//FirstPersonControls, FlyControls'e benzer, ancak sabit bir yukarı eksene sahiptir. Bunu, kuşun namlu dönüşü yapamadığı uçan bir kuş 
//görünümü gibi görebilirsiniz. FirstPersonControls "FirstPerson" içerse de, FPS oyunlarındaki gibi çalışmaz.

//PointerLockControls
//PointerLockControls, pointer lock JavaScript API'sini kullanır. Bu API, imleci gizler, ortada tutar ve hareketleri mousemove 
//event callbackinde göndermeye devam eder. Bu API ile, doğrudan tarayıcının içinde FPS oyunları oluşturabilirsiniz. Bu sınıf, 
//bu tür bir etkileşim oluşturmak istiyorsanız çok umut verici görünse de, yalnızca işaretçi kilitlendiğinde kamera dönüşünü ele alacaktır. 
//Kamera konumunu ve oyun fiziğini kendiniz halletmeniz gerekecektir.

//OrbitControls
//OrbitControls, önceki derste yaptığımız kontrollere çok benzer. Sol fareyle bir noktanın etrafında dönebilir, sağ fareyle yanal 
//olarak çevirebilir ve tekerleği kullanarak yakınlaştırıp uzaklaştırabilirsiniz.

//TrackballControls
//TrackballControls tıpkı OrbitControls gibidir ancak dikey açı açısından hiçbir sınır yoktur. Sahne baş aşağı olsa bile kamerayla 
//dönmeye ve dönüşler yapmaya devam edebilirsiniz.

//TransformControls
//TransformControls'ün kamerayla hiçbir ilgisi yoktur. Bir nesneye bir gizmo eklemek ve o nesneyi hareket ettirmek için kullanabilirsiniz.

//DragControls
//TransformControls gibi, DragControls'ün de kamerayla hiçbir ilgisi yoktur. Nesneleri kameraya bakan bir düzlemde sürükleyip bırakarak 
//hareket ettirmek için kullanabilirsiniz.
//Biz sadece OrbitControls'ü kullanacağız ancak diğer sınıfları da denemekten çekinmeyin.

//OrbitControls 
//Tik fonksiyonunda kamerayı güncellediğimiz kısmı yorumlayalım.

//Instantiating (ÖRNEKLEME)
//Öncelikle, OrbitControls sınıfını kullanarak bir değişkeni örneklendirmemiz gerekiyor. Burada 
//THREE.OrbitControls 
//kullanabileceğinizi düşünebilirsiniz, ancak maalesef yanılıyorsunuz.
//Tıpkı THREE gibi projemize import etmemiz gerekiyor 
//import { OrbitControls } from 'three/examples/jsm/Addons.js'

//Artık OrbitControls classını kullanarak (THREE. olmadan) bir değişken örneği oluşturabilirsiniz ve bunu kamerayı oluşturduktan 
//sonra yaptığınızdan emin olun.

//tick içindeki camera için yazığımız kodları yorum satırına aldıktan sonra //Camera kısmının altına:
// Controls
//const controls = new OrbitControls(camera, canvas) eklememiz yeterlidir.Ayrıca artık //Cursor kısmınada ihtiyacımız kalmadığı için
//o kısmıda yorum satırına alabiliriz

//Artık kamerayı hareket ettirmek için hem sol fareyi hem de sağ fareyi kullanarak sürükleyip bırakabilir ve yakınlaştırmak veya 
//uzaklaştırmak için yukarı veya aşağı kaydırabilirsiniz.
//Özel kodumuzdan çok daha kolay ve daha fazla kontrolle birlikte geliyor. Ama biraz daha ileri gidelim.

//Target
//Varsayılan olarak, kamera sahnenin merkezine bakar. Bunu target özelliğiyle değiştirebiliriz.
//Bu özellik bir Vector3'tür, yani x, y ve z özelliklerini değiştirebiliriz.
//OrbitControls'ün varsayılan olarak küpün üstünde görünmesini istiyorsak, sadece y özelliğini artırmamız gerekir:

//controls.target.y = 2

//Ancak bu tam olarak böyle çalışmayacaktır çünkü OrbitControl'e kendisini güncellemesini söylememiz gerekiyor. Ve bunu hemen 
//ardından güncelleme metodunu çağırarak yapabiliriz:

//controls.target.y = 2
//controls.update()

//Bu derste pek işimize yaramayacak o yüzden yorum satırına alabiliriz.

//Damping
//OrbitControls belgelerini okursanız damping den bahsediliyor. Sönümleme, bir tür ivme ve sürtünme formülü ekleyerek animasyonu 
//yumuşatacaktır.

//Sönümlemeyi etkinleştirmek için, kontrollerin enableDamping özelliğini true olarak değiştirin.

//Kontrollerin düzgün çalışması için, her karede controls.update() çağrılarak güncellenmesi de gerekir. Bunu tick fonksiyonunda 
//yapabilirsiniz:

// // Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

// // ...

// const tick = () =>
// {
//     // ...

//     // Update controls
//     controls.update()

//     // ...
// }


//Kontrollerin artık çok daha akıcı olduğunu göreceksiniz.

//Kontrollerinizi özelleştirmek için dönüş hızı, yakınlaştırma hızı, yakınlaştırma sınırı, açı sınırı, damping gücü ve tuş bağlamaları 
//(evet, klavyenizi de kullanabilirsiniz) gibi birçok başka yöntem ve özelliği kullanabilirsiniz.

//When to use built-in controls 
//Bu kontroller kullanışlı olsa da, sınırlamaları vardır. Bunlara çok fazla güvenirseniz, sınıfın çalışma şeklini beklenmedik bir şekilde 
//değiştirmek zorunda kalabilirsiniz.

//Öncelikle, bu kontrollerden ihtiyaç duyduğunuz tüm özellikleri listelediğinizden emin olun, ardından kullanmak üzere olduğunuz sınıfın 
//tüm bu özellikleri işleyip işleyemeyeceğini kontrol edin.

//Aksi takdirde, bunu kendi başınıza yapmanız gerekecektir.


import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js' //Kamera kontrolümüz orbitcontrolsü projemize ekledik

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Cursor
// const cursor = {
//     x: 0,
//     y: 0
// }

// window.addEventListener('mousemove', (event) =>
// {
//     cursor.x = event.clientX / sizes.width - 0.5
//     cursor.y = - (event.clientY / sizes.height - 0.5) //Değeri - () ile almamızın sebebiThree.js'de yukarı doğru giderken position.y ekseninin pozitif olması ancak web sayfasında aşağı doğru giderken clientY ekseninin pozitif olmasıdır

//     console.log(cursor.x, cursor.y)
// })

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Camera
const aspectRatio = sizes.width / sizes.height
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100) //PerspectiveCamera
// const camera = new THREE.OrthographicCamera( //OrthographicCamera
//     - 1 * aspectRatio, 1 * aspectRatio, 1, - 1, 0.1, 100 
// )
//camera.position.x = 2
//camera.position.y = 2
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// controls.target.y = 2
// controls.update()


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // mesh.rotation.y = elapsedTime;

    //Update camera
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2
    // camera.position.y = cursor.y * 3
    // camera.lookAt(mesh.position)

    //Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()