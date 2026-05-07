const EMAILJS_CONFIG = {
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'Vgp1Tvu88MeOV6IdI',
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_k6r37m4',
  templates: {
    keep: import.meta.env.VITE_EMAILJS_TEMPLATE_KEEP || 'template_4j2me57',
    fade: import.meta.env.VITE_EMAILJS_TEMPLATE_FADE || 'template_lsiglrr',
    accept: import.meta.env.VITE_EMAILJS_TEMPLATE_ACCEPT || import.meta.env.VITE_EMAILJS_TEMPLATE_KEEP || 'template_4j2me57',
  },
}

let emailJsInitialized = false

function hasEmailJsClient() {
  return typeof window !== 'undefined' && typeof window.emailjs?.send === 'function'
}

export function initEmailNotifications() {
  if (emailJsInitialized || !hasEmailJsClient()) return
  try {
    window.emailjs.init(EMAILJS_CONFIG.publicKey)
    emailJsInitialized = true
  } catch (error) {
    console.warn('[email] EmailJS init failed:', error)
  }
}

function buildPayload(decision, metadata = {}) {
  return {
    decision,
    decision_upper: String(decision).toUpperCase(),
    timestamp_iso: new Date().toISOString(),
    time: new Date().toLocaleString(),
    ...metadata,
  }
}

export async function sendDecisionNotification(decision, metadata = {}) {
  initEmailNotifications()

  const templateID = EMAILJS_CONFIG.templates[decision]
  if (!templateID) {
    console.warn(`[email] Missing template id for decision "${decision}"`)
    return { ok: false, reason: 'missing_template' }
  }

  if (!hasEmailJsClient()) {
    console.warn('[email] EmailJS client unavailable. Decision not sent.')
    return { ok: false, reason: 'client_unavailable' }
  }

  try {
    await window.emailjs.send(
      EMAILJS_CONFIG.serviceId,
      templateID,
      buildPayload(decision, metadata),
    )
    return { ok: true }
  } catch (error) {
    console.error(`[email] Failed to send "${decision}" notification:`, error)
    return { ok: false, reason: 'send_failed', error }
  }
}
