import { initializeApp } from 'firebase/app'
import { getDatabase, ref, push } from 'firebase/database'

import { poseData } from './pose-data.js'
import { firebaseConfig } from './firebase-config.js'

const app = initializeApp(firebaseConfig)

const writeUserData = async () => {
	const db = getDatabase()
	const totalFramesSent = 30
	const results = []

	const start = Date.now()
	for (let i = 0; i < totalFramesSent; i++) {
		results.push(push(ref(db, 'poseData/'), poseData))
	}
	await Promise.allSettled(results)
	const end = Date.now()

	const deltaSec = (end - start) / 1000

	const data = JSON.stringify(poseData)
	const dataBlob = new Blob([data], { type: 'application/json' })

	const singleFrameInBytes = dataBlob.size
	const maxFramesPerSec = 30
	const maxFrameSizePerSec = singleFrameInBytes * maxFramesPerSec

	const sizeDataSentInBytes = totalFramesSent * singleFrameInBytes
	const bytesSentPerSecond = sizeDataSentInBytes / deltaSec
	const framesSentPerSecond = bytesSentPerSecond / singleFrameInBytes

	const maxUsersByFramerate = []
	for (let i = 1; i <= maxFramesPerSec; i++) {
		const maxUsers = framesSentPerSecond / i
		maxUsersByFramerate.push({ maxUsers, fps: i })
	}

	console.log({
		singleFrameInBytes,
		totalFramesSent,
		durSec: deltaSec,
		bytesSentPerSecond,
		maxUsersByFramerate,
	})

	process.exit()
}

writeUserData()
