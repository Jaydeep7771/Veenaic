export const sectionIds = [
  'hero',
  'work',
  'about',
  'services',
  'process',
  'testimonials',
  'cta',
  'contact',
]

export const scrollState = { index: 0, t: 0, progress: 0 }

function computeScrollState() {
  const scrollPos = window.scrollY + window.innerHeight * 0.5
  let idx = 0
  for (let i = 0; i < sectionIds.length; i++) {
    const el = document.getElementById(sectionIds[i])
    if (!el) continue
    if (el.offsetTop <= scrollPos) idx = i
  }
  const currentEl = document.getElementById(sectionIds[idx])
  const nextEl = document.getElementById(sectionIds[idx + 1])
  let t = 0
  if (currentEl) {
    const start = currentEl.offsetTop
    const end = nextEl ? nextEl.offsetTop : start + currentEl.offsetHeight
    t = (scrollPos - start) / Math.max(end - start, 1)
    t = Math.min(Math.max(t, 0), 1)
  }
  scrollState.index = idx
  scrollState.t = t
  const doc = document.documentElement
  scrollState.progress = window.scrollY / Math.max(doc.scrollHeight - window.innerHeight, 1)
}

export function startScrollTracking() {
  computeScrollState()
  window.addEventListener('scroll', computeScrollState, { passive: true })
  window.addEventListener('resize', computeScrollState)
  return () => {
    window.removeEventListener('scroll', computeScrollState)
    window.removeEventListener('resize', computeScrollState)
  }
}
