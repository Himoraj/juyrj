let isOpening = false;
let previousGameTab = "cases"; // по умолчанию — кейсы


document.addEventListener('DOMContentLoaded', function() {
    // Основные табы приложения
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabHighlight = document.querySelector('.tab-highlight');
    const tabBar = document.querySelector('.tab-bar');
    const tabContents = document.querySelectorAll('.tab-content');
    document.querySelector(".open-normal").addEventListener("click", startRoulette);
    document.querySelector(".open-fast").addEventListener("click", startRoulette);

    
    function updateHighlightPosition(activeButton) {
        if (!activeButton || !tabHighlight) return;
        
        const buttonRect = activeButton.getBoundingClientRect();
        const barRect = tabBar.getBoundingClientRect();
        
        const left = buttonRect.left - barRect.left;
        const width = buttonRect.width;
        
        tabHighlight.style.left = `${left}px`;
        tabHighlight.style.width = `${width}px`;
    }
    
    function switchTab(tabName) {
    tabButtons.forEach(button => {
        button.classList.toggle('active', button.dataset.tab === tabName);
    });
    
    tabContents.forEach(content => {
        content.classList.toggle('active', content.dataset.tabContent === tabName);
    });

    const activeButton = document.querySelector(`.tab-button[data-tab="${tabName}"]`);
    updateHighlightPosition(activeButton);

    // 🔧 Добавим инициализацию подсветки внутри вкладки Розыгрыши
    if (tabName === "raffles") {
        const rafflesContainer = document.querySelector('.raffles-tabs');
        const rafflesActiveButton = rafflesContainer?.querySelector('.raffles-tab-button.active');
        const rafflesHighlight = rafflesContainer?.querySelector('.raffles-tab-highlight');

        if (rafflesActiveButton && rafflesHighlight) {
            requestAnimationFrame(() => {
                const rect = rafflesActiveButton.getBoundingClientRect();
                const parentRect = rafflesActiveButton.parentElement.getBoundingClientRect();
                const left = rect.left - parentRect.left;
                const width = rect.width;

                rafflesHighlight.style.left = `${left}px`;
                rafflesHighlight.style.width = `${width}px`;
            });
        }
    }
}

    
    // Инициализация основных табов
    const activeTab = document.querySelector('.tab-button.active');
    if (activeTab) {
        updateHighlightPosition(activeTab);
        switchTab(activeTab.dataset.tab);
    }
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            switchTab(tabName);
        });
    });
    
    window.addEventListener('resize', () => {
    const activeBtn = container.querySelector('.raffles-tab-button.active');
    updateHighlightPosition(activeBtn);
});
    // Модальное окно пополнения баланса
    const refreshIcon = document.querySelector('.Balance .refresh-icon');
    const modal = document.getElementById('balanceModal');
    if (modal) {
        const closeBtn = modal.querySelector('.modal-close');
        const confirmBtn = modal.querySelector('.confirm-btn');
        const paymentSelector = modal.querySelector('.payment-selector');
        const selectorHeader = modal.querySelector('.selector-header');
        const methodOptions = modal.querySelectorAll('.method-option');
        const selectedMethodDisplay = modal.querySelector('#selectedMethodDisplay');
        const methodIconSelected = modal.querySelector('.method-icon-selected');
        const methodNameSelected = modal.querySelector('.method-name-selected');
        
        let selectedMethod = null;

        if (refreshIcon) {
            refreshIcon.addEventListener('click', function(e) {
                e.stopPropagation();
                modal.style.display = 'flex';
                methodOptions.forEach(opt => opt.classList.remove('active'));
                if (paymentSelector) paymentSelector.classList.remove('expanded');
                if (selectedMethodDisplay) selectedMethodDisplay.style.display = 'none';
                selectedMethod = null;
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                modal.style.display = 'none';
            });
        }

        if (selectorHeader && paymentSelector) {
            selectorHeader.addEventListener('click', function() {
                paymentSelector.classList.toggle('expanded');
            });
        }

        methodOptions.forEach(option => {
            option.addEventListener('click', function() {
                const method = this.dataset.method;
                const iconElement = this.querySelector('.method-icon');
                const textElement = this.querySelector('span');
                
                if (methodIconSelected && iconElement) {
                    methodIconSelected.src = iconElement.src;
                }
                if (methodNameSelected && textElement) {
                    methodNameSelected.textContent = textElement.textContent;
                }
                if (selectedMethodDisplay) {
                    selectedMethodDisplay.style.display = 'flex';
                }
                
                if (paymentSelector) paymentSelector.classList.remove('expanded');
                selectedMethod = method;
            });
        });

        if (confirmBtn) {
            confirmBtn.addEventListener('click', function() {
                const amountInput = document.getElementById('amount');
                const promoInput = document.getElementById('promo');
                const amount = amountInput ? amountInput.value : null;
                const promo = promoInput ? promoInput.value : null;
                
                if (!amount) {
                    alert('Пожалуйста, введите сумму');
                    return;
                }
                
                if (!selectedMethod) {
                    alert('Пожалуйста, выберите способ оплаты');
                    return;
                }
                
                console.log(`Пополнение на ${amount} через ${selectedMethod} с промокодом ${promo}`);
                alert(`Инициировано пополнение на ${amount} через ${getMethodName(selectedMethod)}!`);
                modal.style.display = 'none';
            });
        }

        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Функция для управления табами в играх
function setupGamesTabs() {
    const tabButtons = document.querySelectorAll('.games-tab-button');
    const tabContents = document.querySelectorAll('.games-content');
    const tabHighlight = document.querySelector('.games-tab-highlight');
    
    function updateHighlightPosition(activeButton) {
        if (!activeButton || !tabHighlight) return;
        
        const buttonRect = activeButton.getBoundingClientRect();
        const tabsRect = activeButton.parentElement.getBoundingClientRect();
        
        const left = buttonRect.left - tabsRect.left;
        const width = buttonRect.width;
        
        tabHighlight.style.left = `${left}px`;
        tabHighlight.style.width = `${width}px`;
    }
    
    function switchTab(tabName) {
        tabButtons.forEach(button => {
            button.classList.toggle('active', button.dataset.gameTab === tabName);
        });
        
        tabContents.forEach(content => {
            content.classList.toggle('active', content.dataset.gameContent === tabName);
        });
        
        const activeButton = document.querySelector(`.games-tab-button[data-game-tab="${tabName}"]`);
        updateHighlightPosition(activeButton);
    }
    
    // Инициализация
    const activeTab = document.querySelector('.games-tab-button.active');
    if (activeTab) {
        updateHighlightPosition(activeTab);
        switchTab(activeTab.dataset.gameTab);
    }
    
    // Обработчики кликов
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.dataset.gameTab;
            switchTab(tabName);
        });
    });
}

    // Функция для управления табами в розыгрышах
    function setupRafflesTabs() {
        const container = document.querySelector('.raffles-tabs');
        if (!container) return;

        const tabButtons = container.querySelectorAll('.raffles-tab-button');
        const tabContents = document.querySelectorAll('.raffles-content');
        const tabHighlight = container.querySelector('.raffles-tab-highlight');

        function updateHighlightPosition(activeButton) {
            if (!activeButton || !tabHighlight) return;
            
            const buttonRect = activeButton.getBoundingClientRect();
            const tabsRect = activeButton.parentElement.getBoundingClientRect();
            
            const left = buttonRect.left - tabsRect.left;
            const width = buttonRect.width;
            
            tabHighlight.style.left = `${left}px`;
            tabHighlight.style.width = `${width}px`;
        }

        function switchTab(tabName) {
            tabButtons.forEach(button => {
                button.classList.toggle('active', button.dataset.raffleTab === tabName);
            });
            
            tabContents.forEach(content => {
                content.classList.toggle('active', content.dataset.raffleContent === tabName);
            });
            
            const activeButton = container.querySelector(`.raffles-tab-button.active`);
            updateHighlightPosition(activeButton);
        }

        // Инициализация
        const defaultTab = container.querySelector('.raffles-tab-button[data-raffle-tab="paid"]');
if (defaultTab) {
    defaultTab.classList.add('active');
    switchTab("paid");

    // Задержка, чтобы DOM успел отрисовать кнопки
    requestAnimationFrame(() => {
        updateHighlightPosition(defaultTab);
    });
}

        
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tabName = this.dataset.raffleTab;
                switchTab(tabName);
            });
        });
    }

    // Инициализация табов
    setupGamesTabs();
    setupRafflesTabs();
});

function getMethodName(method) {
    const methods = {
        'card': 'банковскую карту',
        'crypto': 'криптовалюту',
        'sbp': 'СБП'
    };
    return methods[method] || method;
}

document.querySelectorAll('.bonus-case').forEach(caseElement => {
caseElement.addEventListener('mouseenter', function() {
this.style.transform = 'translateY(-5px)';
this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
this.querySelector('.roulette-circle').style.transform = 'scale(1.1)';
});

caseElement.addEventListener('mouseleave', function() {
    this.style.transform = '';
    this.style.boxShadow = '';
    this.querySelector('.roulette-circle').style.transform = '';
});
});

// Обработчики для кейсов
// Обработчики для кейсов
document.querySelectorAll('.bonus-item').forEach(item => {
    item.addEventListener('click', function() {
        const caseType = this.dataset.case;
        const activeTabBtn = document.querySelector('.games-tab-button.active');
if (activeTabBtn) {
    previousGameTab = activeTabBtn.dataset.gameTab;
}
        openCase(caseType);
    });
});

function openCase(caseType) {
    document.querySelector('.games-header').classList.add('hidden');
    document.querySelectorAll('.games-content').forEach(content => {
        content.classList.remove('active');
    });

    const caseOpenTab = document.querySelector('.games-content[data-game-content="case-open"]');
    caseOpenTab.classList.add('active');

    updateCaseContent(caseType);

    // ⬇️ Добавляем плавную прокрутку после рендера
    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);

    setTimeout(() => {
        document.querySelector('.back-arrow').classList.add('visible');
    }, 300);
}

function updateCaseContent(caseType) {
    // В зависимости от типа кейса обновляем содержимое
    const caseTitle = document.querySelector('.case-content .case-title');
    const caseImage = document.querySelector('.case-content .case-image');
    
    switch(caseType) {
        case 'bronze':
            caseTitle.textContent = 'Бронзовый кейс';
            caseImage.src = 'icons/beggar-icon.png';
            break;
        case 'silver':
            caseTitle.textContent = 'Серебряный кейс';
            caseImage.src = 'icons/silver-case-icon.png';
            break;
        case 'gold':
            caseTitle.textContent = 'Золотой кейс';
            caseImage.src = 'icons/gold-case-icon.png';
            break;
        case 'platinum':
            caseTitle.textContent = 'Платиновый кейс';
            caseImage.src = 'icons/platinum-case-icon.png';
            break;
    }
    
    // Обновляем иконки кнопок
    document.querySelector('.open-normal .case-button-icon').src = 'icons/open-icon.png';
    document.querySelector('.open-fast .case-button-icon').src = 'icons/fast-icon.png';
}

// Обработчик кнопки "Назад"
document.querySelector('.back-button').addEventListener('click', function () {
    resetCaseState();

    document.querySelector('.games-header').classList.remove('hidden');

    document.querySelectorAll('.games-content').forEach(content => {
        content.classList.remove('active');
    });

    // Вернуться в ту вкладку, откуда открыли кейс
    document.querySelector(`.games-content[data-game-content="${previousGameTab}"]`).classList.add('active');

    // Обновить активную кнопку вкладки
    document.querySelectorAll('.games-tab-button').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.gameTab === previousGameTab);
    });

    // Обновить подсветку
    const activeBtn = document.querySelector(`.games-tab-button[data-game-tab="${previousGameTab}"]`);
    if (activeBtn) {
        const highlight = document.querySelector('.games-tab-highlight');
        const rect = activeBtn.getBoundingClientRect();
        const parentRect = activeBtn.parentElement.getBoundingClientRect();
        const left = rect.left - parentRect.left;
        const width = rect.width;

        highlight.style.left = `${left}px`;
        highlight.style.width = `${width}px`;
    }
});


const caseItems = [
  { name: "1", image: "icons/item1.png", price: 44000 },
  { name: "2", image: "icons/item2.png", price: 22000 },
  { name: "3", image: "icons/item3.png", price: 14000 },
  { name: "4", image: "icons/item4.png", price: 7600 }
];


function startRoulette() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    isOpening = true;


    const track = document.getElementById("rouletteTrack");
    const rouletteWrapper = document.getElementById("rouletteWrapper");
    const caseImageContainer = document.querySelector(".case-image-container");
    const buttonsContainer = document.querySelector(".case-buttons");

    caseImageContainer.classList.add("hidden");

    const openButtons = buttonsContainer.querySelectorAll(".case-button");
    openButtons.forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = "0.5";
        btn.style.cursor = "not-allowed";
    });

    rouletteWrapper.classList.remove("hidden");
    setTimeout(() => {
        rouletteWrapper.classList.add("show");
    }, 10);

    // 📦 Получаем caseItems из DOM, чтобы избежать пустых клеток
    const caseItems = Array.from(document.querySelectorAll(".case-item")).map(item => {
        const name = item.querySelector(".item-name")?.textContent?.trim();
        const image = item.querySelector(".item-image")?.getAttribute("src");
        const priceText = item.querySelector(".item-price")?.textContent?.replace(/\D/g, "");
        const price = parseInt(priceText, 10) || 0;
        if (!name || !image) return null;
        return { name, image, price };
    }).filter(Boolean);

    // Очистка и генерация
    track.innerHTML = "";

    const baseCount = Math.floor(Math.random() * (149 - 100 + 1)) + 100;
    const bufferCount = 15; // запас в конце
    const itemCount = baseCount + bufferCount;
    const sequence = [];
    for (let i = 0; i < itemCount; i++) {
        const item = caseItems[Math.floor(Math.random() * caseItems.length)];
        if (item && item.image && item.name) {
            sequence.push(item);
        }
    }

    sequence.forEach(item => {
        if (!item || !item.image || !item.name) return;

        const div = document.createElement("div");
        div.className = "roulette-item";
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div>${item.name}</div>
        `;
        track.appendChild(div);
    });

    requestAnimationFrame(() => {
        const itemEl = document.querySelector(".roulette-item");
        if (!itemEl) return;

        const trackStyle = getComputedStyle(track);
        const gap = parseFloat(trackStyle.gap) || 16;
        const itemWidth = itemEl.offsetWidth + gap;

        const finalPrizeIndex = Math.floor(baseCount / 2) + Math.floor(Math.random() * 5) - 2;
        const shift = -Math.round(finalPrizeIndex * itemWidth - window.innerWidth / 2 + itemWidth / 2);

        track.style.transition = "none";
        track.style.transform = `translateX(0px)`;

        requestAnimationFrame(() => {
            track.style.transition = "transform 6.5s cubic-bezier(0.15, 0.85, 0.35, 1)";
            track.style.transform = `translateX(${shift}px)`;
        });

        let animationFrameId;
        function updateCenterHighlight() {
            const centerX = window.innerWidth / 2;
            const items = track.querySelectorAll(".roulette-item");
            let closestItem = null;
            let closestDistance = Infinity;

            items.forEach(item => {
                const rect = item.getBoundingClientRect();
                const itemCenter = rect.left + rect.width / 2;
                const distance = Math.abs(centerX - itemCenter);
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestItem = item;
                }
            });

            items.forEach(item => item.classList.remove("hover-effect"));
            if (closestItem) closestItem.classList.add("hover-effect");

            animationFrameId = requestAnimationFrame(updateCenterHighlight);
        }

        updateCenterHighlight();

        setTimeout(() => {
            cancelAnimationFrame(animationFrameId);

            const centerX = window.innerWidth / 2;
            const items = track.querySelectorAll(".roulette-item");
            let closestItem = null;
            let closestDistance = Infinity;

            items.forEach(item => {
                const rect = item.getBoundingClientRect();
                const itemCenter = rect.left + rect.width / 2;
                const distance = Math.abs(centerX - itemCenter);
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestItem = item;
                }
            });

            items.forEach(i => {
                i.classList.remove("hover-effect", "highlighted");
                i.style.transform = "scale(1)";
            });

            if (closestItem) {
                closestItem.classList.add("highlighted");
                closestItem.style.transform = "scale(1.1)";

                const name = closestItem.querySelector("div").textContent.trim();
                const price = prizePrice(name);

                buttonsContainer.innerHTML = `
                    <button class="case-button keep-item" id="keepItem">Оставить себе</button>
                    <button class="case-button sell-item" id="sellItemBtn">Продать за ${price} <img src="icons/balance.png" class="ruble-icon"></button>
                `;

                document.getElementById("keepItem").addEventListener("click", () => {
                    isOpening = false;
                    resetCaseUI();
                });

                document.getElementById("sellItemBtn").addEventListener("click", () => {
                    isOpening = false;
                    resetCaseUI();
                });
            }
        }, 7000);
    });
}


// Определение цены по названию
function prizePrice(name) {
    const item = caseItems.find(i => i.name === name);
    return item && item.price ? item.price : "???";
}

// Сброс интерфейса кейса
function resetCaseUI() {
    const caseImageContainer = document.querySelector(".case-image-container");
    const rouletteWrapper = document.getElementById("rouletteWrapper");
    const buttonsContainer = document.querySelector(".case-buttons");

    // Показать иконку кейса
    caseImageContainer.classList.remove("hidden");
    rouletteWrapper.classList.add("hidden");

    // Восстановить кнопки открытия
    buttonsContainer.innerHTML = `
        <button class="case-button open-normal">
            Открыть кейс
            <img src="icons/open-icon.png" alt="Открыть" class="case-button-icon">
        </button>
        <button class="case-button open-fast">
            Открыть быстро
            <img src="icons/fast-icon.png" alt="Быстро" class="case-button-icon">
        </button>
    `;

    // Повторно подключить события
    document.querySelector(".open-normal").addEventListener("click", startRoulette);
    document.querySelector(".open-fast").addEventListener("click", startRoulette);
}

document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', (e) => {
        const newTab = button.dataset.tab;

        // Если уходим с кейсов — сбрасываем
        if (newTab !== "case") {
            resetCaseState();
        }

        // Если возвращаемся в "Кейсы" → проверим: открыт ли сейчас кейс?
        if (newTab === "case") {
            const caseOpenTab = document.querySelector('.games-content[data-game-content="case-open"]');
            if (caseOpenTab && caseOpenTab.classList.contains('active')) {
                // Показать стрелку назад через анимацию
                setTimeout(() => {
                    const backArrow = document.querySelector('.back-arrow');
                    if (backArrow) backArrow.classList.add('visible');
                }, 300);
            }
        }
    });
});


function resetCaseState() {
    if (isOpening) {
        console.log("Предмет оставлен себе автоматически (покинул кейс)");
        isOpening = false;
    }
    resetCaseUI();

    // Скрыть стрелку
    const backArrow = document.querySelector(".back-arrow");
    if (backArrow) {
        backArrow.classList.remove("visible");
    }
}
