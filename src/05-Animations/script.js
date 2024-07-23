import * as THREE from 'three'
import gsap from 'gsap'

//Canvas
const canvas = document.querySelector("canvas.webgl") 

//Scene
const scene = new THREE.Scene() 

//Object
const geometry = new THREE.BoxGeometry(1, 1, 1) 
const material = new THREE.MeshBasicMaterial({color: 0xff0000}) 
const mesh = new THREE.Mesh(geometry, material) 

scene.add(mesh) 

//Sizes
const sizes = {
    width:800,
    height:600
}

//Camrea

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height) 
camera.position.z = 3 
scene.add(camera) 

//Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas 
})

renderer.setSize(sizes.width, sizes.height) 

// renderer.render(scene, camera);

//Bu derste three.js ile nasıl animasyon oluşturacağımıza dair örnekler göreceğiz ve dikkat etmemiz gereken ksıımları öğreneceğiz.

//Three.js kullanırken animasyonlar stop motion gibi çalışır. Nesneleri hareket ettirirsiniz ve bir render yaparsınız. Sonra nesneleri 
//biraz daha hareket ettirirsiniz ve başka bir render yaparsınız. Vb. Nesneleri renderlar arasında ne kadar çok hareket ettirirseniz, 
//o kadar hızlı hareket ediyor gibi görünürler.

//Baktığınız ekran belirli bir frekansta çalışır. Buna frame rate(kare hızı) diyoruz. Frame rate çoğunlukla ekrana bağlıdır, ancak bilgisayarın 
//kendisinin sınırlamaları vardır. Çoğu ekran saniyede 60 kare hızında çalışır. Matematiksel olarak hesaplarsanız, bu yaklaşık 
//her 16 ms'de bir kare anlamına gelir. Ancak bazı ekranlar çok daha hızlı çalışabilir ve bilgisayar bir şeyleri işlemekte zorluk 
//çektiğinde daha yavaş çalışacaktır.

//Kare hızından bağımsız olarak nesneleri hareket ettirecek ve her karede render işlemini gerçekleştirecek bir fonksiyonu çalıştırmak istiyoruz.

//Bunu yapmanın JavaScript'teki yerel yolu, metodu kullanmaktır window.requestAnimationFrame(...).

//requestAnimationFrame'i kullanma;

//requestAnimationFrame'in temel amacı her karede kod çalıştırmak değildir.

//requestAnimationFrame sağladığınız fonksiyonu bir sonraki karede çalıştıracaktır . Ancak daha sonra, eğer bu fonksiyon 
//requestAnimationFrame aynı fonksiyonu bir sonraki karede çalıştırmayı da kullanıyorsa, fonksiyonunuz her karede sonsuza kadar 
//çalıştırılacaktır ki bu da tam olarak istediğimiz şeydir.

//tick adında yeni bir fonksiyon oluşturun ve bu fonksiyonu bir kez çağırın. Bu fonksiyonda, window.requestAnimationFrame(...)
//bir sonraki karede aynı fonksiyonu çağırmak için şunu kullanın:

// /**
//  * Animate
//  */
// const tick = () =>
//     {
//         console.log('tick')
    
//         window.requestAnimationFrame(tick)
//     }
    
// tick()

//İşte bu kadar artık sonsuz bir döngümüz var 

//Konsolda görebileceğiniz gibi, 'tick'her karede çağrılıyor. Bu kodu yüksek kare hızına sahip bir bilgisayarda test ederseniz, 
//'tick'daha yüksek bir frekansta görünecektir.

//Artık renderer.render(...) tick fonksiyonun içine taşıyabilir ve küpün rotation ını arttırabilirsiniz:

/**
 * Animate
 */
// const tick = () =>
//     {
//         // Update objects
//         mesh.rotation.y += 0.01
    
//         // Render
//         renderer.render(scene, camera)
    
//         // Call tick again on the next frame
//         window.requestAnimationFrame(tick)
//     }
    
// tick()

//Tebrikler, artık Three.js animasyonunuz var.

//Sorun şu ki, bu kodu yüksek kare hızına sahip bir bilgisayarda test ederseniz, küp daha hızlı dönecek, 
//daha düşük kare hızına sahip bir bilgisayarda test ederseniz, küp daha yavaş dönecektir.

//Kare Hızında Uyum

//Animasyonu kare hızına göre ayarlayabilmek için son tikten bu yana ne kadar zaman geçtiğini bilmemiz gerekiyor.

//Öncelikle zamanı ölçmenin bir yoluna ihtiyacımız var. Yerel JavaScript'te, geçerli zaman damgasını (timestamp) almak için 
//şunu kullanabilirsiniz Date.now():

//const time = Date.now()

//timestamp, 1 Ocak 1970'ten (Unix için zamanın başlangıcı) bu yana ne kadar zaman geçtiğine karşılık gelir. 
//JavaScript'te birimi milisaniyedir.

//Şimdi ihtiyacınız olan şey, deltaTime diyebileceğimiz şeyi elde etmek için geçerli timestampi önceki karenin  
//timestamp inden çıkarmak ve nesneleri hareketlendirirken bu değeri kullanmaktır:

/**
 * Animate
 */
// let time = Date.now()

// const tick = () =>
// {
// 	// Time
//     const currentTime = Date.now()
//     const deltaTime = currentTime - time
//     time = currentTime

//     // Update objects
//     mesh.rotation.y += 0.01 * deltaTime

//     //render
//     renderer.render(scene, camera)

//     //Call tick again on the next frame
//     window.requestAnimationFrame(tick)

//     // ...
// }

// tick()

//Küp daha hızlı dönmelidir çünkü ekranınız 60 fps hızında çalışıyorsa deltaTime 16 civarında olmalıdır; bu nedenle değeri çarparak 
//azaltmaktan çekinmeyin.

//Artık rotasyonumuzu son kareden bu yana ne kadar zaman harcandığına göre temellendirdiğimize göre, bu dönüş hızı, 
//kare hızı ne olursa olsun her ekranda ve her bilgisayarda aynı olacaktır.

//Clock Kullanımı

//Yukarıdaki kod çok karmaşık olmasa da, Three.js'de zaman hesaplamalarını yapacak Clock adında yerleşik bir çözüm var .

//Bir Clock değişkenini başlatmanız ve getElapsedTime() gibi yerleşik yöntemleri kullanmanız yeterlidir. 
//Bu yöntem, Saatin oluşturulmasından bu yana kaç saniye geçtiğini döndürecektir.

//Nesneyi döndürmek için bu değeri kullanabilirsiniz:

/**
 * Animate
 */
// const clock = new THREE.Clock()

// const tick = () =>
// {
//     const elapsedTime = clock.getElapsedTime()

//     // Update objects
//     mesh.rotation.y = elapsedTime

//     //render
//     renderer.render(scene, camera)

//     //Call tick again on the next frame
//     window.requestAnimationFrame(tick)
// }

// tick()

//Ayrıca, position özelliğiyle nesneleri taşımak için de kullanabilirsiniz. Math.sin(...) ile birleştirirseniz oldukça iyi 
//bir sonuç elde edebilirsiniz:

/**
 * Animate
 */
// const clock = new THREE.Clock()

// const tick = () =>
// {
//     const elapsedTime = clock.getElapsedTime()

//     // Update objects
//     mesh.position.x = Math.cos(elapsedTime)
//     mesh.position.y = Math.sin(elapsedTime)

//     //render
//     renderer.render(scene, camera)

//     //Call tick again on the next frame
//     window.requestAnimationFrame(tick)
// }

// tick()

//Ve açıkçası, bu teknikleri kamera gibi herhangi bir Object3D'yi canlandırmak için kullanabilirsiniz:

/**
 * Animate
 */
// const clock = new THREE.Clock()

// const tick = () =>
// {
//     const elapsedTime = clock.getElapsedTime()

//     // Update objects
//     camera.position.x = Math.cos(elapsedTime)
//     camera.position.y = Math.sin(elapsedTime)
//     camera.lookAt(mesh.position)

//      //render
//      renderer.render(scene, camera)

//     //Call tick again on the next frame
//      window.requestAnimationFrame(tick)
// }

// tick()

//Başka bir kullanılabilir yöntem getDelta(...) yöntemidir, ancak Clock sınıf kodunda tam olarak ne olduğunu bilmediğiniz 
//sürece onu kullanmamalısınız. Bunu kullanmak animasyonunuzu bozabilir ve istenmeyen sonuçlar elde edersiniz.

//GSAP KURULUMU

//Bazen sahnenizi başka bir kütüphane kullanmayı gerektirecek çok özel bir şekilde canlandırmak isteyeceksiniz. 
//Bir sürü animasyon kütüphanesi var, ancak çok ünlü olanlardan biri GSAP'dir . NPM ile indirebilirsiniz.

//npm install gsap@3.12

//@3.12 sürümü zorlar. Dersi yazarken kullanılan sürüm olduğu için bu sürümü kullanıyoruz, 
//ancak isterseniz @3.12'yi kaldırarak en son sürümü deneyebilirsiniz.

//import gsap from 'gsap' ile gsapı projemize import edebiliriz.

//GSAP'nin yerleşik bir requestAnimationFrame'i vardır, dolayısıyla animasyonu kendi başınıza güncellemenize gerek yoktur, 
//ancak yine de küpün hareket ettiğini görmek istiyorsanız her karede sahnenizin görüntülerini oluşturmaya devam etmeniz gerekir.

//GSAP ile aşapıda basit bir örnek oluşturduk.

/**
 * Animate
 */
gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })
gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 })

renderer.render(scene, camera)

const tick = () =>
{
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick) //küpün hareket ettiğini görmek istiyorsak her karede sahnemizi render etmemiz gerekiyor
}

tick()

//Doğru çözümü seçme

//Yerel JS ile animasyon kütüphanesi arasında seçim yapmak, neyi başarmak istediğinizle ilgilidir. 
//Sonsuza kadar dönen bir atlıkarınca yaratacaksanız bunun için herhangi bir kütüphaneye ihtiyacınız yok. 
//Ancak örneğin kılıcın savrulmasını canlandırmak istiyorsanız kütüphane kullanmayı tercih edebilirsiniz.
