const videosBtn=document.getElementById("videosBtn")
const shuffleBtn=document.getElementById("shuffleBtn")
const playPauseBtn=document.getElementById("playPauseBtn")
const shuffleVideoBtn=document.getElementById("shuffleVideoBtn")
const memoryVideo=document.getElementById("memoryVideo")
const photo1=document.getElementById("photo1")
const photo2=document.getElementById("photo2")

const startDate=new Date(2024,11,21,0,0,0)

const photoPool=[
  "photos/p1.JPG","photos/p2.JPG","photos/p3.JPG","photos/p4.JPG","photos/p5.JPG",
  "photos/p6.jpeg","photos/p7.jpeg","photos/p8.jpeg","photos/p9.JPEG"
]

const videoPool=["photos/v1.MP4","photos/v2.MP4","photos/v3.MP4","photos/v4.MOV","photos/v5.MOV"]

const r=a=>a[Math.floor(Math.random()*a.length)]

function setPhotos(){
  let a=r(photoPool),b=r(photoPool)
  while(b===a)b=r(photoPool)
  photo1.style.backgroundImage=`url("${a}")`
  photo2.style.backgroundImage=`url("${b}")`
}

shuffleBtn.onclick=()=>{setPhotos();burst(28)}
setPhotos()

let videoIndex=0

function loadVideoAt(i,auto){
  videoIndex=((i%videoPool.length)+videoPool.length)%videoPool.length
  memoryVideo.pause()
  memoryVideo.src=videoPool[videoIndex]
  playPauseBtn.textContent="Play"
  if(auto)memoryVideo.play().then(()=>playPauseBtn.textContent="Pause").catch(()=>{})
}

function nextVideo(auto){
  loadVideoAt(videoIndex+1,auto)
}

shuffleVideoBtn.onclick=()=>{nextVideo(true);burst(28)}

playPauseBtn.onclick=async()=>{
  if(!memoryVideo.src)loadVideoAt(videoIndex,true)
  if(memoryVideo.paused){await memoryVideo.play();playPauseBtn.textContent="Pause"}
  else{memoryVideo.pause();playPauseBtn.textContent="Play"}
}

memoryVideo.addEventListener("ended",()=>nextVideo(true))

videosBtn.onclick=()=>document.getElementById("videos").scrollIntoView({behavior:"smooth"})

function update(){
  const d=Math.max(0,new Date()-startDate)
  const s=Math.floor(d/1000)
  days.textContent=Math.floor(s/86400)
  hours.textContent=Math.floor(s%86400/3600)
  mins.textContent=Math.floor(s%3600/60)
  secs.textContent=s%60
}
setInterval(update,1000);update()

function sparkleAt(x,y){
  for(let i=0;i<36;i++){
    const s=document.createElement("div")
    s.className="spark"
    s.style.left=x+"px"
    s.style.top=y+"px"
    s.style.setProperty("--sx",(Math.random()*320-160)+"px")
    s.style.setProperty("--sy",(Math.random()*320-160)+"px")
    document.body.appendChild(s)
    setTimeout(()=>s.remove(),900)
  }
}

window.addEventListener("pointerdown",e=>sparkleAt(e.clientX,e.clientY),true)
document.getElementById("photos").addEventListener("pointerdown",e=>sparkleAt(e.clientX,e.clientY),true)
document.getElementById("videos").addEventListener("pointerdown",e=>sparkleAt(e.clientX,e.clientY),true)
document.querySelector(".hero").addEventListener("pointerdown",e=>sparkleAt(e.clientX,e.clientY),true)

function burst(n){
  for(let i=0;i<n;i++){
    const s=document.createElement("div")
    s.className="spark"
    s.style.left="50%"
    s.style.top="120px"
    s.style.setProperty("--sx",(Math.random()*520-260)+"px")
    s.style.setProperty("--sy",(Math.random()*420)+"px")
    document.body.appendChild(s)
    setTimeout(()=>s.remove(),900)
  }
}

loadVideoAt(0,false)
