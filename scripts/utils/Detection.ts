export class DetectionManager {
  private isWebPCheck = false
  private isWebPChecked = false

  isMobile() {
    return !document.documentElement.classList.contains('desktop')
  }

  isWebPSupported() {
    if (!this.isWebPChecked) {
      this.isWebPChecked = true

      const element = document.createElement('canvas')

      if (element.getContext && element.getContext('2d')) {
        this.isWebPCheck = element.toDataURL('image/webp').indexOf('data:image/webp') === 0
      }
    }

    return this.isWebPCheck
  }
}

export const Detection = new DetectionManager()
