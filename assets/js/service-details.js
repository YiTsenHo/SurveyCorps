function showService(serviceId, event) {
  // 如果是從點擊事件觸發，阻止預設行為
  if (event) {
    event.preventDefault();
  }
  
  // 隱藏所有內容
  document.querySelectorAll('.service-content').forEach(content => {
    content.classList.remove('active');
  });
  
  // 移除所有選單的active狀態
  document.querySelectorAll('.services-list a').forEach(link => {
    link.classList.remove('active');
  });
  
  // 顯示選中的內容
  document.getElementById(serviceId).classList.add('active');
  
  // 設置選單active狀態
  document.querySelector(`.services-list a[href="#${serviceId}"]`).classList.add('active');
}

// 頁面載入時初始化
document.addEventListener('DOMContentLoaded', () => {
  // 預設顯示第一個服務
  showService('explore');
  
  // 為所有服務連結添加事件監聽器
  document.querySelectorAll('.services-list a').forEach(link => {
    link.addEventListener('click', (e) => {
      const serviceId = e.currentTarget.getAttribute('href').replace('#', '');
      showService(serviceId, e);
    });
  });
});
