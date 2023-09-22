const createNav = () => {
    let nav = document.querySelector('.navbar');

    nav.innerHTML = `
        <div class="nav">
            <img src="img/logo.png" class="brand-logo" alt="">
            <div class="nav-items">
                <div class="search">
                    <input type="text" class="search-box" placeholder="search brand, product">
                    <button class="search-btn">Search</button>
                </div>
                <a href="#"><img src="img/user.png"></a>
                <a href="#"><img src="img/cart.png"></a>
            </div>
        </div>
        <ul class="links-container">
            <li class="link-items"><a href="#" class="link">home</a></li>
            <li class="link-items"><a href="#" class="link">Beds</a></li>
            <li class="link-items"><a href="#" class="link">Chairs</a></li>
            <li class="link-items"><a href="#" class="link">Tables</a></li>
            <li class="link-items"><a href="#"  class="link">Dinning-Tables</a></li>
            <li class="link-items"><a href="#" class="link">Accessories</a></li>
        </ul>
    `;
}

createNav();