//WebGL Javascript API dır
//Olağanüstü bir hızla üçgenler oluşturur.
//Sonuç bir canvas elementine çizilebilir.
//Birçok modern tarayıcıda rahatlıkla çalışır.
//(GPU) İşlem yaparken ekran kartını kullanır bu yüzden hızlıdır.
//WebGL 2D çizimler içinde kulanılabilir. Bunun için genelde Pixi.js kullanılır.
//CPU hızlı bir şekilde fakat tek tek yapar.
//GPU ise biraz daha yavaş fakat aynı anda binlerce işlem yapabilir.
//3D bir model çizmek için birçok üçgen oluşturup bu üçgenleri doğru pozisyona koyarak ve renklendirerek istediğimiz model gibi gözükmesini sağlarız.
//GPU tüm bu noktaları birçok faktöre göre aynı anda konumlandırır. (dakika 16:12)
//Bunları sadece webGL ile yazmak istersek canvasa sadece 1 üçgen çizmek için en az 100 satır kod yazmamız gerekir
//İşte bu yüzden imdadımıza ThreeJS yetişiyor
//ThreeJS Javascript kütüphanesidir.
//MIT tarafından lisanslanmıştır.
//Yaratıcısı: Ricardo Cabello, aka Mr.Doob
//Threejs kullanırken hala webgl ile etkileşimde bulunabiliriz örneğin kendi sahderlarımızı oluşturabilirz.
//Threejs neredeyse her ay güncelleme alıyor. Github/mrdoob/threejs den güncellemeler takip edilebilir.
//Threejs dışında birçok webgl kütüphanesi bulunmaktadır. Diğerlerine bakmakta faydalı olabilir.