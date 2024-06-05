Handlebars.registerHelper("increaseIndex", function (inValue) {
  return ++inValue;
});

let xhr = new XMLHttpRequest();

xhr.open("GET", "https://pokeapi.co/api/v2/pokemon-color/yellow", true);

function popuniPokemone() {
  const data = JSON.parse(xhr.response);
  // this element cant be translated to jquery sintax because of "script" definition by handlebars
  const source = $("#pokemon-lista").html();
  const template = Handlebars.compile(source);
  const context = { pokemon: data.pokemon_species.slice(0, 20) };
  const html = template(context);

  $("#pokemon-output").html(html);
}

function afterRender() {
  $("table th").css("color", "darkBlue");
  // drugi nacin dodavanja stila
  //$("table th").addClass("headerStyle");
  // u tablici svaki drugi redak obojati drugom bojom
  applyColorOnRow();

  // remove those starts with "p" after 2sec
  setTimeout(function () {
    // find "a" starts with letter "p"
    const aTag = $("table td a:contains('p')").filter(function () {
      // only element with first letter "p"
      return this.innerHTML.indexOf("p") == 0;
    });
    // remove closest "tr" element
    aTag.closest("tr").remove();

    // after removing some tr's our table is broken
    applyColorOnRow();
    insertDiv(aTag.length);
  }, 2000);
}

function applyColorOnRow() {
  // 1. remove all class zebra
  $("table tr").removeClass("zebra");

  // 2. apply again class zebra on even row
  $("table tr:nth-child(even)").addClass("zebra");
}

function insertDiv(numOfHidden) {
  $('<div id="noOfHidden"></div>')
    .insertAfter("#pokemon-output")
    .text("Broj skrivenih: " + numOfHidden);
}

xhr.onload = function () {
  // napravi tablicu pokemona
  popuniPokemone();
  // aktiviraj popover
  $('[data-bs-toggle="popover"]').popover();
  // zebra uzorak
  afterRender();

  $("table tr").on("mouseenter", (event) => {
    //console.log("mouse enter");
    $(event.currentTarget).css("--bs-table-bg", "red");
  });

  $("table tr").on("mouseleave", (event) => {
    //console.log("mouse leave");
    $(event.currentTarget).removeAttr("style");
  });
};

xhr.send();

/* resize() is deprecated
$(window).resize(() => {
  console.log(window.innerWidth);
});
*/

$(window).on("resize", function () {
  console.log(window.innerWidth);
});

/** TODO: fix this !! */
