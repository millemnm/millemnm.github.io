/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY <= 0) {
            navbarCollapsible.classList.remove('navbar-shrink');
        } else {
            navbarCollapsible.classList.add('navbar-shrink');
        }
    };

    // Shrink the navbar
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible and a link is clicked
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('#navbarResponsive');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Close navbar when clicking below the dropdown menu
    function closeNavbarOnOutsideClick(event) {
        const target = event.target;

        // If the navbar is expanded and click is outside the navbarCollapse but not on the toggler, close it
        if (navbarToggler.getAttribute('aria-expanded') === 'true' && 
            !navbarCollapse.contains(target) && 
            !navbarToggler.contains(target)) {
            navbarToggler.click(); // This will close the dropdown
        }
    }

    // Attach the event listener to close the dropdown when clicking outside
    document.addEventListener('click', closeNavbarOnOutsideClick);

    // Sort list function
    function sortListsAlphabetically(listIds) {
        if (!Array.isArray(listIds)) {
            listIds = [listIds];  // Ensure listIds is an array if only a single ID is passed
        }

        // Loop through each list ID
        listIds.forEach(listId => {
            const list = document.getElementById(listId);
            if (list) {
                const items = Array.from(list.querySelectorAll('li'));

                // Sort items alphabetically by their text content
                items.sort((a, b) => a.textContent.localeCompare(b.textContent));

                // Clear the list and append sorted items
                list.innerHTML = '';
                items.forEach(item => list.appendChild(item));
            }
        });
    }

    // Call the sortListsAlphabetically function when DOM is loaded
    sortListsAlphabetically(['chicken-list', 'fish-list', 'chip-list', 'nut-list', 'jerky-list', 'pasta-list', 'rice-list', 'salad-list', 'dip-list', 'german-list', 'euro-list', 'italian-list', 'asia-list', 'mexican-list', 'special-list', 'funct-list', 'sauces-list', 'rubs-list', 'sausage-list','marinades-list', 'whole-spices-list', 'ground-spices-list', 'cracked-spices-list', 'minced-spices-list', 'special-seasonings-list']); // Add the IDs of the lists you want to sort here

});

window.onload = function() {
    getLocation();
};


// Function to get user's geolocation using IP API
function getLocation() {
    if (sessionStorage.getItem('userLocation')) {
        const savedLocation = JSON.parse(sessionStorage.getItem('userLocation'));
        // console.log('Using saved session location:', savedLocation);
        findClosestFactory(savedLocation.latitude, savedLocation.longitude);
    } else {
        fetch('https://ipinfo.io/json?token=49669f6884fb0d')
            .then(response => response.json())
            .then(data => {
                // console.log('Location Data:', data);
                if (data.loc) {
                    const [userLatitude, userLongitude] = data.loc.split(',');

                    // Save the user's location in sessionStorage
                    sessionStorage.setItem('userLocation', JSON.stringify({ latitude: userLatitude, longitude: userLongitude }));

                    findClosestFactory(userLatitude, userLongitude);
                } else {
                    // console.error('Could not retrieve location data');
                }
            })
            .catch(error => {
                // console.error('Error fetching location:', error);
            });
    }
}


// Function to calculate the distance between two sets of lat/lon coordinates
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    
    const a = 
        0.5 - Math.cos(dLat)/2 + 
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        (1 - Math.cos(dLon)) / 2;

    return R * 2 * Math.asin(Math.sqrt(a)); // Distance in kilometers
}

// Coordinates of your factories
const factories = {
    newYork: { lat: 40.736240, lon: -73.933260, phone: '+17183612556' },   // New York
    sanFrancisco: { lat: 37.764020, lon: -122.398290, phone: '+14158610112' }, // San Francisco
    toronto: { lat: 43.705140, lon: -79.458390, phone: '+14167871201' }     // Toronto
};

// Function to find the closest factory based on user's location
function findClosestFactory(userLat, userLon) {
    let closestFactory = null;
    let shortestDistance = Infinity;

    // Iterate over each factory and calculate the distance
    for (let factory in factories) {
        const distance = calculateDistance(userLat, userLon, factories[factory].lat, factories[factory].lon);
        if (distance < shortestDistance) {
            shortestDistance = distance;
            closestFactory = factories[factory];
        }
    }

    // Update all buttons with the class "dynamic-call-button" with the closest factory's phone number
    const callButtons = document.querySelectorAll('.dynamic-call-button');
    callButtons.forEach(button => {
        button.setAttribute('href', `tel:${closestFactory.phone}`);
    });
}

//listen for form submission
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    console.log("Form submission intercepted!");

    const formData = new FormData(this);
    fetch('send_form_email.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
    })
    .catch(error => {
        alert('There was an error sending the message. Please try again later.');
    });
});