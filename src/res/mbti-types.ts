interface ImbtiTypes {
    title: string;
    detail: string;
}
class MbtiTypes implements ImbtiTypes {
    title: string
    detail: string
    constructor(title: string, detail: string) {
        this.title = title;
        this.detail = detail;
    }

}

let mbtiTypes: MbtiTypes[] = [];

mbtiTypes.push({
    title: "ESTP",
    detail: "Esnek, hoşgörülü, spontane, eğlenceli, enerjik. Sonuçlara odaklanan pragmatik bir yaklaşım benimser. Teoriler ve kavramsal açıklamalardan sıkılır, sorunu çözmek için enerjik davranmak ister. Şu ana odaklıdır. Diğerleriyle birlikte faal olabileceği her anın tadını çıkarır. Konfordan hoşlanır. En iyi yaparak öğrenir."
})
mbtiTypes.push({
    title: "INTP",
    detail: "Sessiz, esnek, uyumlu, şüpheci, bağımsız. Kendisini ilgilendiren her şey için mantıklı açıklamalar geliştirmeye çalışır. Sosyal etkileşimden çok teorik ve soyut fikirlerle ilgilenir. İlgi alanlarındaki sorunları çözmek için alışılmadık bir şekilde odaklanma yeteneğine sahiptir. Kimi zaman eleştirel, çoğunlukla analitiktir."
})

mbtiTypes.push({
    title: "INFP",
    detail: "İdealist, meraklı, dürüst, sadık, duyarlı. Değerlerine ve onun için önemli olan insanlara sadık. Değerlerine uygun bir hayat ister. Olasılıkları hızlıca görür, idealleri gerçekleştirmek için katalizatör olabilir. İnsanları anlamaya ve potansiyellerini gerçekleştirmelerine yardımcı olmaya çalışır. Bir değeri tehdit edilmediği sürece uyumlu, esnek ve kabullenici."
})
mbtiTypes.push({
    title: "ISFP",
    detail: "Sessiz, gizemli, duyarlı, eğlenceli ve nazik. Anın tadını çıkarır. Kendi alanına sahip olmaktan ve kendi seçtiği zaman dilimlerinde çalışmaktan hoşlanır. Değerlerine ve onun için önemli olan insanlara sadık. Anlaşmazlıkları ve çatışmaları sevmez, görüş ve değerlerinin sorgulanmasından hoşlanmaz."
})
mbtiTypes.push({
    title: "ISFJ",
    detail: "Sessiz, arkadaş canlısı, korumacı, sorumluluk sahibi, sadık, özenli, nazik, vicdanlı. Yükümlülüklerini kendini adayarak istikrarla yerine getirir. Kendisi için önemli olan insanlar hakkındaki detayları farkeder ve hatırlar. Başkalarının nasıl hissettiğiyle ilgilenir. İşte ve evde düzenli ve uyumlu bir ortam yaratmaya çalışır."

})
mbtiTypes.push({
    title: "ISTJ",
    detail: "Sessiz, ağırbaşlı, güvenilir, mükemmeliyetçi, pratik, sorumluluk sahibi, gerçekçi. Neyin efektif olarak işe yaradığına karar verir ve dikkat dağıtıcı unsurlardan etkilenmeden onun için çabalar. Her şeyi düzenli ve sistemli yapmaktan zevk alır. Geleneklere ve sadakate değer verir."

})
mbtiTypes.push({
    title: "ESTJ",
    detail: "Pratik, gerçekçi, kararlı, açık sözlü, güvenilir. İşleri yapmak için insanları organize eder. Sonuçları mümkün olan en verimli şekilde elde etmeye odaklanır. Hiyerarşiyi önemser. İşlerin kuralına uygun yapılmasını ister. Lafı dolandırmayı sevmez, fikirlerini açıkça beyan eder."
})
mbtiTypes.push({
    title: "ISTP",
    detail: "Becerikli, pratik, sadık, bağımsız, sakin. Bir sorun ortaya çıkana kadar toleranslı ve esnek, sessiz gözlemcidir; daha sonra uygulanabilir çözümler bulmak için hızlı bir şekilde hareket eder. Sebep ve sonuçla ilgilenir. Plan yapmayı sevmez. İçinden geldiği gibi davranır."
})
mbtiTypes.push({
    title: "INTJ",
    detail: "Objektif, bağımsız, stratejik, azimli, mükemmeliyetçi. Fikirlerini uygulamak ve hedeflerine ulaşmak için orijinal zihne ve büyük dürtüye sahiptir. Durumlardaki şablonları hızlıca görür ve uzun vadeli perspektifler geliştirir. Kendileri ve diğerleri için yüksek yeterlilik ve performans standartlarına sahiptir."
})
mbtiTypes.push({
    title: "INFJ",
    detail: "Vicdanlı, sessiz, mistik, idealist. Fikirlerde, ilişkilerde ve maddi varlıklarda anlam ve bağlantı arar. İnsanları neyin motive ettiğini anlamak ister. Ortak faydaya en iyi nasıl ulaşılacağı hakkında net bir görüş geliştirir. Karmaşık bir iç dünyası vardır."
})
mbtiTypes.push({
    title: "ENTP",
    detail: "Entelektüel, açık sözlü, enerjik, karizmatik. Yeni ve zorlu sorunları çözmede becerikli. Kavramsal olasılıklar üretme ve daha sonra bunları stratejik olarak analiz etme becerisine sahip. Diğer insanları okumada başarılı. Rutinden sıkılır, nadiren aynı şeyi aynı şekilde yapar. Birbiri ardına yeni ilgi alanlarına yönelir."
})
mbtiTypes.push({
    title: "ENTJ",
    detail: "Özgüvenli, kararlı, stratejik, lider ruhlu. Mantıksız ve verimsiz prosedürleri ve politikaları hızla görür, problemleri çözmek için kapsamlı sistemler geliştirir ve uygular. Uzun vadeli planlama ve hedef belirlemeden hoşlanır. Bilgilerini genişletmeyi ve başkalarına aktarmayı sever."
})
mbtiTypes.push({
    title: "ENFJ",
    detail: "Sıcakkanlı, girişken, sadık, empatik, duyarlı, sorumluluk sahibi. Başkalarının duygularına, ihtiyaçlarına ve motivasyonlarına uyum sağlar. Herkesin potansiyelini bulur, başkalarının potansiyellerini yerine getirmesine yardımcı olmak ister. Eleştirilere karşı hassastır. Kişisel gelişim için katalizatör görevi görebilir. Gruptakileri rahatlatır. İlham verici liderliği üstlenir."
})
mbtiTypes.push({
    title: "ESFJ",
    detail: "Sıcakkanlı, sadık, detaycı, vicdanlı ve işbirlikçi. Çevresinde uyum yaratmak için kararlılıkla çabalar. Görevleri doğru ve zamanında tamamlamak için başkalarıyla çalışmak ister. Başkalarının günlük yaşamlarında neye ihtiyaç duyduğuna dikkat eder ve bunu sağlamaya çalışır. Katkıda bulunduğu şeyler için takdir edilmek ister."
})
mbtiTypes.push({
    title: "ENFP",
    detail: " Hevesli, arkadaş canlısı, yaratıcı, spontane, coşkulu, esnek. Hayatı olasılıklarla dolu olarak görür. Başkalarından onay bekler, kolayca takdir eder ve destekte bulunur. Doğaçlama yeteneğine ve sözel anlatımına güvenir. Drama tadında yaşamayı sever."
})
mbtiTypes.push({
    title: "ESFP",
    detail: "Cana yakın, esnek, spontane, eğlenceli, coşku dolu, sosyal. Yaşamı, insanları ve konforu sever. Bir şeyler yapmak için başkalarıyla birlikte çalışmayı sever. İşi eğlenceli hale getirir. İşini sağduyulu ve gerçekçi bir şekilde yapar. Yeni insanlara ve çevreye kolayca uyum sağlar. En iyi diğer insanlarla yeni beceriler geliştirerek öğrenir."
})

export {mbtiTypes, MbtiTypes}