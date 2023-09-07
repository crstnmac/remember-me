export  function numberOfDaysUntil(date: string) {
  const today = new Date()
  const eventDate = new Date(date)
  const diffTime = Math.abs(eventDate.getTime() - today.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays
}

export  function formatDate(date: string) {
  const eventDate = new Date(date)
  return eventDate.toDateString()
}