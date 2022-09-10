const API_URL = 'https://pixabay.com/api/';
const API_KEY = '28931784-c1efcd868e1c004f8e87ba397';
const PER_PAGE = 12;
function fetchPictures(searchQuery, page) {
  const params = new URLSearchParams({
    q: searchQuery,
    page: page,
    key: API_KEY,
    per_page: PER_PAGE,
    image_type: 'photo',
    orientation: 'horizontal',
  });
  // console.log(`${API_URL}?${params}`);
  return fetch(`${API_URL}?${params}`).then(response => {
    if (response.ok) {
      return response.json();
    }
    return new Error(response.status);
  });
}
const api = { fetchPictures };
export default api;
// https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12
