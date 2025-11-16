// MapIndia Pro - Advanced Navigation & Maps Application
// Modern mapping platform for India and worldwide users

class MapIndiaPro {
    constructor() {
        this.map = null;
        this.currentLanguage = 'en';
        this.currentTheme = 'light';
        this.markers = [];
        this.routeLayer = null;
        this.clusterGroup = null;
        this.currentLocation = null;
        this.savedLocations = [];
        this.searchTimeout = null;
        this.currentRoute = null;
        this.activeOverlays = {
            traffic: false,
            weather: false,
            aqi: false
        };
        
        // Application data
        this.data = this.initializeData();
        this.translations = this.initializeTranslations();
        
        this.init();
    }

    initializeData() {
        return {
            indianCities: [
                { name: "Mumbai", coordinates: [19.0760, 72.8777], state: "Maharashtra" },
                { name: "Delhi", coordinates: [28.7041, 77.1025], state: "Delhi" },
                { name: "Bangalore", coordinates: [12.9716, 77.5946], state: "Karnataka" },
                { name: "Hyderabad", coordinates: [17.3850, 78.4867], state: "Telangana" },
                { name: "Chennai", coordinates: [13.0827, 80.2707], state: "Tamil Nadu" },
                { name: "Kolkata", coordinates: [22.5726, 88.3639], state: "West Bengal" },
                { name: "Pune", coordinates: [18.5204, 73.8567], state: "Maharashtra" },
                { name: "Ahmedabad", coordinates: [23.0225, 72.5714], state: "Gujarat" },
                { name: "Jaipur", coordinates: [26.9124, 75.7873], state: "Rajasthan" },
                { name: "Surat", coordinates: [21.1702, 72.8311], state: "Gujarat" },
                { name: "Lucknow", coordinates: [26.8467, 80.9462], state: "Uttar Pradesh" },
                { name: "Kanpur", coordinates: [26.4499, 80.3319], state: "Uttar Pradesh" },
                { name: "Nagpur", coordinates: [21.1458, 79.0882], state: "Maharashtra" },
                { name: "Indore", coordinates: [22.7196, 75.8577], state: "Madhya Pradesh" },
                { name: "Thane", coordinates: [19.2183, 72.9781], state: "Maharashtra" },
                { name: "Bhopal", coordinates: [23.2599, 77.4126], state: "Madhya Pradesh" },
                { name: "Visakhapatnam", coordinates: [17.6868, 83.2185], state: "Andhra Pradesh" },
                { name: "Patna", coordinates: [25.5941, 85.1376], state: "Bihar" },
                { name: "Vadodara", coordinates: [22.3072, 73.1812], state: "Gujarat" },
                { name: "Ghaziabad", coordinates: [28.6692, 77.4538], state: "Uttar Pradesh" }
            ],
            landmarks: [
                { name: "Taj Mahal", coordinates: [27.1751, 78.0421], city: "Agra", category: "Tourist Spot", description: "Iconic white marble mausoleum" },
                { name: "Gateway of India", coordinates: [18.9220, 72.8347], city: "Mumbai", category: "Tourist Spot", description: "Historic arch-monument" },
                { name: "India Gate", coordinates: [28.6129, 77.2295], city: "Delhi", category: "Tourist Spot", description: "War memorial monument" },
                { name: "Qutub Minar", coordinates: [28.5244, 77.1855], city: "Delhi", category: "Tourist Spot", description: "Tallest brick minaret in the world" },
                { name: "Red Fort", coordinates: [28.6562, 77.2410], city: "Delhi", category: "Tourist Spot", description: "Historic fortified palace" },
                { name: "Hawa Mahal", coordinates: [26.9239, 75.8267], city: "Jaipur", category: "Tourist Spot", description: "Palace of Winds" },
                { name: "Golden Temple", coordinates: [31.6200, 74.8765], city: "Amritsar", category: "Religious Place", description: "Holiest Sikh Gurdwara" },
                { name: "Marine Drive", coordinates: [18.9432, 72.8236], city: "Mumbai", category: "Tourist Spot", description: "Scenic coastal boulevard" }
            ],
            poiCategories: [
                { name: "Restaurants", icon: "🍽️", color: "#FF6B6B" },
                { name: "Hotels", icon: "🏨", color: "#4ECDC4" },
                { name: "Gas Stations", icon: "⛽", color: "#FFE66D" },
                { name: "Hospitals", icon: "🏥", color: "#95E1D3" },
                { name: "ATMs", icon: "🏧", color: "#A8E6CF" },
                { name: "Tourist Spots", icon: "📸", color: "#FFB6B9" },
                { name: "EV Charging", icon: "⚡", color: "#C7CEEA" },
                { name: "Metro Stations", icon: "🚇", color: "#FFDAC1" }
            ],
            routeModes: [
                { mode: "Car", icon: "🚗", color: "#3B82F6" },
                { mode: "Bike", icon: "🚴", color: "#10B981" },
                { mode: "Walk", icon: "🚶", color: "#F59E0B" },
                { mode: "Public Transport", icon: "🚌", color: "#8B5CF6" }
            ],
            mapConfig: {
                initialCenter: [20.5937, 78.9629],
                initialZoom: 5,
                maxZoom: 18,
                minZoom: 3,
                tileUrl: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
                attribution: "© OpenStreetMap contributors"
            }
        };
    }

    initializeTranslations() {
        return {
            en: {
                search_placeholder: "Search places, cities, landmarks...",
                locate_me: "Locate Me",
                get_directions: "Get Directions",
                route_from: "Starting point...",
                route_to: "Destination...",
                weather: "Weather",
                traffic: "Traffic",
                air_quality: "Air Quality",
                save_location: "Save Location",
                share: "Share",
                directions: "Directions",
                distance: "Distance",
                duration: "Duration",
                loading: "Loading...",
                error: "Error",
                success: "Success",
                no_results: "No results found",
                location_saved: "Location saved successfully",
                location_shared: "Location link copied to clipboard"
            },
            hi: {
                search_placeholder: "स्थान, शहर, स्मारक खोजें...",
                locate_me: "मुझे खोजें",
                get_directions: "दिशा प्राप्त करें",
                route_from: "शुरुआती बिंदु...",
                route_to: "गंतव्य...",
                weather: "मौसम",
                traffic: "यातायात",
                air_quality: "वायु गुणवत्ता",
                save_location: "स्थान सहेजें",
                share: "साझा करें",
                directions: "दिशाएं",
                distance: "दूरी",
                duration: "अवधि",
                loading: "लोड हो रहा है...",
                error: "त्रुटि",
                success: "सफलता",
                no_results: "कोई परिणाम नहीं मिला",
                location_saved: "स्थान सफलतापूर्वक सहेजा गया",
                location_shared: "स्थान लिंक क्लिपबोर्ड में कॉपी किया गया"
            },
            ta: {
                search_placeholder: "இடங்கள், நகரங்கள், நினைவுச்சின்னங்களை தேடுங்கள்...",
                locate_me: "என்னைக் கண்டுபிடி",
                get_directions: "வழிகளைப் பெறவும்",
                route_from: "தொடக்க இடம்...",
                route_to: "சேருமிடம்...",
                weather: "வானிலை",
                traffic: "போக்குவரத்து",
                air_quality: "காற்று தரம்",
                save_location: "இடத்தைச் சேமிக்கவும்",
                share: "பகிர்",
                directions: "வழிகள்",
                distance: "தூரம்",
                duration: "கால அளவு",
                loading: "ஏற்றுகிறது...",
                error: "பிழை",
                success: "வெற்றி",
                no_results: "எந்த முடிவும் கிடைக்கவில்லை",
                location_saved: "இடம் வெற்றிகரமாக சேமிக்கப்பட்டது",
                location_shared: "இட இணைப்பு கிளிப்போர்டுக்கு நகலெடுக்கப்பட்டது"
            },
            te: {
                search_placeholder: "స్థలాలు, నగరాలు, స్మారక చిహ్నాలను వెతకండి...",
                locate_me: "నన్ను కనుగొనండి",
                get_directions: "దిశలను పొందండి",
                route_from: "ప్రారంభ స్థలం...",
                route_to: "గమ్యస్థానం...",
                weather: "వాతావరణం",
                traffic: "ట్రాఫిక్",
                air_quality: "వాయు నాణ్యత",
                save_location: "స్థలాన్ని సేవ్ చేయండి",
                share: "పంచుకోండి",
                directions: "దిశలు",
                distance: "దూరం",
                duration: "వ్యవధి",
                loading: "లోడవుతోంది...",
                error: "లోపం",
                success: "విజయం",
                no_results: "ఫలితాలు కనుగొనబడలేదు",
                location_saved: "స్థలం విజయవంతంగా సేవ్ చేయబడింది",
                location_shared: "స్థల లింక్ క్లిప్‌బోర్డ్‌కు కాపీ చేయబడింది"
            }
        };
    }

    async init() {
        try {
            await this.loadApplication();
            this.initializeMap();
            this.initializeUI();
            this.bindEventListeners();
            this.loadSampleData();
            this.hideLoadingScreen();
            this.showToast('success', this.t('success'), 'MapIndia Pro loaded successfully!');
        } catch (error) {
            console.error('Application initialization error:', error);
            this.showToast('error', this.t('error'), 'Failed to initialize application');
        }
    }

    async loadApplication() {
        // Simulate loading time for better UX
        return new Promise(resolve => {
            setTimeout(resolve, 2000);
        });
    }

    initializeMap() {
        const { initialCenter, initialZoom, tileUrl, attribution } = this.data.mapConfig;
        
        this.map = L.map('map', {
            center: initialCenter,
            zoom: initialZoom,
            zoomControl: false,
            attributionControl: true
        });

        // Add tile layer
        L.tileLayer(tileUrl, {
            attribution: attribution,
            maxZoom: 18,
            minZoom: 3
        }).addTo(this.map);

        // Initialize cluster group for markers
        this.clusterGroup = L.markerClusterGroup({
            maxClusterRadius: 50,
            spiderfyOnMaxZoom: true,
            showCoverageOnHover: false,
            zoomToBoundsOnClick: true
        });
        this.map.addLayer(this.clusterGroup);

        // Add click handler for map
        this.map.on('click', (e) => {
            this.onMapClick(e);
        });
    }

    initializeUI() {
        this.setupPOIButtons();
        this.setupTravelModes();
        this.setupSearchAutocomplete();
        this.updateLanguage();
    }

    setupPOIButtons() {
        const poiButtonsContainer = document.getElementById('poi-buttons');
        poiButtonsContainer.innerHTML = '';

        this.data.poiCategories.forEach(category => {
            const button = document.createElement('button');
            button.className = 'poi-btn';
            button.dataset.category = category.name;
            button.innerHTML = `
                <span class="poi-icon">${category.icon}</span>
                <span class="poi-label">${category.name}</span>
            `;
            
            button.addEventListener('click', () => {
                this.togglePOICategory(category.name, button);
            });
            
            poiButtonsContainer.appendChild(button);
        });
    }

    setupTravelModes() {
        const travelModesContainer = document.getElementById('travel-modes');
        travelModesContainer.innerHTML = '';

        this.data.routeModes.forEach((mode, index) => {
            const button = document.createElement('button');
            button.className = `mode-btn ${index === 0 ? 'active' : ''}`;
            button.dataset.mode = mode.mode;
            button.innerHTML = `
                <span class="mode-icon">${mode.icon}</span>
                <span class="mode-label">${mode.mode}</span>
            `;
            
            button.addEventListener('click', () => {
                this.selectTravelMode(mode.mode, button);
            });
            
            travelModesContainer.appendChild(button);
        });
    }

    setupSearchAutocomplete() {
        const searchInput = document.getElementById('search-input');
        const suggestions = document.getElementById('search-suggestions');
        
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            
            if (query.length < 2) {
                suggestions.classList.remove('active');
                return;
            }
            
            clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(() => {
                this.performSearch(query);
            }, 300);
        });
        
        searchInput.addEventListener('focus', () => {
            if (searchInput.value.trim().length >= 2) {
                suggestions.classList.add('active');
            }
        });
        
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !suggestions.contains(e.target)) {
                suggestions.classList.remove('active');
            }
        });
    }

    bindEventListeners() {
        // Header controls
        document.getElementById('theme-toggle').addEventListener('click', () => {
            this.toggleTheme();
        });
        
        document.getElementById('language-selector').addEventListener('change', (e) => {
            this.changeLanguage(e.target.value);
        });
        
        document.getElementById('menu-toggle').addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Search controls
        document.getElementById('clear-search').addEventListener('click', () => {
            this.clearSearch();
        });
        
        document.getElementById('locate-me').addEventListener('click', () => {
            this.locateUser();
        });
        
        document.getElementById('fullscreen').addEventListener('click', () => {
            this.toggleFullscreen();
        });

        // Route controls
        document.getElementById('swap-locations').addEventListener('click', () => {
            this.swapRouteLocations();
        });
        
        document.getElementById('get-directions').addEventListener('click', () => {
            this.calculateRoute();
        });

        // Map controls
        document.getElementById('zoom-in').addEventListener('click', () => {
            this.map.zoomIn();
        });
        
        document.getElementById('zoom-out').addEventListener('click', () => {
            this.map.zoomOut();
        });
        
        document.getElementById('current-location').addEventListener('click', () => {
            this.locateUser();
        });
        
        document.getElementById('satellite-view').addEventListener('click', () => {
            this.toggleSatelliteView();
        });

        // Overlay toggles
        document.getElementById('traffic-toggle').addEventListener('change', (e) => {
            this.toggleTrafficOverlay(e.target.checked);
        });
        
        document.getElementById('weather-toggle').addEventListener('change', (e) => {
            this.toggleWeatherOverlay(e.target.checked);
        });
        
        document.getElementById('aqi-toggle').addEventListener('change', (e) => {
            this.toggleAQIOverlay(e.target.checked);
        });

        // Tab navigation
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.switchTab(btn.dataset.panel);
            });
        });

        // Modal controls
        document.getElementById('close-modal').addEventListener('click', () => {
            this.closeModal();
        });
        
        document.getElementById('save-location').addEventListener('click', () => {
            this.saveCurrentLocation();
        });
        
        document.getElementById('share-location').addEventListener('click', () => {
            this.shareCurrentLocation();
        });
        
        document.getElementById('get-directions-modal').addEventListener('click', () => {
            this.getDirectionsFromModal();
        });

        // Close modal on backdrop click
        document.getElementById('location-modal').addEventListener('click', (e) => {
            if (e.target.id === 'location-modal') {
                this.closeModal();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });
    }

    loadSampleData() {
        // Add landmarks to map
        this.data.landmarks.forEach(landmark => {
            this.addMarker(
                landmark.coordinates,
                landmark.name,
                landmark.description,
                'tourist_spot',
                landmark
            );
        });

        // Add some sample POIs for major cities
        this.generateSamplePOIs();
    }

    generateSamplePOIs() {
        const majorCities = this.data.indianCities.slice(0, 5); // Top 5 cities
        
        majorCities.forEach(city => {
            // Generate sample restaurants
            for (let i = 0; i < 3; i++) {
                const randomOffset = [(Math.random() - 0.5) * 0.1, (Math.random() - 0.5) * 0.1];
                const coords = [
                    city.coordinates[0] + randomOffset[0],
                    city.coordinates[1] + randomOffset[1]
                ];
                
                this.addMarker(
                    coords,
                    `Restaurant ${i + 1} - ${city.name}`,
                    `Popular dining spot in ${city.name}`,
                    'restaurant',
                    {
                        name: `Restaurant ${i + 1} - ${city.name}`,
                        category: 'Restaurants',
                        rating: 4.0 + Math.random(),
                        address: `${city.name}, ${city.state}`,
                        phone: '+91-' + Math.floor(Math.random() * 10000000000)
                    }
                );
            }
            
            // Generate sample hotels
            for (let i = 0; i < 2; i++) {
                const randomOffset = [(Math.random() - 0.5) * 0.1, (Math.random() - 0.5) * 0.1];
                const coords = [
                    city.coordinates[0] + randomOffset[0],
                    city.coordinates[1] + randomOffset[1]
                ];
                
                this.addMarker(
                    coords,
                    `Hotel ${i + 1} - ${city.name}`,
                    `Comfortable stay in ${city.name}`,
                    'hotel',
                    {
                        name: `Hotel ${i + 1} - ${city.name}`,
                        category: 'Hotels',
                        rating: 3.5 + Math.random() * 1.5,
                        address: `${city.name}, ${city.state}`,
                        phone: '+91-' + Math.floor(Math.random() * 10000000000)
                    }
                );
            }
        });
    }

    addMarker(coordinates, title, description, type = 'default', data = null) {
        const iconHtml = this.getMarkerIcon(type);
        
        const marker = L.marker(coordinates, {
            icon: L.divIcon({
                html: iconHtml,
                className: `custom-marker ${type}`,
                iconSize: [30, 30],
                iconAnchor: [15, 15]
            })
        });
        
        const popupContent = this.createPopupContent(title, description, data);
        marker.bindPopup(popupContent, {
            maxWidth: 300,
            className: 'custom-popup'
        });
        
        marker.on('click', () => {
            this.onMarkerClick(marker, { title, description, coordinates, data });
        });
        
        this.clusterGroup.addLayer(marker);
        this.markers.push(marker);
        
        return marker;
    }

    getMarkerIcon(type) {
        const icons = {
            default: '📍',
            tourist_spot: '🏛️',
            restaurant: '🍽️',
            hotel: '🏨',
            hospital: '🏥',
            gas_station: '⛽',
            atm: '🏧',
            ev_charging: '⚡',
            metro_station: '🚇'
        };
        
        return `<div class="marker-icon">${icons[type] || icons.default}</div>`;
    }

    createPopupContent(title, description, data) {
        let content = `
            <div class="popup-content">
                <h4>${title}</h4>
                <p>${description}</p>
        `;
        
        if (data && data.rating) {
            const stars = '★'.repeat(Math.floor(data.rating)) + '☆'.repeat(5 - Math.floor(data.rating));
            content += `<div class="rating">${stars} ${data.rating.toFixed(1)}</div>`;
        }
        
        if (data && data.address) {
            content += `<div class="address">📍 ${data.address}</div>`;
        }
        
        if (data && data.phone) {
            content += `<div class="phone">📞 ${data.phone}</div>`;
        }
        
        content += `
                <div class="popup-actions">
                    <button class="btn btn--primary btn--sm" onclick="mapApp.openLocationModal('${title}', '${description}')">Details</button>
                    <button class="btn btn--outline btn--sm" onclick="mapApp.getDirectionsTo([${data?.coordinates?.[0] || 0}, ${data?.coordinates?.[1] || 0}])">Directions</button>
                </div>
            </div>
        `;
        
        return content;
    }

    performSearch(query) {
        const suggestions = document.getElementById('search-suggestions');
        const results = [];
        
        // Search in cities
        this.data.indianCities.forEach(city => {
            if (city.name.toLowerCase().includes(query.toLowerCase()) ||
                city.state.toLowerCase().includes(query.toLowerCase())) {
                results.push({
                    name: city.name,
                    details: city.state,
                    coordinates: city.coordinates,
                    type: 'city',
                    icon: '🏙️'
                });
            }
        });
        
        // Search in landmarks
        this.data.landmarks.forEach(landmark => {
            if (landmark.name.toLowerCase().includes(query.toLowerCase()) ||
                landmark.city.toLowerCase().includes(query.toLowerCase())) {
                results.push({
                    name: landmark.name,
                    details: `${landmark.city} • ${landmark.category}`,
                    coordinates: landmark.coordinates,
                    type: 'landmark',
                    icon: '🏛️'
                });
            }
        });
        
        // Limit results
        const limitedResults = results.slice(0, 8);
        
        this.displaySearchSuggestions(limitedResults);
    }

    displaySearchSuggestions(results) {
        const suggestionsContainer = document.getElementById('search-suggestions');
        suggestionsContainer.innerHTML = '';
        
        if (results.length === 0) {
            suggestionsContainer.innerHTML = `
                <div class="suggestion-item">
                    <div class="suggestion-content">
                        <div class="suggestion-name">${this.t('no_results')}</div>
                    </div>
                </div>
            `;
        } else {
            results.forEach(result => {
                const item = document.createElement('div');
                item.className = 'suggestion-item';
                item.innerHTML = `
                    <div class="suggestion-icon">${result.icon}</div>
                    <div class="suggestion-content">
                        <div class="suggestion-name">${result.name}</div>
                        <div class="suggestion-details">${result.details}</div>
                    </div>
                `;
                
                item.addEventListener('click', () => {
                    this.selectSearchResult(result);
                });
                
                suggestionsContainer.appendChild(item);
            });
        }
        
        suggestionsContainer.classList.add('active');
    }

    selectSearchResult(result) {
        const searchInput = document.getElementById('search-input');
        const suggestions = document.getElementById('search-suggestions');
        
        searchInput.value = result.name;
        suggestions.classList.remove('active');
        
        // Pan to location and add marker
        this.map.setView(result.coordinates, 12);
        
        // Add temporary marker
        const marker = this.addMarker(
            result.coordinates,
            result.name,
            result.details,
            result.type,
            result
        );
        
        // Open popup
        setTimeout(() => {
            marker.openPopup();
        }, 500);
        
        this.showToast('success', this.t('success'), `Found ${result.name}`);
    }

    clearSearch() {
        const searchInput = document.getElementById('search-input');
        const clearBtn = document.getElementById('clear-search');
        const suggestions = document.getElementById('search-suggestions');
        
        searchInput.value = '';
        clearBtn.style.display = 'none';
        suggestions.classList.remove('active');
        
        searchInput.focus();
    }

    togglePOICategory(category, button) {
        const isActive = button.classList.contains('active');
        
        if (isActive) {
            button.classList.remove('active');
            this.hidePOICategory(category);
        } else {
            button.classList.add('active');
            this.showPOICategory(category);
        }
    }

    showPOICategory(category) {
        // Generate sample POIs for the category
        const currentCenter = this.map.getCenter();
        const currentZoom = this.map.getZoom();
        
        // Only show POIs if zoomed in enough
        if (currentZoom < 10) {
            this.showToast('info', 'Info', 'Zoom in to see nearby POIs');
            return;
        }
        
        // Generate sample POIs around current view
        for (let i = 0; i < 5; i++) {
            const randomOffset = [(Math.random() - 0.5) * 0.01, (Math.random() - 0.5) * 0.01];
            const coords = [
                currentCenter.lat + randomOffset[0],
                currentCenter.lng + randomOffset[1]
            ];
            
            const categoryData = this.data.poiCategories.find(cat => cat.name === category);
            if (categoryData) {
                this.addMarker(
                    coords,
                    `${category} ${i + 1}`,
                    `Sample ${category.toLowerCase()} location`,
                    category.toLowerCase().replace(' ', '_'),
                    {
                        name: `${category} ${i + 1}`,
                        category: category,
                        rating: 3.5 + Math.random() * 1.5,
                        coordinates: coords
                    }
                );
            }
        }
        
        this.showToast('success', this.t('success'), `Showing ${category} in current area`);
    }

    hidePOICategory(category) {
        // In a real implementation, this would filter and remove specific markers
        this.showToast('info', 'Info', `Hidden ${category} from map`);
    }

    selectTravelMode(mode, button) {
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
        
        this.showToast('info', 'Info', `Travel mode: ${mode}`);
    }

    swapRouteLocations() {
        const fromInput = document.getElementById('route-from');
        const toInput = document.getElementById('route-to');
        
        const temp = fromInput.value;
        fromInput.value = toInput.value;
        toInput.value = temp;
        
        if (this.currentRoute) {
            this.calculateRoute();
        }
    }

    async calculateRoute() {
        const fromInput = document.getElementById('route-from');
        const toInput = document.getElementById('route-to');
        const directionsDiv = document.getElementById('directions-list');
        
        const from = fromInput.value.trim();
        const to = toInput.value.trim();
        
        if (!from || !to) {
            this.showToast('warning', 'Warning', 'Please enter both starting point and destination');
            return;
        }
        
        try {
            this.showToast('info', 'Info', 'Calculating route...');
            
            // Simulate route calculation
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Generate sample route
            const sampleRoute = this.generateSampleRoute(from, to);
            this.displayRoute(sampleRoute);
            
            directionsDiv.classList.add('active');
            
        } catch (error) {
            console.error('Route calculation error:', error);
            this.showToast('error', this.t('error'), 'Failed to calculate route');
        }
    }

    generateSampleRoute(from, to) {
        return {
            summary: {
                distance: '24.5 km',
                duration: '45 mins',
                route: 'Via NH-48 Express'
            },
            directions: [
                { instruction: `Start from ${from}`, distance: '0 km', icon: 'start' },
                { instruction: 'Head north on Main Road', distance: '2.1 km', icon: 'straight' },
                { instruction: 'Turn right onto Highway 48', distance: '18.2 km', icon: 'turn_right' },
                { instruction: 'Take exit toward City Center', distance: '3.4 km', icon: 'exit_right' },
                { instruction: `Arrive at ${to}`, distance: '0.8 km', icon: 'arrive' }
            ]
        };
    }

    displayRoute(route) {
        const directionsDiv = document.getElementById('directions-list');
        
        const iconMap = {
            start: 'radio_button_checked',
            straight: 'straight',
            turn_right: 'turn_right',
            turn_left: 'turn_left',
            exit_right: 'exit_to_app',
            arrive: 'location_on'
        };
        
        directionsDiv.innerHTML = `
            <div class="route-summary">
                <div class="route-info">
                    <div class="route-distance">${route.summary.distance}</div>
                    <div class="route-duration">${route.summary.duration}</div>
                </div>
                <div class="route-name">${route.summary.route}</div>
            </div>
            <div class="directions-steps">
                ${route.directions.map(step => `
                    <div class="direction-step">
                        <div class="step-icon">
                            <i class="material-icons">${iconMap[step.icon] || 'navigation'}</i>
                        </div>
                        <div class="step-content">
                            <div class="step-instruction">${step.instruction}</div>
                            <div class="step-distance">${step.distance}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        // Draw route on map (simplified)
        this.drawRouteOnMap();
        
        this.showToast('success', this.t('success'), 'Route calculated successfully!');
    }

    drawRouteOnMap() {
        // Remove existing route
        if (this.routeLayer) {
            this.map.removeLayer(this.routeLayer);
        }
        
        // Get current map bounds for demo route
        const bounds = this.map.getBounds();
        const center = this.map.getCenter();
        
        // Create sample route coordinates
        const routeCoords = [
            [center.lat - 0.05, center.lng - 0.05],
            [center.lat - 0.02, center.lng - 0.03],
            [center.lat + 0.01, center.lng],
            [center.lat + 0.03, center.lng + 0.02],
            [center.lat + 0.05, center.lng + 0.05]
        ];
        
        this.routeLayer = L.polyline(routeCoords, {
            color: '#2196F3',
            weight: 5,
            opacity: 0.8
        }).addTo(this.map);
        
        // Fit map to route
        this.map.fitBounds(this.routeLayer.getBounds(), { padding: [20, 20] });
    }

    locateUser() {
        if (!navigator.geolocation) {
            this.showToast('error', this.t('error'), 'Geolocation is not supported by this browser');
            return;
        }
        
        this.showToast('info', 'Info', 'Locating your position...');
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                this.currentLocation = [latitude, longitude];
                
                // Pan to user location
                this.map.setView([latitude, longitude], 15);
                
                // Add user location marker
                if (this.userLocationMarker) {
                    this.map.removeLayer(this.userLocationMarker);
                }
                
                this.userLocationMarker = L.marker([latitude, longitude], {
                    icon: L.divIcon({
                        html: '<div class="user-location-marker">📍</div>',
                        className: 'user-location',
                        iconSize: [30, 30],
                        iconAnchor: [15, 15]
                    })
                }).addTo(this.map);
                
                this.userLocationMarker.bindPopup('Your current location').openPopup();
                
                this.showToast('success', this.t('success'), 'Location found!');
            },
            (error) => {
                let message = 'Unable to get your location';
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        message = 'Location access denied by user';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        message = 'Location information is unavailable';
                        break;
                    case error.TIMEOUT:
                        message = 'Location request timed out';
                        break;
                }
                this.showToast('error', this.t('error'), message);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 60000
            }
        );
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().then(() => {
                this.showToast('info', 'Info', 'Entered fullscreen mode');
            });
        } else {
            document.exitFullscreen().then(() => {
                this.showToast('info', 'Info', 'Exited fullscreen mode');
            });
        }
    }

    toggleSatelliteView() {
        // In a real implementation, this would switch tile layers
        this.showToast('info', 'Info', 'Satellite view toggle (demo)');
    }

    toggleTrafficOverlay(enabled) {
        this.activeOverlays.traffic = enabled;
        if (enabled) {
            this.showTrafficOverlay();
        } else {
            this.hideTrafficOverlay();
        }
    }

    showTrafficOverlay() {
        // Simulate traffic overlay
        this.showToast('info', 'Info', 'Traffic overlay enabled');
        
        // Show traffic widget
        const trafficWidget = document.createElement('div');
        trafficWidget.id = 'traffic-widget';
        trafficWidget.className = 'traffic-widget';
        trafficWidget.innerHTML = `
            <div class="traffic-legend">
                <div class="legend-item">
                    <div class="traffic-color" style="background: #4CAF50"></div>
                    <span>Light Traffic</span>
                </div>
                <div class="legend-item">
                    <div class="traffic-color" style="background: #FF9800"></div>
                    <span>Moderate Traffic</span>
                </div>
                <div class="legend-item">
                    <div class="traffic-color" style="background: #F44336"></div>
                    <span>Heavy Traffic</span>
                </div>
            </div>
        `;
        
        document.body.appendChild(trafficWidget);
    }

    hideTrafficOverlay() {
        const trafficWidget = document.getElementById('traffic-widget');
        if (trafficWidget) {
            trafficWidget.remove();
        }
        this.showToast('info', 'Info', 'Traffic overlay disabled');
    }

    toggleWeatherOverlay(enabled) {
        this.activeOverlays.weather = enabled;
        const weatherWidget = document.getElementById('weather-widget');
        
        if (enabled) {
            weatherWidget.style.display = 'block';
            this.showToast('info', 'Info', 'Weather overlay enabled');
        } else {
            weatherWidget.style.display = 'none';
            this.showToast('info', 'Info', 'Weather overlay disabled');
        }
    }

    toggleAQIOverlay(enabled) {
        this.activeOverlays.aqi = enabled;
        const aqiWidget = document.getElementById('aqi-widget');
        
        if (enabled) {
            aqiWidget.style.display = 'block';
            this.showToast('info', 'Info', 'Air Quality overlay enabled');
        } else {
            aqiWidget.style.display = 'none';
            this.showToast('info', 'Info', 'Air Quality overlay disabled');
        }
    }

    switchTab(panel) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-panel="${panel}"]`).classList.add('active');
        
        // Update panels
        document.querySelectorAll('.panel').forEach(p => {
            p.classList.remove('active');
        });
        document.querySelector(`.${panel}-panel`).classList.add('active');
        
        // Close mobile menu
        document.getElementById('sidebar').classList.remove('active');
    }

    toggleMobileMenu() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('active');
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.body.dataset.theme = this.currentTheme;
        
        const themeIcon = document.querySelector('#theme-toggle i');
        themeIcon.textContent = this.currentTheme === 'light' ? 'dark_mode' : 'light_mode';
        
        this.showToast('info', 'Info', `Switched to ${this.currentTheme} mode`);
    }

    changeLanguage(langCode) {
        this.currentLanguage = langCode;
        this.updateLanguage();
        this.showToast('success', this.t('success'), 'Language updated successfully');
    }

    updateLanguage() {
        // Update search placeholder
        document.getElementById('search-input').placeholder = this.t('search_placeholder');
        
        // Update button texts
        document.getElementById('locate-me').innerHTML = `
            <i class="material-icons">my_location</i> ${this.t('locate_me')}
        `;
        
        document.getElementById('get-directions').innerHTML = `
            <i class="material-icons">navigation</i> ${this.t('get_directions')}
        `;
        
        // Update route inputs
        document.getElementById('route-from').placeholder = this.t('route_from');
        document.getElementById('route-to').placeholder = this.t('route_to');
    }

    onMapClick(e) {
        const { lat, lng } = e.latlng;
        
        // Add temporary marker
        const marker = this.addMarker(
            [lat, lng],
            'Selected Location',
            `Coordinates: ${lat.toFixed(6)}, ${lng.toFixed(6)}`,
            'default',
            { coordinates: [lat, lng] }
        );
        
        marker.openPopup();
    }

    onMarkerClick(marker, data) {
        this.currentSelectedLocation = data;
    }

    openLocationModal(title, description) {
        const modal = document.getElementById('location-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');
        
        modalTitle.textContent = title;
        modalBody.innerHTML = `
            <div class="location-details">
                <p>${description}</p>
                <div class="detail-item">
                    <strong>Category:</strong> Tourist Attraction
                </div>
                <div class="detail-item">
                    <strong>Rating:</strong> ⭐⭐⭐⭐☆ 4.2/5
                </div>
                <div class="detail-item">
                    <strong>Opening Hours:</strong> 6:00 AM - 6:00 PM
                </div>
                <div class="detail-item">
                    <strong>Entry Fee:</strong> ₹50 for Indians, $15 for Foreigners
                </div>
                <div class="detail-item">
                    <strong>Best Time to Visit:</strong> October to March
                </div>
            </div>
        `;
        
        modal.classList.add('active');
    }

    closeModal() {
        document.getElementById('location-modal').classList.remove('active');
    }

    saveCurrentLocation() {
        if (this.currentSelectedLocation) {
            this.savedLocations.push(this.currentSelectedLocation);
            this.updateFavoritesList();
            this.showToast('success', this.t('success'), this.t('location_saved'));
            this.closeModal();
        }
    }

    shareCurrentLocation() {
        if (this.currentSelectedLocation) {
            const coords = this.currentSelectedLocation.coordinates;
            const shareUrl = `${window.location.origin}${window.location.pathname}?lat=${coords[0]}&lng=${coords[1]}`;
            
            if (navigator.share) {
                navigator.share({
                    title: this.currentSelectedLocation.title,
                    text: this.currentSelectedLocation.description,
                    url: shareUrl
                });
            } else {
                // Fallback to clipboard
                navigator.clipboard.writeText(shareUrl).then(() => {
                    this.showToast('success', this.t('success'), this.t('location_shared'));
                });
            }
        }
    }

    getDirectionsFromModal() {
        if (this.currentSelectedLocation) {
            const coords = this.currentSelectedLocation.coordinates;
            document.getElementById('route-to').value = this.currentSelectedLocation.title;
            this.switchTab('route');
            this.closeModal();
        }
    }

    getDirectionsTo(coordinates) {
        // Find location name from coordinates
        const locationName = `Location (${coordinates[0].toFixed(4)}, ${coordinates[1].toFixed(4)})`;
        document.getElementById('route-to').value = locationName;
        this.switchTab('route');
    }

    updateFavoritesList() {
        const favoritesList = document.getElementById('favorites-list');
        
        if (this.savedLocations.length === 0) {
            favoritesList.innerHTML = '<p class="no-favorites">No saved locations yet. Search for a place and click the star to save it!</p>';
            return;
        }
        
        favoritesList.innerHTML = this.savedLocations.map(location => `
            <div class="favorite-item" onclick="mapApp.goToFavorite(${JSON.stringify(location).replace(/"/g, '&quot;')})">
                <div class="favorite-icon">
                    <i class="material-icons">favorite</i>
                </div>
                <div class="favorite-content">
                    <div class="favorite-name">${location.title}</div>
                    <div class="favorite-address">${location.description}</div>
                </div>
            </div>
        `).join('');
    }

    goToFavorite(location) {
        this.map.setView(location.coordinates, 15);
        this.switchTab('search');
        this.showToast('success', this.t('success'), `Navigated to ${location.title}`);
    }

    handleKeyboardShortcuts(e) {
        // Ctrl/Cmd + K: Focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            document.getElementById('search-input').focus();
        }
        
        // Escape: Close modal/suggestions
        if (e.key === 'Escape') {
            this.closeModal();
            document.getElementById('search-suggestions').classList.remove('active');
        }
        
        // Ctrl/Cmd + F: Toggle fullscreen
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            this.toggleFullscreen();
        }
    }

    showToast(type, title, message) {
        const toastContainer = document.getElementById('toast-container');
        const toastId = 'toast-' + Date.now();
        
        const iconMap = {
            success: 'check_circle',
            error: 'error',
            warning: 'warning',
            info: 'info'
        };
        
        const toast = document.createElement('div');
        toast.id = toastId;
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="material-icons">${iconMap[type]}</i>
            </div>
            <div class="toast-content">
                <div class="toast-message">${title}</div>
                <div class="toast-description">${message}</div>
            </div>
        `;
        
        toastContainer.appendChild(toast);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            this.removeToast(toastId);
        }, 5000);
    }

    removeToast(toastId) {
        const toast = document.getElementById(toastId);
        if (toast) {
            toast.classList.add('removing');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        const app = document.getElementById('app');
        
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                app.style.display = 'grid';
                
                // Trigger map resize after showing
                setTimeout(() => {
                    this.map.invalidateSize();
                }, 100);
            }, 300);
        }, 500);
    }

    // Translation helper
    t(key) {
        return this.translations[this.currentLanguage][key] || key;
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.mapApp = new MapIndiaPro();
});

// Handle search input changes for clear button
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const clearBtn = document.getElementById('clear-search');
    
    if (searchInput && clearBtn) {
        searchInput.addEventListener('input', (e) => {
            clearBtn.style.display = e.target.value.length > 0 ? 'block' : 'none';
        });
    }
});

// Handle window resize for responsive map
window.addEventListener('resize', () => {
    if (window.mapApp && window.mapApp.map) {
        setTimeout(() => {
            window.mapApp.map.invalidateSize();
        }, 100);
    }
});

// Service Worker registration for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('ServiceWorker registration successful');
            })
            .catch((error) => {
                console.log('ServiceWorker registration failed');
            });
    });
}