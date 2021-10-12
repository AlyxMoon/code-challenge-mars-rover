
const waitFor = async (time = 1000): Promise<void> => {
  return new Promise(resolve => window.setTimeout(resolve, time))
}

export default waitFor
