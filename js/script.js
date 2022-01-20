const clients = [];

const orders = localStorage.getItem("orders") ? JSON.parse(localStorage.getItem("orders")) : [];

let productsInCart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];

const products = [
    {
        nombre: "Buzo Umichufis",
        precio: 2000,
        img: "../assets/images/BuzoUmichufis.webp",
        id: 1
    },
    {
        nombre: "Buzo Umichufis Limited Edition",
        precio: 2300,
        img: "../assets/images/BuzoUmichufisDos.webp",
        id: 2
    },
    {
        nombre: "Barbijo Umichufis",
        precio: 550,
        img: "../assets/images/BarbijosUmichufis.webp",
        id: 3
    },
    {
        nombre: "Buzo Queen Umichufis",
        precio: 2900,
        img: "../assets/images/QueenUmichufis.webp",
        id: 4
    },
    {
        nombre: "Taza Umichufis",
        precio: 900,
        img: "../assets/images/TazaUmichufis.webp",
        id: 5
    },
    {
        nombre: "Libro Umichufis",
        precio: 1900,
        img: "../assets/images/libroUmichufis.webp",
        id: 6
    },

];

const users = [
    {
        name: "Umichufis",
        lastName: "Giando",
        email: "umichufis@umichufis.com",
        password: "soyumichufis123",
        profile_img: "../assets/images/chufisThree.webp"
    },
    {
        name: "Chiari",
        lastName: "Fernandez Querol",
        email: "chiaritax@umichufis.com",
        password: "soychiaritax123",
        profile_img: "../assets/images/umichufisFamily.webp"
    },
]

let productCounter = document.getElementById('productCount');

const countProducts = () => {
    let count = 0;
    productsInCart.forEach(product => {
        count += product.quantity;
    });
    productCounter.innerHTML = count;
}

let btnLogin = document.getElementById("submitLoginBtn");

const submitLogin = (email, password) => {
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        userLogged = user;
        isLogged();
        $('#exampleModal').modal('hide');
    } else {
        let bodyModalLogin = document.getElementById("loginBody");
        bodyModalLogin.innerHTML += `
            <div class="alert alert-danger" role="alert">
                <strong>Error!</strong> Usuario o contraseña incorrectos.
            </div>
            `;
    }
}

btnLogin.addEventListener("click", () => {
    const email = document.getElementById("emailLogin").value;
    const password = document.getElementById("passwordLogin").value;
    submitLogin(email, password);
});

let userLogged = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : false;

const isLogged = () => {
    if (userLogged) {
        let profile = document.getElementById("userProfile");
        profile.innerHTML = "";
        profile.innerHTML += `
                                <img src="${userLogged.profile_img}" class="profile-img" data-bs-toggle="modal" data-bs-target="#exampleModal2" />
                            `;
        let profile_small = document.getElementById("userProfile2");
        profile_small.innerHTML = "";
        profile_small.innerHTML += `
                                <img src="${userLogged.profile_img}" class="profile-img" data-bs-toggle="modal" data-bs-target="#exampleModal2" />
                            `;
    } else {
        let profile = document.getElementById("userProfile");
        profile.innerHTML = "";
        profile.innerHTML += `
                                <i class="fas fa-user" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                            `;
        let profile_small = document.getElementById("userProfile2");
        profile_small.innerHTML = "";
        profile_small.innerHTML += `
                                <i class="fas fa-user" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                            `;
    }
}

isLogged();

const userLogout = () => {
    localStorage.removeItem("user");
    userLogged = false;
    isLogged();
}

const btnLogout = document.getElementById("submitLogout");

btnLogout.addEventListener("click", () => {
    userLogout();
});

let containerProd = document.getElementById('productContainer');

const renderProducts = () => {
    products.forEach(product => {
        var productCard = document.createElement('div');
        productCard.classList.add('itemUmichufis');
        productCard.innerHTML = `
                                    <img
                                    src="${product.img}"
                                    alt="Buzo Queen Umichufis"
                                    loading="“lazy”"
                                    />
                                    <div class="itemUmichufisBody">
                                        <h2>${product.nombre}</h2>
                                        <h3>$${product.precio}</h3>
                                        <a href="#" onClick="addToCart(${product.id})">Agregar al carrito</a>
                                    </div>
                                    `;
        containerProd.appendChild(productCard);
    });
}

let totalContainer = document.getElementById('totalContainer');

const totalPrice = () => {
    let total = 0;
    productsInCart.forEach(product => {
        total += product.precio * product.quantity;
    });
    const options = {
        style: "currency",
        currency: "USD"
    }
    const numberFormat = new Intl.NumberFormat('en-US', options)
    if (total > 0) {
        totalContainer.innerHTML = `
                                    <h2>Total: ${numberFormat.format(total)}</h2>
                                    <div class="btnBuyCart">
                                        <button onClick="buyProducts()">Comprar</button>
                                    </div>
                                    
                                    `;
    } else {
        totalContainer.innerHTML = "";
    }
}

let containerCart = document.getElementById('cartContainer');

const renderCart = () => {
    containerCart.innerHTML = "";
    if (productsInCart.length > 0) {
        containerCart.innerHTML += `
                                    <div class="row">
                                        <div class="col text-center">
                                            <h5>Producto</h5>
                                        </div>
                                        <div class="col text-center">
                                            <h5>Precio</h5>
                                        </div>
                                        <div class="col text-center">
                                            <h5>Cantidad</h5>
                                        </div>
                                        <div class="col text-center">
                                            <h5>Subtotal</h5>
                                        </div>
                                        <div class="col text-center">
                                            <h5>Eliminar</h5>
                                        </div>
                                    </div>
                                    `

        productsInCart.forEach(product => {
            let subtotal = Number(product.precio) * Number(product.quantity);
            var cartItem = document.createElement('div');
            cartItem.classList.add('row', 'cartItemContainer');
            cartItem.innerHTML += `
                                        <div class="col cartItem">${product.nombre}</div>
                                        <div class="col cartItem">$${product.precio}</div>
                                        <div class="col cartItem">${product.quantity}</div>
                                        <div class="col cartItem">$${subtotal}</div>
                                        <div class="col cartItem">
                                            <i class="fas fa-trash-alt" onClick="removeFromCart(${product.id})"></i>
                                        </div>
                                        `;
            containerCart.appendChild(cartItem);
        });
        countProducts();
        totalPrice();
    } else {
        containerCart.innerHTML = `
                                    <div class="row mt-5">
                                        <div class="col text-center">
                                            <h3>Tu carrito está vacio</h3>
                                        </div>
                                    </div>
                                    `;
    }

}


const buyProducts = () => {
    if (userLogged) {
        let total = 0;
        productsInCart.forEach(product => {
            total += product.precio * product.quantity;
        });
        let order = {
            user: userLogged,
            products: productsInCart,
            total: total
        }
        orders.push(order);
        localStorage.setItem("orders", JSON.stringify(orders));
        alert("Compra realizada con éxito");
        productsInCart = [];
        localStorage.setItem("cart", JSON.stringify(productsInCart));
        renderCart();
        totalPrice();
    } else {
        alert("Debes iniciar sesión para realizar la compra");
    }
}

const whatToRender = () => {
    let path = window.location.pathname;
    console.log(path);
    if (path === "/pages/tienda.html") {
        renderProducts();
    } else if (path === "/pages/cart.html") {
        renderCart();
    }
}
whatToRender();

const addToCart = (id) => {
    const product = products.find(product => product.id == id);

    if (productsInCart.length > 0) {
        var dontExist = true;
        for (let i = 0; i < productsInCart.length; i++) {
            if (productsInCart[i].id == id) {
                productsInCart[i].quantity += 1;
                dontExist = false;
            }
        }
        if (dontExist) {
            product.quantity = 1;
            productsInCart.push(product);
        }
    } else {
        product.quantity = 1;
        productsInCart.push(product);
    }
    localStorage.setItem("cart", JSON.stringify(productsInCart));
    countProducts();
}

const removeFromCart = (id) => {
    for (let i = 0; i < productsInCart.length; i++) {
        if (productsInCart[i].id == id) {
            productsInCart.splice(i, 1);
        }
    }
    localStorage.setItem("cart", JSON.stringify(productsInCart));
    renderCart();
    totalPrice();
}

const orderProducts = () => {
    let orderedProducts = products.sort((a, b) => (a.precio > b.precio ? 1 : -1));
    console.table(orderedProducts)
}

countProducts();