document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('trainingSignupForm');
    const loadingElement = form.querySelector('.loading');
    const errorElement = form.querySelector('.error-message');
    const successElement = form.querySelector('.sent-message');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // 顯示載入中狀態
        loadingElement.classList.remove('d-none');
        errorElement.style.display = 'none';
        successElement.classList.add('d-none');

        // 基本驗證
        const age = parseInt(document.getElementById('age').value);
        if (age < 15 || age > 35) {
            errorElement.textContent = '年齡必須在15-35歲之間';
            errorElement.style.display = 'block';
            loadingElement.classList.add('d-none');
            return;
        }

        const training = document.querySelectorAll('input[name="training[]"]:checked');
        if (training.length === 0) {
            errorElement.textContent = '請至少選擇一項訓練項目';
            errorElement.style.display = 'block';
            loadingElement.classList.add('d-none');
            return;
        }

        // 訓練計劃驗證
        const selectedPlan = document.querySelector('input[name="trainingPlan"]:checked');
        if (!selectedPlan) {
            errorElement.textContent = '請選擇一個訓練計劃';
            errorElement.style.display = 'block';
            loadingElement.classList.add('d-none');
            return;
        }

        // 特別作戰小組的額外驗證
        if (selectedPlan.value === 'elite') {
            const age = parseInt(document.getElementById('age').value);
            if (age < 20) {
                errorElement.textContent = '特別作戰小組需要年滿20歲';
                errorElement.style.display = 'block';
                loadingElement.classList.add('d-none');
                return;
            }
        }

        try {
            // 這裡替換成實際的API端點
            const response = await fetch('/api/training-signup', {
                method: 'POST',
                body: new FormData(form)
            });

            if (response.ok) {
                // 顯示成功訊息
                successElement.classList.remove('d-none');
                form.reset();
            } else {
                throw new Error('提交失敗');
            }
        } catch (error) {
            // 顯示錯誤訊息
            errorElement.textContent = '提交過程發生錯誤，請稍後再試';
            errorElement.style.display = 'block';
        } finally {
            loadingElement.classList.add('d-none');
        }
    });

    // 即時年齡驗證
    document.getElementById('age').addEventListener('input', function(e) {
        const age = parseInt(e.target.value);
        const errorSpan = this.nextElementSibling || document.createElement('span');
        errorSpan.className = 'text-danger';
        
        if (age < 15 || age > 35) {
            errorSpan.textContent = '年齡必須在15-35歲之間';
            if (!this.nextElementSibling) {
                this.parentNode.appendChild(errorSpan);
            }
        } else {
            errorSpan.remove();
        }
    });
});
