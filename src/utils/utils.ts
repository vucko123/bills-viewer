export const paragraphToText = (text: string) => {
  return text.replace(/<\/?[^>]+(>|$)/g, "")
}
