export const useValidateImage = () => {
  const IMAGE_SUPPORT: Array<string> = ['image/jpeg', 'image/png']
  const validateImageType = (file: File, allowTypes: Array<string> = IMAGE_SUPPORT): boolean => {
    if (file) {
      const mime = file.type
      return allowTypes.includes(mime)
    }
    return false
  }

  const validateImageFileSize = (file: File, maxSize: number = 52428800): boolean => {
    if (file) {
      return file.size <= maxSize
    }
    return false
  }

  return { validateImageType, validateImageFileSize }
}
