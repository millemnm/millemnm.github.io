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
        if (window.scrollY <= 0) { // Adjusted to handle any scrollY less than or equal to 0
            navbarCollapsible.classList.remove('navbar-shrink');
        } else {
            navbarCollapsible.classList.add('navbar-shrink');
        }
    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Close modal when clicking outside of the modal content
    document.addEventListener('click', function (event) {
        const modals = document.querySelectorAll('.modal.show'); // Get all active modals
        modals.forEach(modal => {
            const modalContent = modal.querySelector('.modal-content'); // Modal content
            if (!modalContent.contains(event.target)) { // If click is outside modal content
                bootstrap.Modal.getInstance(modal).hide(); // Close the modal using Bootstrap's hide method
            }
        });
    });

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
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


