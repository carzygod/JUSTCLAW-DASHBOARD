import getColors from 'get-image-colors'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const imagePath = path.join(__dirname, 'public', 'logo.png')

getColors(imagePath).then(colors => {
    console.log("Extracted Colors:")
    colors.forEach(color => console.log(color.hex()))
}).catch(err => {
    console.error("Error extracting colors:", err)
})
