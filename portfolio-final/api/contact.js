const esc = (s) => String(s ?? '').replace(/[<>&"]/g, (c) =>
({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]));
export default async function handler(req, res) {
if (req.method !== 'POST') {
return res.status(405).json({ error: 'Méthode non autorisée' });
}
const { name, email, message, objet, website } = req.body || {};
if (website) return res.status(200).json({ ok: true });
if (!name || !email || !message) {
return res.status(400).json({ error: 'Champs manquants' });
}

const API_KEY = (process.env.BREVO_API_KEY || process.env.SENDINBLUE_API_KEY || '').trim();
const SENDER = (process.env.SENDER_EMAIL || process.env.BREVO_SENDER_EMAIL || '').trim();
const OWNER = (process.env.OWNER_EMAIL || process.env.BREVO_OWNER_EMAIL || '').trim();

if (!API_KEY || !SENDER || !OWNER) {
console.error('Missing Brevo env vars', {
hasApiKey: !!API_KEY,
hasSender: !!SENDER,
hasOwner: !!OWNER,
});
return res.status(500).json({
error: 'Configuration e-mail incomplète sur le serveur',
});
}

async function sendEmail(payload) {
const r = await fetch('https://api.brevo.com/v3/smtp/email', {
method: 'POST',
headers: {
'api-key': API_KEY,
'content-type': 'application/json',
'accept': 'application/json',
},
body: JSON.stringify(payload),
});
if (!r.ok) {
const text = await r.text();
throw new Error(`Brevo API error: ${r.status} ${text}`);
}
return r.json();
}
try {
await sendEmail({
sender: { name: 'Portfolio', email: SENDER },
to: [{ email: OWNER }],
replyTo: { email, name }, 
subject: `${objet} : ${name}`,
htmlContent:
`<h2>Nouveau message depuis votre portfolio</h2>` +
`<p><b>Nom :</b> ${esc(name)}</p>` +
`<p><b>Email :</b> ${esc(email)}</p>` +
`<p><b>Message :</b><br>${esc(message).replace(/\n/g, '<br>')}</p>`,
});
await sendEmail({
sender: { name: 'NDZESSA EMMANUEL', email: SENDER },
to: [{ email, name }],
subject: 'Merci pour votre message !',
htmlContent:
`<p>Bonjour ${esc(name)},</p>` +
`<p>Merci de l'intérêt que vous portez à mon travail. ` +
`J'ai bien reçu votre message et je reviens vers vous sous 48 h.</p>` +
`<p>À très vite,<br>NDZESSA EMMANUEL</p>`,
});
return res.status(200).json({ ok: true });
} catch (e) {
console.error(e);
return res.status(500).json({ error: 'Envoi impossible' });
}
}