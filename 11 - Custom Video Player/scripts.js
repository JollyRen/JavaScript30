/* Get Our Elements */
const player = document.querySelector('.player')
const [video, progress, progressBar, toggle, fullScreen, skipButtons, ranges] = [
  player.querySelector('.viewer'),
  player.querySelector('.progress'),
  player.querySelector('.progress__filled'),
  player.querySelector('.toggle'),
  player.querySelector('.fullscreen'),
  player.querySelectorAll('[data-skip]'),
  player.querySelectorAll('.player__slider')
]

/* Built out functions */

//play and button toggles
const togglePlay = () => {
  method = video.paused ? 'play' : 'pause'
  video[method]()
}
const updateButton = (e) => {
  icon = e.target.paused ? '►' : '❚ ❚'
  toggle.textContent = icon
}

//skip and scrub
const skip = (e) => (video.currentTime += parseFloat(e.target.dataset.skip))
const scrub = (e) => {
  scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
  video.currentTime = scrubTime
}

//handle progress and range bar updating
const handleRangeUpdate = (e) => (video[e.target.name] = e.target.value)
const handleProgress = () => {
  percent = (video.currentTime / video.duration) * 100
  progressBar.style.flexBasis = `${percent}%`
}

// mouse up/down
let mousedown = false
const handleMouseDown = () => (mousedown = true)
const handleMouseUp = () => (mousedown = false)

// handle full screen expansion
const handleFullscreen = () => video.requestFullscreen()

/* Hook up the event listeners */
video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress)

fullScreen.addEventListener('click', handleFullscreen)

toggle.addEventListener('click', togglePlay)

skipButtons.forEach((button) => button.addEventListener('click', skip))
ranges.forEach(
  (range) => (
    range.addEventListener('click', handleRangeUpdate),
    range.addEventListener('mousemove', (e) => mousedown && handleRangeUpdate(e)),
    range.addEventListener('mousedown', handleMouseDown),
    range.addEventListener('mouseup', handleMouseUp)
  )
)
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', (e) => mousedown && scrub(e))
progress.addEventListener('mousedown', handleMouseDown)
progress.addEventListener('mouseup', handleMouseUp)
