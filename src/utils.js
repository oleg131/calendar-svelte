export const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

export function getParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  const param = urlParams.get(name);
  return param;
}

export function getCalendarName() {
  return getParam('calendar') || getParam('c') || 'default';
}

export function loadMarkedDays() {
  const CALENDAR = getCalendarName();
  return JSON.parse(localStorage.getItem(CALENDAR)) || [];
}

export function saveMarkedDays(days) {
  const CALENDAR = getCalendarName();
  localStorage[CALENDAR] = JSON.stringify(days);
}
