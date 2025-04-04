// Crypto Alpha Dashboard JavaScript

// Global variables
let watchlist = [];
let priceAlerts = [];
let darkMode = true;

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the dashboard
    initializeDashboard();
    
    // Set up event listeners
    setupEventListeners();
    
    // Load initial data
    loadAllData();
    
    // Update timestamp
    updateTimestamp();
});

// Initialize Dashboard
function initializeDashboard() {
    // Load saved watchlist from localStorage
    if (localStorage.getItem('watchlist')) {
        watchlist = JSON.parse(localStorage.getItem('watchlist'));
        renderWatchlist();
    }
    
    // Load saved alerts from localStorage
    if (localStorage.getItem('priceAlerts')) {
        priceAlerts = JSON.parse(localStorage.getItem('priceAlerts'));
        renderAlerts();
    }
    
    // Load theme preference
    if (localStorage.getItem('darkMode') === 'false') {
        darkMode = false;
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        document.getElementById('theme-icon').textContent = '🌙';
    }
    
    // Initialize Fear & Greed Widget
    initializeFearGreedWidget();
    
    // Initialize Twitter Feed
    initializeTwitterFeed();
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
    darkMode = !darkMode;
    if (darkMode) {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        document.getElementById('theme-icon').textContent = '☀️';
    } else {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        document.getElementById('theme-icon').textContent = '🌙';
    }
    localStorage.setItem('darkMode', darkMode);
}

// Load all data for the dashboard
function loadAllData() {
    loadMarketOverview();
    loadTrendingTokens();
    loadDexOpportunities();
    loadSocialInsights();
    updateWatchlistPrices();
    checkAlerts();
}

// Update timestamp
function updateTimestamp() {
    const now = new Date();
    document.getElementById('update-time').textContent = now.toLocaleTimeString();
}

// Market Overview Functions
function loadMarketOverview() {
    // Load Bitcoin data
    fetchCryptoData('bitcoin').then(data => {
        if (data) {
            document.getElementById('btc-price').textContent = data.market_data.current_price.usd.toLocaleString();
            const changePercent = data.market_data.price_change_percentage_24h;
            const changeElement = document.getElementById('btc-change');
            changeElement.textContent = `${changePercent.toFixed(2)}%`;
            changeElement.className = changePercent >= 0 ? 'crypto-change positive' : 'crypto-change negative';
            
            // Create BTC chart
            createPriceChart('btc-chart', data.market_data.sparkline_7d.price, changePercent >= 0);
        }
    });
    
    // Load Ethereum data
    fetchCryptoData('ethereum').then(data => {
        if (data) {
            document.getElementById('eth-price').textContent = data.market_data.current_price.usd.toLocaleString();
            const changePercent = data.market_data.price_change_percentage_24h;
            const changeElement = document.getElementById('eth-change');
            changeElement.textContent = `${changePercent.toFixed(2)}%`;
            changeElement.className = changePercent >= 0 ? 'crypto-change positive' : 'crypto-change negative';
            
            // Create ETH chart
            createPriceChart('eth-chart', data.market_data.sparkline_7d.price, changePercent >= 0);
        }
    });
    
    // Load global market data
    fetchGlobalData().then(data => {
        if (data) {
            // Market Cap
            const marketCap = data.data.total_market_cap.usd;
            document.getElementById('global-marketcap').textContent = `$${formatLargeNumber(marketCap)}`;
            
            const marketCapChange = data.data.market_cap_change_percentage_24h_usd;
            const marketCapChangeElement = document.getElementById('global-marketcap-change');
            marketCapChangeElement.textContent = `${marketCapChange.toFixed(2)}%`;
            marketCapChangeElement.className = marketCapChange >= 0 ? 'stat-change positive' : 'stat-change negative';
            
            // Volume
            const volume = data.data.total_volume.usd;
            document.getElementById('global-volume').textContent = `$${formatLargeNumber(volume)}`;
            
            // BTC Dominance
            const btcDominance = data.data.market_cap_percentage.btc;
            document.getElementById('btc-dominance').textContent = `${btcDominance.toFixed(2)}%`;
            
            // Calculate BTC dominance change (approximation)
            const btcDominanceChange = 0; // This would need historical data
            const btcDominanceChangeElement = document.getElementById('btc-dominance-change');
            btcDominanceChangeElement.textContent = `${btcDominanceChange.toFixed(2)}%`;
            btcDominanceChangeElement.className = btcDominanceChange >= 0 ? 'stat-change positive' : 'stat-change negative';
        }
    });
}

// Create a simple price chart using Chart.js
function createPriceChart(elementId, priceData, isPositive) {
    const ctx = document.getElementById(elementId);
    
    // Clear any existing chart
    if (ctx.chart) {
        ctx.chart.destroy();
    }
    
    // Create new chart
    ctx.chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array(priceData.length).fill(''),
            datasets: [{
                data: priceData,
                borderColor: isPositive ? '#00C853' : '#FF3D71',
                borderWidth: 2,
                pointRadius: 0,
                tension: 0.1,
                fill: {
                    target: 'origin',
                    above: isPositive ? 'rgba(0, 200, 83, 0.1)' : 'rgba(255, 61, 113, 0.1)'
                }
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            },
            scales: {
                x: {
                    display: false
                },
                y: {
                    display: false
                }
            },
            animation: false
        }
    });
}

// Initialize Fear & Greed Widget
function initializeFearGreedWidget() {
    const widget = document.createElement('iframe');
    widget.src = 'https://alternative.me/crypto/fear-and-greed-index/';
    widget.width = '100%';
    widget.height = '200px';
    widget.frameBorder = '0';
    widget.scrolling = 'no';
    
    const container = document.getElementById('fear-greed-widget');
    container.innerHTML = '';
    container.appendChild(widget);
}

// Trending Tokens Functions
function loadTrendingTokens() {
    // Load Coinbase trending tokens
    fetchCoinbaseTrending().then(data => {
        renderCoinbaseTrending(data);
    });
    
    // Load DEX trending tokens
    fetchDexTrending().then(data => {
        renderDexTrending(data);
    });
    
    // Load new listings
    fetchNewListings().then(data => {
        renderNewListings(data);
    });
}

// Render Coinbase trending tokens
function renderCoinbaseTrending(data) {
    const container = document.getElementById('coinbase-trending');
    container.innerHTML = '';
    
    if (!data || data.length === 0) {
        container.innerHTML = '<div class="loading-placeholder">No trending data available</div>';
        return;
    }
    
    data.forEach(token => {
        const tokenCard = document.createElement('div');
        tokenCard.className = 'token-card';
        
        const changeClass = token.price_change_24h >= 0 ? 'positive' : 'negative';
        
        tokenCard.innerHTML = `
            <div class="token-info">
                <img src="${token.image}" alt="${token.name}" class="token-icon">
                <div>
                    <div class="token-name">${token.name} (${token.symbol.toUpperCase()})</div>
                    <div class="token-price">$${token.current_price.toLocaleString()}</div>
                </div>
            </div>
            <div class="token-change ${changeClass}">${token.price_change_24h.toFixed(2)}%</div>
        `;
        
        container.appendChild(tokenCard);
    });
}

// Render DEX trending tokens
function renderDexTrending(data) {
    const container = document.getElementById('dex-trending');
    container.innerHTML = '';
    
    if (!data || data.length === 0) {
        container.innerHTML = '<div class="loading-placeholder">No trending data available</div>';
        return;
    }
    
    data.forEach(token => {
        const tokenCard = document.createElement('div');
        tokenCard.className = 'token-card';
        
        const changeClass = token.price_change_24h >= 0 ? 'positive' : 'negative';
        
        tokenCard.innerHTML = `
            <div class="token-info">
                <div>
                    <div class="token-name">${token.name} (${token.symbol.toUpperCase()})</div>
                    <div class="token-price">$${token.price.toLocaleString()}</div>
                </div>
            </div>
            <div class="token-change ${changeClass}">${token.price_change_24h.toFixed(2)}%</div>
        `;
        
        container.appendChild(tokenCard);
    });
}

// Render new listings
function renderNewListings(data) {
    const container = document.getElementById('new-listings');
    container.innerHTML = '';
    
    if (!data || data.length === 0) {
        container.innerHTML = '<div class="loading-placeholder">No new listings available</div>';
        return;
    }
    
    data.forEach(token => {
        const tokenCard = document.createElement('div');
        tokenCard.className = 'token-card';
        tokenCard.style.minWidth = '200px';
        tokenCard.style.marginRight = '10px';
        
        tokenCard.innerHTML = `
            <div class="token-info">
                <img src="${token.image}" alt="${token.name}" class="token-icon">
                <div>
                    <div class="token-name">${token.name}</div>
                    <div class="token-price">$${token.price.toLocaleString()}</div>
                </div>
            </div>
            <div class="token-change">New</div>
        `;
        
        container.appendChild(tokenCard);
    });
}

// DEX Opportunities Functions
function loadDexOpportunities() {
    // Load new pairs
    fetchNewPairs().then(data => {
        renderNewPairs(data);
    });
    
    // Load volume trending
    fetchVolumeTrending().then(data => {
        renderVolumeTrending(data);
    });
}

// Render new pairs
function renderNewPairs(data) {
    const container = document.getElementById('new-pairs');
    container.innerHTML = '';
    
    if (!data || data.length === 0) {
        container.innerHTML = '<div class="loading-placeholder">No new pairs available</div>';
        return;
    }
    
    data.forEach(pair => {
        const pairCard = document.createElement('div');
        pairCard.className = 'dex-pair-card';
        
        pairCard.innerHTML = `
            <div class="token-info">
                <div>
                    <div class="token-name">${pair.token0}/${pair.token1}</div>
                    <div class="token-price">$${pair.price.toLocaleString()}</div>
                </div>
            </div>
            <div>
                <div>Liquidity: $${formatLargeNumber(pair.liquidity)}</div>
                <a href="${pair.url}" target="_blank" class="btn btn-sm btn-outline-primary mt-1">Trade</a>
            </div>
        `;
        
        container.appendChild(pairCard);
    });
}

// Render volume trending
function renderVolumeTrending(data) {
    const container = document.getElementById('volume-trending');
    container.innerHTML = '';
    
    if (!data || data.length === 0) {
        container.innerHTML = '<div class="loading-placeholder">No volume data available</div>';
        return;
    }
    
    data.forEach(pair => {
        const pairCard = document.createElement('div');
        pairCard.className = 'dex-pair-card';
        
        pairCard.innerHTML = `
            <div class="token-info">
                <div>
                    <div class="token-name">${pair.token0}/${pair.token1}</div>
                    <div class="token-price">$${pair.price.toLocaleString()}</div>
                </div>
            </div>
            <div>
                <div>Volume: $${formatLargeNumber(pair.volume_24h)}</div>
                <a href="${pair.url}" target="_blank" class="btn btn-sm btn-outline-primary mt-1">Trade</a>
            </div>
        `;
        
        container.appendChild(pairCard);
    });
}

// Social Insights Functions
function loadSocialInsights() {
    // Load influencer mentions
    fetchInfluencerMentions().then(data => {
        renderInfluencerMentions(data);
    });
    
    // Load sentiment analysis
    fetchSentimentData().then(data => {
        renderSentimentChart(data);
    });
}

// Initialize Twitter Feed
function initializeTwitterFeed() {
    const container = document.getElementById('twitter-feed');
    
    // Create Twitter timeline widget
    const timeline = document.createElement('a');
    timeline.className = 'twitter-timeline';
    timeline.href = 'https://twitter.com/CryptoTwitter/lists/crypto-influencers';
    timeline.setAttribute('data-height', '300');
    timeline.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    timeline.textContent = 'Crypto Influencers';
    
    container.innerHTML = '';
    container.appendChild(timeline);
    
    // Load Twitter widget script
    if (window.twttr && window.twttr.widgets) {
        window.twttr.widgets.load();
    }
}

// Render influencer mentions
function renderInfluencerMentions(data) {
    const container = document.getElementById('influencer-mentions');
    container.innerHTML = '';
    
    if (!data || data.length === 0) {
        container.innerHTML = '<div class="loading-placeholder">No influencer data available</div>';
        return;
    }
    
    data.forEach(mention => {
        const mentionCard = document.createElement('div');
        mentionCard.className = 'token-card';
        
        mentionCard.innerHTML = `
            <div class="token-info">
                <div>
                    <div class="token-name">${mention.token} mentioned by ${mention.influencer}</div>
                    <div class="token-price">${mention.time_ago}</div>
                </div>
            </div>
            <a href="${mention.tweet_url}" target="_blank" class="btn btn-sm btn-outline-primary">View</a>
        `;
        
        container.appendChild(mentionCard);
    });
}

// Render sentiment chart
function renderSentimentChart(data) {
    const container = document.getElementById('sentiment-chart');
    container.innerHTML = '<canvas id="sentiment-canvas"></canvas>';
    
    if (!data || data.length === 0) {
        container.innerHTML = '<div class="loading-placeholder">No sentiment data available</div>';
        return;
    }
    
    const ctx = document.getElementById('sentiment-canvas');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.map(item => item.token),
            datasets: [{
                label: 'Sentiment Score',
                data: data.map(item => item.sentiment_score),
                backgroundColor: data.map(item => {
                    if (item.sentiment_score > 70) return '#00C853';
                    if (item.sentiment_score > 50) return '#FFD600';
                    return '#FF3D71';
                }),
                borderWidth: 1
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
                    ticks: {
                        color: darkMode ? '#B3B3B3' : '#757575'
                    },
                    grid: {
                        color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: darkMode ? '#B3B3B3' : '#757575'
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Watchlist Functions
function addToWatchlist() {
    const input = document.getElementById('watchlist-input');
    const symbol = input.value.trim().toUpperCase();
    
    if (symbol && !watchlist.includes(symbol)) {
        watchlist.push(symbol);
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
        input.value = '';
        renderWatchlist();
        updateWatchlistPrices();
    }
}

function renderWatchlist() {
    const container = document.getElementById('user-watchlist');
    container.innerHTML = '';
    
    if (watchlist.length === 0) {
        container.innerHTML = '<div class="watchlist-placeholder">Add tokens to your watchlist</div>';
        return;
    }
    
    watchlist.forEach(symbol => {
        const tokenCard = document.createElement('div');
        tokenCard.className = 'token-card';
        tokenCard.id = `watchlist-${symbol}`;
        
        tokenCard.innerHTML = `
            <div class="token-info">
                <div>
                    <div class="token-name">${symbol}</div>
                    <div class="token-price">Loading...</div>
                </div>
            </div>
            <div>
                <span class="token-change">...</span>
                <button class="btn btn-sm btn-outline-danger ms-2 remove-watchlist" data-symbol="${symbol}">✕</button>
            </div>
        `;
        
        container.appendChild(tokenCard);
    });
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-watchlist').forEach(button => {
        button.addEventListener('click', function() {
            const symbol = this.getAttribute('data-symbol');
            removeFromWatchlist(symbol);
        });
    });
    
    // Update alert token dropdown
    updateAlertTokenDropdown();
}

function removeFromWatchlist(symbol) {
    watchlist = watchlist.filter(item => item !== symbol);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    renderWatchlist();
}

function updateWatchlistPrices() {
    if (watchlist.length === 0) return;
    
    watchlist.forEach(symbol => {
        fetchTokenPrice(symbol).then(data => {
            if (data) {
                const card = document.getElementById(`watchlist-${symbol}`);
                if (card) {
                    const priceElement = card.querySelector('.token-price');
                    const changeElement = card.querySelector('.token-change');
                    
                    priceElement.textContent = `$${data.price.toLocaleString()}`;
                    changeElement.textContent = `${data.price_change_24h.toFixed(2)}%`;
                    changeElement.className = data.price_change_24h >= 0 ? 'token-change positive' : 'token-change negative';
                }
            }
        });
    });
}

// Alert Functions
function addAlert() {
    const tokenSelect = document.getElementById('alert-token');
    const conditionSelect = document.getElementById('alert-condition');
    const priceInput = document.getElementById('alert-price');
    
    const token = tokenSelect.value;
    const condition = conditionSelect.value;
    const price = parseFloat(priceInput.value);
    
    if (token && condition && price && !isNaN(price)) {
        const alert = {
            token,
            condition,
            price,
            triggered: false
        };
        
        priceAlerts.push(alert);
        localStorage.setItem('priceAlerts', JSON.stringify(priceAlerts));
        
        priceInput.value = '';
        renderAlerts();
        checkAlerts();
    }
}

function renderAlerts() {
    const container = document.getElementById('price-alerts');
    container.innerHTML = '';
    
    if (priceAlerts.length === 0) {
        container.innerHTML = '<div class="alerts-placeholder">No active alerts</div>';
        return;
    }
    
    priceAlerts.forEach((alert, index) => {
        const alertCard = document.createElement('div');
        alertCard.className = 'token-card';
        
        const conditionText = alert.condition === 'above' ? 'rises above' : 'falls below';
        const statusClass = alert.triggered ? 'positive' : '';
        const statusText = alert.triggered ? '(Triggered)' : '';
        
        alertCard.innerHTML = `
            <div class="token-info">
                <div>
                    <div class="token-name">${alert.token} ${conditionText} $${alert.price}</div>
                    <div class="token-price ${statusClass}">${statusText}</div>
                </div>
            </div>
            <button class="btn btn-sm btn-outline-danger remove-alert" data-index="${index}">✕</button>
        `;
        
        container.appendChild(alertCard);
    });
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-alert').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            removeAlert(index);
        });
    });
}

function removeAlert(index) {
    priceAlerts.splice(index, 1);
    localStorage.setItem('priceAlerts', JSON.stringify(priceAlerts));
    renderAlerts();
}

function updateAlertTokenDropdown() {
    const dropdown = document.getElementById('alert-token');
    dropdown.innerHTML = '<option value="">Select token</option>';
    
    watchlist.forEach(symbol => {
        const option = document.createElement('option');
        option.value = symbol;
        option.textContent = symbol;
        dropdown.appendChild(option);
    });
}

function checkAlerts() {
    if (priceAlerts.length === 0) return;
    
    priceAlerts.forEach((alert, index) => {
        fetchTokenPrice(alert.token).then(data => {
            if (data) {
                const currentPrice = data.price;
                
                if (alert.condition === 'above' && currentPrice > alert.price) {
                    if (!alert.triggered) {
                        priceAlerts[index].triggered = true;
                        localStorage.setItem('priceAlerts', JSON.stringify(priceAlerts));
                        showNotification(`${alert.token} has risen above $${alert.price}`);
                        renderAlerts();
                    }
                } else if (alert.condition === 'below' && currentPrice < alert.price) {
                    if (!alert.triggered) {
                        priceAlerts[index].triggered = true;
                        localStorage.setItem('priceAlerts', JSON.stringify(priceAlerts));
                        showNotification(`${alert.token} has fallen below $${alert.price}`);
                        renderAlerts();
                    }
                }
            }
        });
    });
}

// Show browser notification
function showNotification(message) {
    if ('Notification' in window) {
        if (Notification.permission === 'granted') {
            new Notification('Crypto Alert', { body: message });
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    new Notification('Crypto Alert', { body: message });
                }
            });
        }
    }
    
    // Also show an alert for browsers without notification support
    alert(`Alert: ${message}`);
}

// API Functions

// Fetch crypto data from CoinGecko
async function fetchCryptoData(id) {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`);
        return response.data;
    } catch (error) {
        console.error('Error fetching crypto data:', error);
        return null;
    }
}

// Fetch global market data from CoinGecko
async function fetchGlobalData() {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/global');
        return response.data;
    } catch (error) {
        console.error('Error fetching global data:', error);
        return null;
    }
}

// Fetch token price from CoinGecko
async function fetchTokenPrice(symbol) {
    try {
        // This is a simplified approach - in a real app, you'd need to map symbols to CoinGecko IDs
        const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${symbol.toLowerCase()}&vs_currencies=usd&include_24hr_change=true`);
        const data = response.data[symbol.toLowerCase()];
        
        if (data) {
            return {
                price: data.usd,
                price_change_24h: data.usd_24h_change
            };
        }
        return null;
    } catch (error) {
        console.error('Error fetching token price:', error);
        return null;
    }
}

// Fetch Coinbase trending tokens (simulated with CoinGecko trending)
async function fetchCoinbaseTrending() {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=volume_desc&per_page=5&page=1&sparkline=false');
        return response.data;
    } catch (error) {
        console.error('Error fetching Coinbase trending:', error);
        return simulateCoinbaseTrending();
    }
}

// Fetch DEX trending tokens (simulated)
async function fetchDexTrending() {
    // In a real implementation, this would call a DEX API
    return simulateDexTrending();
}

// Fetch new listings (simulated)
async function fetchNewListings() {
    // In a real implementation, this would call an API for new listings
    return simulateNewListings();
}

// Fetch new pairs (simulated)
async function fetchNewPairs() {
    // In a real implementation, this would call a DEX API
    return simulateNewPairs();
}

// Fetch volume trending (simulated)
async function fetchVolumeTrending() {
    // In a real implementation, this would call a DEX API
    return simulateVolumeTrending();
}

// Fetch influencer mentions (simulated)
async function fetchInfluencerMentions() {
    // In a real implementation, this would call a social API
    return simulateInfluencerMentions();
}

// Fetch sentiment data (simulated)
async function fetchSentimentData() {
    // In a real implementation, this would call a sentiment API
    return simulateSentimentData();
}

// Utility Functions

// Format large numbers (e.g., 1.23B, 456M)
function formatLargeNumber(num) {
    if (num >= 1e12) {
        return (num / 1e12).toFixed(2) + 'T';
    }
    if (num >= 1e9) {
        return (num / 1e9).toFixed(2) + 'B';
    }
    if (num >= 1e6) {
        return (num / 1e6).toFixed(2) + 'M';
    }
    if (num >= 1e3) {
        return (num / 1e3).toFixed(2) + 'K';
    }
    return num.toFixed(2);
}

// Simulation Functions (for demo purposes)

// Simulate Coinbase trending tokens
function simulateCoinbaseTrending() {
    return [
        {
            name: 'Solana',
            symbol: 'sol',
            image: 'https://assets.coingecko.com/coins/images/4128/small/solana.png',
            current_price: 143.25,
            price_change_24h: 5.67
        },
        {
            name: 'Cardano',
            symbol: 'ada',
            image: 'https://assets.coingecko.com/coins/images/975/small/cardano.png',
            current_price: 0.45,
            price_change_24h: -2.34
        },
        {
            name: 'Polkadot',
            symbol: 'dot',
            image: 'https://assets.coingecko.com/coins/images/12171/small/polkadot.png',
            current_price: 6.78,
            price_change_24h: 1.23
        },
        {
            name: 'Chainlink',
            symbol: 'link',
            image: 'https://assets.coingecko.com/coins/images/877/small/chainlink.png',
            current_price: 13.42,
            price_change_24h: 3.45
        },
        {
            name: 'Uniswap',
            symbol: 'uni',
            image: 'https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png',
            current_price: 7.89,
            price_change_24h: -1.23
        }
    ];
}

// Simulate DEX trending tokens
function simulateDexTrending() {
    return [
        {
            name: 'PulseChain',
            symbol: 'PLS',
            price: 0.00012,
            price_change_24h: 15.67
        },
        {
            name: 'Pepe',
            symbol: 'PEPE',
            price: 0.000008,
            price_change_24h: 7.89
        },
        {
            name: 'Floki Inu',
            symbol: 'FLOKI',
            price: 0.0002,
            price_change_24h: -5.43
        },
        {
            name: 'Injective',
            symbol: 'INJ',
            price: 32.45,
            price_change_24h: 12.34
        },
        {
            name: 'Render',
            symbol: 'RNDR',
            price: 7.65,
            price_change_24h: -2.34
        }
    ];
}

// Simulate new listings
function simulateNewListings() {
    return [
        {
            name: 'Jupiter',
            symbol: 'JUP',
            image: 'https://assets.coingecko.com/coins/images/32362/small/jup.png',
            price: 0.85
        },
        {
            name: 'Bonk',
            symbol: 'BONK',
            image: 'https://assets.coingecko.com/coins/images/28600/small/bonk.jpg',
            price: 0.00002
        },
        {
            name: 'Sei',
            symbol: 'SEI',
            image: 'https://assets.coingecko.com/coins/images/28205/small/Sei_Logo_-_Transparent.png',
            price: 0.65
        }
    ];
}

// Simulate new pairs
function simulateNewPairs() {
    return [
        {
            token0: 'ETH',
            token1: 'PEPE',
            price: 0.000007,
            liquidity: 2500000,
            url: 'https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x6982508145454ce325ddbe47a25d4ec3d2311933'
        },
        {
            token0: 'WBTC',
            token1: 'ARB',
            price: 1.23,
            liquidity: 1800000,
            url: 'https://app.uniswap.org/#/swap?inputCurrency=0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599&outputCurrency=0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1'
        },
        {
            token0: 'USDC',
            token1: 'SHIB',
            price: 0.00002,
            liquidity: 950000,
            url: 'https://app.uniswap.org/#/swap?inputCurrency=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48&outputCurrency=0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE'
        }
    ];
}

// Simulate volume trending
function simulateVolumeTrending() {
    return [
        {
            token0: 'ETH',
            token1: 'USDC',
            price: 3450.75,
            volume_24h: 125000000,
            url: 'https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
        },
        {
            token0: 'WBTC',
            token1: 'USDT',
            price: 65432.10,
            volume_24h: 98000000,
            url: 'https://app.uniswap.org/#/swap?inputCurrency=0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599&outputCurrency=0xdAC17F958D2ee523a2206206994597C13D831ec7'
        },
        {
            token0: 'SOL',
            token1: 'USDC',
            price: 143.25,
            volume_24h: 45000000,
            url: 'https://raydium.io/swap/?inputCurrency=SOL&outputCurrency=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
        }
    ];
}

// Simulate influencer mentions
function simulateInfluencerMentions() {
    return [
        {
            influencer: '@CryptoWhale',
            token: 'SOL',
            time_ago: '2 hours ago',
            tweet_url: 'https://twitter.com'
        },
        {
            influencer: '@Cryptobirb',
            token: 'JUP',
            time_ago: '5 hours ago',
            tweet_url: 'https://twitter.com'
        },
        {
            influencer: '@CryptoCapo_',
            token: 'ETH',
            time_ago: '1 day ago',
            tweet_url: 'https://twitter.com'
        }
    ];
}

// Simulate sentiment data
function simulateSentimentData() {
    return [
        {
            token: 'BTC',
            sentiment_score: 75
        },
        {
            token: 'ETH',
            sentiment_score: 82
        },
        {
            token: 'SOL',
            sentiment_score: 88
        },
        {
            token: 'XRP',
            sentiment_score: 45
        },
        {
            token: 'DOGE',
            sentiment_score: 62
        }
    ];
}
