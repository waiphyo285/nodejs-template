/* eslint-env node */
const path = require('path')
const fs = require('fs')
const admin = require('firebase-admin')

let initialized = false

function init() {
    if (initialized) return

    const credPath = path.join(
        process.cwd(),
        'config',
        'firebase-adminsdk.json'
    )
    if (!fs.existsSync(credPath)) {
        iamlog.error('Firebase credentials not found at', credPath)
        throw new Error('Missing firebase-adminsdk.json')
    }

    const serviceAccount = require(credPath)

    try {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        })
        initialized = true
        iamlog.info('Firebase admin initialized')
    } catch (err) {
        iamlog.error('Failed to initialize Firebase admin:', err)
        throw err
    }
}

async function sendToToken(token, notification = {}, data = {}) {
    init()
    if (!token) throw new Error('token is required')

    const message = {
        token,
        notification,
        data,
    }

    try {
        const res = await admin.messaging().send(message)
        iamlog.info('FCM sent to token:', res)
        return res
    } catch (err) {
        iamlog.error('FCM sendToToken error:', err)
        throw err
    }
}

async function sendToTopic(topic, notification = {}, data = {}) {
    init()
    if (!topic) throw new Error('topic is required')

    const message = {
        topic,
        notification,
        data,
    }

    try {
        const res = await admin.messaging().send(message)
        iamlog.info('FCM sent to topic:', res)
        return res
    } catch (err) {
        iamlog.error('FCM sendToTopic error:', err)
        throw err
    }
}

module.exports = {
    sendToToken,
    sendToTopic,
}
