export const API = {
  getSearchId () {
    return fetch('https://avs-backend.vercel.app/search')
  },
  getTicketsList (searchId: string) {
    return fetch(`https://avs-backend.vercel.app/tickets?searchId=${searchId}`)
  }
}