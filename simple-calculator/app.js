(function(){
    let screen = document.querySelector('.screen');
    let buttons = document.querySelectorAll('.btn');
    let clear = document.querySelector('.btn-clear');
    let equal = document.querySelector('.btn-equal');
    let needToClear = false;

    buttons.forEach(function(button){
        button.addEventListener('click', function(e){
            if(needToClear){
                clearScreen();
            }
            let value = e.target.dataset.num;
            if(valid(value, screen.value)){
                screen.value += value;
            }
        })
    });

    equal.addEventListener('click', function(e){
        if(screen.value === ''){
            clearScreen();
        }else{
            if(needToClear){
                clearScreen();
                return;
            }
            let answer = eval(screen.value);
            screen.value = answer;
            needToClear = true;
        }
    });

    clear.addEventListener('click',function(e){
        clearScreen();
    });

    function clearScreen(){
        screen.value = '';
        needToClear = false;
    }

    function valid(newValue,existingValue){
        if(existingValue.length == 0 && (newValue == '+' 
        || newValue == '-' || newValue == '/' || newValue == '*')){
            console.log('false returned');
            return false;
        }
        return true;
    }
})();