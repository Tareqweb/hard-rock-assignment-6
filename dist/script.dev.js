"use strict";

var searchButton = document.getElementById('search-btn');
var searchText = document.getElementById('search-txt');
var searchResult = document.getElementById('search-result');
var songName = document.getElementById('song');
var artistName = document.getElementById('artist');
var songLyrics = document.getElementById('song-lyrics');
var outputView = document.getElementById('output'); // Search button addEventListener

searchButton.addEventListener("click", function () {
  if (!searchText.value) {
    var output = document.getElementById("myOutput");
    output.style.display = "block";

    window.onclick = function (event) {
      if (event.target == output) {
        output.style.display = "none";
      }
    };

    outputView.innerHTML = "<h2>Please input your lyrics...</h2>";
  } else {
    fetchValue(searchText.value);
  }
}); // Search text addEventListener

searchText.addEventListener("keypress", function (event) {
  if (event.keyCode == 13) {
    fetchValue(searchText.value);
  }
});

function fetchValue(search) {
  fetch("https://api.lyrics.ovh/suggest/".concat(search)).then(function (response) {
    return response.json();
  }).then(function (data) {
    return showData(data);
  });
}

function showData(data) {
  searchResult.innerHTML = "\n\n            ".concat(data.data.map(function (song) {
    return "\n                        <div class=\"song-result row align-items-center my-3 p-3\">\n                        \n                            <div class=\"col-md-9\">\n                                <h3 class=\"lyrics-name song-detail\">Title : ".concat(song.title, "</h3>\n                                <p class=\"author lead song-detail\">Artist Name :<span> ").concat(song.artist.name, "</span></p>\n                                <p class=\"author lead song-detail\">Album :<span> ").concat(song.album.title, "</span></p>\n                            </div>\n                            <div class=\"col-md-3 text-md-right text-center\">\n                                <button data-artist=\"").concat(song.artist.name, "\" data-songtitle=\"").concat(song.title, "\" class=\"btn btn-success\">Get Lyrics</button>\n                            </div>\n                        </div>\n                    ");
  }).join(''), "\n        ");
} // Search result addEventListener


searchResult.addEventListener('click', function (btn) {
  if (btn.target.innerHTML === 'Get Lyrics') {
    var artist = btn.target.getAttribute("data-artist");
    var songTitle = btn.target.getAttribute("data-songtitle");
    getLyrics(artist, songTitle);
  }
}); // Get lyrics for song

function getLyrics(artist, songTitle) {
  var res, data, lyrics, output;
  return regeneratorRuntime.async(function getLyrics$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch("https://api.lyrics.ovh/v1/".concat(artist, "/").concat(songTitle)));

        case 2:
          res = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(res.json());

        case 5:
          data = _context.sent;
          lyrics = data.lyrics;
          output = document.getElementById("myOutput");
          output.style.display = "block";

          window.onclick = function (event) {
            if (event.target == output) {
              output.style.display = "none";
            }
          };

          outputView.innerHTML = "<h2><strong>".concat(artist, "</strong> - ").concat(songTitle, "</h2> <br/> <pre class=\"lyrics-text\">").concat(lyrics, "</pre>");

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
}