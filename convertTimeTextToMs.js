// Options for time text: is, im, ih where i is a positive integer and s, m, h is for seconds, minutes, and hours respectively
export const convertTimeTextToMs = (timeText) => {
	const time = timeText.slice(0, -1)
	const unit = timeText.slice(-1)
	const timeMs =
		time *
		{
			s: 1000,
			m: 1000 * 60,
			h: 1000 * 60 * 60,
		}[unit]
	return timeMs
}

// const convertTimeTextToMsUnitTest = () => {
// 	const timeText = '1s'
// 	const timeMs = convertTimeTextToMs(timeText)
// 	console.log('Expected: 1000')
// 	console.log(timeMs)

// 	const timeText2 = '1m'
// 	const timeMs2 = convertTimeTextToMs(timeText2)
// 	console.log('Expected: 60000')
// 	console.log(timeMs2)

// 	const timeText3 = '1h'
// 	const timeMs3 = convertTimeTextToMs(timeText3)
// 	console.log('Expected: 3600000')
// 	console.log(timeMs3)
// }
