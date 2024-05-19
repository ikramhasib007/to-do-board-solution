module.exports = async () => {
  await globalThis.__httpServer__.close()
}