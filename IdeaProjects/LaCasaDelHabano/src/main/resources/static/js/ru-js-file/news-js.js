//web socket
// var socket = new SockJS("http://127.0.0.1:8080/websocket");
// var stompClient = Stomp.over(socket);
// stompClient.connect({}, function (frame) {
//     console.log('Connected: ' + frame);
//     sendFilterRequest('привет')
//     // Подписка на определенные топики
//     stompClient.subscribe('/get/news', function (data) {
//         var responseData = JSON.parse(data.body);
//         var container = $('#containerForNews');
//         $('#pagination-news').pagination({
//             dataSource: responseData,
//             pageSize: 5,
//             callback: function (data, pagination) {
//                 container.empty();
//                 // Отображение элементов на текущей странице
//                 for (var i = 0; i < data.length; i++) {
//                     createNews(container, data[i]);
//                 }
//             }
//         });
//     });
// });
$(document).ready(function () {

    let currentURL = window.location.href;
    let siteBaseURL = currentURL.substring(0, currentURL.indexOf('/', 8)); // Индекс 8 для пропуска "https://" или "http://"

    $.ajax({
        url: siteBaseURL + '/api/getNewsRu',
        method: 'GET', // Метод запроса
        dataType: 'json', // Ожидаемый формат данных
        success: function (responseData) {
            console.log(responseData)
            // var responseData = JSON.parse(data.body);
            let container = $('#containerForNews')
            $('#pagination-news').pagination({
                dataSource: responseData,
                pageSize: 5,
                callback: function (data, pagination) {
                    container.empty();
                    // Отображение элементов на текущей странице
                    for (let i = 0; i < data.length; i++) {
                        createNews(container, data[i]);
                    }
                }
            });
        },
        error: function (xhr, status, error) {
            // Обработка ошибок
            console.error(status, error);
        }
    });
});


function createNews(container, item) {
    let itemDiv = document.createElement('div');
    itemDiv.classList.add('offset-lg-3', 'offset-md-2', 'col-lg-9', 'col-md-10',
        'offset-0', 'col-12', 'mb-3', 'opacity_hide_text');
    itemDiv.innerHTML = `
                <div class="border-top">
                    <div class="row mt-5 mb-sm-5 mt-0">
                        <div class="col-12 d-block d-sm-none">
                            <div class="h5-num">04/05/23</div>
                        </div>
                        <div class="col-lg-5 col-sm-6 col-12 order-sm-1 order-2">
                            <div class="h5-num d-none d-sm-block">${item.date}</div>
                            <div class="mt-sm-2 mt-4 h3">${item.header}</div>
                            <div class="mt-4 pe-lg-5">
                                <p class="h5">${item.mainText}</p>
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-6 col-12 order-sm-2 order-1 ps-lg-5 ms-lg-1 d-flex justify-content-center mt-sm-0 mt-4">
                            <div><img src="/img/about_us__picture_news.jpg" alt="news"></div>
                        </div>
                        <div class="col order-3 d-none d-lg-block">
                            <div class="position-relative h-100 opacity_hide_text transform_up_text">
                                <div class="position-absolute bottom-0 end-0"><a
                                        class="round-button round-button-big d-flex justify-content-center align-items-center"
                                        onclick="reserveNews('${item.header}')">
                                    Резерв
                                </a></div>
                            </div>
                        </div>
                    </div>
                    <button class="d-lg-none d-block flat-button flat-button-bg-light mt-4 mb-4 opacity_hide_text transform_up_text"
                            type="button" onclick="reserveNews('${item.header}')">
                        <div>Резерв</div>
                    </button>
                    <div class="h5 text-mobile mb-2 opacity_hide_text transform_up_text" 
                    style="color:var(--mc-white-06)">${item.tag}
                    </div>
                </div>
        `;
    container.append(itemDiv);
}
