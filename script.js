// ============================================
// MAMA NJERI'S KITCHEN - WEBSITE INTERACTIONS
// ============================================

// Mobile navigation menu
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });

    // Close the mobile menu after a navigation link is selected.
    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Open navigation menu');
        });
    });
}

// Filter the menu cards by category.
const filterButtons = document.querySelectorAll('.filter-button');
const foodCards = document.querySelectorAll('.food-card');

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const selectedFilter = button.dataset.filter;

        filterButtons.forEach((item) => item.classList.remove('active'));
        button.classList.add('active');

        foodCards.forEach((card) => {
            const matches = selectedFilter === 'all' || card.dataset.category === selectedFilter;
            card.hidden = !matches;
        });
    });
});

// Selecting "Add to order" fills the meal field in the order form.
const mealChoice = document.getElementById('mealChoice');
const addOrderButtons = document.querySelectorAll('.add-order');

addOrderButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (!mealChoice) return;
        mealChoice.value = button.dataset.meal;
        document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
        mealChoice.focus({ preventScroll: true });
    });
});

// Demonstration order form. It displays a summary but does not send data to a server.
const orderForm = document.getElementById('orderForm');
const orderResult = document.getElementById('orderResult');

if (orderForm && orderResult) {
    orderForm.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!orderForm.reportValidity()) return;

        const name = document.getElementById('customerName').value.trim();
        const phone = document.getElementById('customerPhone').value.trim();
        const meal = document.getElementById('mealChoice').value;
        const quantity = Number(document.getElementById('mealQuantity').value);
        const orderType = document.getElementById('orderType').value;
        const notes = document.getElementById('orderNotes').value.trim();

        if (!name || !phone || !meal || !Number.isInteger(quantity) || quantity < 1) {
            orderResult.hidden = false;
            orderResult.textContent = 'Please complete all required fields with valid details.';
            return;
        }

        const prices = {
            'Swahili Pilau': 350,
            'Nyama Choma': 650,
            'Ugali & Sukuma': 250,
            'Chapati (2)': 100,
            'Beef Stew': 400,
            'Fresh Juice': 180
        };
        const total = (prices[meal] || 0) * quantity;

        orderResult.hidden = false;
        orderResult.replaceChildren();

        const heading = document.createElement('strong');
        heading.textContent = 'Your order summary';
        orderResult.appendChild(heading);

        const summaryLines = [
            `Thank you, ${name}!`,
            `Meal: ${meal}`,
            `Quantity: ${quantity}`,
            `Order type: ${orderType}`,
            `Estimated total: KES ${total.toLocaleString('en-KE')}`,
            `Contact: ${phone}`
        ];
        if (notes) summaryLines.push(`Instructions: ${notes}`);
        summaryLines.forEach((line) => {
            const paragraph = document.createElement('p');
            paragraph.textContent = line;
            orderResult.appendChild(paragraph);
        });

        const note = document.createElement('p');
        note.textContent = 'This is a demonstration only. Your order has not been sent to the restaurant.';
        orderResult.appendChild(note);

        const editButton = document.createElement('button');
        editButton.type = 'button';
        editButton.textContent = 'Edit order';
        editButton.addEventListener('click', () => {
            orderResult.hidden = true;
            document.getElementById('customerName').focus();
        });
        orderResult.appendChild(editButton);

        orderResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
}

// Keep the footer year up to date automatically.
const yearElement = document.getElementById('year');
if (yearElement) yearElement.textContent = new Date().getFullYear();
