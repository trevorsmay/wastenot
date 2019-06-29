//Opening Stat Populate Function
$('.ml9 .letters').each(function(){
    $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
  });
  
  anime.timeline()
    .add({
      targets: '.ml9 .letter',
      scale: [0, 1],
      duration: 1500,
      elasticity: 600,
      delay: function(el, i) {
        return 45 * (i+1)
      }
    });

    //scroll button function
    $(".scroll-btn-host").find("a").click(function(e) {
        e.preventDefault();
        var section = $(this).attr("href");
        $("html, body").animate({
            scrollTop: $(section).offset().top
        });
        missionAnimate();
    });

    //button fade function 
    function scrollButtonFade() {
        $(".call-fade-btn").removeClass("none-hide");
        $(".call-fade-btn").addClass("fade-in");
    }

    scrollButtonFade();

    //animate mission section function
    function missionAnimate() {
        $(".call-fade-text").removeClass("none-hide");
        $(".call-fade-text").addClass("fade-in");

        $(".mission-img").animate({
            width:"12em"
        }, 700);

        catchPhrase();
        movementBtn();
    }

    //this function animates the catch phrase
    function catchPhrase() {
        $(".call-fade-text").removeClass("none-hide");

        $('.ml7 .letters').each(function(){
            $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
          });
          
          anime.timeline()
            .add({
              targets: '.ml7 .letter',
              translateY: ["1.1em", 0],
              translateX: ["0.55em", 0],
              translateZ: 0,
              rotateZ: [180, 0],
              duration: 750,
              easing: "easeOutExpo",
              delay: function(el, i) {
                return 50 * i;
              }
            });
    }

    //movement page button fadein function 
    function movementBtn() {
        $(".move-btn-fade").removeClass("none-hide");
        $(".move-btn-fade").addClass("fade-in");
    }

    