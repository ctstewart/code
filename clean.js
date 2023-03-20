import { initializeApp } from 'firebase/app'
import { getDatabase, ref, remove } from 'firebase/database'

import { firebaseConfig } from './firebase-config.js'

const app = initializeApp(firebaseConfig)

const deleteAllData = async () => {
	const db = getDatabase()

	await remove(ref(db, 'poseData/'))

	process.exit()
}

deleteAllData()
