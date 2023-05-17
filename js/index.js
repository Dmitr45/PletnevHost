console.log('js подгружен');


//Функция замедления прокрутки  и кнопки up
function ButtonScrollUp(selector="#up", delay=20) {
    document.querySelector("html").style.scrollBehavior = "smooth"; // Добавляем стиль к html замедления прокрутки
    const up = document.querySelector(selector);
    up.style.display = "none";
    document.addEventListener("scroll", ()=> {(scrollY*5 > document.documentElement.clientHeight) ? (up.style.display = "block") : (up.style.display = "none")})
    up.onclick = ()=> { window.scrollTo(scrollY, 0);   console.log("up"); }
}

//Функция появления фиксированного меню
function NavFixedcroll(selector="#FixedNav", delay=20) {
    const Nav = document.querySelector(selector);
    console.log(Nav);
   // Добавляем класс, убираем класс
    document.addEventListener("scroll", ()=> {(scrollY*5 > document.documentElement.clientHeight) ? (Nav.classList.add("rd-navbar--is-stuck")) : (Nav.classList.remove("rd-navbar--is-stuck"))})

}

//Функция появления секции "Услуги"
function DivScrollVisibility(selector, Y = 0,  delay=20) {
    const Div = document.querySelector(selector);
    Div.style.display = "none";
    Div.style.visibility = "hidden";

    ///up.style.display = "none";
   document.addEventListener("scroll", ()=> {
    if (scrollY > Y) { 
        Div.style.display = "block";
        Div.style.visibility = "visible";
    }
})
}



//Скрипт оправки сообщений из формы. Воспользуемся ботом телеграм для отправки сообщений 
//https://www.youtube.com/watch?v=RviYQrNdDok
//https://tlgrm.ru/docs/bots/api  sendMessage
//https://www.npmjs.com/package/axios Используем для отправки сообщений $ npm install axios
//import axios from 'axios';
function TelegramMessage(){
    const TOKEN = "5698301113:AAFrSfVgJo33K6n_VzDmQMlbgtfiQ91F8vY";
    const CHAT_ID = "-1001807784586";
    const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
    const URI_API_DOC = `https://api.telegram.org/bot${TOKEN}/sendDocument`;
    const success = document.querySelector('#success') 

    // БОТ  PletnevdComSEND PletnevdComSEND_bot Use this token to access the HTTP API: 5698301113:AAFrSfVgJo33K6n_VzDmQMlbgtfiQ91F8vY
    document.querySelector('#tg').addEventListener('submit', function(e) {
        e.preventDefault(); // Обнулили стандартное действие формы
        
        let massage  = `<b> Сообщение с PletnevHost.ru</b> \n`
        massage += `<b> Отправитель: </b> ${this.InputName.value} \n`
        massage += `<b> Телефон: </b> ${this.InputTel.value} \n`
        massage += `<b> Email: </b> ${this.InputEmail.value}\n`
        massage += `<b> Сообщение: </b>${this.InputText.value}`

        let formData = new FormData();
        formData.append('chat_id', CHAT_ID)
        formData.append('document', this.InputFile.files[0])

        
        axios.post(URI_API_DOC,  formData, {
            headers: { 'Content-Type' : 'multipart/form-data' }
            })

        axios.post(URI_API, {  // Первый параметр куда отправляем, второй - объект
            chat_id:  CHAT_ID, 
            parse_mode: 'html',
            text: massage
        }) 
        .then((res) => {
            this.InputName.value = "";
            this.InputTel.value = "";
            this.InputEmail.value ="";
            this.InputText.value = "";
            success.innerHTML = "Message sent!";
            success.style.opacity = '1';
        })
        .catch((err) =>{
            console.warn(err);
        })
        .finally(() =>{ console.log("TelegramMessage end") })
        console.log(massage);
})

//document.querySelector('#link_contact').addEventListener("click", (e) =>{
//    document.querySelector('#SendMessage').classList.toggle('hiden');
//} )


} 


//Вызов функций
ButtonScrollUp("#up" , 5); 
NavFixedcroll("#FixedNav" , 5);
DivScrollVisibility("#servic", 600 , 5);
DivScrollVisibility("#offer", 1000 , 5);
DivScrollVisibility("#price", 1300 , 5);
DivScrollVisibility("#SendMessage", 1600 , 5);
DivScrollVisibility("#mailform", 2000 , 5);
TelegramMessage();

