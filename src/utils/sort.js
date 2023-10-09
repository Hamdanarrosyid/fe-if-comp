export const aToZ = (arr) => {
    arr.sort((a, b) => {
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();
        if (titleA < titleB) {
            return -1;
        }
        if (titleA > titleB) {
            return 1;
        }
        return 0;
    })
    return arr
}

export const zToA = (arr) => {
    arr.sort((a, b) => {
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();
        if (titleA > titleB) {
            return -1;
        }
        if (titleA < titleB) {
            return 1;
        }
        return 0;
    })
    return arr
}

export const noTComplete = (arr) => {
    const checked = arr.filter((val) => val.is_active == 0)
    const unChecked = arr.filter((val) => val.is_active == 1)
    return [...unChecked, ...checked]
}