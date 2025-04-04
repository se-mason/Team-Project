/**
 * My Listings Page JavaScript
 * Handles the display and management of user listings
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const elements = {
        listingsGrid: document.getElementById('listings-grid'),
        emptyState: document.getElementById('empty-state'),
        statusFilter: document.getElementById('status-filter'),
        sortBy: document.getElementById('sort-by')
    };

    /**
     * Toggle visibility between empty state and listings grid
     * @param {boolean} hasListings - Whether there are listings to display
     */
    function toggleEmptyState(hasListings) {
        elements.emptyState.style.display = hasListings ? 'none' : 'block';
        elements.listingsGrid.style.display = hasListings ? 'grid' : 'none';
    }

    /**
     * Create HTML for a listing card
     * @param {Object} listing - The listing data
     * @returns {string} HTML string for the listing card
     */
    function createListingCard(listing) {
        const { id, image, title, price, status } = listing;
        
        return `
            <div class="listing-card" data-id="${id}">
                <img src="${image}" alt="${title}" class="listing-image">
                <div class="listing-content">
                    <h3 class="listing-title">${title}</h3>
                    <div class="listing-price">£${price.toFixed(2)}</div>
                    <span class="listing-status status-${status.toLowerCase()}">${status}</span>
                    <div class="listing-actions">
                        <button class="listing-action-btn edit-btn" onclick="editListing(${id})">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="listing-action-btn delete-btn" onclick="deleteListing(${id})">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Filter and sort listings based on user selection
     * @param {Array} listings - Array of listing objects
     * @returns {Array} Filtered and sorted listings
     */
    function filterAndSortListings(listings) {
        const status = elements.statusFilter.value;
        const sort = elements.sortBy.value;

        let filteredListings = [...listings];

        // Apply status filter
        if (status !== 'all') {
            filteredListings = filteredListings.filter(listing => 
                listing.status.toLowerCase() === status
            );
        }

        // Apply sorting
        filteredListings.sort((a, b) => {
            switch (sort) {
                case 'newest':
                    return new Date(b.createdAt) - new Date(a.createdAt);
                case 'oldest':
                    return new Date(a.createdAt) - new Date(b.createdAt);
                case 'price-high':
                    return b.price - a.price;
                case 'price-low':
                    return a.price - b.price;
                default:
                    return 0;
            }
        });

        return filteredListings;
    }

    /**
     * Render listings to the page
     * @param {Array} listings - Array of listing objects
     */
    function renderListings(listings) {
        const filteredListings = filterAndSortListings(listings);
        toggleEmptyState(filteredListings.length > 0);

        if (filteredListings.length > 0) {
            elements.listingsGrid.innerHTML = filteredListings
                .map(createListingCard)
                .join('');
        }
    }

    /**
     * Fetch listings from the server and render them
     */
    async function fetchAndRenderListings() {
        try {
            const response = await fetch('/api/listings');
            if (!response.ok) {
                throw new Error('Failed to fetch listings');
            }
            const listings = await response.json();
            renderListings(listings);
        } catch (error) {
            console.error('Error fetching listings:', error);
            toggleEmptyState(false);
        }
    }

    // Event Handlers
    elements.statusFilter.addEventListener('change', fetchAndRenderListings);
    elements.sortBy.addEventListener('change', fetchAndRenderListings);

    // Global functions for listing actions
    window.editListing = (listingId) => {
        window.location.href = `edit_listing.html?id=${listingId}`;
    };

    window.deleteListing = (listingId) => {
        if (confirm('Are you sure you want to delete this listing?')) {
            // TODO: Replace with actual API call
            console.log('Deleting listing:', listingId);
            fetchAndRenderListings();
        }
    };

    // Initialize
    fetchAndRenderListings();
}); 