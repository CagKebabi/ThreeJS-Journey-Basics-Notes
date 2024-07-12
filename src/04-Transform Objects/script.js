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
//Bu özeelliklerimizin bildiğimiz üzere x -y -z değerleri vardır ve biz bu değerleri değişirebiliriz.

//POSITION
//x değeri sağa sola y değeri yukarı aşağı z değeri ise ileri geri hareket ettirir. Fakat bu bağlama göre değişir.
//Yani camera oryantasyonuna göre çok farklı sonuçlar alabilirsiniz. Mesela kameramız sağ tarafda konumlu ve sahneye baksaydı
//x ve z eksenleri (axes) farklı olurdu. Diğer yazılımlarda da Unreal Engine, Blender, Unity gibi eksenleri birbirinden farklı olabilir.
//Mesela birinde objeyi yukarı konumlandırmak için z eksenini kullanıyor olabillir. Bu durumda bizim Three.js e adapte olmamız lazım
//Varsayılan olarak y eksenini yukarı aşağı x ekseninin sağa sola z ekseninin ileri geri olduğunu dikkate alacağız. Fakat dediğimiz gibi
//bunlar varsayılan değerlerdir eksenleri istediğimiz gibi değştirebliriz.

//Object kısmına yazdığımız mesh.position değerleri ile oynayarak positionu daha iyi anlayabliriz. Fakat dikkat etmemiz gereken bir nokta var
//eğer bu position değerlerini veya objeye camreaya vs atadığımız değerleri render ettiğimiz kısmın altına yazarsak değişikliklerimizi
//göremeyiz çünkü sahneyi öncesinde render ettiğimiz için sonrasına yazılan değerler sahnede gözükmez. Bu aynı şey örneğin mesh imizin
//özelliklerini değiştiriyorsak sahneye eklemeden önce yazmalıyız.

//Position sadece bir object değildir aynı zamanda vector dur. threejs de vector2 vector3 ve vector4 vardır. vector3 x,y ve z den
//fazlasıdır. Birçok metodu vardır dökümantasyondan bunlar incelenebilir. Metodlarından birine örnek olarak yine object ksımında
//console.log(mesh.position.length()) yazdık ve konsolda 1.3601470508735443 değerini bize verdi. .length() metodu sahnein merkezi
//ile objemizin pozisyonu arasınaki mesafeyi bize verir. meshimizi position z değerini değiştirirsek .length() değerinin değiştiğini 
//görebiliriz. 
//bir vector3 objesi ile objemiz arasındaki mesafeyi görmek için ise .distanceTo() meodunuz kullanabiliriz. camera mızı nerede
//oluşturduysak onun altında objectimizin camera ile arasındaki mesafeyi görmek istediğimiz için .distanceTo(camera.position) yazdık.

//Position parametresini kullanırken bazen zorlanabiliriz. İşte bu noktada AxesHelper kullanarak sahnemizin x y z eksenlerini görebiliriz.
//Mavi renkli olan eksen çizgimizi görmek için kamerayı bişraz hareket ettirdik.

//SCALE
//scale de aynı şekilde bir vector3 objesidir. Objemizi x, y, z ekseninde büyütmemizi sağlar 

//ROTATION
//rotation diğer özelliklere göre biraz daha zordur. Objelerimizi döndürmek için 2 yolumuz vardır. rotation ve quaternion.
//İkisinden birini güncellediğimiz zaman diğeride otomatik olarak güncellenir. Yani bu 2 çözümüden herhangi birini kullandığımız zaman
//aynı sonucu alırız. 
//Bunu yapmanın neden 2 yolu vardır? Önce rotation ile başlayacağız.
//ROTATION 
// aynı şekilde x, y, z parametrelerine sahiptir. Fakat rotation vector3 değil "Euler" dır. Euler vector3 e göre daha az
//metoda sahiptir. Yine dersteki euler bağlantısından dökümana gidersek euler ile vector3 farkını daha iyi anlayabiliriz.
//Rotation kullanırken dikkatli olmalıyız. rotation ile ilgili Bazen problemler yaşayabiliriz. Bu problem rotation axis order dan kaynaklanır.
//yani rotation ekseninin sıralamasıyla ilgilidir. Örnek vermek gerekirse objemizin objemizin x eksenini değiştirdiğimiz zaman 
//y eksenimizinde baktığı yön değişir bu nedenle istemediğimiz sonuçlar görebiliriz bundan dolayı bir eksenimize artık değişikliklerimiz
//uygulanmayabilir. buna "gimbal lock" denir. Bunu order ı değiştirerek düzeltebiliriz. 
//x rotation, ardından y rotation ve ardından z rotation uygulamak yerine istediğimiz sıralamayı belirleyebiliriz. Örneğin bir fps
//oyunu geliştiriyorsak bunları değiştirmemiz gerekir. Çünkü Oyundaki karakterimiz sağa ve sola y ekseni ile aşağı ve yukarı ise x
//ekseni ile hareket etmesi gerekir. Bunu .reorder("YXZ") METODU İLE YAPABİLİRİZ. Bu biraz kafa karıştırıcı olabilir. Bunu öğrenmemizin
//sebebi rotation ile ilgili problemler yaşadığımızda aklımıza .reorder() metodunun gelmesini sağlamaktır. Bu metodu objemizin
//rotation değerlerini değiştirmeden önce yazmamız gerekir altına devam eden kod satırlarında rotation ı değiştirdiğimzde yeni
//order sıralamamıza göre çalışacaktır.
//EULER - QUATERNION
//Yukarıda yazdığımız gibi order ile ilgili yaşadığımız problemler bayağı sorun yaratiblir. Bu yüzden birçok yazılım quternion kullanır.
//Bu yüzden quaterniona ihtiyacımız vardır. quatenion rotationın temsili gibi fakat daha matematiksel halidir. Aynı sonuçları
//farklı formuller farklı axes ler farklı hesaplamalar kullanarak alabilirisiniz. Kısaca günün sonunda birçok problemimizi çözmemize 
//yardımcı olur. quaternionun zorluğu hayal etmesinin zor olmasıdır. Quaternion çok geniş bir konudur fakat hatırlamamızda fayda var. 
//Rotationı güncellediğimiz zaman quaternion güncellenir, quaternionu güncellediğimiz zaman rotation güncellenir.
//https://www.youtube.com/watch?v=jgP6DCKodpQ bu videoyu izlemek euler ve quaternion hakkında oldukça açıklayıcı olacaktır.

//LOOK AT THIS
//Havalı ve kullanması eğlenceli özelliklerden biriside herhangi bir object3d ye herhangi birşeye bakmasını söyleyebiliriz.
//kameramıza sahnedekli küp objemizin tam merkezine bakmasını söyleyebiliriz. Şuanda kameramız varsayılan değeri yüzünden sahnein tam 
//merkezine bakmaktadır. Bunun için karmaşık matematik işlemlerine ihtiyacımız yoktur. Bunu yapmak için object3D mizde
//.lookAt(...) metodu kullanırız.

//SCENE GRAPH - GROUP
//Bzen kompleks objeler oluşturabiliriz ev, kapı pencere, çalı gibi. Bunları oluşturduğumuzda sonradan çok küçük veya yanlış yerde 
//olduğunu düşünebiliriz. Bunu farkettiğimizde objedeki tüm elementleri örneğin evdeki kapıduvarlar pencereler vs. gibi tek tek
//hareket ettirmek çok zordur saatler sürebilir. Bu durumda yapacağımız şey bir grup oluşturmak ve tüm elementlerimizi o grubun
//içerisine koymaktır. Group ta aynı şekilde object3D içerisindedir yani transform özelliklerimizi uygulayabileceğimiz bir elemandır.
//Aşağıdaki kodu //OBJECT kısmından //CAMERA kısmına kadar yorum satırına alıp yerine yapıştırdıktan sonra ve çalıştırdıktan sonra
//konsolda yazan hatalı kısımları yorum satırına alıp nasıl gözüktüğüne bakabiliriz.
//------------CODE------------------
// const group = new THREE.Group()

// group.position.y = 1
// group.scale.y = 2
// group.rotation.y = 1
// scene.add(group)

// const cube1 = new THREE.Mesh(
//     new THREE.BoxGeometry(1,1,1),
//     new THREE.MeshBasicMaterial({color: 0xff0000})
// )

// group.add(cube1)

// const cube2 = new THREE.Mesh(
//     new THREE.BoxGeometry(1,1,1),
//     new THREE.MeshBasicMaterial({color: 0x00ff00})
// )
// cube2.position.x = -2
// group.add(cube2)

// const cube3 = new THREE.Mesh(
//     new THREE.BoxGeometry(1,1,1),
//     new THREE.MeshBasicMaterial({color: 0x0000ff})
// )
// cube3.position.x = 2
// group.add(cube3)
//---------------CODE----------------
import * as THREE from 'three'

//Canvas
const canvas = document.querySelector("canvas.webgl")

//Scene
const scene = new THREE.Scene()

//AXES HELPER
const axesHelper = new THREE.AxesHelper(); //aldığı parametre ile eksen çizgilerinin uzunluğunu arttırabiliriz AxesHelper(2) gibi.
scene.add(axesHelper)

//Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({color: 0xff0000})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

//poistion
// mesh.position.x = 0.7
// mesh.position.y = -0.6
// mesh.position.z = 1

//yukarıdaki gibi tek tek yazmak yerine hepsine bir kerede değer atamak için aşağıdaki gibi .set() metodunu kullanabiliriz.
mesh.position.set(0.7, -0.6, 1)

//scale
mesh.scale.set(2,0.5,0.5)

//Rotation
//mesh.rotation.y = 1
//bir objeyi yarım tur çevirmek istersek matematikteki pi sayısını kullanırız. Örneğin bir objeyi yarım tur çevirmek istersek
//Math.PI ile bunu yapabiliriz. Bir objeyi tam tur çevirmek istersek Math.PI * 2 şeklinde kullanabiliriz. PI sayısı 3.14159... gibidir.
// mesh.rotation.y = Math.PI / 2 //çeyrek tur çevirir
mesh.rotation.reorder("YXZ") //objemizin rotationu için eksen sıralamasını değiştirdik
mesh.rotation.x = Math.PI * 0.25
mesh.rotation.y = Math.PI * 0.25



//vector3 metodları
console.log(mesh.position.length());
// mesh.position.normalize() //bu metod position.length() değerini 1 e sabitler. Bu oluşturduğumuz küpü perspective değilde düz bir şekilde görmemizi sağlar.

//Sizes
const sizes = {
    width:800,
    height:600
}

//Camrea
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.set(0,0,3) //.set(1,1,3 yaparsak axeshelper ın mavi renkteki z eksen çizgisini görebiliriz.)
scene.add(camera)

//lookAt objemizi istediğimiz nesneye bakmasını sağlar. Cameramızın bakmasını istediğimiz objenin position değerini parametre
//olarak girmemiz gerekmektedir.
//camera.lookAt(mesh.position)

//vector3 metodu
//console.log(mesh.position.distanceTo(camera.position))

//Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)

renderer.render(scene, camera)