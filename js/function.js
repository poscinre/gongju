const $header = document.querySelector('header');
const $mnus = document.querySelectorAll('header>.container>nav>.gnb>li>a');//메뉴 셀렉팅
const $top = document.querySelector('aside>a.top');

const arrTopVal = [];

let nowIdx = 0;
let oldIdx = nowIdx;

document.querySelectorAll('article').forEach(function($article, idx){
    arrTopVal[idx-1] = $article.offsetTop;
});

console.log('arrTopVal =',arrTopVal);


$mnus.forEach(function($mnu, idx){
    $mnu.addEventListener('click', function(evt){
        evt.preventDefault();

        window.scrollTo({top:arrTopVal[idx]-100, behavior:'smooth'});
    });
});


window.addEventListener('scroll', function(){

    const scrollTop = Math.ceil(window.scrollY);

    for(let i=0;i<$mnus.length;i++){
        if(scrollTop >= arrTopVal[i]-100){

            oldIdx = nowIdx;
            nowIdx = i;
    
            $mnus[oldIdx].parentElement.classList.remove('on');
            $mnus[nowIdx].parentElement.classList.add('on');
        }else if(scrollTop<arrTopVal[0]-100){
            $mnus[nowIdx].parentElement.classList.remove('on');
        }
    }
});


$top.addEventListener('click', function(evt){
    evt.preventDefault();
    window.scrollTo({top:0, behavior:'smooth'});
});

document.querySelector('.logo>a').addEventListener('click', function(evt){
    evt.preventDefault();
    $top.click();
});


const $indicators = document.querySelectorAll('section>.slides>.slides-pagination>li>a');
const $fade = document.querySelectorAll('section>.slides>.slide-container>li');
const $btnfadePrev = document.querySelector('section>.slides>.slide-navigation.prev');
const $btnfadeNext = document.querySelector('section>.slides>.slide-navigation.next');


const fadeAction = function(nowIdx){

        for(let i=0;i<$indicators.length;i++){
            $fade[i].style.display = 'none';
            $indicators[i].parentElement.classList.remove('on');
        }

        $fade[nowIdx].style.display = 'block';
        $indicators[nowIdx].parentElement.classList.add('on');
};

$indicators.forEach(function($indicatorss,idx){
    $indicatorss.addEventListener('click', function(evt){
        evt.preventDefault();
        nowIdx = idx;
        fadeAction(nowIdx);
    });
});


$btnfadeNext.addEventListener('click', function(evt){
    evt.preventDefault();
    (nowIdx<$indicators.length-1) ? nowIdx++ : nowIdx=0;
    fadeAction(nowIdx);
});


$btnfadePrev.addEventListener('click', function(evt){
    evt.preventDefault();
    nowIdx>0 ? nowIdx-- : nowIdx=$indicators.length-1;
    fadeAction(nowIdx);
});

{
    const $indicators = document.querySelectorAll('section>article.cont3>div>.tour-container>p');
    const $container = document.querySelector('section>article.cont3>div>.tour-container');
    const $btnPrev = document.querySelector('section>article.cont3>div>.prev');
    const $btnNext = document.querySelector('section>article.cont3>div>.next');

    let nowIdx = 0; 

    $indicators.forEach(function($indicator, idx){
        $indicator.addEventListener('click', function(evt){
            evt.preventDefault();

            nowIdx = idx;
            
            $container.style.left = -270*nowIdx + 'px';
    
            $indicators.forEach(function(anchor,actIdx){
                anchor.parentElement.classList.toggle('on',actIdx===nowIdx);
            });
        });
    });


    $btnPrev.addEventListener('click',function(evt){
        evt.preventDefault();
        if(nowIdx>0){
            nowIdx--;
        }else{
            nowIdx=4;
        }
        $container.style.left = -270*nowIdx + 'px';

        $indicators.forEach(function(anchor,actIdx){
            anchor.parentElement.classList.toggle('on',actIdx===nowIdx);
        });
    })



    $btnNext.addEventListener('click',function(evt){
        evt.preventDefault();

        if(nowIdx<4){
            nowIdx++;
        }else{
            nowIdx=0;
        }
        $container.style.left = -270*nowIdx + 'px';

        $indicators.forEach(function(anchor,actIdx){
            anchor.parentElement.classList.toggle('on',actIdx===nowIdx);
        });
    })

}