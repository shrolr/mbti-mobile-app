interface IOptions {
    relationType: string[];
    bodyType:string[];
    Orientation:string[];
    Religion:string[];
    Politics:string[];
    Education:string[];
    AstroSign:string[];
    Alchol:string[];
    Smoking:string[];

    Diet:string[];
    Pets:string[];
    Kids:string[];
}
class PersonOptions implements IOptions {
    relationType = ["Arkadaşlık","Uzun ilişki","Kısa İlişki","Takılmalık"]
    bodyType = ["Zayıf","Ortalama","Fit","Balık","Kıvrımlı","Şişman"]
    Orientation = ["Heteroseksüel","Homoseksüel","Biseksüel","Aseksüel","Transseksüel","Panseksüel"];
    Religion = ["Ateist", "Agnostik", "Deist", "Panteist", "Musevi", "Hristiyan", "Müslüman", "Budist"];
    Education = ["İlkokul", "Ortaokul", "Lise", "Üniversite", "Yüksek Lisans"];
    Work = ["Serbest", "Kendi işinde", "Çalışan", "İşsiz", "Emekli"];
    Politics = ["Liberal", "Liberteryen", "Anarşist", "Muhafazakar", "Demokrat", "Sosyalist", "Komünist"];
    Kids = ["İstiyorum", "İstemiyorum", "Kararsızım"];
    Pets = ["Kedi" , "Köpek" , "Diğer" ,"Yok"];
    Diet = ["Omnivor", "Vejetaryen", "Vegan", "Peskateryan", "Ketojenik", "Aralıklı Oruç"];
    Alchol = ["Asla","Ara sıra", "Sık sık"];
    Smoking = ["Asla","Ara sıra", "Sık sık"];
    AstroSign = ["Balık","Koç" ,"Boğa" ,"İkizler" ,"Yengeç" ,"Aslan" ,"Başak" ,"Terazi" ,"Akrep" ,"Yay"];
}

export default new PersonOptions()