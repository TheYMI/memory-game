var rows = 6;
var columns = 8;
var last = null;
var letters = ["A", "A", "A", "A", "A", "A", "B", "B", "B", "B", "B", "B", "C", "C", "C", "C", "C", "C", "D", "D", "D", "D", "E", "E", "E", "E", "F", "F", "F", "F", "F", "F", "F", "F", "G", "G", "G", "G", "H", "H", "H", "H", "I", "I", "J", "J", "J", "J"];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getTileContent(){
    var index = Math.floor(Math.random()*letters.length);
    var content = document.createTextNode(letters[index]);
    letters.splice(index, 1);
    return content;
}

async function flip(tile){
    if (tile.classList.contains("is-flipped")){
        return;
    }

    tile.classList.toggle("is-flipped");
    await sleep(1000);
    if (last === null){
        last = tile;
        return;
    }

    var text = tile.innerText || tile.textContent;
    var text_last = last.innerText || last.textContent;

    var flipped = document.getElementsByClassName("is-flipped");
    if (text != text_last){
        while (flipped.length){
            flipped[0].classList.toggle("is-flipped");
        }
    }

    last = null;

    if (flipped.length == rows * columns){
        alert("You win!");
        location.reload();
    }
}

function createTile(id){
    var tile = document.createElement("div");
    tile.id = id;
    tile.classList.add("tile");

    var tile_inner = document.createElement("div");
    tile_inner.classList.add("tile__inner");
    tile_inner.addEventListener("click", function (e) {flip(tile_inner)});
    tile.appendChild(tile_inner);

    var tile_front = document.createElement("div");
    tile_front.classList.add("tile__face");
    tile_front.classList.add("tile__face--front");
    tile_inner.appendChild(tile_front);

    var tile_back = document.createElement("div");
    tile_back.classList.add("tile__face");
    tile_back.classList.add("tile__face--back");
    tile_inner.appendChild(tile_back);

    var tile_content = document.createElement("div");
    tile_content.classList.add("tile__content");
    tile_front.appendChild(tile_content);

    var p = document.createElement("p");
    p.appendChild(getTileContent());
    tile_content.appendChild(p);

    return tile;
}

window.onload = function(){
    var table = document.createElement("table");
    for (i=0; i < rows; ++i){
        var tr = table.insertRow();
        for (j=0; j < columns; ++j){
            var td = tr.insertCell();
            td.appendChild(createTile(i * columns + j));
        };
    };
    document.body.appendChild(table);
}