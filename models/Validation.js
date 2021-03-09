var Validation = function(){
    this.kiemTraDoDai = function (value, name, selectorError, minLength, maxLength){
        
        if (value.trim().length < minLength || value.trim().length > maxLength) {
            document.querySelector(selectorError).innerHTML = name + ' phải từ ' + minLength + ' đến ' + maxLength + ' ký tự!';
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }

    this.kiemTraGiaTri = function (value, name, selectorError, minValue, maxValue){

        if(Number(value)  < minValue || Number(value) > maxValue){
            document.querySelector(selectorError).innerHTML = name + ' phải từ ' + minValue + ' đến ' + maxValue + ' !';
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }

    this.kiemTraTatCaLaKyTu = function(value, name, selectorError){
        var regexLetter = /^[a-z A-Z]+$/;
        if (value.trim().length === 0){
            document.querySelector(selectorError).innerHTML = name + ' không được bỏ trống!';
            return false;
        }

        if (!regexLetter.test(value)) {
            document.querySelector(selectorError).innerHTML = name + ' tất cả phải là ký tự!';
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
}