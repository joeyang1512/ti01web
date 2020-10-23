export { sinceListener };
function sinceListener(id, link) {
    let dom = document.getElementById(id);
    dom.addEventListener('click', function () {
        dom.style.backgroundColor = '#eee';
        setTimeout(() => {
            dom.style.backgroundColor = '#fff';
        }, 100);
        if (link != null) {
            setTimeout(() => {
                window.location.href = link;
            }, 100);
        }
    });
}
