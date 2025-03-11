const products = [
    { name: "Laptop", category: "electronics", price: 20000, rating: 4.5, image: "images/laptop.jpg" },
    { name: "Smartphone", category: "electronics", price: 12000, rating: 4.8, image: "images/smartphone.png" },
    { name: "T-shirt", category: "fashion", price: 200, rating: 4.2, image: "images/tshirt.webp" },
    { name: "Sofa", category: "home", price: 30000, rating: 4.6, image: "images/sofa.webp" },
    { name: "Watch", category: "fashion", price: 1500, rating: 4.7, image: "images/watch.jpeg" },
];

function displayProducts(filteredProducts) {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";
    filteredProducts.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Category: ${product.category}</p>
            <p>Price: Rs.${product.price}</p>
            <p>Rating: ${product.rating}</p>
            <button class="add-to-cart" onclick="addToCart('${product.name}')">Add to Cart</button>
        `;
        productList.appendChild(div);
    });
}

function addToCart(productName) {
    const product = products.find(p => p.name === productName);
    cart.push(product);
    alert(`${productName} has been added to your cart!`);
}

function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    const themeToggleIcon = document.querySelector("#themeToggle i");
    if (document.body.classList.contains("dark-mode")) {
        themeToggleIcon.classList.remove("fa-sun");
        themeToggleIcon.classList.add("fa-moon");
    } else {
        themeToggleIcon.classList.remove("fa-moon");
        themeToggleIcon.classList.add("fa-sun");
    }
}

document.getElementById("themeToggle").addEventListener("click", toggleTheme);

function filterAndSortProducts() {
    const category = document.getElementById("categoryFilter").value;
    const maxPrice = document.getElementById("priceFilter").value;
    const sortBy = document.getElementById("sortRating").value;
    
    let filtered = products.filter(p => 
        (category === "all" || p.category === category) && 
        (!maxPrice || p.price <= maxPrice)
    );

    filtered.sort((a, b) => sortBy === "high" ? b.rating - a.rating : a.rating - b.rating);
    
    displayProducts(filtered);
}

document.addEventListener("DOMContentLoaded", () => {
    displayProducts(products);
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        window.scrollTo({
            top: targetElement.offsetTop - 50, // Adjusting for header height
            behavior: 'smooth'
        });
    });
});

document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name && email && message) {
        alert("Thank you for contacting us, " + name + "! We will get back to you soon.");
        document.getElementById("contactForm").reset();
    } else {
        alert("Please fill out all fields.");
    }
});
