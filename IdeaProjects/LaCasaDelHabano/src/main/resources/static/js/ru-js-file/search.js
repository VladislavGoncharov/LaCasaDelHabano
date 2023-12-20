let containerSearchResult = $('html #search_result');

$('#search_input').on('input', function () {

    let inputValue = $(this).val();
    console.log(inputValue)
    console.log(inputValue === '')
    //ajax
    if (!(inputValue === '')) sendSearchRequest(inputValue)
    else containerSearchResult.empty();
})


function sendSearchRequest(inputValue) {

    let currentURL = window.location.href;
    let siteBaseURL = currentURL.substring(0, currentURL.indexOf('/', 8)); // Индекс 8 для пропуска "https://" или "http://"

    $.ajax({
        url: siteBaseURL + '/api/getSearch', method: 'GET', // Метод запроса
        data: {
            lang: "ru",
            searchQuery: inputValue
        }, dataType: 'json', // Ожидаемый формат данных
        success: function (responseData) {
            console.log(responseData)
            containerSearchResult.empty();
            // Отображение элементов на текущей странице
            if (responseData.length !== 0) {
                for (let i = 0; i < responseData.length; i++) {
                    createItemSearchResult(containerSearchResult, responseData[i]);
                }
            }
            else {
                let itemDiv = document.createElement('div');
                itemDiv.classList.add('d-flex', 'mt-2');
                itemDiv.innerHTML = `
                       <div class="h5"> По запросу ${inputValue} ничего не найдено
                       </div>                        
                 `;
                containerSearchResult.append(itemDiv);
            }

        }, error: function (xhr, status, error) {
            // Обработка ошибок
            console.error(status, error);
        }
    });


    // globalState.stompClient.send("/app/search", {}, JSON.stringify(inputValue));
    // // Подписка на определенные топики
    // globalState.stompClient.subscribe('/get/search', function (data) {
    //    let responseData = JSON.parse(data.body);
    //    containerSearchResult.empty();
    //    // Отображение элементов на текущей странице
    //    if (responseData.length !== 0) {
    //       for (let i = 0; i < responseData.length; i++) {
    //          createItemSearchResult(containerSearchResult, responseData[i]);
    //       }
    //    }
    // });
}

//
// globalState.stompClient.connect({}, function (frame) {
//    console.log('Connected: ' + frame);
// });

function createItemSearchResult(container, item) {
    let itemDiv = document.createElement('div');
    itemDiv.classList.add('d-flex', 'mt-2');
    itemDiv.innerHTML = `
           <div class="search__container-img-result">
               <img class="search__img-result" src="${item.linkPhoto}" alt="${item.name}">
           </div>
           <div class="h5">
                <div>
                    <a href="${item.link}">${item.name}</a>
                </div>
            </div>                        
       `;

    container.append(itemDiv);
}