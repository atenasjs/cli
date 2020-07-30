export async function sendFeedback(to: string) {
  const path = new URL('../../config.json', import.meta.url)
  console.log(path)
}
