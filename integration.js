// Main Integration Script for Crypto Dashboard

// Ensure all scripts are loaded in the correct order
document.addEventListener('DOMContentLoaded', function() {
    // Load Font Awesome for icons
    loadFontAwesome();
    
    // Initialize the core dashboard
    initializeDashboard();
    
    // Set up event listeners
    setupEventListeners();
    
    // Load initial data with staggered timing to prevent rate limiting
    loadDataWithStaggeredTiming();
    
    // Update timestamp
    updateTimestamp();
    
    // Set up periodic refresh
    setupPeriodicRefresh();
});

// Load Font Awesome
function loadFontAwesome() {
    const fontAwesome = document.createElement('link');
    fontAwesome.rel = 'stylesheet';
    fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
    document.head.appendChild(fontAwesome);
}

// Initialize Dashboard
function initializeDashboard() {
    console.log('Initializing dashboard...');
    
    // Load saved watchlist from localStorage
    if (localStorage.getItem('watchlist')) {
        window.watchlist = JSON.parse(localStorage.getItem('watchlist'));
        renderWatchlist();
    } else {
        window.watchlist = [];
    }
    
    // Load saved alerts from localStorage
    if (localStorage.getItem('priceAlerts')) {
        window.priceAlerts = JSON.parse(localStorage.getItem('priceAlerts'));
        renderAlerts();
    } else {
        window.priceAlerts = [];
    }
    
    // Load theme preference
    if (localStorage.getItem('darkMode') === 'false') {
        window.darkMode = false;
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        document.getElementById('theme-icon').textContent = '🌙';
    } else {
        window.darkMode = true;
    }
    
    // Initialize Fear & Greed Widget
    initializeFearGreedWidget();
}

// Set up event listeners
function setupEventListeners() {
    // Refresh button
    document.getElementById('refresh-btn').addEventListener('click', function() {
        loadAllData();
        updateTimestamp();
    });
    
    // Theme toggle
    document.getElementById('theme-toggle-btn').addEventListener('click', toggleTheme);
    
    // Watchlist add button
    document.getElementById('watchlist-add-btn').addEventListener('click', addToWatchlist);
    
    // Alert add button
    document.getElementById('alert-add-btn').addEventListener('click', addAlert);
}

// Toggle theme between dark and light mode
function toggleTheme() {
    window.darkMode = !window.darkMode;
    if (window.darkMode) {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        document.getElementById('theme-icon').textContent = '☀️';
    } else {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        document.getElementById('theme-icon').textContent = '🌙';
    }
    localStorage.setItem('darkMode', window.darkMode);
    
    // Reinitialize components that depend on theme
    if (window.twitterMonitor) {
        window.twitterMonitor.initializeTimeline('twitter-feed', window.darkMode);
    }
    
    if (window.sentimentAnalyzer) {
        window.sentimentAnalyzer.renderSentimentChart('sentiment-chart');
    }
}

// Load all data with staggered timing to prevent rate limiting
function loadDataWithStaggeredTiming() {
    // Immediate loads
    loadMarketOverview();
    
    // Staggered loads to prevent API rate limiting
    setTimeout(() => {
        if (typeof initializeSocialMonitoring === 'function') {
            initializeSocialMonitoring();
        }
    }, 500);
    
    setTimeout(() => {
        if (typeof initializeDexAndCoinbaseTracking === 'function') {
            initializeDexAndCoinbaseTracking();
        }
    }, 1000);
    
    setTimeout(() => {
        updateWatchlistPrices();
        checkAlerts();
    }, 1500);
}

// Load all data for the dashboard
function loadAllData() {
    console.log('Loading all data...');
    loadMarketOverview();
    
    if (window.twitterMonitor && window.sentimentAnalyzer) {
        loadInfluencerMentions();
        window.sentimentAnalyzer.renderSentimentChart('sentiment-chart');
    }
    
    if (window.dexTracker && window.coinbaseTracker) {
        window.dexTracker.renderNewPairs('new-pairs');
        window.dexTracker.renderTrendingByVolume('volume-trending');
        window.dexTracker.renderLiquidityChanges('liquidity-changes');
        
        window.coinbaseTracker.renderTrendingTokens('coinbase-trending');
        window.coinbaseTracker.renderRecentListings('new-listings');
        window.coinbaseTracker.renderUnusualVolumeTokens('unusual-volume');
        window.coinbaseTracker.renderExploredTokens('explored-tokens');
    }
    
    updateWatchlistPrices();
    checkAlerts();
}

// Update timestamp
function updateTimestamp() {
    const now = new Date();
    document.getElementById('update-time').textContent = now.toLocaleTimeString();
}

// Set up periodic refresh
function setupPeriodicRefresh() {
    // Refresh market data every 60 seconds
    setInterval(() => {
        loadMarketOverview();
        updateWatchlistPrices();
        checkAlerts();
        updateTimestamp();
    }, 60000);
    
    // Refresh other data every 5 minutes
    setInterval(() => {
        loadAllData();
    }, 300000);
}

// Error handling for API calls
function handleApiError(error, fallbackFunction, message = 'Error loading data') {
    console.error(message, error);
    if (typeof fallbackFunction === 'function') {
        return fallbackFunction();
    }
    return null;
}

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Mobile optimization
function optimizeForMobile() {
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
        // Reduce data load on mobile
        const charts = document.querySelectorAll('.crypto-chart');
        charts.forEach(chart => {
            if (chart.chart) {
                chart.chart.options.animation = false;
            }
        });
        
        // Collapse some sections by default on mobile
        const collapsibleSections = document.querySelectorAll('.dashboard-panel');
        collapsibleSections.forEach(section => {
            if (!section.classList.contains('market-overview')) {
                const content = section.querySelector('.row, .twitter-feed-container, .trending-section');
                if (content) {
                    content.style.display = 'none';
                }
                
                const title = section.querySelector('.panel-title');
                if (title) {
                    title.style.cursor = 'pointer';
                    title.addEventListener('click', function() {
                        const content = this.parentNode.querySelector('.row, .twitter-feed-container, .trending-section');
                        if (content) {
                            content.style.display = content.style.display === 'none' ? 'block' : 'none';
                        }
                    });
                }
            }
        });
    }
}

// Check browser compatibility
function checkBrowserCompatibility() {
    const isCompatible = 
        typeof localStorage !== 'undefined' && 
        typeof fetch !== 'undefined' && 
        typeof Promise !== 'undefined';
    
    if (!isCompatible) {
        alert('Your browser may not be fully compatible with this dashboard. Please use a modern browser for the best experience.');
    }
    
    return isCompatible;
}

// Initialize on load
window.addEventListener('load', function() {
    checkBrowserCompatibility();
    optimizeForMobile();
    
    // Remove loading placeholders
    setTimeout(() => {
        const loadingPlaceholders = document.querySelectorAll('.loading-placeholder');
        loadingPlaceholders.forEach(placeholder => {
            if (placeholder.parentNode.children.length === 1) {
                placeholder.textContent = 'No data available';
            }
        });
    }, 5000);
});

// Window resize handler
window.addEventListener('resize', debounce(function() {
    optimizeForMobile();
}, 250));
