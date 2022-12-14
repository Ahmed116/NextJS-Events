export async function getAllEvents() {
  const response = await fetch(
    'https://nextjs-course-32367-default-rtdb.firebaseio.com/events.json'
  )
  const data = await response.json()
  const events = []
  for (let key in data) {
    events.push({
      ...data[key],
      id: key,
    })
  }
  return events
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents()

  return allEvents.filter((event) => event.isFeatured)
}

export async function getEventById(id) {
  const allEvents = await getAllEvents()
  return allEvents.find((event) => event.id === id)
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter
  const allEvents = await getAllEvents()

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date)
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    )
  })

  return filteredEvents
}

export async function fetcher(url) {
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
}
