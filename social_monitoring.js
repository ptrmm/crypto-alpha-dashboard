// Social Media Monitoring Module for Crypto Dashboard

// Twitter API alternatives and workarounds
class TwitterMonitor {
    constructor() {
        this.influencers = [
            {name: 'CryptoWhale', handle: '@CryptoWhale', followers: '350K+'},
            {name: 'Cryptobirb', handle: '@Cryptobirb', followers: '280K+'},
            {name: 'CryptoCapo', handle: '@CryptoCapo_', followers: '500K+'},
            {name: 'Pentoshi', handle: '@Pentosh1', followers: '620K+'},
            {name: 'Cred', handle: '@CryptoCred', followers: '310K+'},
            {name: 'DonAlt', handle: '@CryptoDonAlt', followers: '450K+'},
            {name: 'Koroush AK', handle: '@KoroushAK', followers: '380K+'},
            {name: 'Willy Woo', handle: '@woonomic', followers: '1M+'},
            {name: 'PlanB', handle: '@100trillionUSD', followers: '1.8M+'},
            {name: 'Michaël van de Poppe', handle: '@CryptoMichNL', followers: '670K+'}
        ];
        
        this.trendingHashtags = [
            '#Bitcoin', '#Ethereum', '#Crypto', '#Altseason', 
            '#DeFi', '#NFTs', '#Web3', '#Metaverse', 
            '#Solana', '#Cardano', '#BNB', '#XRP'
        ];
    }
    
    // Initialize Twitter timeline widget
    initializeTimeline(containerId, darkMode) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        // Create Twitter timeline widget
        const timeline = document.createElement('a');
        timeline.className = 'twitter-timeline';
        timeline.href = 'https://twitter.com/i/lists/1494865545299177478'; // Public crypto influencers list
        timeline.setAttribute('data-height', '300');
        timeline.setAttribute('data-theme', darkMode ? 'dark' : 'light');
        timeline.setAttribute('data-chrome', 'noheader nofooter noborders transparent');
        timeline.textContent = 'Crypto Influencers';
        
        container.innerHTML = '';
        container.appendChild(timeline);
        
        // Load Twitter widget script
        if (window.twttr && window.twttr.widgets) {
            window.twttr.widgets.load();
        } else {
            // If Twitter widget script is not loaded yet
            const script = document.createElement('script');
            script.src = 'https://platform.twitter.com/widgets.js';
            script.async = true;
            document.body.appendChild(script);
        }
    }
    
    // Create a custom Twitter-like feed with simulated data
    createCustomFeed(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = '';
        
        // Generate simulated tweets
        const tweets = this.generateSimulatedTweets();
        
        tweets.forEach(tweet => {
            const tweetElement = document.createElement('div');
            tweetElement.className = 'custom-tweet';
            
            tweetElement.innerHTML = `
                <div class="tweet-header">
                    <div class="tweet-user">
                        <span class="tweet-name">${tweet.user.name}</span>
                        <span class="tweet-handle">${tweet.user.handle}</span>
                    </div>
                    <div class="tweet-time">${tweet.time}</div>
                </div>
                <div class="tweet-content">${this.formatTweetContent(tweet.content)}</div>
                <div class="tweet-actions">
                    <span class="tweet-action"><i class="fa fa-heart"></i> ${tweet.likes}</span>
                    <span class="tweet-action"><i class="fa fa-retweet"></i> ${tweet.retweets}</span>
                </div>
            `;
            
            container.appendChild(tweetElement);
        });
    }
    
    // Format tweet content to highlight hashtags, mentions, and links
    formatTweetContent(content) {
        // Highlight hashtags
        content = content.replace(/#(\w+)/g, '<span class="tweet-hashtag">#$1</span>');
        
        // Highlight mentions
        content = content.replace(/@(\w+)/g, '<span class="tweet-mention">@$1</span>');
        
        // Convert links
        content = content.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" class="tweet-link">$1</a>');
        
        return content;
    }
    
    // Generate simulated tweets for demonstration
    generateSimulatedTweets() {
        const tweets = [
            {
                user: this.influencers[0],
                content: "Just spotted a massive accumulation pattern on $SOL. This could be the next leg up we've been waiting for. #Solana #Crypto",
                time: "10m ago",
                likes: 245,
                retweets: 87
            },
            {
                user: this.influencers[2],
                content: "The $JUP airdrop is live! Claim your tokens now. Jupiter has been one of the best DEXs on Solana. https://jup.io #Airdrop",
                time: "32m ago",
                likes: 1243,
                retweets: 412
            },
            {
                user: this.influencers[4],
                content: "Technical analysis suggests $ETH is forming a bull flag. Target: $4200 in the next 2 weeks. #Ethereum #TA",
                time: "1h ago",
                likes: 567,
                retweets: 189
            },
            {
                user: this.influencers[5],
                content: "Small caps are showing strength while $BTC consolidates. This is typically a good sign for #Altseason. Keep an eye on $INJ and $FET.",
                time: "2h ago",
                likes: 821,
                retweets: 276
            },
            {
                user: this.influencers[7],
                content: "On-chain metrics showing strong accumulation from whales. This divergence from retail sentiment is historically bullish. #Bitcoin",
                time: "3h ago",
                likes: 1532,
                retweets: 498
            },
            {
                user: this.influencers[8],
                content: "Stock-to-flow model remains on track. $BTC halving in 2024 should drive the next major bull cycle. Patience is key. #Bitcoin",
                time: "5h ago",
                likes: 3245,
                retweets: 1087
            },
            {
                user: this.influencers[3],
                content: "Just found a gem on @arbitrum - $MAGIC showing incredible strength and utility. Gaming tokens are heating up! #Arbitrum #Gaming",
                time: "6h ago",
                likes: 432,
                retweets: 156
            }
        ];
        
        return tweets;
    }
    
    // Get trending hashtags
    getTrendingHashtags() {
        return this.trendingHashtags;
    }
    
    // Get influencer mentions of specific tokens
    getInfluencerMentions() {
        return [
            {
                influencer: this.influencers[0].handle,
                token: 'SOL',
                content: "Massive accumulation pattern on $SOL",
                time_ago: '10 minutes ago',
                sentiment: 'positive'
            },
            {
                influencer: this.influencers[2].handle,
                token: 'JUP',
                content: "The $JUP airdrop is live! Claim your tokens now",
                time_ago: '32 minutes ago',
                sentiment: 'positive'
            },
            {
                influencer: this.influencers[4].handle,
                token: 'ETH',
                content: "Technical analysis suggests $ETH is forming a bull flag",
                time_ago: '1 hour ago',
                sentiment: 'positive'
            },
            {
                influencer: this.influencers[5].handle,
                token: 'INJ',
                content: "Keep an eye on $INJ and $FET",
                time_ago: '2 hours ago',
                sentiment: 'neutral'
            },
            {
                influencer: this.influencers[5].handle,
                token: 'FET',
                content: "Keep an eye on $INJ and $FET",
                time_ago: '2 hours ago',
                sentiment: 'neutral'
            },
            {
                influencer: this.influencers[8].handle,
                token: 'BTC',
                content: "Stock-to-flow model remains on track. $BTC halving in 2024",
                time_ago: '5 hours ago',
                sentiment: 'positive'
            },
            {
                influencer: this.influencers[3].handle,
                token: 'MAGIC',
                content: "Just found a gem on @arbitrum - $MAGIC showing incredible strength",
                time_ago: '6 hours ago',
                sentiment: 'positive'
            }
        ];
    }
}

// Sentiment Analysis Module
class SentimentAnalyzer {
    constructor() {
        this.tokenSentiments = {};
        this.historicalSentiment = {};
        
        // Initialize with some sample data
        this.initializeSampleData();
    }
    
    // Initialize sample sentiment data
    initializeSampleData() {
        // Current sentiment scores (0-100)
        this.tokenSentiments = {
            'BTC': 78,
            'ETH': 82,
            'SOL': 88,
            'XRP': 45,
            'ADA': 62,
            'DOGE': 70,
            'SHIB': 65,
            'AVAX': 72,
            'DOT': 58,
            'LINK': 75,
            'MATIC': 80,
            'UNI': 63,
            'LTC': 50,
            'BCH': 48,
            'JUP': 92,
            'INJ': 85,
            'FET': 77,
            'MAGIC': 83
        };
        
        // Historical sentiment (last 7 days)
        const tokens = Object.keys(this.tokenSentiments);
        tokens.forEach(token => {
            this.historicalSentiment[token] = this.generateHistoricalSentiment(this.tokenSentiments[token]);
        });
    }
    
    // Generate historical sentiment data based on current sentiment
    generateHistoricalSentiment(currentSentiment) {
        const history = [];
        let prevValue = currentSentiment;
        
        // Generate 7 days of historical data
        for (let i = 0; i < 7; i++) {
            // Random variation between -8 and +8
            const variation = Math.floor(Math.random() * 16) - 8;
            let newValue = prevValue + variation;
            
            // Keep within bounds
            newValue = Math.max(0, Math.min(100, newValue));
            
            history.unshift(newValue); // Add to beginning
            prevValue = newValue;
        }
        
        return history;
    }
    
    // Get current sentiment for a specific token
    getTokenSentiment(token) {
        return this.tokenSentiments[token] || 50; // Default to neutral if not found
    }
    
    // Get current sentiment for multiple tokens
    getMultipleTokenSentiments(tokens) {
        const result = [];
        
        tokens.forEach(token => {
            if (this.tokenSentiments[token]) {
                result.push({
                    token: token,
                    sentiment_score: this.tokenSentiments[token]
                });
            }
        });
        
        return result;
    }
    
    // Get all token sentiments
    getAllTokenSentiments() {
        const result = [];
        
        Object.keys(this.tokenSentiments).forEach(token => {
            result.push({
                token: token,
                sentiment_score: this.tokenSentiments[token]
            });
        });
        
        // Sort by sentiment score (descending)
        result.sort((a, b) => b.sentiment_score - a.sentiment_score);
        
        return result;
    }
    
    // Get top tokens by sentiment
    getTopTokensBySentiment(limit = 5) {
        const allSentiments = this.getAllTokenSentiments();
        return allSentiments.slice(0, limit);
    }
    
    // Get historical sentiment for a token
    getHistoricalSentiment(token) {
        return this.historicalSentiment[token] || Array(7).fill(50); // Default if not found
    }
    
    // Get sentiment category (positive, neutral, negative)
    getSentimentCategory(score) {
        if (score >= 70) return 'positive';
        if (score >= 40) return 'neutral';
        return 'negative';
    }
    
    // Render sentiment chart
    renderSentimentChart(containerId, limit = 10) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = '<canvas id="sentiment-canvas"></canvas>';
        
        const topTokens = this.getTopTokensBySentiment(limit);
        
        const ctx = document.getElementById('sentiment-canvas');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: topTokens.map(item => item.token),
                datasets: [{
                    label: 'Sentiment Score',
                    data: topTokens.map(item => item.sentiment_score),
                    backgroundColor: topTokens.map(item => {
                        const score = item.sentiment_score;
                        if (score >= 70) return '#00C853'; // Positive
                        if (score >= 40) return '#FFD600'; // Neutral
                        return '#FF3D71'; // Negative
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
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const score = context.raw;
                                let sentiment = 'Neutral';
                                if (score >= 70) sentiment = 'Positive';
                                if (score < 40) sentiment = 'Negative';
                                return `Sentiment: ${score}/100 (${sentiment})`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                if (value === 0) return 'Bearish';
                                if (value === 50) return 'Neutral';
                                if (value === 100) return 'Bullish';
                                return '';
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Render historical sentiment chart for a specific token
    renderHistoricalSentimentChart(containerId, token) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = '<canvas id="historical-sentiment-canvas"></canvas>';
        
        const historicalData = this.getHistoricalSentiment(token);
        
        // Generate labels for the last 7 days
        const labels = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        }
        
        const ctx = document.getElementById('historical-sentiment-canvas');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: `${token} Sentiment`,
                    data: historicalData,
                    borderColor: '#3861FB',
                    backgroundColor: 'rgba(56, 97, 251, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const score = context.raw;
                                let sentiment = 'Neutral';
                                if (score >= 70) sentiment = 'Positive';
                                if (score < 40) sentiment = 'Negative';
                                return `Sentiment: ${score}/100 (${sentiment})`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        min: 0,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                if (value === 0) return 'Bearish';
                                if (value === 50) return 'Neutral';
                                if (value === 100) return 'Bullish';
                                return '';
                            }
                        }
                    }
                }
            }
        });
    }
}

// Social Media Monitoring Integration
function initializeSocialMonitoring() {
    // Create instances of our monitoring classes
    window.twitterMonitor = new TwitterMonitor();
    window.sentimentAnalyzer = new SentimentAnalyzer();
    
    // Initialize Twitter feed
    twitterMonitor.initializeTimeline('twitter-feed', document.body.classList.contains('dark-mode'));
    
    // Load influencer mentions
    loadInfluencerMentions();
    
    // Render sentiment chart
    sentimentAnalyzer.renderSentimentChart('sentiment-chart');
    
    // Add CSS for custom Twitter feed
    addCustomTwitterStyles();
}

// Load influencer mentions
function loadInfluencerMentions() {
    const mentions = window.twitterMonitor.getInfluencerMentions();
    renderInfluencerMentions(mentions);
}

// Render influencer mentions
function renderInfluencerMentions(mentions) {
    const container = document.getElementById('influencer-mentions');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (!mentions || mentions.length === 0) {
        container.innerHTML = '<div class="loading-placeholder">No influencer data available</div>';
        return;
    }
    
    mentions.forEach(mention => {
        const mentionCard = document.createElement('div');
        mentionCard.className = 'token-card';
        
        const sentimentClass = mention.sentiment === 'positive' ? 'positive' : 
                              mention.sentiment === 'negative' ? 'negative' : '';
        
        mentionCard.innerHTML = `
            <div class="token-info">
                <div>
                    <div class="token-name">${mention.token} mentioned by ${mention.influencer}</div>
                    <div class="token-price">"${mention.content}"</div>
                    <div class="token-time">${mention.time_ago}</div>
                </div>
            </div>
            <div class="token-sentiment ${sentimentClass}">
                ${mention.sentiment.charAt(0).toUpperCase() + mention.sentiment.slice(1)}
            </div>
        `;
        
        container.appendChild(mentionCard);
    });
}

// Add custom styles for Twitter feed
function addCustomTwitterStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .custom-tweet {
            padding: 12px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            margin-bottom: 8px;
        }
        
        .dark-mode .custom-tweet {
            border-bottom-color: rgba(255, 255, 255, 0.1);
        }
        
        .light-mode .custom-tweet {
            border-bottom-color: rgba(0, 0, 0, 0.1);
        }
        
        .tweet-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 6px;
        }
        
        .tweet-name {
            font-weight: 600;
        }
        
        .tweet-handle, .tweet-time {
            color: #8899A6;
            font-size: 0.85em;
        }
        
        .tweet-content {
            margin-bottom: 10px;
            line-height: 1.4;
        }
        
        .tweet-hashtag, .tweet-mention {
            color: #1DA1F2;
        }
        
        .tweet-link {
            color: #1DA1F2;
            text-decoration: none;
        }
        
        .tweet-actions {
            display: flex;
            gap: 16px;
        }
        
        .tweet-action {
            color: #8899A6;
            font-size: 0.85em;
        }
        
        .token-sentiment {
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.85em;
            font-weight: 500;
        }
        
        .token-sentiment.positive {
            background-color: rgba(0, 200, 83, 0.1);
            color: #00C853;
        }
        
        .token-sentiment.negative {
            background-color: rgba(255, 61, 113, 0.1);
            color: #FF3D71;
        }
        
        .token-sentiment.neutral {
            background-color: rgba(255, 214, 0, 0.1);
            color: #FFD600;
        }
        
        .token-time {
            font-size: 0.8em;
            color: #8899A6;
            margin-top: 2px;
        }
    `;
    
    document.head.appendChild(style);
}

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize social monitoring after a short delay to ensure other components are loaded
    setTimeout(initializeSocialMonitoring, 1000);
});
