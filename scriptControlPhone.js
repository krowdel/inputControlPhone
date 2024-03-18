class ControlPhonex {
    constructor(tel, buttom="") {
        if (typeof ControlPhonex.instance === 'object') { return ControlPhonex.instance; }
        ControlPhonex.instance = this;

        this.inputphone = document.querySelector(tel);
        this.inputphone.value='+48';
        let count=[...this.inputphone.value].filter(char => /[0-9]/.test(char)).join("").length;
        if (buttom) {
            this.confirm = document.querySelector(buttom);
            this.controlButtom(count);
        }

        this.inputphone.addEventListener('input', ()=>{
            let cleanedText=this.inputphone.value.replace('+48','');
            count=[...cleanedText].filter(char => /[0-9]/.test(char)).join("").length;
            this.inputphone.style.color = "";
            if(count<=9) { 
                if(count!=9) {  this.inputphone.style.color = "red"; }
                if (buttom) {
                    this.controlButtom(count);
                }
                cleanedText=cleanedText.replace('+4','');
                cleanedText=cleanedText.replace('  ',' ');
                cleanedText = [...cleanedText].filter(char => /[0-9\s]/.test(char)).join("");
                let finText = '+48'+cleanedText;
                this.inputphone.value=finText;
            } else {
                this.inputphone.value=this.inputphone.value.slice(0, -1);
            }
        });
    }

    controlButtom (count) {
        if(count!=9) {  
            this.confirm.style.opacity=0; 
            this.confirm.classList.add('hidde-btn-orderx');
        } else { 
            this.confirm.style.opacity=1; 
            this.confirm.classList.remove('hidde-btn-orderx');
        }
    }
}