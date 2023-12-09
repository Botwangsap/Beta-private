const fetch = require('node-fetch');
const uploader = require('../lib/uploadFile');

let handler = async (m, { conn, usedPrefix, command }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || ''
	if (/video|audio/.test(mime)) {
		let buffer = await q.download()
		await m.reply(wait)
		let media = await uploader(buffer)
		let json = await (await fetch(API('lann', '/api/tools/whatmusic', { url: media, apikey: lann}))).json()		
        conn.sendMessage(m.chat, { text: json.result }, { quoted: m })
	} else throw `Reply audio/video with command ${usedPrefix + command}`
}
handler.help = ['whatmusic']
handler.tags = ['tools']
handler.command = /^(whatmusic)$/i
handler.limit = true;

module.exports = handler
