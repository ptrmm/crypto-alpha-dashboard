// DEX and Coinbase Tracking Module for Crypto Dashboard

// DEX Tracking Class
class DexTracker {
    constructor() {
        // Initialize supported DEXs
        this.supportedDexs = [
            { name: 'Uniswap', chain: 'Ethereum', url: 'https://app.uniswap.org/' },
            { name: 'SushiSwap', chain: 'Ethereum/Multi', url: 'https://app.sushi.com/swap' },
            { name: 'PancakeSwap', chain: 'BSC', url: 'https://pancakeswap.finance/' },
            { name: 'QuickSwap', chain: 'Polygon', url: 'https://quickswap.exchange/' },
            { name: 'TraderJoe', chain: 'Avalanche', url: 'https://traderjoexyz.com/' },
            { name: 'Raydium', chain: 'Solana', url: 'https://raydium.io/swap/' },
            { name: 'Orca', chain: 'Solana', url: 'https://www.orca.so/' },
            { name: 'Curve', chain: 'Ethereum/Multi', url: 'https://curve.fi/' },
            { name: 'dYdX', chain: 'Ethereum', url: 'https://dydx.exchange/' },
            { name: 'GMX', chain: 'Arbitrum/Avalanche', url: 'https://app.gmx.io/' }
        ];
    }

    // Get new pairs with significant liquidity
    getNewPairs() {
        // In a real implementation, this would call DEX APIs
        // For now, we'll use simulated data
        return [
            {
                dex: 'Uniswap',
                chain: 'Ethereum',
                token0: 'ETH',
                token1: 'PEPE',
                price: 0.000007,
                liquidity: 2500000,
                volume_24h: 1200000,
                created: '2 hours ago',
                url: 'https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x6982508145454ce325ddbe47a25d4ec3d2311933'
            },
            {
                dex: 'PancakeSwap',
                chain: 'BSC',
                token0: 'BNB',
                token1: 'FLOKI',
                price: 0.00003,
                liquidity: 1800000,
                volume_24h: 950000,
                created: '5 hours ago',
                url: 'https://pancakeswap.finance/swap?inputCurrency=BNB&outputCurrency=0xfb5b838b6cfeedc2873ab27866079ac55363d37e'
            },
            {
                dex: 'QuickSwap',
                chain: 'Polygon',
                token0: 'MATIC',
                token1: 'QUICK',
                price: 45.23,
                liquidity: 950000,
                volume_24h: 450000,
                created: '12 hours ago',
                url: 'https://quickswap.exchange/#/swap?inputCurrency=MATIC&outputCurrency=0x831753DD7087CaC61aB5644b308642cc1c33Dc13'
            },
            {
                dex: 'TraderJoe',
                chain: 'Avalanche',
                token0: 'AVAX',
                token1: 'JOE',
                price: 0.45,
                liquidity: 750000,
                volume_24h: 320000,
                created: '1 day ago',
                url: 'https://traderjoexyz.com/trade?inputCurrency=AVAX&outputCurrency=0x6e84a6216ea6dacc71ee8e6b0a5b7322eebc0fdd'
            },
            {
                dex: 'Raydium',
                chain: 'Solana',
                token0: 'SOL',
                token1: 'JUP',
                price: 0.85,
                liquidity: 1200000,
                volume_24h: 850000,
                created: '8 hours ago',
                url: 'https://raydium.io/swap/?inputCurrency=SOL&outputCurrency=JUP'
            }
        ];
    }

    // Get trending pairs by volume
    getTrendingByVolume() {
        // In a real implementation, this would call DEX APIs
        // For now, we'll use simulated data
        return [
            {
                dex: 'Uniswap',
                chain: 'Ethereum',
                token0: 'ETH',
                token1: 'USDC',
                price: 3450.75,
                liquidity: 125000000,
                volume_24h: 85000000,
                change_24h: 12.5,
                url: 'https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
            },
            {
                dex: 'Uniswap',
                chain: 'Ethereum',
                token0: 'WBTC',
                token1: 'USDT',
                price: 65432.10,
                liquidity: 98000000,
                volume_24h: 65000000,
                change_24h: 8.2,
                url: 'https://app.uniswap.org/#/swap?inputCurrency=0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599&outputCurrency=0xdAC17F958D2ee523a2206206994597C13D831ec7'
            },
            {
                dex: 'PancakeSwap',
                chain: 'BSC',
                token0: 'CAKE',
                token1: 'BUSD',
                price: 2.45,
                liquidity: 45000000,
                volume_24h: 28000000,
                change_24h: -3.5,
                url: 'https://pancakeswap.finance/swap?inputCurrency=0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82&outputCurrency=0xe9e7cea3dedca5984780bafc599bd69add087d56'
            },
            {
                dex: 'Raydium',
                chain: 'Solana',
                token0: 'SOL',
                token1: 'USDC',
                price: 143.25,
                liquidity: 65000000,
                volume_24h: 42000000,
                change_24h: 15.8,
                url: 'https://raydium.io/swap/?inputCurrency=SOL&outputCurrency=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
            },
            {
                dex: 'QuickSwap',
                chain: 'Polygon',
                token0: 'MATIC',
                token1: 'USDC',
                price: 0.65,
                liquidity: 35000000,
                volume_24h: 18000000,
                change_24h: 5.2,
                url: 'https://quickswap.exchange/#/swap?inputCurrency=MATIC&outputCurrency=0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
            }
        ];
    }

    // Get liquidity changes (significant additions/removals)
    getLiquidityChanges() {
        // In a real implementation, this would call DEX APIs
        // For now, we'll use simulated data
        return [
            {
                dex: 'Uniswap',
                chain: 'Ethereum',
                token0: 'ETH',
                token1: 'ARB',
                liquidity_before: 8500000,
                liquidity_after: 12800000,
                change_percent: 50.6,
                time: '3 hours ago',
                url: 'https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1'
            },
            {
                dex: 'SushiSwap',
                chain: 'Ethereum',
                token0: 'ETH',
                token1: 'SUSHI',
                liquidity_before: 5200000,
                liquidity_after: 3800000,
                change_percent: -26.9,
                time: '5 hours ago',
                url: 'https://app.sushi.com/swap?inputCurrency=ETH&outputCurrency=0x6B3595068778DD592e39A122f4f5a5cF09C90fE2'
            },
            {
                dex: 'TraderJoe',
                chain: 'Avalanche',
                token0: 'AVAX',
                token1: 'JOE',
                liquidity_before: 2800000,
                liquidity_after: 4500000,
                change_percent: 60.7,
                time: '12 hours ago',
                url: 'https://traderjoexyz.com/trade?inputCurrency=AVAX&outputCurrency=0x6e84a6216ea6dacc71ee8e6b0a5b7322eebc0fdd'
            }
        ];
    }

    // Get DEX volume by chain
    getDexVolumeByChain() {
        return [
            { chain: 'Ethereum', volume_24h: 2500000000, change_24h: 8.5 },
            { chain: 'BSC', volume_24h: 950000000, change_24h: -3.2 },
            { chain: 'Solana', volume_24h: 750000000, change_24h: 15.8 },
            { chain: 'Polygon', volume_24h: 450000000, change_24h: 5.2 },
            { chain: 'Avalanche', volume_24h: 350000000, change_24h: 7.5 }
        ];
    }

    // Render new pairs
    renderNewPairs(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const pairs = this.getNewPairs();
        container.innerHTML = '';

        if (!pairs || pairs.length === 0) {
            container.innerHTML = '<div class="loading-placeholder">No new pairs available</div>';
            return;
        }

        pairs.forEach(pair => {
            const pairCard = document.createElement('div');
            pairCard.className = 'dex-pair-card';

            pairCard.innerHTML = `
                <div class="token-info">
                    <div>
                        <div class="token-name">${pair.token0}/${pair.token1} <span class="dex-badge">${pair.dex}</span></div>
                        <div class="token-price">$${pair.price.toLocaleString()} • Created ${pair.created}</div>
                    </div>
                </div>
                <div>
                    <div>Liquidity: $${this.formatLargeNumber(pair.liquidity)}</div>
                    <a href="${pair.url}" target="_blank" class="btn btn-sm btn-outline-primary mt-1">Trade</a>
                </div>
            `;

            container.appendChild(pairCard);
        });
    }

    // Render trending by volume
    renderTrendingByVolume(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const pairs = this.getTrendingByVolume();
        container.innerHTML = '';

        if (!pairs || pairs.length === 0) {
            container.innerHTML = '<div class="loading-placeholder">No volume data available</div>';
            return;
        }

        pairs.forEach(pair => {
            const pairCard = document.createElement('div');
            pairCard.className = 'dex-pair-card';

            const changeClass = pair.change_24h >= 0 ? 'positive' : 'negative';

            pairCard.innerHTML = `
                <div class="token-info">
                    <div>
                        <div class="token-name">${pair.token0}/${pair.token1} <span class="dex-badge">${pair.dex}</span></div>
                        <div class="token-price">$${pair.price.toLocaleString()}</div>
                    </div>
                </div>
                <div>
                    <div>Vol: $${this.formatLargeNumber(pair.volume_24h)} <span class="${changeClass}">${pair.change_24h >= 0 ? '+' : ''}${pair.change_24h}%</span></div>
                    <a href="${pair.url}" target="_blank" class="btn btn-sm btn-outline-primary mt-1">Trade</a>
                </div>
            `;

            container.appendChild(pairCard);
        });
    }

    // Render liquidity changes
    renderLiquidityChanges(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const changes = this.getLiquidityChanges();
        container.innerHTML = '';

        if (!changes || changes.length === 0) {
            container.innerHTML = '<div class="loading-placeholder">No liquidity changes available</div>';
            return;
        }

        changes.forEach(change => {
            const changeCard = document.createElement('div');
            changeCard.className = 'dex-pair-card';

            const changeClass = change.change_percent >= 0 ? 'positive' : 'negative';
            const changeIcon = change.change_percent >= 0 ? '↑' : '↓';

            changeCard.innerHTML = `
                <div class="token-info">
                    <div>
                        <div class="token-name">${change.token0}/${change.token1} <span class="dex-badge">${change.dex}</span></div>
                        <div class="token-price">${change.time}</div>
                    </div>
                </div>
                <div>
                    <div class="${changeClass}">${changeIcon} ${Math.abs(change.change_percent).toFixed(1)}%</div>
                    <div>$${this.formatLargeNumber(change.liquidity_after)}</div>
                </div>
            `;

            container.appendChild(changeCard);
        });
    }

    // Format large numbers (e.g., 1.23B, 456M)
    formatLargeNumber(num) {
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

    // Add DEX badges style
    addDexStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .dex-badge {
                display: inline-block;
                font-size: 0.7em;
                padding: 2px 6px;
                border-radius: 4px;
                background-color: rgba(56, 97, 251, 0.1);
                color: #3861FB;
                margin-left: 6px;
                vertical-align: middle;
            }
            
            .dark-mode .dex-badge {
                background-color: rgba(56, 97, 251, 0.2);
            }
        `;
        document.head.appendChild(style);
    }
}

// Coinbase Tracking Class
class CoinbaseTracker {
    constructor() {
        // Initialize with sample data
        this.initializeSampleData();
    }

    // Initialize sample data
    initializeSampleData() {
        // Recently listed tokens on Coinbase
        this.recentListings = [
            {
                name: 'Jupiter',
                symbol: 'JUP',
                image: 'https://assets.coingecko.com/coins/images/32362/small/jup.png',
                price: 0.85,
                price_change_24h: 12.5,
                market_cap: 850000000,
                volume_24h: 125000000,
                listed_date: '2 days ago'
            },
            {
                name: 'Bonk',
                symbol: 'BONK',
                image: 'https://assets.coingecko.com/coins/images/28600/small/bonk.jpg',
                price: 0.00002,
                price_change_24h: 8.3,
                market_cap: 650000000,
                volume_24h: 85000000,
                listed_date: '5 days ago'
            },
            {
                name: 'Sei',
                symbol: 'SEI',
                image: 'https://assets.coingecko.com/coins/images/28205/small/Sei_Logo_-_Transparent.png',
                price: 0.65,
                price_change_24h: -3.2,
                market_cap: 1250000000,
                volume_24h: 95000000,
                listed_date: '1 week ago'
            }
        ];

        // Trending tokens on Coinbase
        this.trendingTokens = [
            {
                name: 'Solana',
                symbol: 'SOL',
                image: 'https://assets.coingecko.com/coins/images/4128/small/solana.png',
                price: 143.25,
                price_change_24h: 15.8,
                market_cap: 62500000000,
                volume_24h: 3250000000,
                rank: 1
            },
            {
                name: 'Cardano',
                symbol: 'ADA',
                image: 'https://assets.coingecko.com/coins/images/975/small/cardano.png',
                price: 0.45,
                price_change_24h: -2.3,
                market_cap: 15800000000,
                volume_24h: 850000000,
                rank: 2
            },
            {
                name: 'Polkadot',
                symbol: 'DOT',
                image: 'https://assets.coingecko.com/coins/images/12171/small/polkadot.png',
                price: 6.78,
                price_change_24h: 5.6,
                market_cap: 8500000000,
                volume_24h: 450000000,
                rank: 3
            },
            {
                name: 'Chainlink',
                symbol: 'LINK',
                image: 'https://assets.coingecko.com/coins/images/877/small/chainlink.png',
                price: 13.42,
                price_change_24h: 8.9,
                market_cap: 7800000000,
                volume_24h: 650000000,
                rank: 4
            },
            {
                name: 'Uniswap',
                symbol: 'UNI',
                image: 'https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png',
                price: 7.89,
                price_change_24h: -1.2,
                market_cap: 5900000000,
                volume_24h: 320000000,
                rank: 5
            }
        ];

        // Tokens with unusual volume
        this.unusualVolumeTokens = [
            {
                name: 'Render',
                symbol: 'RNDR',
                image: 'https://assets.coingecko.com/coins/images/11636/small/rndr.png',
                price: 7.65,
                price_change_24h: 25.4,
                volume_change_24h: 312.5,
                market_cap: 2850000000,
                volume_24h: 950000000
            },
            {
                name: 'Injective',
                symbol: 'INJ',
                image: 'https://assets.coingecko.com/coins/images/12882/small/Secondary_Symbol.png',
                price: 32.45,
                price_change_24h: 18.7,
                volume_change_24h: 245.8,
                market_cap: 3250000000,
                volume_24h: 850000000
            },
            {
                name: 'Fetch.ai',
                symbol: 'FET',
                image: 'https://assets.coingecko.com/coins/images/5681/small/Fetch.jpg',
                price: 2.35,
                price_change_24h: 15.3,
                volume_change_24h: 187.2,
                market_cap: 1950000000,
                volume_24h: 650000000
            }
        ];

        // Tokens being explored for addition
        this.exploredTokens = [
            {
                name: 'Aptos',
                symbol: 'APT',
                image: 'https://assets.coingecko.com/coins/images/26455/small/aptos_round.png',
                current_price: 8.75,
                market_cap: 2500000000,
                status: 'Under review'
            },
            {
                name: 'Sui',
                symbol: 'SUI',
                image: 'https://assets.coingecko.com/coins/images/26375/small/sui_asset.jpeg',
                current_price: 1.25,
                market_cap: 1350000000,
                status: 'Under review'
            },
            {
                name: 'Starknet',
                symbol: 'STRK',
                image: 'https://assets.coingecko.com/coins/images/33280/small/strk-token-logo.png',
                current_price: 1.85,
                market_cap: 950000000,
                status: 'Technical integration'
            }
        ];
    }

    // Get recent listings
    getRecentListings() {
        return this.recentListings;
    }

    // Get trending tokens
    getTrendingTokens() {
        return this.trendingTokens;
    }

    // Get tokens with unusual volume
    getUnusualVolumeTokens() {
        return this.unusualVolumeTokens;
    }

    // Get tokens being explored for addition
    getExploredTokens() {
        return this.exploredTokens;
    }

    // Render recent listings
    renderRecentListings(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const listings = this.getRecentListings();
        container.innerHTML = '';

        if (!listings || listings.length === 0) {
            container.innerHTML = '<div class="loading-placeholder">No recent listings available</div>';
            return;
        }

        listings.forEach(token => {
            const tokenCard = document.createElement('div');
            tokenCard.className = 'token-card';

            const changeClass = token.price_change_24h >= 0 ? 'positive' : 'negative';

            tokenCard.innerHTML = `
                <div class="token-info">
                    <img src="${token.image}" alt="${token.name}" class="token-icon">
                    <div>
                        <div class="token-name">${token.name} (${token.symbol})</div>
                        <div class="token-price">$${token.price.toLocaleString()} • Listed ${token.listed_date}</div>
                    </div>
                </div>
                <div class="token-change ${changeClass}">${token.price_change_24h >= 0 ? '+' : ''}${token.price_change_24h.toFixed(2)}%</div>
            `;

            container.appendChild(tokenCard);
        });
    }

    // Render trending tokens
    renderTrendingTokens(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const tokens = this.getTrendingTokens();
        container.innerHTML = '';

        if (!tokens || tokens.length === 0) {
            container.innerHTML = '<div class="loading-placeholder">No trending data available</div>';
            return;
        }

        tokens.forEach(token => {
            const tokenCard = document.createElement('div');
            tokenCard.className = 'token-card';

            const changeClass = token.price_change_24h >= 0 ? 'positive' : 'negative';

            tokenCard.innerHTML = `
                <div class="token-info">
                    <img src="${token.image}" alt="${token.name}" class="token-icon">
                    <div>
                        <div class="token-name">${token.name} (${token.symbol})</div>
                        <div class="token-price">$${token.price.toLocaleString()}</div>
                    </div>
                </div>
                <div>
                    <div class="token-change ${changeClass}">${token.price_change_24h >= 0 ? '+' : ''}${token.price_change_24h.toFixed(2)}%</div>
                    <div class="token-rank">Rank #${token.rank}</div>
                </div>
            `;

            container.appendChild(tokenCard);
        });
    }

    // Render unusual volume tokens
    renderUnusualVolumeTokens(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const tokens = this.getUnusualVolumeTokens();
        container.innerHTML = '';

        if (!tokens || tokens.length === 0) {
            container.innerHTML = '<div class="loading-placeholder">No unusual volume data available</div>';
            return;
        }

        tokens.forEach(token => {
            const tokenCard = document.createElement('div');
            tokenCard.className = 'token-card';

            const priceChangeClass = token.price_change_24h >= 0 ? 'positive' : 'negative';

            tokenCard.innerHTML = `
                <div class="token-info">
                    <img src="${token.image}" alt="${token.name}" class="token-icon">
                    <div>
                        <div class="token-name">${token.name} (${token.symbol})</div>
                        <div class="token-price">$${token.price.toLocaleString()}</div>
                    </div>
                </div>
                <div>
                    <div class="token-change ${priceChangeClass}">${token.price_change_24h >= 0 ? '+' : ''}${token.price_change_24h.toFixed(2)}%</div>
                    <div class="volume-change positive">Vol +${token.volume_change_24h.toFixed(2)}%</div>
                </div>
            `;

            container.appendChild(tokenCard);
        });
    }

    // Render explored tokens
    renderExploredTokens(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const tokens = this.getExploredTokens();
        container.innerHTML = '';

        if (!tokens || tokens.length === 0) {
            container.innerHTML = '<div class="loading-placeholder">No explored tokens available</div>';
            return;
        }

        tokens.forEach(token => {
            const tokenCard = document.createElement('div');
            tokenCard.className = 'token-card';

            tokenCard.innerHTML = `
                <div class="token-info">
                    <img src="${token.image}" alt="${token.name}" class="token-icon">
                    <div>
                        <div class="token-name">${token.name} (${token.symbol})</div>
                        <div class="token-price">$${token.current_price.toLocaleString()}</div>
                    </div>
                </div>
                <div class="status-badge">${token.status}</div>
            `;

            container.appendChild(tokenCard);
        });
    }

    // Add Coinbase styles
    addCoinbaseStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .token-rank {
                font-size: 0.8em;
                color: #8899A6;
                text-align: right;
            }
            
            .volume-change {
                font-size: 0.85em;
                font-weight: 500;
                text-align: right;
            }
            
            .status-badge {
                display: inline-block;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 0.85em;
                font-weight: 500;
                background-color: rgba(255, 214, 0, 0.1);
                color: #FFD600;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize DEX and Coinbase tracking
function initializeDexAndCoinbaseTracking() {
    // Create instances of our tracking classes
    window.dexTracker = new DexTracker();
    window.coinbaseTracker = new CoinbaseTracker();
    
    // Add custom styles
    dexTracker.addDexStyles();
    coinbaseTracker.addCoinbaseStyles();
    
    // Render DEX data
    dexTracker.renderNewPairs('new-pairs');
    dexTracker.renderTrendingByVolume('volume-trending');
    
    // Render Coinbase data
    coinbaseTracker.renderTrendingTokens('coinbase-trending');
    coinbaseTracker.renderRecentListings('new-listings');
    
    // Create additional containers for unusual volume and explored tokens
    createAdditionalContainers();
    
    // Render additional data
    coinbaseTracker.renderUnusualVolumeTokens('unusual-volume');
    coinbaseTracker.renderExploredTokens('explored-tokens');
    dexTracker.renderLiquidityChanges('liquidity-changes');
}

// Create additional containers for more data
function createAdditionalContainers() {
    // Create container for unusual volume tokens
    const unusualVolumeContainer = document.createElement('div');
    unusualVolumeContainer.className = 'unusual-volume mt-3';
    unusualVolumeContainer.innerHTML = `
        <h3>Unusual Volume</h3>
        <div id="unusual-volume" class="token-list"></div>
    `;
    
    // Create container for tokens being explored for addition
    const exploredTokensContainer = document.createElement('div');
    exploredTokensContainer.className = 'explored-tokens mt-3';
    exploredTokensContainer.innerHTML = `
        <h3>Potential Coinbase Listings</h3>
        <div id="explored-tokens" class="token-list"></div>
    `;
    
    // Create container for liquidity changes
    const liquidityChangesContainer = document.createElement('div');
    liquidityChangesContainer.className = 'liquidity-changes mt-3';
    liquidityChangesContainer.innerHTML = `
        <h3>Significant Liquidity Changes</h3>
        <div id="liquidity-changes" class="dex-list"></div>
    `;
    
    // Add containers to the appropriate sections
    const trendingTokensSection = document.querySelector('.trending-tokens');
    if (trendingTokensSection) {
        trendingTokensSection.appendChild(unusualVolumeContainer);
        trendingTokensSection.appendChild(exploredTokensContainer);
    }
    
    const dexOpportunitiesSection = document.querySelector('.dex-opportunities');
    if (dexOpportunitiesSection) {
        dexOpportunitiesSection.appendChild(liquidityChangesContainer);
    }
}

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize DEX and Coinbase tracking after a short delay to ensure other components are loaded
    setTimeout(initializeDexAndCoinbaseTracking, 1500);
});
