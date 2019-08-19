const changeOrderBtn = document.querySelector('.offerOrderBtn'),
orderConfirmBtn = document.querySelector('.orderConfirmBtn'),
    monthCheck = document.querySelector('.monthCheck'),
    yearCheck = document.querySelector('.yearCheck'),
    cardCheck = document.querySelector('#cardCheck'),
    cardField = document.querySelector('#cardField'),
    firstNameField = document.querySelector('#firstNameField'),
    statusImg = document.querySelectorAll('img'),
    lastNameField = document.querySelector('#lastNameField');

let isValid = [false,false,false,false];


changeOrderBtn.addEventListener('click', function () {
    document.location.href = "index.html"  
})
orderConfirmBtn.addEventListener('click',function(){
    let shortInput = document.querySelectorAll('.shortInput');
    if (orderConfirmBtn.classList.contains("orderConfirmBtnActive")){
        document.querySelector('form').reset();
        statusImg.forEach(function(item){
            item.classList.remove("checkSuccess");
        });
        shortInput.forEach(function(item){
            item.classList.remove("shortInput");
            item.classList.add("longInput");
        })
        orderConfirmBtn.classList.remove("orderConfirmBtnActive");
    }
});

cardCheck.addEventListener('keydown', function () {
    const cardLabel = document.querySelector('#cardLabel');
    let img = document.querySelector('#cardSuccess'),
        cardCode = this.value.replace(/[^\d]/g, '').substring(0, 16);
    cardCode = cardCode !== '' ? cardCode.match(/.{1,4}/g).join(' ') : '';
    this.value = cardCode;
    cardField.classList.add("fieldFocus");
    cardCheck.classList.remove("longInput");
    cardCheck.classList.add("shortInput");
    if (cardCheck.value.length == 18) {
        cardCheck.style.cssText = ("border-color: #2F7E74; color:#333333;")
        cardLabel.style.cssText = ("display: none;")
        img.className = 'checkSuccess';
        isValid[0] = true;
        orderConfirm();
    }
    else {
        cardCheck.style.cssText = ("border-color: #E24C2C; color:#333333;");
        cardLabel.style.cssText = ("display: inline;");
        img.className = 'checkDeny';
        isValid[0] = false;
    }
}, false);

monthCheck.addEventListener('change', function () {
    dateCheck();
}, false);

yearCheck.addEventListener('change', function () {
    dateCheck();
}, false)

firstNameField.addEventListener('keydown', function () {
    const img = document.querySelector('#firstNameSuccess'),
        nameField = firstNameField;
    nameCheck(2, img, nameField);
}, false);

lastNameField.addEventListener('keydown', function () {
    const img = document.querySelector('#lastNameSuccess'),
        nameField = lastNameField;
    nameCheck(3, img, nameField);
}, false);



function dateCheck() {
    const img = document.querySelector('#dateSuccess'),
        dateLabel = document.querySelector('#dateLabel');
    img.style.cssText = "margin-left: 9px;"
    if ((monthCheck.value < 8 && yearCheck.value == 2019) || monthCheck.value == "" || yearCheck.value == "") {
        dateLabel.style.cssText = ("display: inline;");
        monthCheck.style.cssText = ("border-color: #E24C2C; color:#333333;");
        yearCheck.style.cssText = ("border-color: #E24C2C; color:#333333; max-width:80px;");
        img.className = 'checkDeny';
        isValid[1] = false;
    }
    else {
        dateLabel.style.cssText = ("display: none;");
        monthCheck.style.cssText = ("border-color: #2F7E74; color:#333333;");
        yearCheck.style.cssText = ("border-color: #2F7E74; color:#333333;");
        img.className = 'checkSuccess';
        isValid[1] = true;
        orderConfirm();
    }
}

function nameCheck(i, img, nameField) {
    img.style.cssText = ("margin-right: 22px; margin-top: 18px;")
    nameField.classList.add("fieldFocus");
    nameField.classList.remove("longInput");
    nameField.classList.add("shortInput");
    if (nameField.value.length >= 2) {
        nameField.style.cssText = ("border-color: #2F7E74; color:#333333;")
        img.className = 'checkSuccess';
        isValid[i] = true;
        orderConfirm();
    }
    else {
        nameField.style.cssText = ("border-color: #E24C2C; color:#333333;");
        img.className = 'checkDeny';
        isValid[i] = false;
    }
}

function orderConfirm(){
    let isFormValid = true;
    isValid.forEach(function(item){
        isFormValid = isFormValid && item;
    })
    if (isFormValid == true){
        orderConfirmBtn.classList.add("orderConfirmBtnActive");
        isValid = [false,false,false,false];
    }
}