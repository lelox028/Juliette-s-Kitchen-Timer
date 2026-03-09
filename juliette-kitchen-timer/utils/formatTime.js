export default function formatTime(seconds) {

  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60

  const paddedMinutes = String(minutes).padStart(2, "0")
  const paddedSeconds = String(secs).padStart(2, "0")

  return `${paddedMinutes}:${paddedSeconds}`

}