console.log("Welcome to Spotify");
//Initialization
let songIndex=0;
let audioElement=new Audio('songs/1.mp3');
let myProgressbar=document.getElementById("myProgressbar");
let masterPlay =document.getElementById("masterPlay");
let gif =document.getElementById('gif');
let timestamp=Array.from(document.getElementsByClassName('timestamp'));
let masterSongName =document.getElementById('masterSongName');
songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    {songName:"Let me Love you" , filePath:"songs/1.mp3" ,coverPath:"1.jpg"},
    {songName:"Hello" , filePath:"songs/2.mp3" ,coverPath:"2.jpg"},
    {songName:"how are you" , filePath:"songs/3.mp3" ,coverPath:"3.jpg"},
    {songName:"I am fine" , filePath:"songs/4.mp3" ,coverPath:"4.jpg"},
    {songName:"whats special" , filePath:"songs/5.mp3" ,coverPath:"5.jpg"},
    {songName:"Nothing" , filePath:"songs/6.mp3" ,coverPath:"6.jpg"},
    {songName:"whats up" , filePath:"songs/7.mp3" ,coverPath:"7.jpg"},
    {songName:"howz life" , filePath:"songs/8.mp3" ,coverPath:"8.jpg"},
    {songName:"Awesome" , filePath:"songs/9.mp3" ,coverPath:"9.jpg"},
    {songName:"manh" , filePath:"songs/10.mp3" ,coverPath:"10.jpg"}
    
]

songItems.forEach((element,i) => {
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
    let audio = new Audio(songs[i].filePath);

    // Add event listener to retrieve the duration when metadata is loaded
    audio.addEventListener('loadedmetadata', function () {
        // Convert the duration into minutes and seconds format
        let minutes = Math.floor(audio.duration / 60);
        let seconds = Math.floor(audio.duration % 60);
        if (seconds < 10) {
            seconds = `0${seconds}`;  // Ensure two-digit seconds
        }

        // Set the song duration in the relevant HTML element
        element.getElementsByClassName("timestamp")[0].innerText = `${minutes}:${seconds}`;
    });

})
//play and pause of song
masterPlay.addEventListener("click",()=>{
    if(audioElement.paused||audioElement.currentTime<=0){
        audioElement.play();
        masterSongName.innerText=songs[songIndex].songName;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterSongName.innerText=songs[songIndex].songName;
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
    }
})

audioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate');
    Progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressbar.value=Progress;
})

myProgressbar.addEventListener('change',()=>{
    audioElement.currentTime = (myProgressbar.value*audioElement.duration)/100;
})

const makeallplays=()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
            element.classList.remove('fa-circle-pause');
            element.classList.add('fa-circle-play');
        })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        if(audioElement.paused||audioElement.currentTime<=0){
        makeallplays();
        songIndex=parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src=`songs/${songIndex+1}.mp3`;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterSongName.innerText=songs[songIndex].songName;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');}
        else{
            audioElement.pause();
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            gif.style.opacity=0;
        }
    })
})


document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=9){
        songIndex=0;
    }
    else{
        songIndex=songIndex+1;
    }
    audioElement.src=`songs/${songIndex+1}.mp3`;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    masterSongName.innerText=songs[songIndex].songName;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex=songIndex-1;
    }
    audioElement.src=`songs/${songIndex+1}.mp3`;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    masterSongName.innerText=songs[songIndex].songName;
})

