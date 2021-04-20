window.onload = () => {
    let previous_questions = [];

    const TELEGRAM_API_KEY = ""
    const chat_ids = []

    class TelegramBot {
        constructor(api_key) {
            this.api_key = api_key
            this.chat_id = chat_ids
        }

        async post_message(message) {
            
            for (let i = 0; i < this.chat_id.length; i++) {
                let URL = `https://api.telegram.org/bot${this.api_key}/sendMessage?chat_id=${this.chat_id[i]}&text=${message}`;
                await fetch(URL, {
                    method: "POST",
                })
                .then(res => res.json())
                .then(res => res.ok ? previous_questions.push(message) : false)
                .catch(err => console.error(err));
            }
        }
    }

    const process = () => {
        let question = document.querySelector(".WordSection1").children[0].innerText,
            subject = document.querySelectorAll("div[ng-if]"),
            bot = new TelegramBot(api_key=TELEGRAM_API_KEY),
            photo = false;
        
        try {
            photo = [...[...document.querySelector(".WordSection1").children][0].children][1].children[0].src;
        } catch (e) {
            console.error(e);
        }
                
        if (previous_questions.includes(subject[0].innerText + "%0A" + question)) {
            return
        }

        if (photo !== false) {
            bot.post_message(photo)
        }
        bot.post_message(subject[0].innerText + "%0A" + question)
    }

    setInterval(process, 2500)
}