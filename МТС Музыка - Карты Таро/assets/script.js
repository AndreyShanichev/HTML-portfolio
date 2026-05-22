// Размеры изображений
const bgDimensions = { width: 1920, height: 1977 };
const deckDimensions = { width: 1560, height: 878 };

// Модификаторы для deck
const deckModifiers = {
    scale: 0.5,
    offsetX: 125,
    offsetY: 175,
};

// Массив с картами
const cards = ['assets/card_1.png', 'assets/card_2.png', 'assets/card_3.png'];

function syncImages() {
    const container = document.querySelector('.container');
    const bgImage = document.querySelector('.big-image');
    const deckImage = document.querySelector('.small-image');

    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const containerRatio = containerWidth / containerHeight;

    // Соотношение сторон background изображения
    const bgRatio = bgDimensions.width / bgDimensions.height;

    // Определяем, как background будет масштабироваться (cover behavior)
    let bgScale;
    if (containerRatio > bgRatio) {
        // Контейнер шире, чем background - масштабируем по ширине
        bgScale = containerWidth / bgDimensions.width;
    } else {
        // Контейнер выше, чем background - масштабируем по высоте
        bgScale = containerHeight / bgDimensions.height;
    }

    // Вычисляем реальные размеры background после масштабирования
    const bgScaledWidth = bgDimensions.width * bgScale;
    const bgScaledHeight = bgDimensions.height * bgScale;

    // Применяем тот же масштаб к deck изображению + модификатор
    const deckScaledWidth = deckDimensions.width * bgScale * deckModifiers.scale;
    const deckScaledHeight = deckDimensions.height * bgScale * deckModifiers.scale;

    // Центрируем deck изображение относительно контейнера + масштабированные смещения
    const deckLeft = (containerWidth - deckScaledWidth) / 2 + (deckModifiers.offsetX * bgScale);
    const deckTop = (containerHeight - deckScaledHeight) / 2 + (deckModifiers.offsetY * bgScale);

    // Применяем стили к deck изображению
    deckImage.style.width = deckScaledWidth + 'px';
    deckImage.style.height = deckScaledHeight + 'px';
    deckImage.style.left = deckLeft + 'px';
    deckImage.style.top = deckTop + 'px';
    deckImage.style.objectFit = 'cover';
    deckImage.style.objectPosition = 'center';
}

function showRandomCard() {
    const container = document.querySelector('.container');
    const blurOverlay = document.querySelector('.blur-overlay');
    const cardDisplay = document.querySelector('.card-display');
    const bigImage = document.querySelector('.big-image');
    const deckImage = document.querySelector('.small-image');
    const textOverlay = document.querySelector('.text-overlay');

    // Выбираем случайную карту
    const randomCard = cards[Math.floor(Math.random() * cards.length)];
    cardDisplay.src = randomCard;

    // Показываем размытие и карту
    blurOverlay.classList.add('active');

    setTimeout(() => {
        cardDisplay.classList.add('active');
    }, 200);

    // Показываем Packshot через 3 секунды после клика по колоде
    setTimeout(() => {
        const packshot = document.querySelector('.packshot');
        packshot.classList.add('active');
    }, 2000);
}

// Запускаем синхронизацию при загрузке и изменении размера
window.addEventListener('load', syncImages);
window.addEventListener('resize', syncImages);

// Добавляем обработчики событий
window.addEventListener('load', () => {
    const deckImage = document.querySelector('.small-image');
    const cardDisplay = document.querySelector('.card-display');
    const blurOverlay = document.querySelector('.blur-overlay');

    // Клик по колоде - показать карту
    deckImage.addEventListener('click', showRandomCard);
});