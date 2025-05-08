export class DetectionManager {
  isMobile() {
    return !document.documentElement.classList.contains('desktop')
  }
}

export const Detection = new DetectionManager()
