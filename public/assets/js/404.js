function randomSong(platform) {
  const songListSpotify = {
    thirtyPiece: 'https://open.spotify.com/track/6LXFrbIgXCyMqHZtnhZAGp',
    bigToe: 'https://open.spotify.com/track/3P8Wf4Strun7C5Tb44gKoj',
    notes: 'https://open.spotify.com/track/3QPhpjEInwqToxiH1qMFie',
    cuanto: 'https://open.spotify.com/track/7Ea0IWCmv4uckzO8LqORrr',
    badDecisions: 'https://open.spotify.com/track/3mjCl4yXsrVRsjRXQh7Aht',
  }
  const songListApple = {
    thirtyPiece: 'https://music.apple.com/us/album/thirtypiece-single/1529765040',
    bigToe: 'https://music.apple.com/us/album/big-toe/1494957950',
    notes: 'https://music.apple.com/us/album/notes/1450760642',
    cuanto: 'https://music.apple.com/us/album/cuanto-free-single/1450972224',
    badDecisions: 'https://music.apple.com/us/album/bad-decisions/1291723639'
  }
  const randomSong = obj => {
    var num = 0;
    for (var item in obj) {
      if (obj.hasOwnProperty(item)) {
        ++num;
      }
    }
    const randomNum = Math.floor(Math.random() * Math.floor(num));
    switch (true) {
      case randomNum == 0:
        return obj.thirtyPiece;
      case randomNum == 1:
        return obj.bigToe;
      case randomNum == 2:
        return obj.notes;
      case randomNum == 3:
        return obj.cuanto;
      case randomNum == 4:
        return obj.badDecisions;
    }
  }
  if (platform == 'spotify') {
    window.location = randomSong(songListSpotify);
  } else {
    window.location = randomSong(songListApple);
  }
}