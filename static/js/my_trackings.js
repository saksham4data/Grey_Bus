// my_trackings.js
;(() => {
  const navToggle = document.querySelector(".nav-toggle")
  const nav = document.getElementById("site-nav")
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true"
      navToggle.setAttribute("aria-expanded", String(!expanded))
      nav.style.display = expanded ? "none" : "block"
    })
  }

  const bodyEl = document.getElementById("tracksBody")
  const emptyEl = document.getElementById("emptyState")
  const clearBtn = document.getElementById("clearBtn")
  const seedBtn = document.getElementById("seedBtn")

  function load() {
    const list = JSON.parse(localStorage.getItem("trackings") || "[]")
    bodyEl.innerHTML = ""
    if (!list.length) {
      emptyEl.style.display = "block"
      return
    }
    emptyEl.style.display = "none"

    list.forEach((t) => {
      const tr = document.createElement("tr")

      const route = document.createElement("td")
      route.textContent = `${t.fromCity} → ${t.toCity}`

      const travelDate = document.createElement("td")
      travelDate.textContent = t.travelDate || "—"

      const savedAt = document.createElement("td")
      const d = new Date(t.createdAt)
      savedAt.textContent = isNaN(d.getTime()) ? "—" : d.toLocaleString()

      const status = document.createElement("td")
      status.textContent = t.status || "Saved"

      const actions = document.createElement("td")
      const wrap = document.createElement("div")
      wrap.className = "row-actions"

      const trackBtn = document.createElement("button")
      trackBtn.className = "btn-small"
      trackBtn.textContent = "Track"
      trackBtn.addEventListener("click", () => alert("Live tracking coming soon (demo)."))

      const removeBtn = document.createElement("button")
      removeBtn.className = "btn-small secondary"
      removeBtn.textContent = "Remove"
      removeBtn.addEventListener("click", () => remove(t.id))

      wrap.append(trackBtn, removeBtn)
      actions.append(wrap)

      tr.append(route, travelDate, savedAt, status, actions)
      bodyEl.append(tr)
    })
  }

  function remove(id) {
    const list = JSON.parse(localStorage.getItem("trackings") || "[]")
    const next = list.filter((t) => t.id !== id)
    localStorage.setItem("trackings", JSON.stringify(next))
    load()
  }

  clearBtn?.addEventListener("click", () => {
    if (confirm("Clear all trackings?")) {
      localStorage.removeItem("trackings")
      load()
    }
  })

  seedBtn?.addEventListener("click", () => {
    const demo = [
      {
        id: crypto?.randomUUID?.() || "1",
        fromCity: "Delhi",
        toCity: "Jaipur",
        travelDate: "2025-10-12",
        createdAt: new Date().toISOString(),
        status: "Saved",
      },
      {
        id: crypto?.randomUUID?.() || "2",
        fromCity: "Mumbai",
        toCity: "Pune",
        travelDate: "2025-10-13",
        createdAt: new Date().toISOString(),
        status: "Saved",
      },
      {
        id: crypto?.randomUUID?.() || "3",
        fromCity: "Bangalore",
        toCity: "Chennai",
        travelDate: "2025-10-14",
        createdAt: new Date().toISOString(),
        status: "Saved",
      },
    ]
    const list = JSON.parse(localStorage.getItem("trackings") || "[]")
    localStorage.setItem("trackings", JSON.stringify([...demo, ...list]))
    load()
  })

  const yearEl = document.getElementById("year")
  if (yearEl) yearEl.textContent = String(new Date().getFullYear())

  load()
})()
