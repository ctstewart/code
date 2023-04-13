import { initializeApp } from 'firebase/app'
import { getDatabase, ref, push } from 'firebase/database'

import { poseData } from './pose-data.js'
import { firebaseConfig } from './firebase-config.js'
import { convertTimeTextToMs } from './convertTimeTextToMs.js'
import { saveLog } from './logger.js'
import { getCommandLineArgs } from './getCommandLineArgs.js'

// Initialize the Firebase app with the provided configuration
const app = initializeApp(firebaseConfig)

// Get a reference to the Firebase Realtime Database
const db = getDatabase()

// Get command line arguments provided by the user
const args = getCommandLineArgs(process.argv.slice(2))

// Set default values for runtime and target FPS if not provided by user
const runTimeString = args.time || '1m'
const targetFps = args.fps ? parseInt(args.fps) : 30

// Function to write user data to Firebase
const writeUserData = (targetFps, runTimeString) => {
	// Convert run time string to milliseconds
	const runTimeMs = convertTimeTextToMs(runTimeString)

	// Calculate the total number of frames to send
	const totalFramesToSend = targetFps * (runTimeMs / 1000)
	const promises = []
	let counter = 0

	// Display the total number of frames to send, FPS, and run time
	console.log(
		`Sending ${totalFramesToSend} frames at ${targetFps} fps for ${runTimeString}`
	)
	const start = Date.now()

	// Set an interval to write pose data to the database at the target FPS
	const intervalId = setInterval(async () => {
		// Push the pose data to the database
		promises.push(push(ref(db, 'poseData/'), poseData))

		// Increment the counter so we know how many writes have been performed
		counter++

		// Check if all frames have been sent
		if (counter === totalFramesToSend) {
			const end1 = Date.now() - start

			// Clear the interval and stop sending data
			clearInterval(intervalId)

			// Wait for all promises to be settled
			console.log('Done sending data.')
			const settledPromises = await Promise.allSettled(promises)
			const end2 = Date.now() - start
			console.log('All promises settled.')

			// Filter out rejected promises
			const rejectedPromises = settledPromises.filter(
				(p) => p.status === 'rejected'
			)

			// Save log information
			await saveLog({
				targetFps,
				expectedRunTimeInMs: runTimeMs,
				actualRunTimeInMs: end1,
				actualRunTimeAfterSettledPromisesInMs: end2,
				numberOfWrites: counter,
				runTimeString,
				rejectedPromises,
			})

			// Exit the process
			process.exit()
		}
	}, 1000 / targetFps)
}

// Call the writeUserData function with the target FPS and run time string
writeUserData(targetFps, runTimeString)
