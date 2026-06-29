$(function () {
  $(".works__link").hover(function () {
    $(this).css("transition", "0.2s");
  });
  $(window).scroll(function () {
    $(".skills__circle").each(function () {
      var i = $(this);
      t = $(this).offset().top;
      if ($(window).scrollTop() > t - $(window).height() + 150) {
        setTimeout(function () {
          $(i).is('[data-progress="90"]') &&
            $(i).addClass("skills__circle-90").addClass("skills__circle-max"),
            $(i).is('[data-progress="80"]') &&
              $(i).addClass("skills__circle-80").addClass("skills__circle-max"),
            $(i).is('[data-progress="70"]') &&
              $(i).addClass("skills__circle-70").addClass("skills__circle-max"),
            $(i).is('[data-progress="60"]') &&
              $(i).addClass("skills__circle-60").addClass("skills__circle-max"),
            $(i).is('[data-progress="50"]') &&
              $(i).addClass("skills__circle-50"),
            $(i).is('[data-progress="40"]') &&
              $(i).addClass("skills__circle-40"),
            $(i).is('[data-progress="30"]') &&
              $(i).addClass("skills__circle-30");
        }, 500);
      }
    });
  });

  $(".skills__circle").hover(
    function () {
      $(this).find(".skill_per").fadeIn();
    },
    function () {
      $(this).find(".skill_per").fadeOut();
    }
  );

  $('a[href^="#"]').click(function () {
    var section = $(this).attr("href");
    i = $("#" == section || "" == section ? "html" : section);
    top_ = i.offset().top - 40;
    return $("body,html").animate({ scrollTop: top_ }, 400, "swing");
  });

  $(".wrapper").hide().fadeIn(1000);

  var $allMsg = $(".top__title");
  var $wordList = $(".top__title").html().split("");
  $(".top__title").html("");
  $.each($wordList, function (idx, elem) {
    var newEL = $("<span/>").text(elem).css({ opacity: 0 });
    newEL.appendTo($allMsg);
    newEL.delay(idx * 100);
    newEL.animate({ opacity: 1 }, 1100);
  });

  function fadein_blocks(s) {
    $(window).scroll(function () {
      $(s).each(function (s) {
        var i = $(this).offset().top;
        $(window).scrollTop() > i - $(window).height() + 200 &&
          $(this)
            .delay(300 * s)
            .queue(function () {
              $(this).addClass("is-fadein");
            });
      });
    });
  }
  !(function (s) {
    $(window).scroll(function () {
      $(s).each(function () {
        var s = $(this).offset().top;
        $(window).scrollTop() > s - $(window).height() + 200 &&
          $(this).addClass("is-fadein");
      });
    });
  })(".js-fadein");

  fadein_blocks(".service__block");
  fadein_blocks(".works__link");
});

function cal(){
  //alert(document.getElementById("poke-button").value*100);
  // ①APIでデータを取得
  // GET
//   fetch("https://pokeapi.co/api/v2/pokemon/excadrill") // リクエストを送信
// 	.then((response) => response.json())
// 	.then((data) => {

// 	// APIレスポンスを用いた処理
//   // レスポンスの出力
// 	console.log(data);

//   // 取得したデータを加工(分解)→HTMLで表示できる形にすること
//   // HTMLに表示させる
//   // CSSで見た目の調整
  
// });
const pokeNo = 530; //ポケモン番号
const pokeAPI = 'https://pokeapi.co/api/v2/pokemon/'+pokeNo;
const txtNo = document.getElementById('txtNo');
const txtType = document.getElementById('txtType');
const txtPokemon = document.getElementById('txtPokemon');
const imgPokemon = document.getElementById('imgPokemon');
const getAPI = async(url) => {
 const data = await fetch(url).then((res) => res.json());
 return data;
}
async function getPokemonName(data){
 const PokemonName = data.names.find((val) => val.language.name === "ja");
 return PokemonName.name;
}
async function getPokemonType(data){
 let typeLength = data.length;
 let type = new Array();
 for (let i = 0 ; i < typeLength ; i++){
  const getTypes = await getAPI(data[i].type.url);
  const getType = getTypes.names.find((val) => val.language.name === "ja");
  type[i] = getType.name;
 }
 return type;
}
async function init(){
  const dataAPI = await getAPI(pokeAPI);
  const getIMG = dataAPI.sprites.other['official-artwork'].front_default;
  const getName = await getAPI(dataAPI.species.url);
  getPokemonType(dataAPI.types).then(res => {
   txtType.textContent = res;
  });
  getPokemonName(getName).then(res => {
   txtPokemon.textContent = res;
  });
  imgPokemon.setAttribute('src',getIMG);
  txtNo.textContent = 'No.'+pokeNo;
}
init();
}
