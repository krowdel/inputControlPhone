class ControlPhonex {
    constructor(tel, buttom="", codePhone="") {
        this.defaultcodePhone='+48';
        if (typeof ControlPhonex.instance === 'object') { return ControlPhonex.instance; }
        ControlPhonex.instance = this;
        if(codePhone) { 
            this.inputradio = document.querySelectorAll(codePhone); 
            this.inputradio.forEach(item=>{
                item.addEventListener('change', ()=>{
                    this.codePhone = this.setCodePhone(this.inputradio);
                    console.log(this.inputphone.value.slice(3));
                    this.inputphone.value = this.codePhone + this.inputphone.value.slice(3);
                });
            });
            this.codePhone = this.setCodePhone(this.inputradio);
        } else {
            this.codePhone = this.defaultcodePhone;
        }
        this.inputphone = document.querySelector(tel);
        this.inputphone.value=this.codePhone;
        let count=[...this.inputphone.value].filter(char => /[0-9]/.test(char)).join("").length;
        if (buttom) {
            this.confirm = document.querySelector(buttom);
            this.controlButtom(count);
        }

        this.inputphone.addEventListener('input', ()=>{
            let cleanedText=this.inputphone.value.replace(this.codePhone,'');
            count=[...cleanedText].filter(char => /[0-9]/.test(char)).join("").length;
            this.inputphone.style.color = "";
            if(count<=9) { 
                if(count!=9) {  this.inputphone.style.color = "red"; }
                if(buttom) { this.controlButtom(count); }
                this.inputphone.value=this.clear(cleanedText);       
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



    setCodePhone (inputcodePhone) {
        let valuecode = '';
        inputcodePhone.forEach(item=>{ if (item.checked) { valuecode=item.value; }});
        if(valuecode.length==3) {
            return valuecode;
        } else {
            return this.defaultcodePhone;
        }
    }

    clear(cleanedText) {
        let rep=this.codePhone.slice(0, -1);
        cleanedText=cleanedText.replace(rep,'');
        cleanedText=cleanedText.replace('  ',' ');
        cleanedText = [...cleanedText].filter(char => /[0-9\s]/.test(char)).join("");
        return this.codePhone+cleanedText;
    }
}