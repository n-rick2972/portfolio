var bar = new ProgressBar.Line(splash_text, {
easing: 'easeInOut',
duration: 1000,
strokeWidth: 0.2,
color: '#555',
trailWidth: 0.2,
trailColor: '#bbb',
text: {			
style: {
position: 'absolute',
left: '50%',
top: '50%',
padding: '0',
margin: '-30px 0 0 0',
transform:'translate(-50%,-50%)',
'font-size':'3rem',
color: '#293329',
},
autoStyleContainer: false
},
step: function(state, bar) {
bar.setText(Math.round(bar.value() * 100) + ' %');
}
});

//アニメーションスタート
bar.animate(1.0, function(){
    $("#splash").delay(500).fadeOut(800);
    $(".slide_start").delay(1200).show('300ms', function(){
        $("#slide_down").css({
            'opacity':'1',
            'top':'0'
        });
        $("#slide_right").css({
            'display':'flex',
            'opacity':'1',
            'left':'0'
        });
        $("#slide_left").css({
            'opacity':'1',
            'right':'0'
        });
    });
});




