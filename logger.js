import { getDatabase, ref, push } from 'firebase/database'

// Things I want to log:
// - Target FPS
// - Expected run time
// - Expected run time in ms
// - Actual FPS
// - Actual run time
// - Actual run time in ms
// - Total time it took to send data to Firebase in seconds
// - Total time it took to send data to Firebase and settle promises in seconds
// - Expected number of writes to Firebase
// - Actual number of writes to Firebase
// - Number of writes to Firebase that failed
export const saveLog = async (
	targetFps,
	expectedRunTimeInMs,
	actualRunTimeInMs,
	actualRunTimeAfterSettledPromisesInMs,
	numberOfWrites,
	numberOfFailedPromises,
	runTimeString
) => {
	const db = getDatabase()
	const fps = {
		targetFps,
		actualFps: numberOfWrites / (actualRunTimeInMs / 1000),
	}
	const runTime = {
		runTimeString,
		sendData: {
			ms: { expected: expectedRunTimeInMs, actual: actualRunTimeInMs },
			seconds: {
				expected: expectedRunTimeInMs / 1000,
				actual: actualRunTimeInMs / 1000,
			},
			minutes: {
				expected: expectedRunTimeInMs / 1000 / 60,
				actual: actualRunTimeInMs / 1000 / 60,
			},
			hours: {
				expected: expectedRunTimeInMs / 1000 / 60 / 60,
				actual: actualRunTimeInMs / 1000 / 60 / 60,
			},
		},
		sendDataAndSettlePromises: {
			ms: {
				expected: expectedRunTimeInMs,
				actual: actualRunTimeAfterSettledPromisesInMs,
			},
			seconds: {
				expected: expectedRunTimeInMs / 1000,
				actual: actualRunTimeAfterSettledPromisesInMs / 1000,
			},
			minutes: {
				expected: expectedRunTimeInMs / 1000 / 60,
				actual: actualRunTimeAfterSettledPromisesInMs / 1000 / 60,
			},
			hours: {
				expected: expectedRunTimeInMs / 1000 / 60 / 60,
				actual: actualRunTimeAfterSettledPromisesInMs / 1000 / 60 / 60,
			},
		},
	}

	const writes = {
		expected: targetFps * (expectedRunTimeInMs / 1000),
		actual: numberOfWrites,
		failed: numberOfFailedPromises,
		completed: numberOfWrites - numberOfFailedPromises,
	}

	const log = {
		fps,
		runTime,
		writes,
	}

	await push(ref(db, 'logs/'), log)
}
