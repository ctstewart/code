import { initializeApp } from 'firebase/app'
import { getDatabase, ref, push } from 'firebase/database'

import { poseData } from './pose-data.js'
import { firebaseConfig } from './firebase-config.js'
import { convertTimeTextToMs } from './convertTimeTextToMs.js'
import { saveLog } from './logger.js'

const runTimeString = '1s'
const targetFps = 30

const app = initializeApp(firebaseConfig)
const db = getDatabase()

const writeUserData = (targetFps, runTimeString) => {
	const runTimeMs = convertTimeTextToMs(runTimeString)
	const totalFramesToSend = targetFps * (runTimeMs / 1000)
	const promises = []
	let counter = 0
	let end1

	console.log('Sending data...')
	const start = Date.now()
	const intervalId = setInterval(async () => {
		promises.push(push(ref(db, 'poseData/'), poseData))
		counter++

		if (counter === totalFramesToSend) {
			end1 = Date.now() - start
			clearInterval(intervalId)
			console.log('Done sending data.')
			const settledPromises = await Promise.allSettled(promises)
			const end2 = Date.now() - start
			const rejectedPromises = settledPromises.filter(
				(p) => p.status === 'rejected'
			)
			rejectedPromises.forEach((p) => console.log(p.reason))
			console.log('All promises settled.')
			saveLog(
				targetFps,
				runTimeMs,
				end1,
				end2,
				counter,
				rejectedPromises.length,
				runTimeString
			)
			process.exit()
		}
	}, 1000 / targetFps)
}

writeUserData(targetFps, runTimeString)
