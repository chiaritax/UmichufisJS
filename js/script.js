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

let profileContainer = document.getElementById("profileContainer");

const renderProfile = () => {
    let user = JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")) : false;
    if (user) {
        let profile = document.createElement("div");
        profile.classList.add("profile");
        profile.innerHTML = `
                            <div class="profileImg">
                                <img src="${user.profile_img}" alt="profile_img" loading="“lazy”"/>
                            </div>
                            <div class="profileInfo">
                                <h2>${user.name} ${user.lastName}</h2>
                                <h3>${user.email}</h3>
                                <div class="profileOptions">
                                    <a href="#" onClick="userLogout()">Cerrar sesión</a>
                                </div>
                            </div>
                            `;
        profileContainer.appendChild(profile);
        let orders = JSON.parse(localStorage.getItem("orders"));
        if (orders.length > 0) {
            const options = {
                style: 'currency',
                currency: 'USD',
            }
            const numberFormat = new Intl.NumberFormat('en-US', options);
            let ordersHistory = document.getElementById("ordersHistory");
            ordersHistory.innerHTML = "";
            orders.forEach(order => {
                let orderContainer = document.createElement("div");
                orderContainer.classList.add("order");
                orderContainer.innerHTML = `
                                        <div class="orderInfo d-flex justify-content-around mt-5">
                                            <h3>Orden #${order.orderId}</h3>
                                            <h4>Total: ${numberFormat.format(order.total)}</h4>
                                        </div>
                                        <div class="orderProducts">
                                            <div class="orderProductsContainer">
                                                ${order.products.map(product => `
                                                    <div class="orderProduct d-flex justify-content-around align-items-center">
                                                        <img src="${product.img}" alt="product_img" loading="“lazy”"/>
                                                        <h4>${product.nombre}</h4>
                                                        <h5>${numberFormat.format(product.precio)}</h5>
                                                    </div>
                                                `).join("")}
                                            </div>
                                        </div>
                                        `;
                ordersHistory.appendChild(orderContainer);
            });
        }
    } else {
        window.location.href = "../index.html";
    }
}

let productCounter = document.querySelector('#productCount');

const countProducts = () => {
    let count = 0;
    productsInCart.forEach(product => {
        count += product.quantity;
    });
    productCounter.innerHTML = count;
}

let btnLogin = document.querySelector("#submitLoginBtn");

const submitLogin = (email, password) => {
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        userLogged = user;
        isLogged();
        $('#exampleModal').modal('hide');
    } else {
        let bodyModalLogin = document.querySelector("#loginBody");
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
    let path = window.location.pathname;
    let href;
    console.log(path);

    if (path.endsWith("/")) {
        href = "pages/profile.html";
    } else {
        href = "profile.html";
    }

    if (userLogged) {
        let profile = document.getElementById("userProfile");
        profile.innerHTML = "";
        profile.innerHTML += `
                                <a href="${href}">
                                    <img src="${userLogged.profile_img}" class="profile-img" />
                                </a>
                            `;
        let profile_small = document.getElementById("userProfile2");
        profile_small.innerHTML = "";
        profile_small.innerHTML += `
                                <a href="${href}">
                                    <img src="${userLogged.profile_img}" class="profile-img" />
                                </a>
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
    window.location.href = "../index.html";
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
        style: 'currency',
        currency: 'USD',
    }

    const numberFormat = new Intl.NumberFormat('en-US', options);

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
            total: total,
            orderId: "UMI" + Math.floor(Math.random() * 1000000)
        }
        orders.push(order);
        localStorage.setItem("orders", JSON.stringify(orders));

        productsInCart = [];
        localStorage.setItem("cart", JSON.stringify(productsInCart));
        renderCart();
        totalPrice();
        countProducts();

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Compra realizada con éxito, gracias por comprar en nuestra tienda! Tu orden es: ' + order.orderId,
            showConfirmButton: true
        })
    } else {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Debes iniciar sesión para realizar una compra',
            showConfirmButton: true
        })
    }
}

const whatToRender = () => {
    let path = window.location.pathname;
    if (path.endsWith("/tienda.html")) {
        renderProducts();
    } else if (path.endsWith("/cart.html")) {
        renderCart();
    } else if (path.endsWith("/profile.html")) {
        renderProfile();
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
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `${product.nombre} agregado al carrito`,
        showConfirmButton: false,
        timer: 1500
    })
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
    countProducts();
}

const orderProducts = () => {
    let orderedProducts = products.sort((a, b) => (a.precio > b.precio ? 1 : -1));
    console.table(orderedProducts)
}

countProducts();

const messages = localStorage.getItem("messages") ? JSON.parse(localStorage.getItem("messages")) : [];

$('#btnEnviar').click(function (e) {
    e.preventDefault();
    var name = $('#name').val();
    var email = $('#email').val();
    var userType = $('#userType').val();
    var comment = $('#comment').val();
    var emailRegEx = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$";
    if (name == '' || email == '' || comment == '' || userType == '') {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Debes llenar todos los campos',
            showConfirmButton: true
        })
    } else if (!email.match(emailRegEx)) {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'El email no es válido',
            showConfirmButton: true
        })
    } else {
        var message = {
            name: name,
            email: email,
            userType: userType,
            comment: comment
        }
        messages.push(message);
        localStorage.setItem("messages", JSON.stringify(messages));
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: `${name} gracias por contactarnos, pronto te responderemos a ${email}!`,
            showConfirmButton: true
        })
    }
})

$('#umichufisLogo').animate({
    opacity: 0.2
}).delay(200).animate({
    opacity: 1
});