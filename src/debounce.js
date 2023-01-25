const updateDebounceText = debounce((text) => {
    console.log(text)
})
function debounce(cb, delay = 1000) {
    let timeout;
return (...args) => {
    clearTimeout(timeout);
   timeout = setTimeout(() => {
    cb(...args)
    }, delay);
}
}

updateDebounceText('hello world')