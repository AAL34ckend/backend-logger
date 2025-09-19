// Ganti URL ini dengan URL Vercel Anda
const SERVER_URL = "https://nama-proyek-anda.vercel.app";

async function fetchAndRenderDashboard() {
    const dashboardContainer = document.getElementById('dashboard-container');
    const loadingMessage = document.getElementById('loading');
    
    // Tampilkan pesan loading
    if (loadingMessage) {
        loadingMessage.style.display = 'block';
    }

    try {
        const response = await fetch(`${SERVER_URL}/api/dashboard`);
        const csData = await response.json();
        
        // Hapus konten sebelumnya
        dashboardContainer.innerHTML = '';

        for (const csKey in csData) {
            const data = csData[csKey];
            const card = document.createElement('div');
            card.className = 'cs-card';
            card.innerHTML = `
                <h4>${csKey.toUpperCase()}</h4>
                <div class="log-item">Revisi Dashboard: <span>${data.revisiDashboard || 0}</span></div>
                <div class="log-item">Revisi Elementor: <span>${data.revisiElementor || 0}</span></div>
                <div class="log-item">Revisi SatuMomen: <span>${data.revisiSatumomen || 0}</span></div>
                <div class="log-item">Shopee Pesanan: <span>${data.shopeePesanan || 0}</span></div>
                <div class="log-item">Balas Shopee: <span>${data.balasShopee || 0}</span></div>
                <div class="log-item">Pesan Masuk WA: <span>${data.pesanMasukWA || 0}</span></div>
                <div class="log-item">Balas WA: <span>${data.balasWA || 0}</span></div>
            `;
            dashboardContainer.appendChild(card);
        }
    } catch (error) {
        console.error('Failed to fetch data from server:', error);
        dashboardContainer.innerHTML = `<div style="color: red; text-align: center;">Gagal memuat data. Mohon coba lagi nanti.</div>`;
    }
}

document.getElementById('refresh-btn').addEventListener('click', fetchAndRenderDashboard);

// Muat data saat halaman pertama kali dibuka
fetchAndRenderDashboard();