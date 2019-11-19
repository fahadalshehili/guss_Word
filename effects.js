
function teaseLettersBoxs() {
    $(".letter-box.wrong").animate({top: "-10px"}, "fast")
                            .animate({top: "0px"}, "fast");
}

function cheerLettersBoxs() {
    
    for (let i = 0; i < selectedWord.length; i++) {
        const letterBox = $(`.letter-box:nth-child(${i+1})`);
        letterBox.animate({top: "-10px"}, "fast")
                            .animate({top: "0px"}, "fast");
    }
    
}