import { initializeApp } from 'firebase/app'
import { getDatabase, ref, push } from 'firebase/database'

import { poseData } from './pose-data.js'
import { firebaseConfig } from './firebase-config.js'
import { convertTimeTextToMs } from './convertTimeTextToMs.js'
import { saveLog } from './logger.js'
import { getCommandLineArgs } from './getCommandLineArgs.js'

const app = initializeApp(firebaseConfig)
const db = getDatabase()

const args = getCommandLineArgs(process.argv.slice(2))

const runTimeString = args.time || '1m'
const targetFps = args.fps ? parseInt(args.fps) : 30

const writeUserData = (targetFps, runTimeString) => {
	const runTimeMs = convertTimeTextToMs(runTimeString)
	const totalFramesToSend = targetFps * (runTimeMs / 1000)
	const promises = []
	let counter = 0

	// console.log('Sending data...')
	console.log(
		`Sending ${totalFramesToSend} frames at ${targetFps} fps for ${runTimeString}`
	)
	const start = Date.now()
	const intervalId = setInterval(async () => {
		promises.push(push(ref(db, 'poseData/'), poseData))
		counter++

		if (counter === totalFramesToSend) {
			const end1 = Date.now() - start
			clearInterval(intervalId)
			console.log('Done sending data.')
			const settledPromises = await Promise.allSettled(promises)
			const end2 = Date.now() - start
			console.log('All promises settled.')
			const rejectedPromises = settledPromises.filter(
				(p) => p.status === 'rejected'
			)
			// rejectedPromises.forEach((p) => console.log(p.reason))
			await saveLog({
				targetFps,
				expectedRunTimeInMs: runTimeMs,
				actualRunTimeInMs: end1,
				actualRunTimeAfterSettledPromisesInMs: end2,
				numberOfWrites: counter,
				runTimeString,
				rejectedPromises,
			})
			process.exit()
		}
	}, 1000 / targetFps)
}

writeUserData(targetFps, runTimeString)
