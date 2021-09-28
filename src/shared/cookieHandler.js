export function getUserDataFromCookies() {
    const data = document.cookie.split('; ').reduce((prev, current) => {
        const [name, ...value] = current.split('=');
        prev[name] = value.join('=');
        return prev;
    }, {});
    Object.keys(data).forEach((k) => (data[k] === '') && delete data[k]);

    return data
}

export function setUserDataFromCookies(props) {
    let data = getUserDataFromCookies()
    Object.keys(props).forEach(key => {
        data[key] = props[key]
    })
    let updatedCookie = [];
    Object.keys(data).forEach(key => {
        updatedCookie.push(`${key}=${data[key]}`);
    });
    updatedCookie.forEach(val => {
        document.cookie = val;

    })
}

export function logoutFromCookie() {
    document.cookie = `authenticated=`;
    document.cookie = `email=`;
    document.cookie = `username=`;
}