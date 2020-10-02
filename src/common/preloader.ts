export const preloader = () => {
    const element = document.createElement('div');
    element.classList.add('preloader-container');
    element.innerHTML = `<div class="progress"><div class="indeterminate"></div></div>`;
    document.body.append(element);
    return element;
};
