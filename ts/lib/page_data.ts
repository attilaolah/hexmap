class PageData {
  mapbox_api_token: string
}

export default function(): PageData {
  return JSON.parse(document.getElementById("data").innerText);
}
