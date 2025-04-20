document.addEventListener('DOMContentLoaded', function() {
    // Hide all character cards except first three
    const characterCards = document.querySelectorAll('.character-card');
    characterCards.forEach((card, index) => {
        if (index > 2) {
            card.closest('.col').style.display = 'none';
        }
    });

    // 篩選按鈕功能
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除其他按鈕的active狀態
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // 添加當前按鈕的active狀態
            this.classList.add('active');
            
            // 根據選擇的分類篩選角色卡片
            const filterValue = this.textContent.trim();
            const characterCards = document.querySelectorAll('.character-card');
            let visibleCount = 0;
            
            characterCards.forEach(card => {
                const cardBadge = card.querySelector('.badge.badge-aot').textContent;
                const shouldShow = filterValue === '全部' || cardBadge === filterValue;
                if (shouldShow) {
                    visibleCount++;
                    if (visibleCount <= 3 || document.querySelector('.btn-aot').classList.contains('expanded')) {
                        card.closest('.col').style.display = '';
                    } else {
                        card.closest('.col').style.display = 'none';
                    }
                } else {
                    card.closest('.col').style.display = 'none';
                }
            });
        });
    });

    // 顯示更多角色按鈕功能
    const showMoreBtn = document.querySelector('.btn-aot');
    showMoreBtn.addEventListener('click', function() {
        this.classList.toggle('expanded');
        const isExpanded = this.classList.contains('expanded');
        this.textContent = isExpanded ? '顯示較少士兵' : '顯示更多士兵';
        
        const activeFilter = document.querySelector('.filter-btn.active').textContent.trim();
        const characterCards = document.querySelectorAll('.character-card');
        let visibleCount = 0;
        
        characterCards.forEach(card => {
            const cardBadge = card.querySelector('.badge.badge-aot').textContent;
            if (activeFilter === '全部' || cardBadge === activeFilter) {
                visibleCount++;
                if (isExpanded || visibleCount <= 3) {
                    card.closest('.col').style.display = '';
                } else {
                    card.closest('.col').style.display = 'none';
                }
            }
        });
    });

    // 搜尋功能
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchValue = this.value.toLowerCase();
            const characterCards = document.querySelectorAll('.character-card');
            let visibleCount = 0;
            const isExpanded = document.querySelector('.btn-aot').classList.contains('expanded');
            
            characterCards.forEach(card => {
                const cardTitle = card.querySelector('.card-title').textContent.toLowerCase();
                const cardDesc = card.querySelector('.card-text').textContent.toLowerCase();
                const matches = cardTitle.includes(searchValue) || cardDesc.includes(searchValue);
                
                if (matches) {
                    visibleCount++;
                    if (visibleCount <= 3 || isExpanded) {
                        card.closest('.col').style.display = '';
                    } else {
                        card.closest('.col').style.display = 'none';
                    }
                } else {
                    card.closest('.col').style.display = 'none';
                }
            });
        });
    }
});