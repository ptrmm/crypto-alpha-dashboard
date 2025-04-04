// Test and Optimization Script for Crypto Dashboard

// Test functions to verify dashboard functionality
function runDashboardTests() {
    console.log('Running dashboard tests...');
    
    // Test results container
    const testResults = {
        passed: 0,
        failed: 0,
        warnings: 0,
        details: []
    };
    
    // Test core functionality
    testCoreComponents(testResults);
    
    // Test API integrations
    testApiIntegrations(testResults);
    
    // Test UI components
    testUIComponents(testResults);
    
    // Test responsive behavior
    testResponsiveBehavior(testResults);
    
    // Test performance
    testPerformance(testResults);
    
    // Log test results
    console.log(`Tests completed: ${testResults.passed} passed, ${testResults.failed} failed, ${testResults.warnings} warnings`);
    console.log('Test details:', testResults.details);
    
    return testResults;
}

// Test core components
function testCoreComponents(results) {
    // Test localStorage functionality
    try {
        localStorage.setItem('test', 'test');
        localStorage.getItem('test');
        localStorage.removeItem('test');
        addTestResult(results, 'localStorage', true);
    } catch (error) {
        addTestResult(results, 'localStorage', false, error.message);
    }
    
    // Test Chart.js initialization
    if (typeof Chart !== 'undefined') {
        addTestResult(results, 'Chart.js', true);
    } else {
        addTestResult(results, 'Chart.js', false, 'Chart.js not loaded');
    }
    
    // Test theme toggle functionality
    const body = document.body;
    const initialClass = body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
    try {
        toggleTheme();
        const newClass = body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
        const themeToggleWorking = initialClass !== newClass;
        addTestResult(results, 'Theme Toggle', themeToggleWorking);
        // Restore original theme
        if (initialClass !== newClass) {
            toggleTheme();
        }
    } catch (error) {
        addTestResult(results, 'Theme Toggle', false, error.message);
    }
}

// Test API integrations
function testApiIntegrations(results) {
    // Test CoinGecko API
    fetch('https://api.coingecko.com/api/v3/ping')
        .then(response => {
            addTestResult(results, 'CoinGecko API', response.ok, response.ok ? null : 'API returned error status');
        })
        .catch(error => {
            addTestResult(results, 'CoinGecko API', false, error.message);
        });
    
    // Test Twitter widget
    if (document.querySelector('#twitter-feed iframe')) {
        addTestResult(results, 'Twitter Widget', true);
    } else {
        addTestResult(results, 'Twitter Widget', false, 'Twitter widget not loaded', 'warning');
    }
    
    // Check if our simulated data is available
    if (window.dexTracker && window.coinbaseTracker && window.twitterMonitor && window.sentimentAnalyzer) {
        addTestResult(results, 'Simulated Data', true);
    } else {
        addTestResult(results, 'Simulated Data', false, 'One or more data simulators not initialized');
    }
}

// Test UI components
function testUIComponents(results) {
    // Test market overview section
    const marketOverview = document.querySelector('.market-overview');
    if (marketOverview) {
        const btcPrice = document.getElementById('btc-price');
        const ethPrice = document.getElementById('eth-price');
        if (btcPrice && ethPrice) {
            addTestResult(results, 'Market Overview', true);
        } else {
            addTestResult(results, 'Market Overview', false, 'Price elements not found');
        }
    } else {
        addTestResult(results, 'Market Overview', false, 'Section not found');
    }
    
    // Test social insights section
    const socialInsights = document.querySelector('.social-insights');
    if (socialInsights) {
        const twitterFeed = document.getElementById('twitter-feed');
        const sentimentChart = document.getElementById('sentiment-chart');
        if (twitterFeed && sentimentChart) {
            addTestResult(results, 'Social Insights', true);
        } else {
            addTestResult(results, 'Social Insights', false, 'Required elements not found');
        }
    } else {
        addTestResult(results, 'Social Insights', false, 'Section not found');
    }
    
    // Test trending tokens section
    const trendingTokens = document.querySelector('.trending-tokens');
    if (trendingTokens) {
        const coinbaseTrending = document.getElementById('coinbase-trending');
        const dexTrending = document.getElementById('dex-trending');
        if (coinbaseTrending && dexTrending) {
            addTestResult(results, 'Trending Tokens', true);
        } else {
            addTestResult(results, 'Trending Tokens', false, 'Required elements not found');
        }
    } else {
        addTestResult(results, 'Trending Tokens', false, 'Section not found');
    }
    
    // Test DEX opportunities section
    const dexOpportunities = document.querySelector('.dex-opportunities');
    if (dexOpportunities) {
        const newPairs = document.getElementById('new-pairs');
        const volumeTrending = document.getElementById('volume-trending');
        if (newPairs && volumeTrending) {
            addTestResult(results, 'DEX Opportunities', true);
        } else {
            addTestResult(results, 'DEX Opportunities', false, 'Required elements not found');
        }
    } else {
        addTestResult(results, 'DEX Opportunities', false, 'Section not found');
    }
    
    // Test watchlist & alerts section
    const watchlistAlerts = document.querySelector('.watchlist-alerts');
    if (watchlistAlerts) {
        const userWatchlist = document.getElementById('user-watchlist');
        const priceAlerts = document.getElementById('price-alerts');
        if (userWatchlist && priceAlerts) {
            addTestResult(results, 'Watchlist & Alerts', true);
        } else {
            addTestResult(results, 'Watchlist & Alerts', false, 'Required elements not found');
        }
    } else {
        addTestResult(results, 'Watchlist & Alerts', false, 'Section not found');
    }
}

// Test responsive behavior
function testResponsiveBehavior(results) {
    const width = window.innerWidth;
    
    if (width < 768) {
        // Mobile view tests
        const dashboardGrid = document.querySelector('.dashboard-grid');
        if (dashboardGrid) {
            const gridStyle = window.getComputedStyle(dashboardGrid);
            if (gridStyle.gridTemplateColumns.includes('repeat(12, 1fr)')) {
                addTestResult(results, 'Mobile Responsiveness', true);
            } else {
                addTestResult(results, 'Mobile Responsiveness', false, 'Grid not properly adjusted for mobile');
            }
        } else {
            addTestResult(results, 'Mobile Responsiveness', false, 'Dashboard grid not found');
        }
    } else if (width < 1200) {
        // Tablet view tests
        const marketOverview = document.querySelector('.market-overview');
        const socialInsights = document.querySelector('.social-insights');
        
        if (marketOverview && socialInsights) {
            const marketStyle = window.getComputedStyle(marketOverview);
            const socialStyle = window.getComputedStyle(socialInsights);
            
            // Check if they're stacked or side by side based on grid-column property
            if (marketStyle.gridColumn && socialStyle.gridColumn) {
                addTestResult(results, 'Tablet Responsiveness', true);
            } else {
                addTestResult(results, 'Tablet Responsiveness', false, 'Grid layout not properly adjusted for tablet');
            }
        } else {
            addTestResult(results, 'Tablet Responsiveness', false, 'Required sections not found');
        }
    } else {
        // Desktop view tests
        const marketOverview = document.querySelector('.market-overview');
        const socialInsights = document.querySelector('.social-insights');
        
        if (marketOverview && socialInsights) {
            const marketStyle = window.getComputedStyle(marketOverview);
            const socialStyle = window.getComputedStyle(socialInsights);
            
            // Check if they're side by side based on grid-column property
            if (marketStyle.gridColumn && socialStyle.gridColumn && 
                marketStyle.gridColumn !== socialStyle.gridColumn) {
                addTestResult(results, 'Desktop Responsiveness', true);
            } else {
                addTestResult(results, 'Desktop Responsiveness', false, 'Grid layout not properly adjusted for desktop');
            }
        } else {
            addTestResult(results, 'Desktop Responsiveness', false, 'Required sections not found');
        }
    }
}

// Test performance
function testPerformance(results) {
    // Measure initial load time
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    if (loadTime < 3000) {
        addTestResult(results, 'Load Time', true, `${loadTime}ms`);
    } else {
        addTestResult(results, 'Load Time', false, `${loadTime}ms - exceeds 3000ms threshold`, 'warning');
    }
    
    // Check for memory leaks by monitoring heap size
    if (window.performance && window.performance.memory) {
        const heapSize = window.performance.memory.usedJSHeapSize;
        const heapLimit = window.performance.memory.jsHeapSizeLimit;
        const heapPercentage = (heapSize / heapLimit) * 100;
        
        if (heapPercentage < 70) {
            addTestResult(results, 'Memory Usage', true, `${heapPercentage.toFixed(2)}% of available heap`);
        } else {
            addTestResult(results, 'Memory Usage', false, `${heapPercentage.toFixed(2)}% of available heap - high memory usage`, 'warning');
        }
    } else {
        addTestResult(results, 'Memory Usage', true, 'Memory API not available', 'warning');
    }
    
    // Check for excessive DOM nodes
    const domNodes = document.querySelectorAll('*').length;
    if (domNodes < 1000) {
        addTestResult(results, 'DOM Size', true, `${domNodes} nodes`);
    } else {
        addTestResult(results, 'DOM Size', false, `${domNodes} nodes - exceeds 1000 nodes threshold`, 'warning');
    }
}

// Helper function to add test result
function addTestResult(results, testName, passed, message = null, level = 'error') {
    if (passed) {
        results.passed++;
    } else if (level === 'warning') {
        results.warnings++;
    } else {
        results.failed++;
    }
    
    results.details.push({
        test: testName,
        passed: passed,
        message: message,
        level: passed ? 'success' : level
    });
}

// Optimization functions

// Optimize images
function optimizeImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Add loading="lazy" attribute to images
        img.setAttribute('loading', 'lazy');
        
        // Ensure alt text for accessibility
        if (!img.alt) {
            img.alt = img.src.split('/').pop().split('.')[0] || 'Crypto icon';
        }
    });
}

// Optimize API calls
function optimizeApiCalls() {
    // Implement request caching
    const originalFetch = window.fetch;
    const cache = {};
    
    window.fetch = function(url, options) {
        // Only cache GET requests
        if (!options || options.method === undefined || options.method === 'GET') {
            // Create a cache key from the URL
            const cacheKey = url.toString();
            
            // Check if we have a cached response and it's less than 5 minutes old
            if (cache[cacheKey] && (Date.now() - cache[cacheKey].timestamp < 300000)) {
                console.log(`Using cached response for ${cacheKey}`);
                return Promise.resolve(cache[cacheKey].response.clone());
            }
            
            // Otherwise, make the request and cache the response
            return originalFetch(url, options).then(response => {
                if (response.ok) {
                    // Clone the response before caching it
                    cache[cacheKey] = {
                        response: response.clone(),
                        timestamp: Date.now()
                    };
                }
                return response;
            });
        }
        
        // For non-GET requests, just use the original fetch
        return originalFetch(url, options);
    };
}

// Optimize event listeners
function optimizeEventListeners() {
    // Use event delegation where possible
    const dashboardContainer = document.querySelector('.dashboard-container');
    if (dashboardContainer) {
        // Remove individual click listeners from token cards and use delegation
        const tokenCards = document.querySelectorAll('.token-card');
        tokenCards.forEach(card => {
            const clone = card.cloneNode(true);
            card.parentNode.replaceChild(clone, card);
        });
        
        // Add a single delegated event listener
        dashboardContainer.addEventListener('click', function(event) {
            // Handle token card clicks
            if (event.target.closest('.token-card')) {
                const card = event.target.closest('.token-card');
                // Handle card click
                console.log('Token card clicked:', card);
            }
            
            // Handle remove watchlist button clicks
            if (event.target.classList.contains('remove-watchlist')) {
                const symbol = event.target.getAttribute('data-symbol');
                if (symbol && typeof removeFromWatchlist === 'function') {
                    removeFromWatchlist(symbol);
                }
            }
            
            // Handle remove alert button clicks
            if (event.target.classList.contains('remove-alert')) {
                const index = parseInt(event.target.getAttribute('data-index'));
                if (!isNaN(index) && typeof removeAlert === 'function') {
                    removeAlert(index);
                }
            }
        });
    }
}

// Run all optimizations
function runOptimizations() {
    console.log('Running optimizations...');
    
    // Optimize images
    optimizeImages();
    
    // Optimize API calls
    optimizeApiCalls();
    
    // Optimize event listeners
    optimizeEventListeners();
    
    // Optimize CSS
    optimizeCss();
    
    // Optimize JavaScript
    optimizeJavaScript();
    
    console.log('Optimizations completed');
}

// Optimize CSS
function optimizeCss() {
    // Remove unused CSS classes
    const styleSheets = document.styleSheets;
    const usedClasses = new Set();
    
    // Collect all used classes
    const allElements = document.querySelectorAll('*');
    allElements.forEach(element => {
        if (element.classList) {
            element.classList.forEach(className => {
                usedClasses.add(className);
            });
        }
    });
    
    // Log unused classes for manual cleanup
    for (let i = 0; i < styleSheets.length; i++) {
        try {
            const rules = styleSheets[i].cssRules || styleSheets[i].rules;
            if (!rules) continue;
            
            for (let j = 0; j < rules.length; j++) {
                const rule = rules[j];
                if (rule.selectorText) {
                    const selectors = rule.selectorText.split(',');
                    selectors.forEach(selector => {
                        // Extract class names from selectors
                        const matches = selector.match(/\.([\w-]+)/g);
                        if (matches) {
                            matches.forEach(match => {
                                const className = match.substring(1);
                                if (!usedClasses.has(className)) {
                                    console.log(`Unused CSS class: ${className}`);
                                }
                            });
                        }
                    });
                }
            }
        } catch (e) {
            console.log('Could not read stylesheet', e);
        }
    }
}

// Optimize JavaScript
function optimizeJavaScript() {
    // Debounce window resize event
    const originalResize = window.onresize;
    if (originalResize) {
        window.onresize = debounce(originalResize, 250);
    }
    
    // Throttle scroll event
    const originalScroll = window.onscroll;
    if (originalScroll) {
        window.onscroll = throttle(originalScroll, 100);
    }
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Generate test report
function generateTestReport(testResults) {
    console.log('Generating test report...');
    
    const reportContainer = document.createElement('div');
    reportContainer.className = 'test-report';
    reportContainer.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 10px;
        max-width: 300px;
        max-height: 400px;
        overflow-y: auto;
        z-index: 9999;
        font-family: monospace;
        font-size: 12px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    `;
    
    const reportHeader = document.createElement('div');
    reportHeader.innerHTML = `
        <h3 style="margin-top: 0;">Dashboard Test Report</h3>
        <div>
            <span style="color: green;">✓ ${testResults.passed} passed</span> | 
            <span style="color: red;">✗ ${testResults.failed} failed</span> | 
            <span style="color: orange;">⚠ ${testResults.warnings} warnings</span>
        </div>
        <hr>
    `;
    
    const reportDetails = document.createElement('div');
    testResults.details.forEach(detail => {
        const detailElement = document.createElement('div');
        detailElement.style.marginBottom = '8px';
        
        let statusColor = 'green';
        let statusSymbol = '✓';
        
        if (!detail.passed) {
            statusColor = detail.level === 'warning' ? 'orange' : 'red';
            statusSymbol = detail.level === 'warning' ? '⚠' : '✗';
        }
        
        detailElement.innerHTML = `
            <div>
                <span style="color: ${statusColor};">${statusSymbol}</span>
                <strong>${detail.test}</strong>
            </div>
            ${detail.message ? `<div style="margin-left: 15px; color: #666;">${detail.message}</div>` : ''}
        `;
        
        reportDetails.appendChild(detailElement);
    });
    
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.cssText = `
        display: block;
        margin-top: 10px;
        padding: 5px 10px;
        background-color: #f0f0f0;
        border: 1px solid #ccc;
        border-radius: 3px;
        cursor: pointer;
    `;
    closeButton.onclick = function() {
        document.body.removeChild(reportContainer);
    };
    
    reportContainer.appendChild(reportHeader);
    reportContainer.appendChild(reportDetails);
    reportContainer.appendChild(closeButton);
    
    document.body.appendChild(reportContainer);
}

// Run tests and optimizations when page is fully loaded
window.addEventListener('load', function() {
    // Wait for all components to initialize
    setTimeout(() => {
        const testResults = runDashboardTests();
        runOptimizations();
        
        // Only show test report in development mode
        const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        if (isDevelopment) {
            generateTestReport(testResults);
        }
    }, 2000);
});
