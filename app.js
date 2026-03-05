/**
 * HydroTrack App Logic
 */

// 1. Navigation SPA Logic
const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        const target = item.getAttribute('data-target');
        navigateTo(target);

        // Update Nav UI (only for main tabs)
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
    });
});

function navigateTo(pageId) {
    pages.forEach(page => {
        if (page.id === pageId) {
            page.classList.add('active');
        } else {
            page.classList.remove('active');
        }
    });

    // If navigating manually via button to a non-tab page (like alerts)
    // We should keep the active state on the origin tab or remove it if desired.
    if (pageId === 'alerts') {
        const dashboardNav = document.querySelector('.nav-item[data-target="dashboard"]');
        if (dashboardNav) {
            navItems.forEach(nav => nav.classList.remove('active'));
            dashboardNav.classList.add('active');
        }
    }
}

// 2. Dashboard Gauge & State UI Updates
function updateDashboardState(humidity, threshold, isRaining) {
    const gaugeValue = document.getElementById('humidity-value');
    const gaugeFill = document.getElementById('humidity-gauge-fill');
    const statusText = document.getElementById('status-text');
    const statusDot = document.getElementById('status-dot');
    const dashboardSect = document.getElementById('dashboard');
    const actionBadge = document.getElementById('action-badge');
    const actionText = document.getElementById('action-text');

    // Update gauge value
    gaugeValue.textContent = humidity;

    // SVG circle stroke-dasharray is 251.2 (r=40, 2*PI*40 = ~251.2)
    // Convert 0-100% to offset 251.2 to 0
    const offset = 251.2 - (humidity / 100) * 251.2;
    gaugeFill.style.strokeDashoffset = offset;

    // Determine state
    // Humidité < Seuil ET Pas de pluie -> Carte Rouge "Arrosage requis"
    // Humidité < Seuil ET Pluie -> Carte Bleue/Verte "Pluie détectée - Arrosage suspendu"
    // Sinon -> Carte Verte "Tout est OK"

    dashboardSect.classList.remove('status-alert-theme');
    actionBadge.querySelector('i').className = 'fa-solid fa-circle-check icon-status';

    if (humidity < threshold && !isRaining) {
        // Alerte Rouge
        dashboardSect.classList.add('status-alert-theme');
        statusText.textContent = "Arrosage requis";
        statusDot.className = 'status-dot red';
        actionText.textContent = "Je déclenche l'arrosage";
        actionBadge.querySelector('i').className = 'fa-solid fa-droplet icon-status';
    } else if (humidity < threshold && isRaining) {
        // Alerte Pluie
        statusText.textContent = "Pluie détectée";
        statusText.style.color = 'var(--status-info)';
        statusDot.className = 'status-dot';
        statusDot.style.backgroundColor = 'var(--status-info)';
        gaugeFill.style.stroke = 'var(--status-info)';
        
        actionText.textContent = "Arrosage suspendu par sécurité";
        actionBadge.style.backgroundColor = 'var(--status-info-bg)';
        actionBadge.style.color = 'var(--status-info)';
        actionBadge.querySelector('i').className = 'fa-solid fa-cloud-rain icon-status';
    } else {
        // Tout OK
        statusText.textContent = "Humidité correcte";
        statusText.style.color = 'var(--status-ok)';
        statusDot.className = 'status-dot green';
        statusDot.style.backgroundColor = 'var(--status-ok)';
        gaugeFill.style.stroke = 'var(--status-ok)';
        
        actionText.textContent = "Arrosage non nécessaire aujourd'hui";
        actionBadge.style.backgroundColor = 'var(--status-ok-bg)';
        actionBadge.style.color = 'var(--status-ok)';
    }

    // Logic for alerts notification badge
    const badge = document.getElementById('alert-badge');
    if (humidity < threshold && !isRaining) {
        badge.style.display = 'block';
    } else {
        badge.style.display = 'none';
    }
}


// 3. Alerts Generation
function generateAlertsList(humidity, threshold, isRaining) {
    const list = document.getElementById('alerts-list');
    list.innerHTML = ''; // clear
    
    // According to CDC logic
    let alertHtml = '';

    if (humidity < threshold && !isRaining) {
        alertHtml = `
            <div class="alert-item alert-red">
                <i class="fa-solid fa-triangle-exclamation alert-icon"></i>
                <div class="alert-content">
                    <h4>Arrosage requis</h4>
                    <p>Le niveau d'humidité (${humidity}%) est inférieur au seuil (${threshold}%).</p>
                </div>
            </div>
        `;
    } else if (humidity < threshold && isRaining) {
        alertHtml = `
            <div class="alert-item alert-blue">
                <i class="fa-solid fa-cloud-showers-heavy alert-icon"></i>
                <div class="alert-content">
                    <h4>Pluie détectée - Arrosage suspendu</h4>
                    <p>Bien que le sol soit sec, des précipitations sont en cours.</p>
                </div>
            </div>
        `;
    } else {
        alertHtml = `
            <div class="alert-item alert-green">
                <i class="fa-solid fa-check alert-icon"></i>
                <div class="alert-content">
                    <h4>Tout est normal</h4>
                    <p>Le système fonctionne correctement. Aucun arrosage n'est requis.</p>
                </div>
            </div>
        `;
    }

    // Add a mockup history alert just to show the list style
    const mockupHistoryAlert = `
        <div class="alert-item alert-green" style="opacity: 0.7;">
            <i class="fa-solid fa-clock-rotate-left alert-icon"></i>
            <div class="alert-content">
                <h4>Arrosage terminé</h4>
                <p>Hier à 18:30 (Automatique).</p>
            </div>
        </div>
    `;

    list.innerHTML = alertHtml + mockupHistoryAlert;
}


// 4. API Mocking / Fetches for Node-RED
const API_BASE = "http://localhost:1880"; // Example Node-RED url, replace if necessary

async function fetchLatestData() {
    try {
        // Real logic:
        // const res = await fetch(`${API_BASE}/hydrotrack/latest`);
        // const data = await res.json();
        
        // Mock data for display purposes
        const mockData = {
            humidity: 18,
            isRaining: false,
            timestamp: new Date().toISOString(),
            battery: 78,
            settings: {
                threshold: parseInt(document.getElementById('threshold-slider').value) || 20
            }
        };

        // UI Updates
        updateDashboardState(mockData.humidity, mockData.settings.threshold, mockData.isRaining);
        generateAlertsList(mockData.humidity, mockData.settings.threshold, mockData.isRaining);
        
        document.getElementById('last-update').textContent = "Il y a quelques instants";
        document.getElementById('battery-level').textContent = mockData.battery + "%";

    } catch (e) {
        console.error("Erreur de récupération des données: ", e);
    }
}

async function fetchHistoryData() {
    try {
        // const res = await fetch(`${API_BASE}/hydrotrack/history`);
        // const data = await res.json();
        
        // Mock data (7 days)
        const labels = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
        const dataValues = [25, 23, 19, 45, 40, 32, 18]; // 45 means it watered/rained

        renderChart(labels, dataValues);
    } catch (e) {
        console.error("Erreur histori: ", e);
    }
}

async function fetchUserSettings() {
    try {
        // const res = await fetch(`${API_BASE}/hydrotrack/user`);
        // const prefs = await res.json();
        
        // Mocks setup
        // Already handled locally by UI, but we could sync here.
    } catch (e) {
        console.error("Erreur load prefs: ", e);
    }
}

async function saveUserSettings() {
    const threshold = document.getElementById('threshold-slider').value;
    const notify = document.getElementById('notification-toggle').checked;
    const freq = document.getElementById('freq-select').value;

    const payload = {
        threshold: parseInt(threshold),
        notifications: notify,
        frequency: parseInt(freq)
    };

    try {
        // const res = await fetch(`${API_BASE}/hydrotrack/user`, {
        //     method: 'PUT',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(payload)
        // });
        
        alert("Paramètres sauvegardés avec succès !");
        
        // Re-evaluate dashboard state with new threshold
        fetchLatestData();

    } catch (e) {
        alert("Erreur lors de la sauvegarde.");
        console.error(e);
    }
}


// 5. Chart.js Implementation
let humidityChartInstance = null;
function renderChart(labels, data) {
    const ctx = document.getElementById('humidityChart').getContext('2d');
    
    // Gradient definition for line
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, 'rgba(79, 172, 254, 0.5)');
    gradient.addColorStop(1, 'rgba(0, 242, 254, 0)');

    if (humidityChartInstance) {
        humidityChartInstance.destroy();
    }

    humidityChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Humidité (%)',
                data: data,
                borderColor: '#4facfe',
                backgroundColor: gradient,
                borderWidth: 3,
                pointBackgroundColor: '#fff',
                pointBorderColor: '#4facfe',
                pointBorderWidth: 2,
                pointRadius: 4,
                fill: true,
                tension: 0.4 // Smooth curves
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: '#edf2f7',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#718096',
                        stepSize: 25
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#718096'
                    }
                }
            }
        }
    });
}

// 6. Init and Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Threshold slider logic
    const slider = document.getElementById('threshold-slider');
    const sliderVal = document.getElementById('threshold-val');
    slider.addEventListener('input', (e) => {
        sliderVal.textContent = e.target.value + '%';
    });

    // Save button event
    document.getElementById('save-settings-btn').addEventListener('click', saveUserSettings);

    // Initial fetch
    fetchLatestData();
    fetchHistoryData();
    fetchUserSettings();
});
