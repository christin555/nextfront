Клиентская часть сайта master-pola.com

Запуск дев сервера - npm run dev

Билд проекта - npm run build

Запуск продакшн сервера - npm run prodstart

Генерация сайт мейпов - npm run postbuild (для запуска небходимо запустить серверную часть для получения возможных индетификаторов для алиасов страниц)

/pages/* 
Файлы доступных страниц. В данной директории обрабатываются запросы во время серверного рендеринга и передаются в глупые компоненты-view из директории /components/*


 /components/*
В данной папке хранятся все интерфесные компоненты, блоки страницы и шаред компоненты

Для управления стейтом приложения используется Mobx - есть глобальные сторы - Rout и Root, в которых происходит гидрация данных в момент рендера после серверной части. 
Инжект обозреваемых состояний происходит в классовых компонентах. 

Для сео-оптимизации каждой странице устанвливаются теги на основе данных в момент серверного рендера. 
