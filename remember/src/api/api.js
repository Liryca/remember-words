

export function getTranslatedWord(word) {  // запрос к яндекс переводчику
    return fetch("https://translate.yandex.net/api/v1.5/tr.json/translate", {
        method: 'POST',
        body: `key=trnsl.1.1.20220505T085832Z.ead06d92ed666053.76b91ac7aeb33fb4ac6d87ac84ebcd55ffeb37c1&lang=en-ru&text=${word.englishVersion}`,
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        })

    }).then(response => response.json())

}


export  async function getWordsFromServer() {
    const response = await fetch('http://localhost:3001/get')
    const words = await response.json()
    return words

}

export async function sendWordToServer(word) {
    const response = await fetch('http://localhost:3001/add', {
        method: "POST",
        headers: [
            ["Content-Type", "application/json"],
        ],
        body: JSON.stringify(word)
    });

    return response

}

export  function sendWordsToServerModifiedWord(word) {
    const response = fetch('http://localhost:3001/change', {
        method: "POST",
        headers: [
            ["Content-Type", "application/json"],
        ],
        body: JSON.stringify(word)
    });
    return response

}
// export  function sendWordsToServerModifiedWord(word) {
//     const response = fetch('http://localhost:3001/changeValueWord', {
//         method: "POST",
//         headers: [
//             ["Content-Type", "application/json"],
//         ],
//         body: JSON.stringify(word)
//     });
//     return response

// }


export  async function sendDeletedWord(word) {
    const response = fetch('http://localhost:3001/delete', {
        method: "POST",
        headers: [
            ["Content-Type", "application/json"],
        ],
        body: JSON.stringify(word)
    });
    return response

}