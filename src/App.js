import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';

const allSongs = [
  {
    id: 0,
    title: "Kangaroo_MusiQue",
    artist: "Emily Wachtel",
    duration: "2:07",
    src: "https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3",
  },
  {
    id: 1,
    title: "Epoq-Lepidoptera.ogg",
    artist: "Coursera 2013",
    duration: "5:02",
    src: "https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg",
  },
  {
    id: 2,
    title: "paza-moduless",
    artist: "Ender Kasim",
    duration: "2:59",
    src: "https://codeskulptor-demos.commondatastorage.googleapis.com/pang/paza-moduless.mp3",
  },
  {
    id: 3,
    title: "menu.ogg",
    artist: "Steve Knock",
    duration: "0:48",
    src: "https://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/menu.ogg",
  },
  {
    id: 4,
    title: "race2.ogg",
    artist: "Steve Knock",
    duration: "1:08",
    src: "https://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/race2.ogg",
  },
  {
    id: 5,
    title: "lose.ogg",
    artist: "Steve Knock",
    duration: "0:32",
    src: "https://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/lose.ogg",
  },
  {
    id: 6,
    title: "race1.ogg",
    artist: "Quincy Larson",
    duration: "0:50",
    src: "https://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/race1.ogg",
  },
  {
    id: 7,
    title: "ateapill.ogg",
    artist: "Lawrence Strickland",
    duration: "0:17",
    src: "https://commondatastorage.googleapis.com/codeskulptor-demos/pyman_assets/ateapill.ogg",
  },
  {
    id: 8,
    title: "theme_01",
    artist: "Igor Petetskih",
    duration: "1:11",
    src: "https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3",
  },
  {
    id: 9,
    title: "Sevish_-__nbsp_",
    artist: "Emily Wachtel",
    duration: "2:14",
    src: "https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3",
  },
];

const MusicPlayer = () => {
  const [userData, setUserData] = useState({
    songs: [...allSongs],
    currentSong: null,
    songCurrentTime: 0,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());

  const getCurrentSongIndex = useCallback(() => userData.songs.indexOf(userData.currentSong), [userData.songs, userData.currentSong]);

  const setPlayerDisplay = useCallback(() => {
    const songTitleElement = document.getElementById('player-song-title');
    const songArtistElement = document.getElementById('player-song-artist');
    
    if (userData.currentSong) {
      songTitleElement.textContent = userData.currentSong.title;
      songArtistElement.textContent = userData.currentSong.artist;
    } else {
      songTitleElement.textContent = '';
      songArtistElement.textContent = '';
    }
  }, [userData.currentSong]);

  const highlightCurrentSong = useCallback(() => {
    const songElements = document.querySelectorAll('.playlist-song');
    songElements.forEach((element) => {
      element.classList.remove('highlight');
    });

    if (userData.currentSong) {
      const currentSongElement = document.getElementById(`song-${userData.currentSong.id}`);
      if (currentSongElement) {
        currentSongElement.classList.add('highlight');
      }
    }
  }, [userData.currentSong]);

  const setPlayButtonAccessibleText = useCallback(() => {
    const playButton = document.getElementById('play');
    if (isPlaying) {
      playButton.setAttribute('aria-label', 'Pause');
    } else {
      playButton.setAttribute('aria-label', 'Play');
    }
  }, [isPlaying]);

  const playSong = useCallback((id) => {
    const song = userData.songs.find((song) => song.id === id);
    audioRef.current.src = song.src;
    audioRef.current.title = song.title;

    if (userData.currentSong === null || userData.currentSong.id !== song.id) {
      audioRef.current.currentTime = 0;
    } else {
      audioRef.current.currentTime = userData.songCurrentTime;
    }
    setUserData(prevState => ({ ...prevState, currentSong: song }));
    setIsPlaying(true);

    highlightCurrentSong();
    setPlayerDisplay();
    setPlayButtonAccessibleText();
    audioRef.current.play();
  }, [userData.songs, userData.currentSong, userData.songCurrentTime, highlightCurrentSong, setPlayerDisplay, setPlayButtonAccessibleText]);

  const renderSongs = useCallback((songs) => {
    return songs.map((song) => (
      <li key={song.id} id={`song-${song.id}`} className="playlist-song">
        <button className="playlist-song-info" onClick={() => playSong(song.id)}>
          <span className="playlist-song-title">{song.title}</span>
          <span className="playlist-song-artist">{song.artist}</span>
          <span className="playlist-song-duration">{song.duration}</span>
        </button>
        <button onClick={() => deleteSong(song.id)} className="playlist-song-delete" aria-label={`Delete ${song.title}`}>
          {<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clipRule="evenodd"/>
          </svg>}
        </button>
      </li>
    ));
  }, [playSong]);

  const sortSongs = useCallback(() => {
    return [...userData.songs].sort((a, b) => a.title.localeCompare(b.title));
  }, [userData.songs]);

  useEffect(() => {
    renderSongs(sortSongs());
    setPlayButtonAccessibleText();
  }, [renderSongs, sortSongs, setPlayButtonAccessibleText]);

  const pauseSong = () => {
    setUserData(prevState => ({ ...prevState, songCurrentTime: audioRef.current.currentTime }));
    setIsPlaying(false);
    audioRef.current.pause();
  };

  const playNextSong = useCallback(() => {
    if (userData.currentSong === null) {
      playSong(userData.songs[0].id);
    } else {
      const currentSongIndex = getCurrentSongIndex();
      const nextSong = userData.songs[currentSongIndex + 1] || userData.songs[0]; // Loop back to the first song
      playSong(nextSong.id);
    }
  }, [userData.songs, userData.currentSong, getCurrentSongIndex, playSong]);
  

  const playPreviousSong = () => {
    if (userData.currentSong === null) return;
    const currentSongIndex = getCurrentSongIndex();
    const previousSong = userData.songs[currentSongIndex - 1];
    if (previousSong) playSong(previousSong.id);
  };

  const shuffle = () => {
    const shuffledSongs = [...userData.songs].sort(() => Math.random() - 0.5);
    setUserData(prevState => ({
      ...prevState,
      songs: shuffledSongs,
      currentSong: null,
      songCurrentTime: 0,
    }));
    setIsPlaying(false);
    renderSongs(shuffledSongs);
    setPlayerDisplay();
    setPlayButtonAccessibleText();
  };

  const deleteSong = useCallback((id) => {
    if (userData.currentSong?.id === id) {
      setUserData(prevState => ({
        ...prevState,
        currentSong: null,
        songCurrentTime: 0,
      }));
      setIsPlaying(false);
      setPlayerDisplay();
    }

    const updatedSongs = userData.songs.filter((song) => song.id !== id);
    setUserData(prevState => ({ ...prevState, songs: updatedSongs }));
    renderSongs(updatedSongs);
    highlightCurrentSong();
    setPlayButtonAccessibleText();

    if (updatedSongs.length === 0) {
      resetPlaylist();
    }
  }, [userData.currentSong, userData.songs, renderSongs, highlightCurrentSong, setPlayButtonAccessibleText, setPlayerDisplay]);

  const resetPlaylist = () => {
    setUserData({
      songs: [...allSongs],
      currentSong: null,
      songCurrentTime: 0,
    });
    setIsPlaying(false);
    renderSongs(allSongs);
    setPlayerDisplay();
    setPlayButtonAccessibleText();
  };

  useEffect(() => {
    const audioElement = audioRef.current;
    audioElement.addEventListener("ended", playNextSong);
    return () => {
      audioElement.removeEventListener("ended", playNextSong);
    };
  }, [playNextSong]);

  return (
    <div className="container">
      <div className="player">
        <div className="player-bar">
          <div className="parallel-lines">
            <div></div>
            <div></div>
          </div>
          <h1 className="fcc-title">MP3</h1>
          <div className="parallel-lines">
            <div></div>
            <div></div>
          </div>
        </div>
        <div className="player-content">
          <div id="player-album-art">
          
          <svg
  width="100"
  height="100"
  viewBox="0 0 100 100"
  xmlns="http://www.w3.org/2000/svg"
>
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="rgba(0, 0, 255, 1)" stop-opacity="1">
        <animate
          attributeName="stop-color"
          values="rgba(0, 0, 255, 1);rgba(0, 128, 0, 1);rgb(255,0,0);rgb(255,255,0);rgba(0, 0, 255, 1)"
          dur="10s"
          repeatCount="indefinite"
        />
      </stop>
      <stop offset="100%" stop-color="rgb(255,0,0)" stop-opacity="1">
        <animate
          attributeName="stop-color"
          values="rgb(255,0,0);rgb(255,255,0);rgba(0, 0, 255, 1);rgba(0, 128, 0, 1);rgb(255,0,0)"
          dur="10s"
          repeatCount="indefinite"
        />
      </stop>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="50" fill="url(#grad1)" />
  <text x="50%" y="50%" text-anchor="middle" fill="#fff" dy=".3em">
  MYTUNEZ
  </text>
</svg>



          </div>
          <div className="player-display">
            <div className="player-display-song-artist">
              <p id="player-song-title">{userData.currentSong?.title || ''}</p>
              <p id="player-song-artist">{userData.currentSong?.artist || ''}</p>
            </div>
            <div className="player-buttons">
              <button id="previous" className="previous" aria-label="Previous" onClick={playPreviousSong}>
                {<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M7 6a1 1 0 0 1 2 0v4l6.4-4.8A1 1 0 0 1 17 6v12a1 1 0 0 1-1.6.8L9 14v4a1 1 0 1 1-2 0V6Z" clipRule="evenodd"/>
                </svg>}
              </button>
              <button id="play" className={`play ${isPlaying ? 'playing' : ''}`} aria-label="Play" onClick={() => isPlaying ? pauseSong() : playSong(userData.currentSong?.id || userData.songs[0].id)}>
                {<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M8.6 5.2A1 1 0 0 0 7 6v12a1 1 0 0 0 1.6.8l8-6a1 1 0 0 0 0-1.6l-8-6Z" clipRule="evenodd"/>
                </svg>}
              </button>
              <button id="pause" className="pause" aria-label="Pause" onClick={pauseSong}>
                {<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9-3a1 1 0 1 0-2 0v6a1 1 0 1 0 2 0V9Zm4 0a1 1 0 1 0-2 0v6a1 1 0 1 0 2 0V9Z" clipRule="evenodd"/>
                </svg>}
              </button>
              <button id="next" className="next" aria-label="Next" onClick={playNextSong}>
                {<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M17 6a1 1 0 1 0-2 0v4L8.6 5.2A1 1 0 0 0 7 6v12a1 1 0 0 0 1.6.8L15 14v4a1 1 0 1 0 2 0V6Z" clipRule="evenodd"/>
                </svg>}
              </button>
              <button id="shuffle" className="shuffle" aria-label="Shuffle" onClick={shuffle}>
                {<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.484 9.166 15 7h5m0 0-3-3m3 3-3 3M4 17h4l1.577-2.253M4 7h4l7 10h5m0 0-3 3m3-3-3-3"/>
                </svg>}
              </button>
              <button id="reset" className="reset" aria-label="Reset" onClick={resetPlaylist}>
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="playlist">
        <div className="playlist-bar">
          <div className="parallel-lines">
            <div></div>
            <div></div>
          </div>
          <h2 className="playlist-title" id="playlist">Playlist</h2>
          <div className="parallel-lines">
            <div></div>
            <div></div>
          </div>
        </div>
        <ul id="playlist-songs">
          {renderSongs(userData.songs)}
        </ul>
      </div>
    </div>
  );
};

export default MusicPlayer;
